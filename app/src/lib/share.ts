// WhatsApp sharing helpers: canonical URLs, branded share messages, the course
// share card, and local share counts.

import { getWatermark, DownloadError } from './watermark';
import { SITE_URL } from './og';

export { SITE_URL, BRAND_NAME } from './og';
export const SITE_LABEL = 'krowncf.com';

type Lang = 'en' | 'fr';

export const designUrl = (id: string) => `${SITE_URL}/design/${encodeURIComponent(id)}`;
export const courseUrl = () => `${SITE_URL}/#training`;

export const whatsappShareUrl = (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`;

const COPY = {
  en: {
    designAttribution: '🔥 Found this on Krown Creative Factory',
    designCta: '👉 Check them out for premium African designs:',
    courseAttribution: '🔥 Training by Krown Creative Factory',
    courseCta: '👉 Enroll now:',
    weeks: 'weeks',
  },
  fr: {
    designAttribution: '🔥 Trouvé sur Krown Creative Factory',
    designCta: '👉 Découvrez leurs designs africains premium :',
    courseAttribution: '🔥 Formation par Krown Creative Factory',
    courseCta: "👉 Inscrivez-vous dès maintenant :",
    weeks: 'semaines',
  },
};

/** Every share message carries the title, a line, Krown attribution, the item link and krowncf.com. */
export function buildDesignMessage(lang: Lang, title: string, line: string, url: string) {
  const c = COPY[lang];
  return [`✨ *${title}*`, line, '', c.designAttribution, `${c.designCta} ${url}`, '', `🌐 ${SITE_URL}`].join('\n');
}

export function buildCourseMessage(lang: Lang, course: { title: string; price: string; weeks: number; line: string }) {
  const c = COPY[lang];
  return [
    `🎓 *${course.title}* — ${course.price} · ${course.weeks} ${c.weeks}`,
    course.line,
    '',
    c.courseAttribution,
    `${c.courseCta} ${courseUrl()}`,
    '',
    `🌐 ${SITE_URL}`,
  ].join('\n');
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** 1080×1080 branded card used as the image when sharing a training course. */
export async function createCourseCard(course: { title: string; price: string; weeks: number; line: string }, lang: Lang): Promise<Blob> {
  const mark = await getWatermark();
  const size = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new DownloadError('Canvas is not supported');

  // Brand background: Krown black with red/orange glows.
  ctx.fillStyle = '#0A0A0A';
  ctx.fillRect(0, 0, size, size);
  const glow = (x: number, y: number, r: number, color: string) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(1, 'rgba(10,10,10,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  };
  glow(size * 0.85, size * 0.15, size * 0.6, 'rgba(220,38,38,0.35)');
  glow(size * 0.1, size * 0.95, size * 0.55, 'rgba(232,93,4,0.25)');

  const font = '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif';
  const left = 90;
  const maxW = size - left * 2;

  // Logo on a white pill so the red/black mark reads on the dark background.
  const logoW = 420;
  const logoH = logoW * (mark.naturalHeight / mark.naturalWidth);
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') ctx.roundRect(left - 24, 90 - 18, logoW + 48, logoH + 36, 28);
  else ctx.rect(left - 24, 90 - 18, logoW + 48, logoH + 36);
  ctx.fill();
  ctx.drawImage(mark, left, 90, logoW, logoH);

  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#E85D04';
  ctx.font = `600 34px ${font}`;
  ctx.fillText(lang === 'fr' ? 'FORMATION & ATELIERS' : 'TRAINING & WORKSHOPS', left, 400);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `800 84px ${font}`;
  let y = 500;
  for (const line of wrapText(ctx, course.title, maxW).slice(0, 2)) {
    ctx.fillText(line, left, y);
    y += 96;
  }

  ctx.fillStyle = 'rgba(255,255,255,0.65)';
  ctx.font = `400 36px ${font}`;
  y += 10;
  for (const line of wrapText(ctx, course.line, maxW).slice(0, 3)) {
    ctx.fillText(line, left, y);
    y += 50;
  }

  ctx.fillStyle = '#E85D04';
  ctx.font = `800 72px ${font}`;
  ctx.fillText(course.price, left, 900);
  const priceW = ctx.measureText(course.price).width;
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = `500 36px ${font}`;
  ctx.fillText(`· ${course.weeks} ${COPY[lang].weeks}`, left + priceW + 24, 900);

  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.fillRect(left, 950, maxW, 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 34px ${font}`;
  ctx.fillText(SITE_LABEL, left, 1005);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new DownloadError('Could not encode the course card');
  return blob;
}

// --- Share tracking -------------------------------------------------------
// Counts live in this browser only. Site-wide counts need a backend endpoint.

const SHARES_KEY = 'krown-shares';

function readShares(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(SHARES_KEY) || '{}') || {};
  } catch {
    return {};
  }
}

export function getShareCount(id: string) {
  return readShares()[id] ?? 0;
}

export function recordShare(id: string) {
  const shares = readShares();
  shares[id] = (shares[id] ?? 0) + 1;
  try {
    localStorage.setItem(SHARES_KEY, JSON.stringify(shares));
  } catch {
    // Storage unavailable — skip tracking.
  }
  window.dispatchEvent(new CustomEvent('krown:share', { detail: { id, count: shares[id] } }));
  return shares[id];
}
