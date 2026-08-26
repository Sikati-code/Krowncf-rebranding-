import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  tier: 'guest' | 'basic' | 'pro' | 'advanced';
  downloadsUsed: number;
  maxDownloads: number;
  downloadedDesigns: string[];
}

interface UserContextType {
  user: User;
  updateUser: (user: User) => void;
  canDownload: (designId: string) => { allowed: boolean; reason: string };
  getRemainingDownloads: () => number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Download limits by tier
const TIER_LIMITS = {
  guest: { maxDownloads: 0, label: 'Guest', labelFr: 'Invité' },
  basic: { maxDownloads: 12, label: 'Free', labelFr: 'Gratuit' },
  pro: { maxDownloads: Infinity, label: 'Pro', labelFr: 'Pro' },
  advanced: { maxDownloads: Infinity, label: 'Advanced', labelFr: 'Avancé' },
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure guest users have correct limits
      if (parsed.tier === 'guest') {
        parsed.maxDownloads = 0;
      }
      return parsed;
    }
    return {
      id: 'guest',
      name: 'Guest',
      email: '',
      tier: 'guest',
      downloadsUsed: 0,
      maxDownloads: 0,
      downloadedDesigns: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  const canDownload = (designId: string) => {
    const tierLimit = TIER_LIMITS[user.tier].maxDownloads;

    // Guest users cannot download
    if (user.tier === 'guest') {
      return { 
        allowed: false, 
        reason: 'Sign in to download designs.' 
      };
    }

    // Check if user has reached their limit
    if (user.downloadsUsed >= tierLimit) {
      return { 
        allowed: false, 
        reason: 'You\'ve used your 12 free downloads. Upgrade to Pro for unlimited downloads!' 
      };
    }

    // Already downloaded - allow re-download
    if (user.downloadedDesigns.includes(designId)) {
      return { allowed: true, reason: 'Download again' };
    }

    return { allowed: true, reason: 'Download' };
  };

  const getRemainingDownloads = () => {
    return Math.max(0, TIER_LIMITS[user.tier].maxDownloads - user.downloadsUsed);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, canDownload, getRemainingDownloads }}>
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
