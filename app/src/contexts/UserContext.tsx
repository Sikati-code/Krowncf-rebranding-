/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, useEffect } from 'react';

export type UserTier = 'guest' | 'basic' | 'pro' | 'advanced';

export interface DownloadRecord {
  designId: string;
  title: string;
  watermarked: boolean;
  downloadedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  tier: UserTier;
  downloadsUsed: number;
  maxDownloads: number;
  downloadedDesigns: string[];
  downloadHistory: DownloadRecord[];
}

export type DownloadStatus = 'signin' | 'limit' | 'redownload' | 'download';

interface UserContextType {
  user: User;
  updateUser: (user: User) => void;
  signIn: (email: string) => void;
  canDownload: (designId: string) => { allowed: boolean; status: DownloadStatus };
  recordDownload: (designId: string, title: string, watermarked: boolean) => void;
  getRemainingDownloads: () => number;
  /** Pro and Advanced subscribers receive clean, watermark-free files. */
  isPremium: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Download limits by tier
export const TIER_LIMITS = {
  guest: { maxDownloads: 0, label: 'Guest', labelFr: 'Invité' },
  basic: { maxDownloads: 12, label: 'Free', labelFr: 'Gratuit' },
  pro: { maxDownloads: Infinity, label: 'Pro', labelFr: 'Pro' },
  advanced: { maxDownloads: Infinity, label: 'Advanced', labelFr: 'Avancé' },
};

const GUEST_USER: User = {
  id: 'guest',
  name: 'Guest',
  email: '',
  tier: 'guest',
  downloadsUsed: 0,
  maxDownloads: 0,
  downloadedDesigns: [],
  downloadHistory: [],
};

const MAX_HISTORY = 100;

function loadUser(): User {
  try {
    const saved = localStorage.getItem('user');
    if (!saved) return GUEST_USER;
    const parsed = JSON.parse(saved);
    if (!parsed || !(parsed.tier in TIER_LIMITS)) return GUEST_USER;
    // Older saved users predate download history; ensure every field exists.
    const user: User = { ...GUEST_USER, ...parsed };
    // Ensure guest users have correct limits
    if (user.tier === 'guest') {
      user.maxDownloads = 0;
    }
    return user;
  } catch {
    return GUEST_USER;
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(loadUser);

  useEffect(() => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch {
      // Storage unavailable (private mode / quota) — keep the in-memory session.
    }
  }, [user]);

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  // Mock authentication: signing in promotes a guest to the free (Basic) tier.
  // Existing paid tiers are kept.
  const signIn = (email: string) => {
    setUser((current) => {
      if (current.tier !== 'guest') return { ...current, email: email || current.email };
      const name = email.split('@')[0] || 'Creative';
      return {
        ...current,
        id: email || `user-${Date.now()}`,
        name,
        email,
        tier: 'basic',
        maxDownloads: TIER_LIMITS.basic.maxDownloads,
      };
    });
  };

  const canDownload = (designId: string): { allowed: boolean; status: DownloadStatus } => {
    // Guest users cannot download
    if (user.tier === 'guest') {
      return { allowed: false, status: 'signin' };
    }

    // Already downloaded - allow re-download without consuming quota
    if (user.downloadedDesigns.includes(designId)) {
      return { allowed: true, status: 'redownload' };
    }

    // Check if user has reached their limit
    if (user.downloadsUsed >= TIER_LIMITS[user.tier].maxDownloads) {
      return { allowed: false, status: 'limit' };
    }

    return { allowed: true, status: 'download' };
  };

  const recordDownload = (designId: string, title: string, watermarked: boolean) => {
    setUser((current) => {
      const isNew = !current.downloadedDesigns.includes(designId);
      const record: DownloadRecord = {
        designId,
        title,
        watermarked,
        downloadedAt: new Date().toISOString(),
      };
      return {
        ...current,
        downloadsUsed: isNew ? current.downloadsUsed + 1 : current.downloadsUsed,
        downloadedDesigns: isNew ? [...current.downloadedDesigns, designId] : current.downloadedDesigns,
        downloadHistory: [record, ...current.downloadHistory].slice(0, MAX_HISTORY),
      };
    });
  };

  const getRemainingDownloads = () => {
    return Math.max(0, TIER_LIMITS[user.tier].maxDownloads - user.downloadsUsed);
  };

  const isPremium = user.tier === 'pro' || user.tier === 'advanced';

  return (
    <UserContext.Provider
      value={{ user, updateUser, signIn, canDownload, recordDownload, getRemainingDownloads, isPremium }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
