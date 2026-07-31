"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Play, ArrowRight, Bell } from "lucide-react";

interface FlyNotification {
  id: number;
  icon: string;
  label: string;
  startX: number;
  startY: number;
  delay: number;
}

const FLY_NOTIFICATIONS: FlyNotification[] = [
  { id: 1, icon: "🍔", label: "Food order", startX: -280, startY: -180, delay: 1 },
  { id: 2, icon: "🛒", label: "Grocery batch", startX: 280, startY: -140, delay: 2 },
  { id: 3, icon: "📦", label: "Package pickup", startX: -240, startY: 180, delay: 3 },
  { id: 4, icon: "💊", label: "Pharmacy run", startX: 260, startY: 160, delay: 4 },
];

// Easing — premium, Apple-like
const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 50, y: 50 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const phoneScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);

  useEffect(() => {
    // Performance: skip cursor spotlight on touch devices (no cursor on mobile)
    // and when user prefers reduced motion
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setCursor({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => { window.removeEventListener("mousemove", handleMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="NotiFetch — Never miss another delivery"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 cursor-spotlight"
        style={{ "--cursor-x": `${cursor.x}%`, "--cursor-y": `${cursor.y}%` } as React.CSSProperties}
        aria-hidden="true"
      />

      {/* Ambient orbs — softer, slower */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] glow-primary"
        animate={{ x: [0, 30, -15, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] glow-accent"
        animate={{ x: [0, -25, 15, 0], y: [0, 15, -25, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Grid — very subtle */}
      <div className="absolute inset-0 grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_70%)]" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="flex flex-col items-center text-center">
          {/* 1. HEADLINE — first thing the eye sees */}
          <motion.div
            style={{ opacity: headlineOpacity, y: headlineY }}
            className="mb-8 sm:mb-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-7"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-medium text-muted-foreground tracking-wide">
                No passwords · No APIs · Just one permission
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.04em] leading-[0.95] mb-5"
            >
              Never Miss
              <br />
              <span className="gradient-text">Another Delivery.</span>
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-md mx-auto leading-[1.5]"
            >
              Every delivery notification.
              <br />
              One beautiful feed.
            </motion.p>
          </motion.div>

          {/* 2. PHONE — the product is the hero */}
          <motion.div
            style={{ scale: phoneScale, y: phoneY }}
            className="relative mb-8 sm:mb-10"
          >
            {/* Flying notifications — 4 (reduced from 5 for less clutter) */}
            {FLY_NOTIFICATIONS.map((n) => (
              <motion.div
                key={n.id}
                className="absolute top-1/2 left-1/2 z-20 pointer-events-none"
                initial={{ x: n.startX, y: n.startY, opacity: 0, scale: 0.5 }}
                animate={{
                  x: [n.startX, n.startX * 0.4, 0, 0],
                  y: [n.startY, n.startY * 0.4, 0, 0],
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 0.85, 1, 0.7],
                }}
                transition={{
                  duration: 2.8,
                  delay: n.delay,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: [0.4, 0, 0.2, 1],
                }}
                aria-hidden="true"
              >
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass shadow-2xl">
                  <span className="text-base">{n.icon}</span>
                  <span className="text-xs font-medium whitespace-nowrap">{n.label}</span>
                </div>
              </motion.div>
            ))}

            {/* Phone glow — responsive blur (60px mobile, 100px desktop) */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/15 blur-[60px] sm:blur-[100px] scale-110" aria-hidden="true" />

            {/* Phone frame — refined shadow, will-change for GPU acceleration */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-0.8, 0.8, -0.8] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[260px] sm:w-[300px] h-[540px] sm:h-[620px] rounded-[2.5rem] bg-zinc-900 border border-zinc-700/40 overflow-hidden"
              style={{ boxShadow: "0 50px 100px -20px rgba(0,0,0,0.7), 0 30px 60px -30px rgba(109,94,248,0.15), inset 0 0 0 1px rgba(255,255,255,0.04)", willChange: "transform" }}
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-zinc-900 rounded-b-2xl z-20" />

              {/* Screen */}
              <div className="absolute inset-0 bg-background rounded-[2.4rem] overflow-hidden flex flex-col">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-4 pb-2 text-[10px] text-muted-foreground">
                  <span>9:41</span>
                  <span className="flex items-center gap-1"><span>5G</span><span>●●●</span></span>
                </div>

                {/* App header */}
                <div className="px-5 pt-5 pb-3">
                  <div className="flex items-center justify-between mb-0.5">
                    <h2 className="text-lg font-bold tracking-tight">Notifications</h2>
                    <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
                      <Bell className="w-3.5 h-3.5 text-primary" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">All your deliveries, unified</p>
                </div>

                {/* Feed */}
                <div className="flex-1 overflow-hidden px-3 space-y-2">
                  {[
                    { icon: "🍔", title: "New order available", sub: "Food Delivery · 2.3 km", time: "now", c: "bg-orange-500/10" },
                    { icon: "🛒", title: "Grocery batch ready", sub: "Quick Commerce · 1.8 km", time: "1m", c: "bg-green-500/10" },
                    { icon: "📦", title: "Package pickup assigned", sub: "Last Mile · 5.1 km", time: "3m", c: "bg-blue-500/10" },
                    { icon: "💊", title: "Pharmacy delivery", sub: "Quick Commerce · 0.9 km", time: "5m", c: "bg-rose-500/10" },
                  ].map((n, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.25, duration: 0.5, ease: EASE }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border/40"
                    >
                      <div className={`w-9 h-9 rounded-lg ${n.c} flex items-center justify-center text-base shrink-0`}>{n.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <p className="text-xs font-semibold truncate">{n.title}</p>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{n.sub}</p>
                      </div>
                      <span className="text-[9px] text-muted-foreground shrink-0">{n.time}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom nav */}
                <div className="flex items-center justify-around py-3 border-t border-border/40 bg-card/30">
                  {["Home", "Search", "Settings"].map((label, i) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                      <div className={`w-1 h-1 rounded-full ${i === 0 ? "bg-primary" : "bg-transparent"}`} />
                      <span className={`text-[9px] ${i === 0 ? "text-primary font-medium" : "text-muted-foreground"}`}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 3. CTAs — clear, confident */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.notifetch.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download NotiFetch from Google Play Store"
              className="group inline-flex items-center gap-2 px-8 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-semibold text-base transition-all hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{ boxShadow: "0 10px 40px -10px rgba(109,94,248,0.5)" }}
            >
              <Download className="w-5 h-5" aria-hidden="true" />
              Download APK
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#act-1"
              aria-label="Watch the NotiFetch demo — see how it works"
              className="inline-flex items-center gap-2 px-8 h-14 rounded-2xl glass-light hover:bg-secondary/60 text-foreground font-semibold text-base transition-all hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Play className="w-4 h-4 fill-current" aria-hidden="true" />
              Watch Demo
            </a>
          </motion.div>

          {/* Trust indicator — subtle, builds confidence */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-xs text-muted-foreground/70 mt-6"
          >
            Free forever · Android 8.0+ · No account needed
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator — subtle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border border-muted-foreground/25 flex items-start justify-center p-1"
        >
          <div className="w-0.5 h-1.5 rounded-full bg-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
