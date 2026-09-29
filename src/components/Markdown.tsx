import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Root, RootContent, Element } from 'hast';
import { contentUrl } from '../lib/content-url';

// Contribution subsections retain their card presentation while the source stays plain Markdown.
function contributionCards() {
  return (tree: Root) => {
    const children: RootContent[] = [];
    let card: Element | undefined;
    for (const node of tree.children) {
      const heading = node.type === 'element' && /^h[1-3]$/.test(node.tagName);
      if (heading) card = undefined;
      if (node.type === 'element' && node.tagName === 'h3') {
        card = { type: 'element', tagName: 'section', properties: { className: ['card', 'ring-highlight', 'writeup-card'] }, children: [node] };
        children.push(card);
      } else if (card && node.type !== 'doctype') {
        card.children.push(node);
      } else children.push(node);
    }
    tree.children = children;
  };
}

export const Markdown = ({ children, cards = false }: { children: string; cards?: boolean }) => (
  <div className="writeup">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={cards ? [contributionCards] : []}
      urlTransform={(url) => contentUrl(defaultUrlTransform(url))}
      components={{
        a: ({ href, children }) => (
          <a href={href} {...(/^https?:\/\//.test(href ?? '') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>
        ),
        img: ({ src, alt }) => <img src={src} alt={alt ?? ''} loading="lazy" />,
        table: ({ children }) => <div className="overflow-x-auto"><table>{children}</table></div>,
      }}
    >
      {children}
    </ReactMarkdown>
  </div>
);
