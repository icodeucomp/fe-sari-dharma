"use client";

import { useSyncExternalStore } from "react";

export const useMediaQuery = (query: string) => {
  const subscribe = (notify: () => void) => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", notify);
    return () => mediaQuery.removeEventListener("change", notify);
  };

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
};

export const useResponsiveLimit = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  if (isDesktop) return 3;
  if (isTablet) return 2;
  if (isMobile) return 1;
  return 3;
};
