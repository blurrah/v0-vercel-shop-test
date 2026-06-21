"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export type StoreTheme = "sunny" | "bloom" | "sky" | "meadow";

/** Map a pathname to a playful color theme. */
export function themeForPath(pathname: string): StoreTheme {
  if (pathname.startsWith("/collections/girls")) return "bloom";
  if (pathname.startsWith("/collections/boys")) return "sky";
  if (pathname.startsWith("/collections/baby")) return "meadow";
  if (pathname.startsWith("/collections/new-arrivals")) return "sunny";
  if (pathname.startsWith("/cart")) return "bloom";
  if (pathname.startsWith("/search")) return "meadow";
  if (pathname.startsWith("/account")) return "sky";
  if (pathname.startsWith("/about")) return "meadow";
  return "sunny";
}

function applyTheme(theme: StoreTheme) {
  document.documentElement.dataset.theme = theme;
}

/**
 * Applies the route-based color theme to <html> and cross-fades the change
 * using the View Transitions API so the whole palette animates between pages.
 */
export function ThemeController() {
  const pathname = usePathname();

  useEffect(() => {
    const theme = themeForPath(pathname);
    if (document.documentElement.dataset.theme === theme) return;

    const startViewTransition = (
      document as Document & {
        startViewTransition?: (cb: () => void) => { finished?: Promise<void> };
      }
    ).startViewTransition?.bind(document);

    if (startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const transition = startViewTransition(() => applyTheme(theme));
      // A rapid second navigation skips the in-flight transition, rejecting
      // `finished` with an AbortError. That's expected — swallow it.
      transition?.finished?.catch(() => {});
    } else {
      applyTheme(theme);
    }
  }, [pathname]);

  return null;
}
