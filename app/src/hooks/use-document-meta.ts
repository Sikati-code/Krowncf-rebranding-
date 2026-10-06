import { useEffect } from 'react';

export interface DocumentMeta {
  title: string;
  description: string;
  image: string;
  url: string;
}

type Tag = { selector: string; create: () => HTMLElement; attr: 'content' | 'href' };

const meta = (key: 'name' | 'property', value: string): Tag => ({
  selector: `meta[${key}="${value}"]`,
  create: () => {
    const el = document.createElement('meta');
    el.setAttribute(key, value);
    return el;
  },
  attr: 'content',
});

const canonical: Tag = {
  selector: 'link[rel="canonical"]',
  create: () => {
    const el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    return el;
  },
  attr: 'href',
};

/**
 * Keeps <title>, description, Open Graph and Twitter tags in sync with the page
 * during client-side navigation. Crawlers that don't run JavaScript (WhatsApp,
 * Facebook) get the same tags from the pre-rendered HTML built by vite.config.ts.
 */
export function useDocumentMeta(m: DocumentMeta | null) {
  const { title = '', description = '', image = '', url = '' } = m ?? {};

  useEffect(() => {
    if (!title) return;
    const entries: [Tag, string][] = [
      [meta('name', 'description'), description],
      [meta('property', 'og:type'), 'article'],
      [meta('property', 'og:title'), title],
      [meta('property', 'og:description'), description],
      [meta('property', 'og:image'), image],
      [meta('property', 'og:url'), url],
      [meta('property', 'og:site_name'), 'Krown Creative Factory'],
      [meta('name', 'twitter:card'), 'summary_large_image'],
      [meta('name', 'twitter:title'), title],
      [meta('name', 'twitter:description'), description],
      [meta('name', 'twitter:image'), image],
      [meta('name', 'twitter:url'), url],
      [canonical, url],
    ];

    const previousTitle = document.title;
    const restore: (() => void)[] = [];
    document.title = title;

    for (const [tag, value] of entries) {
      let el = document.head.querySelector<HTMLElement>(tag.selector);
      if (el) {
        const before = el.getAttribute(tag.attr);
        const node = el;
        restore.push(() => (before === null ? node.removeAttribute(tag.attr) : node.setAttribute(tag.attr, before)));
      } else {
        el = tag.create();
        document.head.appendChild(el);
        const node = el;
        restore.push(() => node.remove());
      }
      el.setAttribute(tag.attr, value);
    }

    return () => {
      document.title = previousTitle;
      restore.forEach((fn) => fn());
    };
  }, [title, description, image, url]);
}
