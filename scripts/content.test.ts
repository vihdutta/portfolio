import assert from 'node:assert/strict';
import test from 'node:test';
import { loadCollection, parseContent, projectSchema } from '../src/lib/content-schema';
import { checkLocalUrl, checkMarkdown, validateContent } from './content-validation';
import { contentUrl } from '../src/lib/content-url';

const markdown = (id: string, order = 1) => `---\nid: ${id}\ntitle: Editable title\norder: ${order}\ngithub: https://github.com/example/repo\n---\n\n## Overview\n\nReal **Markdown** with \`code\`.`;

test('frontmatter accepts CRLF and preserves Markdown body separately from stable ID', () => {
  const entry = parseContent(markdown('original-id').replaceAll('\n', '\r\n'), 'example.md', projectSchema);
  assert.equal(entry.id, 'original-id');
  assert.equal(entry.title, 'Editable title');
  assert.match(entry.body, /Real \*\*Markdown\*\*/);
});
test('malformed metadata and unsafe URLs report the source filename', () => {
  assert.throws(() => parseContent('no metadata', 'bad.md', projectSchema), /bad.md/);
  assert.throws(() => parseContent(markdown('valid').replace('order: 1', 'order: nope'), 'order.md', projectSchema), /order.md/);
  assert.throws(() => parseContent(markdown('valid').replace('https://github.com/example/repo', 'javascript:alert(1)'), 'url.md', projectSchema), /url.md/);
});
test('collection rejects duplicate IDs and uses explicit ordering', () => {
  assert.throws(() => loadCollection({ 'a.md': markdown('same'), 'b.md': markdown('SAME') }, projectSchema), /duplicate page ID/);
  assert.deepEqual(loadCollection({ 'a.md': markdown('a', 2), 'b.md': markdown('b', 1) }, projectSchema).map(p => p.id), ['b', 'a']);
});
test('missing local assets and invalid local routes fail validation', () => {
  assert.throws(() => checkLocalUrl('/missing-image.png', 'example.md', new Set()), /does not exist/);
  assert.throws(() => checkMarkdown('[Broken](/projects/missing)', 'example.md', new Set()), /does not exist/);
  assert.doesNotThrow(() => checkMarkdown('[Project](/projects/valid)', 'example.md', new Set(['/projects/valid'])));
});
test('asset URLs work at both deployment bases and external URLs stay intact', () => {
  assert.equal(contentUrl('/images/demo.png', '/portfolio/'), '/portfolio/images/demo.png');
  assert.equal(contentUrl('/images/demo.png', '/'), '/images/demo.png');
  assert.equal(contentUrl('https://example.com/demo.gif', '/portfolio/'), 'https://example.com/demo.gif');
});
test('all migrated content validates', () => {
  const { projects, contributions } = validateContent();
  assert.ok(projects.length > 0);
  assert.ok(contributions.length > 0);
});
