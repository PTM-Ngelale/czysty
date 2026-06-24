'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type FooterOverride = {
  onBack?: (() => void) | null;
  onNext?: (() => void) | null;
  nextDisabled?: boolean;
  nextLabel?: string;
  hideButtons?: boolean;
};

type FooterContextType = {
  override: FooterOverride;
  setOverride: (o: FooterOverride) => void;
  clearOverride: () => void;
};

const FooterContext = createContext<FooterContextType>({
  override: {},
  setOverride: () => {},
  clearOverride: () => {},
});

export function FooterProvider({ children }: { children: React.ReactNode }) {
  const [override, setOverrideState] = useState<FooterOverride>({});

  const setOverride = useCallback((o: FooterOverride) => {
    setOverrideState(o);
  }, []);

  const clearOverride = useCallback(() => {
    setOverrideState({});
  }, []);

  return (
    <FooterContext.Provider value={{ override, setOverride, clearOverride }}>
      {children}
    </FooterContext.Provider>
  );
}

export function useFooter() {
  return useContext(FooterContext);
}
