"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Bell, Shield, Zap, Search, Wifi, Download, ArrowRight, Check,
  ChevronDown, Lock, Smartphone, Package, ShoppingBag, Utensils, Pill, Truck,
  Mail,
} from "lucide-react";
import { PLATFORMS } from "@/lib/data";

/* ============================================
 * Scroll Reveal Helper
 * ========================================== */
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ============================================
 * ACT 1 — CHAOS
 * Multiple delivery apps, overlapping notifications, stress
 * ========================================== */
export function ChaosSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  const chaoticApps = [
    { icon: Utensils, label: "Food", color: "bg-orange-500/20 text-orange-400", x: -180, y: -120, rot: -12 },
    { icon: ShoppingBag, label: "Grocery", color: "bg-green-500/20 text-green-400", x: 0, y: -160, rot: 5 },
    { icon: Package, label: "Package", color: "bg-blue-500/20 text-blue-400", x: 180, y: -100, rot: 10 },
    { icon: Pill, label: "Pharmacy", color: "bg-rose-500/20 text-rose-400", x: -150, y: 140, rot: 8 },
    { icon: Truck, label: "Freight", color: "bg-amber-500/20 text-amber-400", x: 160, y: 130, rot: -8 },
  ];

  const scatteredNotifications = [
    { icon: "🍔", text: "New order!", x: -200, y: -50, delay: 0 },
    { icon: "🛒", text: "Batch ready", x: 220, y: -80, delay: 0.4 },
    { icon: "📦", text: "Pickup now", x: -160, y: 100, delay: 0.8 },
    { icon: "💊", text: "Delivery assigned", x: 180, y: 60, delay: 1.2 },
  ];

  return (
    <section id="act-1" ref={ref} className="relative flex items-center justify-center overflow-hidden py-16 sm:py-20">
      {/* Dark, slightly red-tinted bg to feel stressful */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-red-950/5 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10"
        >
          <p className="text-sm font-semibold text-red-400/80 mb-3 tracking-[0.2em] uppercase">The Problem</p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-tight">
            Too many apps.
            <br />
            <span className="text-red-400/90">Too much noise.</span>
          </h2>
        </motion.div>

        {/* Chaotic app cluster */}
        <div className="relative h-[300px] sm:h-[380px] flex items-center justify-center">
          {/* Scattered notifications flying around chaotically */}
          {scatteredNotifications.map((n, i) => (
            <motion.div
              key={i}
              className="absolute z-10"
              initial={{ x: n.x, y: n.y, opacity: 0, scale: 0.5 }}
              animate={inView ? {
                x: [n.x, n.x + 8, n.x - 5, n.x],
                y: [n.y, n.y - 6, n.y + 4, n.y],
                opacity: [0, 1, 1, 0.85],
                scale: [0.5, 1, 0.98, 1],
              } : {}}
              transition={{
                duration: 2,
                delay: n.delay,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass shadow-xl">
                <span className="text-base">{n.icon}</span>
                <span className="text-xs font-medium whitespace-nowrap">{n.text}</span>
              </div>
            </motion.div>
          ))}

          {/* App icons scattered */}
          {chaoticApps.map((app, i) => (
            <motion.div
              key={app.label}
              className="absolute z-20"
              initial={{ x: app.x, y: app.y, opacity: 0, rotate: 0 }}
              animate={inView ? {
                x: app.x,
                y: app.y,
                opacity: 1,
                rotate: [app.rot, app.rot + 3, app.rot - 3, app.rot],
              } : {}}
              transition={{
                opacity: { duration: 0.6, delay: i * 0.15 },
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
              }}
            >
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${app.color} flex items-center justify-center shadow-2xl`}>
                <app.icon className="w-7 h-7 sm:w-9 sm:h-9" />
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2">{app.label}</p>
            </motion.div>
          ))}

          {/* Center: stressed indicator — refined, no emoji */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative z-30 w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bell className="w-9 h-9 text-red-400" />
            </motion.div>
            {/* Pulsing rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-500/20"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.div>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mt-6 sm:mt-8"
        >
          Notifications scattered across {PLATFORMS.length}+ apps. Orders missed.
          Stress building every shift.
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================
 * ACT 2 — SOLUTION
 * Notifications flow into one feed, chaos disappears
 * ========================================== */
export function SolutionSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  const sourceApps = [
    { icon: Utensils, color: "bg-orange-500/20 text-orange-400" },
    { icon: ShoppingBag, color: "bg-green-500/20 text-green-400" },
    { icon: Package, color: "bg-blue-500/20 text-blue-400" },
    { icon: Pill, color: "bg-rose-500/20 text-rose-400" },
    { icon: Truck, color: "bg-amber-500/20 text-amber-400" },
  ];

  return (
    <section id="act-2" ref={ref} className="relative flex items-center justify-center overflow-hidden py-16 sm:py-20">
      {/* Ambient glow — calming indigo */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] glow-primary"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10"
        >
          <p className="text-sm font-semibold text-indigo-400 mb-3 tracking-[0.2em] uppercase">The Solution</p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-tight">
            One feed.
            <br />
            <span className="gradient-text-static">Every notification.</span>
          </h2>
        </motion.div>

        {/* Flow visualization: apps → converging lines → phone */}
        <div className="relative h-[300px] sm:h-[380px] flex items-center justify-center">
          {/* Source apps on the left */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-4 z-20">
            {sourceApps.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-center gap-3"
              >
                <div className={`w-10 h-10 rounded-xl ${app.color} flex items-center justify-center`}>
                  <app.icon className="w-5 h-5" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Converging lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 500" preserveAspectRatio="none">
            <defs>
              <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6D5EF8" stopOpacity="0" />
                <stop offset="50%" stopColor="#6D5EF8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {[100, 175, 250, 325, 400].map((y, i) => (
              <motion.line
                key={i}
                x1="80" y1={y} x2="400" y2="250"
                stroke="url(#line-grad)" strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
              />
            ))}
          </svg>

          {/* Center: NotiFetch phone — larger, it's the product hero */}
          <motion.div
            style={{ rotate: phoneRotate }}
            className="relative z-10"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[220px] h-[440px] rounded-[2rem] bg-zinc-900 border border-zinc-700/50 overflow-hidden"
              style={{ boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6), 0 20px 40px -20px rgba(109,94,248,0.2)" }}
            >
              {/* Screen */}
              <div className="absolute inset-0 bg-background flex flex-col p-3">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Bell className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-bold">NotiFetch</span>
                </div>
                <div className="space-y-2 flex-1">
                  {["🍔 New order · 2.3 km", "🛒 Batch ready · 1.8 km", "📦 Pickup · 5.1 km", "💊 Delivery · 0.9 km"].map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1 + i * 0.3 }}
                      className="flex items-center gap-2 p-2 rounded-lg bg-card border border-border/50"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-[10px] text-muted-foreground truncate">{text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mt-6 sm:mt-8"
        >
          Grant one permission. Every notification flows into one clean timeline.
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================
 * ACT 3 — CALM
 * Clean unified feed, peaceful outcome
 * ========================================== */
export function CalmSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section id="act-3" ref={ref} className="relative flex items-center justify-center overflow-hidden py-16 sm:py-20">
      {/* Calm, peaceful gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-indigo-950/10 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] glow-primary opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-8 sm:mb-10"
        >
          <p className="text-sm font-semibold text-emerald-400 mb-3 tracking-[0.2em] uppercase">The Outcome</p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Life, simplified.
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            React faster. Miss nothing. Ride calmer.
          </p>
        </motion.div>

        {/* Three calm outcome cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Zap, title: "Faster reactions", desc: "See every order the instant it arrives. No app-switching delay." },
            { icon: Bell, title: "Nothing missed", desc: "Every notification captured. Every order visible. Nothing slips through." },
            { icon: Shield, title: "Total peace of mind", desc: "No credentials. No risk. Just one clean feed of what matters." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="premium-card p-8 rounded-2xl glass-light text-center"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <item.icon className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
 * FEATURE STAGE — full-screen showcase for one feature
 * ========================================== */
function FeatureStage({
  id, label, title, desc, icon: Icon, visual, align = "left",
}: {
  id: string; label: string; title: string; desc: string;
  icon: any; visual: React.ReactNode; align?: "left" | "right";
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section id={id} ref={ref} className="relative flex items-center justify-center overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 dot-pattern opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] glow-primary opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${align === "right" ? "lg:[direction:rtl]" : ""}`}>
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: align === "left" ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="[direction:ltr]"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-light mb-6">
              <Icon className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">{label}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              {desc}
            </p>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="[direction:ltr]"
          >
            {visual}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
 * Feature Stages — each gets its own full screen
 * ========================================== */
export function FeatureStagesSection() {
  return (
    <>
      {/* One Feed */}
      <FeatureStage
        id="feature-feed"
        label="One Feed"
        title="Every notification. One timeline."
        desc="Food, grocery, package, pharmacy, freight — all unified into a single chronological feed. Scroll once, see everything."
        icon={Bell}
        visual={
          <div className="relative">
            <div className="absolute inset-0 glow-primary opacity-40" />
            <div className="relative p-6 rounded-3xl glass">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-primary" />
                </div>
                <span className="font-semibold">Unified Feed</span>
              </div>
              <div className="space-y-2">
                {[
                  { icon: "🍔", text: "Food order · 2.3 km", time: "now" },
                  { icon: "🛒", text: "Grocery batch · 1.8 km", time: "1m" },
                  { icon: "📦", text: "Package pickup · 5.1 km", time: "3m" },
                  { icon: "💊", text: "Pharmacy · 0.9 km", time: "5m" },
                  { icon: "🚚", text: "Freight load · 12 km", time: "8m" },
                ].map((n, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50"
                  >
                    <span className="text-lg">{n.icon}</span>
                    <span className="text-sm flex-1">{n.text}</span>
                    <span className="text-xs text-muted-foreground">{n.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* Privacy */}
      <FeatureStage
        id="feature-privacy"
        label="Privacy"
        title="Your data never leaves your phone."
        desc="No passwords. No accounts. No tracking. Notifications are processed on-device. Nothing is sent to any server unless you choose to."
        icon={Shield}
        align="right"
        visual={
          <div className="relative">
            <div className="absolute inset-0 glow-accent opacity-40" />
            <div className="relative flex flex-col items-center justify-center p-12 rounded-3xl glass">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 rounded-3xl bg-emerald-500/10 flex items-center justify-center mb-6"
              >
                <Lock className="w-12 h-12 text-emerald-400" />
              </motion.div>
              <p className="text-2xl font-bold mb-2">On-device only</p>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                Processed locally. Never uploaded. Never sold. Never tracked.
              </p>
              <div className="flex gap-3 mt-6">
                {["No passwords", "No accounts", "No APIs"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* Fast */}
      <FeatureStage
        id="feature-fast"
        label="Fast"
        title="Instant. Like the notification itself."
        desc="No polling. No background sync. NotiFetch uses Android's native notification listener — your feed updates the millisecond a notification arrives."
        icon={Zap}
        visual={
          <div className="relative">
            <div className="absolute inset-0 glow-primary opacity-40" />
            <div className="relative p-8 rounded-3xl glass text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-500/10 flex items-center justify-center"
              >
                <Zap className="w-10 h-10 text-amber-400" fill="currentColor" />
              </motion.div>
              <p className="text-5xl font-bold mb-2 gradient-text-static">0ms</p>
              <p className="text-sm text-muted-foreground">Latency between notification and feed</p>
            </div>
          </div>
        }
      />

      {/* Search */}
      <FeatureStage
        id="feature-search"
        label="Search"
        title="Find any notification instantly."
        desc="Search your entire notification history. Filter by platform, category, or time. Every order you've received, searchable in milliseconds."
        icon={Search}
        align="right"
        visual={
          <div className="relative">
            <div className="absolute inset-0 glow-accent opacity-40" />
            <div className="relative p-6 rounded-3xl glass">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border/50 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Search notifications...</span>
              </div>
              <div className="space-y-2">
                {["🍔 Food order from Tuesday", "📦 Package pickup last week", "🛒 Grocery batch this morning"].map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/30"
                  >
                    <span className="text-sm">{r}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* Offline */}
      <FeatureStage
        id="feature-offline"
        label="Offline"
        title="Your history, always with you."
        desc="Every notification is saved locally. Browse past orders, review your history — even without an internet connection."
        icon={Wifi}
        visual={
          <div className="relative">
            <div className="absolute inset-0 glow-primary opacity-40" />
            <div className="relative p-8 rounded-3xl glass text-center">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-indigo-500/10 flex items-center justify-center"
              >
                <Smartphone className="w-10 h-10 text-indigo-400" />
              </motion.div>
              <p className="text-2xl font-bold mb-2">Works offline</p>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Full history access. No internet required. Always available.
              </p>
            </div>
          </div>
        }
      />
    </>
  );
}

/* ============================================
 * FAQ
 * ========================================== */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg -mx-2 px-2 transition-colors hover:text-primary"
      >
        <span className="font-medium pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-primary" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="text-muted-foreground leading-relaxed pb-5 pr-8">{a}</p>
      </motion.div>
    </div>
  );
}

export function FAQSection() {
  const faqs = [
    { q: "Does NotiFetch need my delivery app passwords?", a: "No. NotiFetch never asks for credentials. It only reads notification text Android already displays. No logins, no API keys." },
    { q: "Does it work offline?", a: "Yes. Your notification history is stored locally. Browse past orders anytime, even without internet." },
    { q: "Will it drain my battery?", a: "No. It uses Android's built-in notification listener — highly optimized, no polling, no GPS. Negligible battery impact." },
    { q: "Is my data private?", a: "Completely. Everything is processed on-device. Nothing is uploaded unless you explicitly enable server sync (off by default)." },
    { q: "What phones are supported?", a: "Any Android 8.0+ device. Samsung, OnePlus, Xiaomi, Realme, Vivo, Oppo, Motorola, Pixel — all supported." },
    { q: "How do I get support?", a: "Email us at notifetch@notifetch.in — we usually respond within 24–48 hours. Questions, feedback, or business enquiries are all welcome." },
  ];
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  return (
    <section id="faq" ref={ref} className="relative py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <p className="text-sm font-semibold text-primary mb-3 tracking-[0.2em] uppercase">FAQ</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Questions, answered.</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {faqs.map((f) => <FAQItem key={f.q} {...f} />)}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
 * Final CTA — cinematic close
 * ========================================== */
export function FinalCTASection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-indigo-950/20 to-background" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] glow-primary"
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[0.95]"
        >
          Stop missing
          <br />
          <span className="gradient-text">deliveries.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto"
        >
          One permission. One feed. Every delivery notification.
          <br />Free forever. No account needed.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="https://play.google.com/store/apps/details?id=com.notifetch.app"
            target="_blank" rel="noopener noreferrer"
            aria-label="Download NotiFetch from Google Play Store"
            className="group inline-flex items-center gap-2 px-8 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-semibold text-base shadow-2xl shadow-primary/30 transition-all hover:shadow-primary/50 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Download className="w-5 h-5" aria-hidden="true" />
            Download NotiFetch
            <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-500" /> Free forever</span>
          <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-500" /> No account</span>
          <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-500" /> Android 8+</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
 * Footer
 * ========================================== */
/* ============================================
 * Contact Section — minimal, professional
 * ========================================== */
export function ContactSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  return (
    <section id="contact" ref={ref} className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-primary opacity-20" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-semibold text-primary mb-3 tracking-[0.2em] uppercase">Contact</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            We&apos;re here to help.
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            Questions, business enquiries, feedback, or just want to say hello —
            reach out and we&apos;ll get back to you.
          </p>

          {/* Email card */}
          <a
            href="mailto:notifetch@notifetch.in"
            className="group inline-flex flex-col items-center gap-3 px-8 py-6 rounded-2xl glass premium-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              notifetch@notifetch.in
            </span>
            <span className="text-xs text-muted-foreground">
              Usually within 24–48 hours
            </span>
          </a>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              Privacy-first
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              Free forever
            </span>
            <span className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-500" />
              Android 8+
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
 * Footer — real software company footer
 * ========================================== */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/50 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Bell className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">NotiFetch</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">
              Every delivery notification in one beautiful feed. No passwords, no APIs, just one permission.
            </p>
            <a
              href="mailto:notifetch@notifetch.in"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              notifetch@notifetch.in
            </a>
          </div>

          {/* Product column */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#hero" className="text-muted-foreground hover:text-foreground transition-colors">Overview</a></li>
              <li><a href="#feature-feed" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#act-2" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a></li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.notifetch.app"
                  target="_blank" rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Download
                </a>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              <li>
                <a
                  href="https://github.com/Yashas-K-Gangatkar/notifetch"
                  target="_blank" rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="/legal" className="text-muted-foreground hover:text-foreground transition-colors">Legal Hub</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>&copy; {year} NotiFetch</span>
            <span className="text-border">·</span>
            <span>v2.9.97</span>
            <span className="text-border">·</span>
            <span>Built by Yashas K</span>
          </div>
          <p className="text-xs text-muted-foreground text-center sm:text-right max-w-xl">
            Independent tool. Not affiliated with any delivery platform. All trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
