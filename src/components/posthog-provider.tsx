"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

/**
 * v2.9.95: PostHog Provider — fixed API host + env var
 *
 * Uses NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN (as per PostHog docs)
 * Falls back to NEXT_PUBLIC_POSTHOG_KEY for backwards compat
 * Uses https://us.i.posthog.com as API host (PostHog US region)
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Try both env var names (PostHog docs use PROJECT_TOKEN, our old code used KEY)
    const key = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    try {
      posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        autocapture: true, // automatically capture pageviews, clicks, etc.
        capture_pageview: true,
        capture_pageleave: false,
        disable_session_recording: true,
        persistence: "localStorage+cookie",
        loaded: () => {
          if (process.env.NODE_ENV === "development") {
            console.log("[posthog] loaded successfully");
          }
        },
      });
    } catch {
      // Silently ignore — analytics should never break the app
    }
  }, []);

  return <>{children}</>;
}
