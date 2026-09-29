import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import type { RootContent } from 'mdast';
import { contributionSchema, loadCollection, projectSchema, publicationSchema, siteSchema } from '../src/lib/content-schema';
import { site } from '../src/content/site';
import { publications } from '../src/content/publications';

export function readCollection(directory: string) {
  return Object.fromEntries(readdirSync(directory).filter(file => file.endsWith('.md')).map(file => {
    const filename = `${directory}/${file}`;
    return [filename, readFileSync(filename, 'utf8')];
  }));
}

export function checkLocalUrl(url: string, filename: string, routes: Set<string>, publicDir = resolve('public')) {
  if (/^(https?:\/\/|mailto:|tel:|#)/.test(url)) return;
  if (!url.startsWith('/') || url.startsWith('//')) throw new Error(`${filename}: use /paths for local links and images: ${url}`);
  const path = decodeURIComponent(url.split(/[?#]/)[0]);
  if (routes.has(path)) return;
  const target = resolve(publicDir, `.${path}`);
  if (relative(publicDir, target).startsWith('..') || !existsSync(target)) {
    throw new Error(`${filename}: local link or image does not exist: ${url}`);
  }
}

export function checkMarkdown(body: string, filename: string, routes: Set<string>) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(body);
  const definitions = new Set<string>();
  const references: string[] = [];
  function visit(nodes: RootContent[]) {
    for (const node of nodes) {
      if (node.type === 'link' || node.type === 'image' || node.type === 'definition') checkLocalUrl(node.url, filename, routes);
      if (node.type === 'definition') definitions.add(node.identifier);
      if (node.type === 'linkReference' || node.type === 'imageReference') references.push(node.identifier);
      if (node.type === 'html') throw new Error(`${filename}: use Markdown instead of raw HTML.`);
      if ('children' in node) visit(node.children);
    }
  }
  visit(tree.children);
  for (const ref of references) if (!definitions.has(ref)) throw new Error(`${filename}: missing link definition [${ref}]`);
}

export function validateContent() {
  const siteResult = siteSchema.safeParse(site);
  if (!siteResult.success) throw new Error(`src/content/site.ts: ${siteResult.error.message}`);
  const ids = new Set<string>();
  for (const paper of publications) {
    const result = publicationSchema.safeParse(paper);
    if (!result.success) throw new Error(`src/content/publications.ts (${paper.arxivId}): ${result.error.message}`);
    if (ids.has(paper.arxivId)) throw new Error(`publications.ts: duplicate arXiv ID ${paper.arxivId}`);
    ids.add(paper.arxivId);
  }
  const projectFiles = readCollection('src/content/projects');
  const contributionFiles = readCollection('src/content/contributions');
  const projects = loadCollection(projectFiles, projectSchema);
  const contributions = loadCollection(contributionFiles, contributionSchema);
  const routes = new Set(['/', ...projects.map(p => `/projects/${p.id}`), ...contributions.map(c => `/contributions/${c.id}`)]);
  checkLocalUrl(site.education.logo, 'site.ts: education.logo', routes);
  for (const project of projects) if (project.preview) checkLocalUrl(project.preview, `project ${project.id}: preview`, routes);
  for (const [filename, source] of Object.entries({ ...projectFiles, ...contributionFiles })) {
    const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '');
    checkMarkdown(body, filename, routes);
  }
  return { projects, contributions };
}
