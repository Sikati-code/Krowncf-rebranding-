import { useCallback, useState, useSyncExternalStore } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { createShareImage, slugify } from '../lib/watermark';
import {
  SITE_LABEL,
  buildCourseMessage,
  buildDesignMessage,
  createCourseCard,
  designUrl,
  courseUrl,
  getShareCount,
} from '../lib/share';
import type { ShareItem } from '../components/WhatsAppShareSheet';

export interface ShareableDesign {
  /** Route id, as used in /design/:id */
  id: string;
  /** Tracking key (differs from id for portfolio logos). */
  trackId: string;
  title: string;
  line: string;
  image: string;
}

export interface ShareableCourse {
  id: number;
  title: string;
  price: string;
  weeks: number;
  line: string;
}

/** Builds branded WhatsApp share items in the current language and for the current tier. */
export function useShareItems() {
  const { language, t } = useLanguage();
  const { isPremium } = useUser();
  const [item, setItem] = useState<ShareItem | null>(null);
  const close = useCallback(() => setItem(null), []);

  const shareDesign = (design: ShareableDesign) => {
    const url = designUrl(design.id);
    setItem({
      trackId: design.trackId,
      title: design.title,
      url,
      message: buildDesignMessage(language, design.title, design.line, url),
      fileName: `${slugify(design.title)}-krowncf`,
      // Free users share the full watermark; Pro users share clean + small badge.
      makeImage: () => createShareImage(design.image, isPremium, SITE_LABEL),
      note: isPremium ? t('share.notePro') : t('share.noteFree'),
    });
  };

  const shareCourse = (course: ShareableCourse) => {
    setItem({
      trackId: `course-${course.id}`,
      title: course.title,
      url: courseUrl(),
      message: buildCourseMessage(language, course),
      fileName: `${slugify(course.title)}-krowncf-course`,
      makeImage: () => createCourseCard(course, language),
    });
  };

  return { item, close, shareDesign, shareCourse };
}

/** Live share count for one item (updates when this browser records a share). */
export function useShareCount(trackId: string) {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener('krown:share', onChange);
      window.addEventListener('storage', onChange);
      return () => {
        window.removeEventListener('krown:share', onChange);
        window.removeEventListener('storage', onChange);
      };
    },
    () => getShareCount(trackId),
  );
}
