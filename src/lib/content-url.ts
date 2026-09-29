// Content paths starting with / are relative to public/, including on /portfolio/.
export function contentUrl(url: string, base = import.meta.env?.BASE_URL ?? '/'): string {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  return `${base.replace(/\/$/, '')}${url}`;
}
