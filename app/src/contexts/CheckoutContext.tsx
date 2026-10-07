/* eslint-disable react-refresh/only-export-components */

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import CheckoutModal, { type CheckoutRequest } from '../components/CheckoutModal';

interface CheckoutContextType {
  openCheckout: (request?: CheckoutRequest) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

/** One checkout modal for the whole site (packs, cart, pricing page, course materials). */
export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<CheckoutRequest | null>(null);
  const openCheckout = useCallback((r: CheckoutRequest = {}) => setRequest(r), []);
  const close = useCallback(() => setRequest(null), []);

  return (
    <CheckoutContext.Provider value={{ openCheckout }}>
      {children}
      <CheckoutModal request={request} onClose={close} />
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used within a CheckoutProvider');
  return ctx;
}
