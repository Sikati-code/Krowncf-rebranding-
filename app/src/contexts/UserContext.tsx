/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, useEffect } from 'react';

// Credit-pack model: users buy packs of download credits. One credit = one clean
// download. Credits never expire. Re-downloading a design you already paid for
// is free.

export interface DownloadRecord {
  designId: string;
  title: string;
  watermarked: boolean;
  downloadedAt: string;
}

export interface CreditPurchase {
  packId: string;
  credits: number;
  purchasedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  signedIn: boolean;
  credits: number;
  /** Designs paid for with a credit — clean re-downloads are free. */
  ownedDesigns: string[];
  downloadHistory: DownloadRecord[];
  purchases: CreditPurchase[];
}

export type CleanStatus = 'signin' | 'owned' | 'credit' | 'nocredits';

interface UserContextType {
  user: User;
  signIn: (email: string) => void;
  signOut: () => void;
  /** Whether a clean download of this design is possible, and how it would be paid. */
  cleanStatus: (designId: string) => CleanStatus;
  /** Records a download; consumes one credit for a first clean download of a design. */
  recordDownload: (designId: string, title: string, watermarked: boolean) => void;
  /** Adds credits after a confirmed pack purchase (call from your payment callback). */
  addCredits: (packId: string, credits: number) => void;
  /** Users with credits (or owned designs) get clean, watermark-free files. */
  hasCredits: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const GUEST_USER: User = {
  id: 'guest',
  name: 'Guest',
  email: '',
  signedIn: false,
  credits: 0,
  ownedDesigns: [],
  downloadHistory: [],
  purchases: [],
};

const MAX_HISTORY = 100;

function loadUser(): User {
  try {
    const saved = localStorage.getItem('user');
    if (!saved) return GUEST_USER;
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== 'object') return GUEST_USER;
    // Migrate users saved under the old subscription model (tier-based).
    const signedIn = typeof parsed.signedIn === 'boolean' ? parsed.signedIn : !!parsed.tier && parsed.tier !== 'guest';
    return {
      ...GUEST_USER,
      ...parsed,
      signedIn,
      credits: Number.isFinite(parsed.credits) ? Math.max(0, parsed.credits) : 0,
      ownedDesigns: Array.isArray(parsed.ownedDesigns) ? parsed.ownedDesigns : [],
      downloadHistory: Array.isArray(parsed.downloadHistory) ? parsed.downloadHistory : [],
      purchases: Array.isArray(parsed.purchases) ? parsed.purchases : [],
    };
  } catch {
    return GUEST_USER;
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(loadUser);

  useEffect(() => {
    try {
      const { id, name, email, signedIn, credits, ownedDesigns, downloadHistory, purchases } = user;
      localStorage.setItem('user', JSON.stringify({ id, name, email, signedIn, credits, ownedDesigns, downloadHistory, purchases }));
    } catch {
      // Storage unavailable (private mode / quota) — keep the in-memory session.
    }
  }, [user]);

  // Mock authentication (no backend yet): signing in keeps any existing credits.
  const signIn = (email: string) => {
    setUser((current) => ({
      ...current,
      id: email || current.id || `user-${Date.now()}`,
      name: email.split('@')[0] || current.name || 'Creative',
      email: email || current.email,
      signedIn: true,
    }));
  };

  const signOut = () => setUser((current) => ({ ...current, signedIn: false }));

  const cleanStatus = (designId: string): CleanStatus => {
    if (!user.signedIn) return 'signin';
    if (user.ownedDesigns.includes(designId)) return 'owned';
    return user.credits > 0 ? 'credit' : 'nocredits';
  };

  const recordDownload = (designId: string, title: string, watermarked: boolean) => {
    setUser((current) => {
      const firstCleanDownload = !watermarked && !current.ownedDesigns.includes(designId);
      const record: DownloadRecord = { designId, title, watermarked, downloadedAt: new Date().toISOString() };
      return {
        ...current,
        credits: firstCleanDownload ? Math.max(0, current.credits - 1) : current.credits,
        ownedDesigns: firstCleanDownload ? [...current.ownedDesigns, designId] : current.ownedDesigns,
        downloadHistory: [record, ...current.downloadHistory].slice(0, MAX_HISTORY),
      };
    });
  };

  const addCredits = (packId: string, credits: number) => {
    setUser((current) => ({
      ...current,
      credits: current.credits + credits,
      purchases: [{ packId, credits, purchasedAt: new Date().toISOString() }, ...current.purchases],
    }));
  };

  const hasCredits = user.signedIn && user.credits > 0;

  return (
    <UserContext.Provider value={{ user, signIn, signOut, cleanStatus, recordDownload, addCredits, hasCredits }}>
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
