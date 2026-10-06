// Client-side download pipeline for design files.
// Free/Basic users get a Krown-branded watermark burned into the pixels of the
// downloaded file; Pro/Advanced users get the original bytes, untouched.

const WATERMARK_SRC = '/assets/watermark.png';

// Browsers refuse canvases above roughly 16k px per side / ~268M px area.
const MAX_CANVAS_SIDE = 8192;

export class DownloadError extends Error {}

let watermarkPromise: Promise<HTMLImageElement> | null = null;

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new DownloadError(`Could not load image: ${src}`));
    img.src = src;
  });
}

export function getWatermark() {
  if (!watermarkPromise) {
    watermarkPromise = loadImage(WATERMARK_SRC).catch((err) => {
      watermarkPromise = null; // allow a retry on the next download
      throw err;
    });
  }
  return watermarkPromise;
}

/** Warm the watermark cache so the first free download feels instant. */
export function preloadWatermark() {
  getWatermark().catch(() => {});
}

export async function fetchOriginal(url: string): Promise<Blob> {
  let res: Response;
  try {
    res = await fetch(url, { mode: 'cors' });
  } catch {
    throw new DownloadError('Network error while fetching the design');
  }
  if (!res.ok) throw new DownloadError(`Design request failed (${res.status})`);
  const blob = await res.blob();
  if (!blob.type.startsWith('image/')) throw new DownloadError('Design is not an image');
  return blob;
}

export function extensionFor(mime: string) {
  if (mime === 'image/jpeg') return 'jpg';
  if (mime === 'image/webp') return 'webp';
  return 'png';
}

export function slugify(name: string) {
  return (
    name
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'krown-design'
  );
}

export function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Give the browser a moment to start the download before revoking.
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

