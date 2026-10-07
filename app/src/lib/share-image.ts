// Watermarked share images, prepared ahead of the tap.
//
// Every WhatsApp share carries the WATERMARKED preview — never the clean file,
// whatever the user's credits. iOS only opens the share sheet when
// navigator.share() runs inside the tap, so the image must already exist by
// then: design pages prepare it as soon as they load, cards on pointerdown.
// Previews are small (≤1200 px JPEG, ~100 KB), so they're safe to attach on phones.

import { createPreviewBlob, extensionFor, slugify } from './watermark';

interface Entry {
  promise: Promise<File>;
  file: File | null;
}

const MAX_CACHED = 6; // keep memory bounded on long browsing sessions
const cache = new Map<string, Entry>();

export function prepareShareImage(designId: string, imageUrl: string, title: string): Promise<File> {
  const hit = cache.get(designId);
  if (hit) return hit.promise;

  const entry: Entry = { file: null, promise: Promise.resolve(null as unknown as File) };
  entry.promise = createPreviewBlob(imageUrl, designId)
    .then((blob) => {
      const file = new File([blob], `${slugify(title)}-krowncf.${extensionFor(blob.type)}`, { type: blob.type });
      entry.file = file;
      return file;
    })
    .catch((err) => {
      cache.delete(designId); // allow a retry
      throw err;
    });
  cache.set(designId, entry);

  while (cache.size > MAX_CACHED) {
    const oldest = cache.keys().next().value;
    if (oldest === undefined) break;
    cache.delete(oldest);
  }
  return entry.promise;
}

/** The prepared file, if it is already done (synchronous — safe inside a tap handler). */
export function readyShareImage(designId: string): File | null {
  return cache.get(designId)?.file ?? null;
}

export function canShareFile(file: File) {
  try {
    return typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] });
  } catch {
    return false;
  }
}
