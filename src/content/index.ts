import type { ContributionContent, ProjectContent } from '../lib/content-schema';

// Vite validates and converts Markdown to data; the browser never loads a YAML parser.
// New files and saved edits are picked up automatically by these imports.
const byOrder = (a: { order: number; id: string }, b: { order: number; id: string }) =>
  a.order - b.order || a.id.localeCompare(b.id);

export const projects = Object.values(import.meta.glob<ProjectContent>(
  './projects/*.md', { import: 'default', eager: true },
)).sort(byOrder);
export const contributions = Object.values(import.meta.glob<ContributionContent>(
  './contributions/*.md', { import: 'default', eager: true },
)).sort(byOrder);
