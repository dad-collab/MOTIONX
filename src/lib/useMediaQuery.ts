import { useCallback, useSyncExternalStore } from "react";

/** Mouse or trackpad with hover: the only case where cursor effects make sense. */
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/** Subscribes to a CSS media query. Updates live when the condition changes. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void): (() => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    (): boolean => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
