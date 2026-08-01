"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AutoScroll
 *
 * Slowly auto-scrolls the page when:
 * - User has been idle for 5 seconds (no mouse, scroll, touch, or key)
 * - Tab is visible (not switched to another app/tab)
 * - User hasn't manually scrolled in the last 5s
 * - Screen is desktop (not touch devices — auto-scroll feels janky on mobile)
 * - User hasn't disabled motion (prefers-reduced-motion)
 *
 * Stops immediately when:
 * - User moves mouse, scrolls, touches, or presses a key
 * - User switches to another tab/app (Page Visibility API)
 * - User scrolls back up manually
 *
 * When it reaches the bottom, it smoothly scrolls back to top and repeats.
 *
 * The scroll speed is very slow (~15px per frame ≈ 1 screen per 6 seconds)
 * so it feels like a gentle demo, not aggressive movement.
 */
const IDLE_DELAY_MS = 5000; // 5 seconds of no activity before auto-scroll starts
const SCROLL_SPEED_PX_PER_FRAME = 0.8; // very slow — ~48px/sec

export function AutoScroll() {
  const [enabled, setEnabled] = useState(false);
  const rafRef = useRef<number>(0);
  const lastActivityRef = useRef<number>(Date.now());
  const isScrollingRef = useRef<boolean>(false);
  const userScrolledRef = useRef<boolean>(false);

  useEffect(() => {
    // === GUARDS: Don't enable on mobile/touch or reduced-motion ===
    if (window.matchMedia("(pointer: coarse)").matches) return; // touch device
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let isPaused = false;

    // === Activity tracking ===
    const activities = ["mousemove", "scroll", "touchstart", "keydown", "click", "wheel"];

    const handleActivity = () => {
      lastActivityRef.current = Date.now();
      // If we were auto-scrolling, stop immediately
      if (isScrollingRef.current) {
        isScrollingRef.current = false;
        cancelAnimationFrame(rafRef.current);
      }
      // Mark that user interacted (used to detect manual scroll vs auto-scroll)
      userScrolledRef.current = true;
      setTimeout(() => { userScrolledRef.current = false; }, 300);
    };

    activities.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // === Visibility: pause when tab is hidden ===
    const handleVisibility = () => {
      if (document.hidden) {
        isPaused = true;
        isScrollingRef.current = false;
        cancelAnimationFrame(rafRef.current);
      } else {
        isPaused = false;
        // Reset idle timer when coming back — wait 5s before resuming
        lastActivityRef.current = Date.now();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    // === Auto-scroll loop ===
    const autoScroll = () => {
      if (isPaused) return;

      const now = Date.now();
      const timeSinceActivity = now - lastActivityRef.current;

      // Check if we should start auto-scrolling
      if (!isScrollingRef.current && timeSinceActivity > IDLE_DELAY_MS) {
        isScrollingRef.current = true;
      }

      // If auto-scrolling, advance slowly
      if (isScrollingRef.current) {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        if (scrollY >= maxScroll - 2) {
          // Reached bottom — smoothly scroll back to top
          isScrollingRef.current = false;
          window.scrollTo({ top: 0, behavior: "smooth" });
          // Wait for the smooth scroll to finish, then reset idle timer
          setTimeout(() => {
            lastActivityRef.current = Date.now();
          }, 2000);
        } else {
          // Scroll down slowly
          window.scrollTo(0, scrollY + SCROLL_SPEED_PX_PER_FRAME);
        }
      }

      rafRef.current = requestAnimationFrame(autoScroll);
    };

    rafRef.current = requestAnimationFrame(autoScroll);
    setEnabled(true);

    return () => {
      activities.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // This component renders nothing — it's a behavior-only component
  return null;
}
