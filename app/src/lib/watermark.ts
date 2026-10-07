// Client-side download pipeline for design files.
// - Preview / no-credit downloads: Alamy-style watermark (small, white, low
//   opacity, centred) plus a slim attribution strip, burned into the pixels.
// - Credit downloads: the original bytes, untouched.

const WATERMARK_SRC = '/assets/watermark-white.png';

// iOS Safari refuses (or kills the tab on) canvases above ~16.7M pixels, so
// never allocate more than 4096 px per side. Previews are much smaller.
const MAX_CANVAS_SIDE = 4096;
export const PREVIEW_MAX_SIDE = 1200;

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

/** Warm the watermark cache so the first watermarked download feels instant. */
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

/**
 * Alamy-style mark: a small white Krown logo, centred, at very low opacity with a
 * faint shadow so it still reads on white artwork, plus a slim footer strip
 * ("Krown Creative Factory · krowncf.com · ID").
 */
function drawWatermark(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  mark: HTMLImageElement,
  footer: string,
) {
  const shortSide = Math.min(width, height);
  const ratio = mark.naturalHeight / mark.naturalWidth;

  // Centred signature: ~34% of the image width, capped so tall art isn't dominated.
  const markW = Math.min(width * 0.34, (height * 0.18) / ratio);
  const markH = markW * ratio;
  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
  ctx.shadowBlur = Math.max(2, shortSide * 0.006);
  ctx.drawImage(mark, (width - markW) / 2, (height - markH) / 2, markW, markH);
  ctx.restore();

  // Footer strip.
  const fontSize = Math.max(9, Math.round(shortSide * 0.022));
  const stripH = Math.round(fontSize * 2.1);
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.38)';
  ctx.fillRect(0, height - stripH, width, stripH);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = `500 ${fontSize}px "Inter", system-ui, -apple-system, "Segoe UI", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(footer, width / 2, height - stripH / 2, width * 0.94);
  ctx.restore();
}

/** Draws `original` (optionally downscaled) with the watermark and re-encodes it. */
async function renderWatermarked(original: Blob, footer: string, maxSide: number): Promise<Blob> {
  const objectUrl = URL.createObjectURL(original);
  const canvas = document.createElement('canvas');
  let img: HTMLImageElement | null = null;
  try {
    const [loaded, mark] = await Promise.all([loadImage(objectUrl), getWatermark()]);
    img = loaded;

    let { naturalWidth: width, naturalHeight: height } = img;
    if (!width || !height) throw new DownloadError('Design has no dimensions');
    const scale = Math.min(1, maxSide / Math.max(width, height));
    width = Math.round(width * scale);
    height = Math.round(height * scale);

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new DownloadError('Canvas is not supported');

    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, width, height);
    drawWatermark(ctx, width, height, mark, footer);

    // JPEG keeps previews small; PNG sources keep transparency.
    const outType = original.type === 'image/png' ? 'image/png' : 'image/jpeg';
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, outType, outType === 'image/jpeg' ? 0.9 : undefined),
    );
    if (!blob) throw new DownloadError('Could not encode the watermarked file');
    return blob;
  } finally {
    // Release decoded pixels and the canvas backing store right away — mobile
    // browsers kill tabs that hold on to large bitmaps.
    canvas.width = 0;
    canvas.height = 0;
    if (img) img.src = '';
    URL.revokeObjectURL(objectUrl);
  }
}

export interface DesignDownloadOptions {
  imageUrl: string;
  title: string;
  /** Design id, printed in the watermark footer. */
  designId: string;
  mode: 'clean' | 'watermarked' | 'preview';
}

const footerFor = (designId: string) => `Krown Creative Factory  ·  krowncf.com  ·  ID: ${designId}`;

/** Fetches the design, watermarks it when required, and triggers the browser download. */
export async function downloadDesign({ imageUrl, title, designId, mode }: DesignDownloadOptions) {
  const original = await fetchOriginal(imageUrl);
  const base = slugify(title);

  if (mode === 'clean') {
    // Clean download: the original bytes, untouched (full resolution, original quality).
    saveBlob(original, `${base}.${extensionFor(original.type)}`);
    return;
  }

  const maxSide = mode === 'preview' ? PREVIEW_MAX_SIDE : MAX_CANVAS_SIDE;
  const marked = await renderWatermarked(original, footerFor(designId), maxSide);
  saveBlob(marked, `${base}-krowncf-${mode === 'preview' ? 'preview' : 'watermarked'}.${extensionFor(marked.type)}`);
}

/** Watermarked preview as a Blob (used for "share to Status" on desktop). */
export async function createPreviewBlob(imageUrl: string, designId: string) {
  const original = await fetchOriginal(imageUrl);
  return renderWatermarked(original, footerFor(designId), PREVIEW_MAX_SIDE);
}
