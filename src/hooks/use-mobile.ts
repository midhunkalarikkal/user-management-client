import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;

const mediaQuery = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

const subscribe = (callback: () => void) => {
  const mql = window.matchMedia(mediaQuery);

  mql.addEventListener("change", callback);

  return () => {
    mql.removeEventListener("change", callback);
  };
};

const getSnapshot = () => {
  return window.matchMedia(mediaQuery).matches;
};

const getServerSnapshot = () => false;

export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
