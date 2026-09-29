import { z } from 'zod';
import { parse } from 'yaml';

const text = z.string().trim().min(1);
const httpUrl = text.refine(value => /^https?:\/\//.test(value) && URL.canParse(value), 'Use a complete http(s) URL');
const asset = text.refine(value => /^\/(?!\/)/.test(value) || (/^https?:\/\//.test(value) && URL.canParse(value)), 'Use a /public-asset path or an http(s) URL');
const id = text.regex(/^[A-Za-z0-9][A-Za-z0-9_-]*$/, 'Use letters, numbers, hyphens, or underscores for the stable page ID');
const heading = z.object({ label: text, title: text }).strict();

export const siteSchema = z.object({
  name: text, authorName: text, tagline: text, subtitle: text, pageTitle: text, description: text,
  sections: z.object({ projects: heading, contributions: heading, publications: heading, education: heading }).strict(),
  education: z.object({ school: text, logo: asset, degrees: z.array(text).min(1), courseworkLabel: text, courses: z.array(text) }).strict(),
  socialLinks: z.array(z.object({ label: text, href: httpUrl }).strict()),
  footer: z.object({ copyright: text, credits: z.array(text) }).strict(),
}).strict();
export type SiteContent = z.infer<typeof siteSchema>;

export const publicationSchema = z.object({
  title: text, venue: text, author: text.nullable(), authors: z.array(text).min(1), arxivId: text, url: httpUrl,
}).strict();
export type Publication = z.infer<typeof publicationSchema>;

const shared = { id, title: text, order: z.number().int().positive(), github: httpUrl };
export const projectSchema = z.object({
  ...shared,
  description: text.optional(),
  details: z.array(text).default([]),
  technologies: z.array(text).default([]),
  preview: asset.optional(),
  live: httpUrl.optional(),
}).strict();
export const contributionSchema = z.object({
  ...shared,
  repo: text,
  description: text.optional(),
  stats: z.array(z.object({ value: text, label: text, highlight: z.boolean().optional(), homeLabel: text.optional() }).strict()),
  cta: z.object({ label: text, url: httpUrl }).strict(),
}).strict();

export type ProjectContent = z.infer<typeof projectSchema> & { body: string };
export type ContributionContent = z.infer<typeof contributionSchema> & { body: string };

export function parseContent<T extends z.ZodType<Record<string, unknown>>>(source: string, filename: string, schema: T): z.infer<T> & { body: string } {
  try {
    const match = source.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
    if (!match) throw new Error('Start the file with YAML metadata between two --- lines.');
    const data = schema.parse(parse(match[1]));
    const body = match[2].trim();
    if (!body) throw new Error('Add a Markdown write-up after the metadata.');
    return { ...data, body };
  } catch (error) {
    throw new Error(`${filename}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export function loadCollection<T extends z.ZodType<{ id: string; order: number }>>(files: Record<string, string>, schema: T) {
  const ids = new Set<string>();
  return Object.entries(files).map(([filename, source]) => {
    const entry = parseContent(source, filename, schema);
    if (ids.has(entry.id.toLowerCase())) throw new Error(`${filename}: duplicate page ID "${entry.id}"`);
    ids.add(entry.id.toLowerCase());
    return entry;
  }).sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}
