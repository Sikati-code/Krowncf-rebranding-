// Build step: writes dist/design/<id>/index.html for every design with its own
// Open Graph / Twitter tags. WhatsApp, Facebook and X don't run JavaScript, so
// rich link previews need the tags in the HTML the server sends. The page body
// is the normal SPA shell, so visitors get the full app as usual.

import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { allDesignIds, ogFor, BRAND_NAME, type OgMeta } from './src/lib/og';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function metaBlock(m: OgMeta) {
  const e = escapeHtml;
  return [
    `<title>${e(m.title)}</title>`,
    `<meta name="description" content="${e(m.description)}" />`,
    `<link rel="canonical" href="${e(m.url)}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:site_name" content="${BRAND_NAME}" />`,
    `<meta property="og:title" content="${e(m.title)}" />`,
    `<meta property="og:description" content="${e(m.description)}" />`,
    `<meta property="og:image" content="${e(m.image)}" />`,
    `<meta property="og:image:alt" content="${e(m.title)}" />`,
    `<meta property="og:url" content="${e(m.url)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:locale:alternate" content="fr_FR" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${e(m.title)}" />`,
    `<meta name="twitter:description" content="${e(m.description)}" />`,
    `<meta name="twitter:image" content="${e(m.image)}" />`,
    `<meta name="twitter:url" content="${e(m.url)}" />`,
  ]
    .map((line) => `    ${line}`)
    .join('\n');
}

export function renderDesignHtml(template: string, m: OgMeta) {
  return (
    template
      // Drop the site-wide tags that the per-design block replaces.
      .replace(/\s*<title>[\s\S]*?<\/title>/, '')
      .replace(/\s*<meta\s+(?:name|property)="(?:description|og:[^"]+|twitter:[^"]+)"[^>]*>/g, '')
      .replace(/\s*<link\s+rel="canonical"[^>]*>/g, '')
      // Nested pages need absolute asset paths (guards against a relative `base`).
      .replace(/(src|href)="\.\//g, '$1="/')
      .replace('</head>', `${metaBlock(m)}\n  </head>`)
  );
}

export default function ogPrerender(): Plugin {
  let outDir = 'dist';
  return {
    name: 'krown-og-prerender',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf-8');
      let count = 0;
      for (const id of allDesignIds()) {
        const meta = ogFor(id);
        if (!meta) continue;
        const dir = path.join(outDir, 'design', id);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), renderDesignHtml(template, meta));
        count++;
      }
      // Unknown design ids (rewritten to a missing file) fall back to the SPA,
      // which renders its own "Design not found" view.
      fs.writeFileSync(path.join(outDir, '404.html'), template.replace(/(src|href)="\.\//g, '$1="/'));
      console.log(`[krown-og-prerender] wrote ${count} design pages with Open Graph tags`);
    },
  };
}