function drawWatermark(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  mark: HTMLImageElement,
  tagline: string,
) {
  const shortSide = Math.min(width, height);
  const markRatio = mark.naturalHeight / mark.naturalWidth;

  // 1. Diagonal tiled layer: covers the whole image so no crop removes it.
  const tileW = Math.max(120, shortSide * 0.28);
  const tileH = tileW * markRatio;
  const gapX = tileW * 0.55;
  const gapY = tileH * 1.6;
  const diagonal = Math.hypot(width, height);

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(-Math.PI / 6);
  ctx.globalAlpha = 0.16;
  let row = 0;
  for (let y = -diagonal / 2; y < diagonal / 2; y += tileH + gapY, row++) {
    const offset = row % 2 === 0 ? 0 : (tileW + gapX) / 2;
    for (let x = -diagonal / 2 - offset; x < diagonal / 2; x += tileW + gapX) {
      ctx.drawImage(mark, x, y, tileW, tileH);
    }
  }
  ctx.restore();

  // 2. Large centred mark, diagonal, with a soft halo so it reads on dark and light art.
  const centreW = Math.min(width * 0.7, height * 0.7 / markRatio);
  const centreH = centreW * markRatio;
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(-Math.PI / 6);
  ctx.globalAlpha = 0.38;
  ctx.shadowColor = 'rgba(255, 255, 255, 0.55)';
  ctx.shadowBlur = shortSide * 0.02;
  ctx.drawImage(mark, -centreW / 2, -centreH / 2, centreW, centreH);
  ctx.restore();

  // 3. Footer ribbon with brand name + upgrade tagline.
  const fontSize = Math.max(11, Math.round(shortSide * 0.028));
  const bandH = Math.round(fontSize * 2.4);
  ctx.save();
  ctx.fillStyle = 'rgba(10, 10, 10, 0.62)';
  ctx.fillRect(0, height - bandH, width, bandH);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
  ctx.font = `600 ${fontSize}px "Inter", system-ui, -apple-system, "Segoe UI", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const text = `KROWN CREATIVE FACTORY  •  ${tagline}`;
  // Fall back to the brand name alone when the tagline doesn't fit.
  const label = ctx.measureText(text).width <= width * 0.94 ? text : 'KROWN CREATIVE FACTORY';
  ctx.fillText(label, width / 2, height - bandH / 2, width * 0.94);
  ctx.restore();
}

type BrandPainter = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  mark: HTMLImageElement,
) => void;

/** Draws `original` onto a canvas, lets `paint` add branding, and re-encodes it. */
async function renderBranded(original: Blob, paint: BrandPainter): Promise<Blob> {
  const objectUrl = URL.createObjectURL(original);
  try {
    const [img, mark] = await Promise.all([loadImage(objectUrl), getWatermark()]);

    let { naturalWidth: width, naturalHeight: height } = img;
    if (!width || !height) throw new DownloadError('Design has no dimensions');
    const scale = Math.min(1, MAX_CANVAS_SIDE / Math.max(width, height));
    width = Math.round(width * scale);
    height = Math.round(height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new DownloadError('Canvas is not supported');

    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, width, height);
    paint(ctx, width, height, mark);

    // Preserve the source format: JPEGs stay JPEG, everything else becomes PNG.
    const outType = original.type === 'image/jpeg' ? 'image/jpeg' : 'image/png';
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, outType, outType === 'image/jpeg' ? 0.92 : undefined),
    );
    if (!blob) throw new DownloadError('Could not encode the branded file');
    return blob;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

/** Small, unobtrusive "logo + krowncf.com" tag in the bottom-right corner. */
function drawBrandBadge(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  mark: HTMLImageElement,
  label: string,
) {
  const shortSide = Math.min(width, height);
  const markH = Math.max(14, shortSide * 0.05);
  const markW = markH * (mark.naturalWidth / mark.naturalHeight);
  const fontSize = Math.max(10, Math.round(markH * 0.5));
  const pad = Math.round(markH * 0.35);
  const margin = Math.round(shortSide * 0.025);

  ctx.save();
  ctx.font = `600 ${fontSize}px "Inter", system-ui, -apple-system, "Segoe UI", sans-serif`;
  const textW = ctx.measureText(label).width;
  const boxW = pad + markW + pad * 0.8 + textW + pad;
  const boxH = markH + pad * 2;
  const x = width - margin - boxW;
  const y = height - margin - boxH;

  ctx.fillStyle = 'rgba(10, 10, 10, 0.6)';
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, boxW, boxH, boxH / 2);
    ctx.fill();
  } else {
    ctx.fillRect(x, y, boxW, boxH); // older Safari/Firefox
  }
  ctx.drawImage(mark, x + pad, y + pad, markW, markH);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x + pad + markW + pad * 0.8, y + boxH / 2);
  ctx.restore();
}

async function watermarkBlob(original: Blob, tagline: string): Promise<Blob> {
  return renderBranded(original, (ctx, w, h, mark) => drawWatermark(ctx, w, h, mark, tagline));
}

/**
 * Branded image for sharing. Free users share the full watermark; Pro users share
 * the clean design with only a small Krown corner badge, so attribution always travels.
 */
export async function createShareImage(imageUrl: string, premium: boolean, siteLabel: string): Promise<Blob> {
  const original = await fetchOriginal(imageUrl);
  return renderBranded(original, (ctx, w, h, mark) => {
    if (premium) drawBrandBadge(ctx, w, h, mark, siteLabel);
    else drawWatermark(ctx, w, h, mark, siteLabel);
  });
}

export interface DesignDownloadOptions {
  imageUrl: string;
  title: string;
  watermark: boolean;
  /** Short line printed in the watermark ribbon (localised by the caller). */
  tagline: string;
}

/** Fetches the design, watermarks it when required, and triggers the browser download. */
export async function downloadDesign({ imageUrl, title, watermark, tagline }: DesignDownloadOptions) {
  const original = await fetchOriginal(imageUrl);
  const base = slugify(title);

  if (!watermark) {
    // Clean download: the original bytes, untouched (full resolution, original quality).
    saveBlob(original, `${base}.${extensionFor(original.type)}`);
    return;
  }

  const marked = await watermarkBlob(original, tagline);
  saveBlob(marked, `${base}-krown-preview.${extensionFor(marked.type)}`);
}
