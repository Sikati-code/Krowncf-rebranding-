// Build step: writes dist/design/<id>/index.html for every design with its own
// Open Graph / Twitter tags. WhatsApp, Facebook and X don't run JavaScript, so
// rich link previews need the tags in the HTML the server sends. The page body
// is the normal SPA shell, so visitors get the full app as usual.

import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import sharp from 'sharp';
import { allDesignIds, ogFor, BRAND_NAME, type OgMeta } from './src/lib/og';

type RawImage = { data: Buffer; info: sharp.OutputInfo };

const OG_MAX_SIDE = 1200;

/** Reads a design image: local files from the build output, remote ones over HTTP. */
async function loadSource(src: string, outDir: string): Promise<Buffer> {
  if (/^https?:\/\//.test(src)) {
    const res = await fetch(src, { signal: AbortSignal.timeout(15_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }
  return fs.readFileSync(path.join(outDir, decodeURI(src).replace(/^\/+/, '')));
}

const escapeXml = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Same Alamy-style mark as the in-browser previews (src/lib/watermark.ts):
 * small white Krown logo, centred, ~28% opacity, plus a slim attribution strip.
 */
async function watermarkForOg(source: Buffer, mark: RawImage, id: string): Promise<Buffer> {
  // Flatten on white so transparent logos stay readable in previews.
  const base = await sharp(source)
    .rotate()
    .resize({ width: OG_MAX_SIDE, height: OG_MAX_SIDE, fit: 'inside', withoutEnlargement: true })
    .flatten({ background: '#ffffff' })
    .toBuffer({ resolveWithObject: true });
  const { width, height } = base.info;
  const shortSide = Math.min(width, height);

  const ratio = mark.info.height / mark.info.width;
  const markW = Math.max(1, Math.round(Math.min(width * 0.34, (height * 0.18) / ratio)));
  const faded = Buffer.from(mark.data);
  for (let i = 3; i < faded.length; i += 4) faded[i] = Math.round(faded[i] * 0.28);
  const markPng = await sharp(faded, { raw: { width: mark.info.width, height: mark.info.height, channels: 4 } })
    .resize({ width: markW })
    .png()
    .toBuffer({ resolveWithObject: true });

  const fontSize = Math.max(11, Math.round(shortSide * 0.022));
  const stripH = Math.round(fontSize * 2.1);
  const label = escapeXml(`Krown Creative Factory  ·  krowncf.com  ·  ID: ${id}`);
  const strip = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${stripH}">` +
      `<rect width="100%" height="100%" fill="#000" fill-opacity="0.38"/>` +
      `<text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, Segoe UI, Arial, sans-serif" font-weight="500" font-size="${fontSize}" fill="#fff" fill-opacity="0.85">${label}</text>` +
      `</svg>`,
  );

  return sharp(base.data)
    .composite([
      {
        input: markPng.data,
        left: Math.round((width - markPng.info.width) / 2),
        top: Math.round((height - markPng.info.height) / 2),
      },
      { input: strip, left: 0, top: height - stripH },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
}

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
    async closeBundle() {
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf-8');
      const metas: { id: string; meta: OgMeta }[] = [];
      for (const id of allDesignIds()) {
        const meta = ogFor(id);
        if (!meta) continue;
        const dir = path.join(outDir, 'design', id);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), renderDesignHtml(template, meta));
        metas.push({ id, meta });
      }
      const count = metas.length;

      // Watermarked link-preview images (dist/og/<id>.jpg). Shared links must
      // never preview the clean design.
      const ogDir = path.join(outDir, 'og');
      fs.mkdirSync(ogDir, { recursive: true });
      const watermark = await sharp(path.join(outDir, 'assets', 'watermark-white.png')).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const fallback = fs.readFileSync(path.join(outDir, 'assets', 'og-image.png'));
      const fallbackJpg = await sharp(fallback).jpeg({ quality: 82 }).toBuffer();
      let made = 0;
      let failed = 0;
      const queue = [...metas];
      const worker = async () => {
        for (let next = queue.shift(); next; next = queue.shift()) {
          const target = path.join(ogDir, `${next.id}.jpg`);
          try {
            const source = await loadSource(next.meta.sourceImage, outDir);
            fs.writeFileSync(target, await watermarkForOg(source, watermark, next.id));
            made++;
          } catch (err) {
            // Unreachable image: fall back to the branded site card (still never clean).
            fs.writeFileSync(target, fallbackJpg);
            failed++;
            console.warn(`[krown-og-prerender] ${next.id}: ${(err as Error).message} — using branded fallback`);
          }
        }
      };
      await Promise.all(Array.from({ length: 8 }, worker));
      console.log(`[krown-og-prerender] watermarked ${made} preview images (${failed} fallbacks)`);
      // Unknown design ids (rewritten to a missing file) fall back to the SPA,
      // which renders its own "Design not found" view.
      fs.writeFileSync(path.join(outDir, '404.html'), template.replace(/(src|href)="\.\//g, '$1="/'));
      console.log(`[krown-og-prerender] wrote ${count} design pages with Open Graph tags`);
    },
  };
}
