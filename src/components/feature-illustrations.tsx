"use client";

import { motion } from "framer-motion";

/* ============================================
 * UNIFIED FEED — LIVE PARTICLE FLOW ILLUSTRATION
 * ==========================================
 * Premium animated illustration showing live notification aggregation.
 *
 * Story: 6 delivery sources (left) continuously emit glowing particles
 * that travel along curved bezier paths to the NotiFetch hub (center).
 * When a particle arrives, the hub pulses and a new card appears in
 * the unified feed (right).
 *
 * Inspired by Stripe, Linear, Apple, Arc Browser marketing pages.
 */

interface SourceApp {
  id: number;
  icon: string;
  name: string;
  color: string;
  y: number; // vertical position in viewBox (0-100)
}

const SOURCES: SourceApp[] = [
  { id: 0, icon: "🍔", name: "Food", color: "#FB923C", y: 8 },
  { id: 1, icon: "🛒", name: "Grocery", color: "#4ADE80", y: 24 },
  { id: 2, icon: "📦", name: "Package", color: "#60A5FA", y: 40 },
  { id: 3, icon: "💊", name: "Pharmacy", color: "#F472B6", y: 56 },
  { id: 4, icon: "🚚", name: "Courier", color: "#FBBF24", y: 72 },
  { id: 5, icon: "🛍️", name: "Shopping", color: "#A78BFA", y: 88 },
];

// Each particle animates from source to hub on a delay loop
const PARTICLES_PER_SOURCE = 2;

export function UnifiedFeedIllustration() {
  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F7F5FF 0%, #FFFFFF 50%, #F0EDFF 100%)" }}>
      {/* Ambient glow behind hub */}
      <div
        className="absolute top-1/2 left-[38%] -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-3xl"
        style={{ background: "#6D5EF8", opacity: 0.12 }}
      />

      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Hub gradient */}
          <linearGradient id="hub-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D5EF8" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          {/* Path gradient (subtle) */}
          <linearGradient id="path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6D5EF8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.25" />
          </linearGradient>
          {/* Particle glow filter */}
          <filter id="particle-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Hub pulse glow */}
          <filter id="hub-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* === CONNECTION PATHS (subtle, static) === */}
        {SOURCES.map((source) => {
          // SVG coordinates: source at x=80, hub at x=180 y=150
          const sourceX = 80;
          const sourceY = 20 + source.y * 2.6; // map 0-100 to 20-280
          const hubX = 180;
          const hubY = 150;
          // Bezier control points for smooth curve
          const cp1X = sourceX + 40;
          const cp1Y = sourceY;
          const cp2X = hubX - 40;
          const cp2Y = hubY;
          const pathD = `M ${sourceX} ${sourceY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${hubX} ${hubY}`;

          return (
            <g key={`path-${source.id}`}>
              {/* Faint static path */}
              <path
                d={pathD}
                stroke="url(#path-grad)"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Animated particles traveling along path */}
              {Array.from({ length: PARTICLES_PER_SOURCE }).map((_, pIdx) => (
                <motion.circle
                  key={`particle-${source.id}-${pIdx}`}
                  r="3"
                  fill={source.color}
                  filter="url(#particle-glow)"
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{
                    offsetDistance: ["0%", "100%"],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: source.id * 0.4 + pIdx * 1.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    offsetPath: `path("${pathD}")`,
                  }}
                />
              ))}
            </g>
          );
        })}

        {/* === NOTIFETCH HUB (center) === */}
        <g>
          {/* Pulsing rings around hub */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={`pulse-${i}`}
              cx={180}
              cy={150}
              r={20}
              fill="none"
              stroke="#6D5EF8"
              strokeWidth="1.5"
              initial={{ r: 20, opacity: 0.5 }}
              animate={{ r: 45, opacity: 0 }}
              transition={{
                duration: 2,
                delay: i * 0.7,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Hub circle */}
          <motion.circle
            cx={180}
            cy={150}
            r={22}
            fill="url(#hub-grad)"
            filter="url(#hub-glow)"
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "180px 150px" }}
          />
          {/* Hub icon (NF) */}
          <text
            x={180}
            y={155}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="white"
          >
            NF
          </text>
        </g>

        {/* === Path from hub to feed (right side) === */}
        <motion.path
          d="M 202 150 C 240 150, 250 150, 280 150"
          stroke="#8B5CF6"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="3 3"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </svg>

      {/* === LEFT: Source app icons (HTML overlay for crispness) === */}
      <div className="absolute left-2 sm:left-4 top-0 bottom-0 flex flex-col justify-around py-4">
        {SOURCES.map((source) => (
          <motion.div
            key={`source-${source.id}`}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: source.id * 0.1 }}
            className="flex items-center gap-1.5 sm:gap-2"
          >
            <div
              className="relative w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-xs sm:text-sm shadow-sm"
              style={{ background: `${source.color}20` }}
            >
              {source.icon}
              {/* Pulse glow when particle emits */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{ background: source.color, opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0], scale: [1, 1.3, 1.5] }}
                transition={{
                  duration: 1,
                  delay: source.id * 0.4,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            </div>
            <span className="text-[8px] sm:text-[10px] font-medium text-zinc-500 hidden sm:block">
              {source.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* === RIGHT: Unified feed (HTML overlay) === */}
      <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-[40%] sm:w-[38%] max-w-[180px]">
        <div className="flex items-center gap-1.5 mb-1.5 px-1">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-[#6D5EF8] to-[#8B5CF6] flex items-center justify-center">
            <span className="text-white text-[7px] sm:text-[8px] font-bold">NF</span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold text-zinc-700">Unified Feed</span>
          {/* Live indicator */}
          <span className="flex items-center gap-0.5 ml-auto">
            <motion.span
              className="w-1 h-1 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[7px] text-green-500 font-medium">live</span>
          </span>
        </div>
        {/* Feed cards */}
        {[
          { icon: "🍔", label: "New order · 2.3 km", time: "now", color: "#FB923C" },
          { icon: "🛒", label: "Batch ready · 1.8 km", time: "1m", color: "#4ADE80" },
          { icon: "📦", label: "Pickup · 5.1 km", time: "3m", color: "#60A5FA" },
          { icon: "💊", label: "Delivery · 0.9 km", time: "5m", color: "#F472B6" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 + i * 0.15 }}
            className={`flex items-center gap-1.5 bg-white rounded-lg px-1.5 py-1 border shadow-sm mb-1 ${
              i === 0 ? "border-purple-200" : "border-zinc-200/80"
            }`}
          >
            <div
              className="w-5 h-5 rounded flex items-center justify-center text-[10px] shrink-0"
              style={{ background: `${item.color}15` }}
            >
              {item.icon}
            </div>
            <p className="text-[8px] sm:text-[9px] font-medium text-zinc-700 flex-1 truncate">{item.label}</p>
            <span className="text-[7px] text-zinc-400 shrink-0">{item.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ============================================
 * 2. PRIVACY — phone with shield, data stays inside, no cloud
 * ========================================== */
export function PrivacyIllustration() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden p-4"
      style={{ background: "linear-gradient(135deg, #F3FFF8 0%, #FFFFFF 100%)" }}>
      <div className="relative w-full h-full flex items-center justify-center gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-20 h-32 rounded-2xl bg-white border-2 border-zinc-200 shadow-md p-1.5 flex flex-col gap-1">
            <div className="w-6 h-1 bg-zinc-300 rounded-full mx-auto mb-1" />
            {["🍔", "🛒", "📦", "💊"].map((icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-1 bg-emerald-50 rounded px-1 py-0.5"
              >
                <span className="text-[8px]">{icon}</span>
                <div className="flex-1 h-0.5 bg-emerald-200 rounded" />
              </motion.div>
            ))}
          </div>
          <p className="text-[8px] text-center text-zinc-500 mt-1.5 font-medium">Your data</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring" }}
          className="flex flex-col items-center"
        >
          <div className="w-14 h-16 relative">
            <svg viewBox="0 0 60 70" className="w-full h-full">
              <defs>
                <linearGradient id="shield-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <path d="M 30 5 L 10 12 L 10 35 Q 10 55, 30 65 Q 50 55, 50 35 L 50 12 Z" fill="url(#shield-grad-2)" />
              <rect x="22" y="30" width="16" height="12" rx="2" fill="white" />
              <path d="M 25 30 L 25 25 Q 25 20, 30 20 Q 35 20, 35 25 L 35 30" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="30" cy="36" r="2" fill="#059669" />
            </svg>
          </div>
          <p className="text-[8px] text-emerald-600 mt-1 font-medium">Protected</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="w-14 h-12 relative">
            <svg viewBox="0 0 60 50" className="w-full h-full">
              <ellipse cx="30" cy="28" rx="22" ry="14" fill="#D1D5DB" opacity="0.5" />
              <ellipse cx="20" cy="22" rx="10" ry="8" fill="#D1D5DB" opacity="0.5" />
              <ellipse cx="40" cy="22" rx="10" ry="8" fill="#D1D5DB" opacity="0.5" />
              <line x1="8" y1="8" x2="52" y2="44" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-[8px] text-zinc-400 mt-1 font-medium">No cloud</p>
        </motion.div>
      </div>
      <div className="absolute bottom-3 left-0 right-0 text-center">
        <p className="text-[9px] text-emerald-700 font-semibold">All processing happens on your device</p>
      </div>
    </div>
  );
}

/* ============================================
 * 3. INSTANT — notification arrives → appears in feed instantly
 * ========================================== */
export function InstantIllustration() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden p-4"
      style={{ background: "linear-gradient(135deg, #FFFBEF 0%, #FFFFFF 100%)" }}>
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border-2 border-amber-300 shadow-md"
        >
          <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
            <svg viewBox="0 0 20 20" className="w-4 h-4 fill-amber-500">
              <path d="M 10 2 C 7 2, 5 4, 5 7 L 5 11 L 3 14 L 17 14 L 15 11 L 15 7 C 15 4, 13 2, 10 2 Z M 8 16 Q 10 18, 12 16" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-zinc-700">New order arrived</p>
            <p className="text-[8px] text-zinc-400">Just now</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <svg width="16" height="20" viewBox="0 0 16 20">
            <motion.path d="M 8 0 L 8 14 M 4 10 L 8 14 L 12 10" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.4 }} />
          </svg>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: "spring" }}
          className="flex items-center gap-1.5"
        >
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 shadow-md">
            <span className="text-white text-[12px] font-bold">0ms delay</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
          <svg width="16" height="20" viewBox="0 0 16 20">
            <path d="M 8 0 L 8 14 M 4 10 L 8 14 L 12 10" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="w-full max-w-[200px] bg-white rounded-xl border border-zinc-200 p-2 shadow-sm"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-amber-400 to-orange-400" />
            <span className="text-[8px] font-bold text-zinc-600">Your Feed</span>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-md px-1.5 py-1 mb-1"
          >
            <span className="text-[10px]">🍔</span>
            <span className="text-[8px] font-medium text-zinc-600 flex-1">New order</span>
            <span className="text-[7px] text-amber-500 font-bold">NEW</span>
          </motion.div>
          <div className="flex items-center gap-1.5 px-1.5 py-1 opacity-50">
            <span className="text-[10px]">🛒</span>
            <span className="text-[8px] text-zinc-500 flex-1">Grocery batch</span>
            <span className="text-[7px] text-zinc-400">1m</span>
          </div>
          <div className="flex items-center gap-1.5 px-1.5 py-1 opacity-30">
            <span className="text-[10px]">📦</span>
            <span className="text-[8px] text-zinc-500 flex-1">Package pickup</span>
            <span className="text-[7px] text-zinc-400">3m</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================
 * 4. SEARCH — search bar filtering notification history
 * ========================================== */
export function SearchIllustration() {
  const allItems = [
    { icon: "🍔", label: "Swiggy order · Tuesday", match: true },
    { icon: "📦", label: "Amazon package · Monday", match: false },
    { icon: "🛒", label: "Blinkit grocery · Today", match: false },
    { icon: "💊", label: "Pharmacy delivery · Friday", match: false },
    { icon: "🍔", label: "Zomato order · Sunday", match: true },
  ];
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden p-4"
      style={{ background: "linear-gradient(135deg, #F0F4FF 0%, #FFFFFF 100%)" }}>
      <div className="relative w-full h-full flex flex-col justify-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 bg-white rounded-xl border-2 border-indigo-300 px-3 py-2 shadow-md"
        >
          <svg viewBox="0 0 20 20" className="w-4 h-4 fill-indigo-400">
            <path d="M 9 2 C 5 2, 2 5, 2 9 C 2 13, 5 16, 9 16 C 13 16, 16 13, 16 9 C 16 5, 13 2, 9 2 Z M 9 4 C 12 4, 14 6, 14 9 C 14 12, 12 14, 9 14 C 6 14, 4 12, 4 9 C 4 6, 6 4, 9 4 Z M 14.5 13 L 18 16.5 L 16.5 18 L 13 14.5 Z" />
          </svg>
          <span className="text-[11px] font-medium text-zinc-700">food order</span>
          <span className="ml-auto w-0.5 h-3.5 bg-indigo-400 animate-pulse" />
        </motion.div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-[8px] text-zinc-400 px-1">
          2 results found
        </motion.p>
        <div className="space-y-1">
          {allItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: item.match ? 1 : 0.3, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 border ${item.match ? "bg-indigo-50 border-indigo-200 shadow-sm" : "bg-white border-zinc-100"}`}
            >
              <span className="text-sm">{item.icon}</span>
              <span className={`text-[9px] flex-1 ${item.match ? "font-medium text-zinc-700" : "text-zinc-400"}`}>{item.label}</span>
              {item.match && <span className="text-[7px] bg-indigo-100 text-indigo-600 px-1 py-0.5 rounded font-bold">MATCH</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================
 * 5. OFFLINE — phone with local storage, no cloud needed
 * ========================================== */
export function OfflineIllustration() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden p-4"
      style={{ background: "linear-gradient(135deg, #F5F3FF 0%, #FFFFFF 100%)" }}>
      <div className="relative w-full h-full flex items-center justify-center gap-3">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-col items-center">
          <div className="w-16 h-24 rounded-xl bg-white border-2 border-zinc-200 shadow-md p-1 flex flex-col gap-0.5">
            <div className="w-4 h-0.5 bg-zinc-300 rounded-full mx-auto mb-0.5" />
            {["🍔", "🛒", "📦"].map((icon, i) => (
              <div key={i} className="flex items-center gap-0.5 bg-purple-50 rounded px-0.5 py-0.5">
                <span className="text-[7px]">{icon}</span>
                <div className="flex-1 h-0.5 bg-purple-200 rounded" />
              </div>
            ))}
          </div>
          <p className="text-[7px] text-zinc-500 mt-1 font-medium">Phone</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <svg width="20" height="16" viewBox="0 0 20 16">
            <path d="M 0 8 L 16 8 M 12 4 L 16 8 L 12 12" stroke="#6D5EF8" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, type: "spring" }} className="flex flex-col items-center">
          <div className="relative">
            <svg viewBox="0 0 50 60" className="w-12 h-14">
              <defs>
                <linearGradient id="db-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6D5EF8" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <ellipse cx="25" cy="10" rx="18" ry="6" fill="url(#db-grad)" />
              <path d="M 7 10 L 7 45 Q 7 51, 25 51 Q 43 51, 43 45 L 43 10" fill="url(#db-grad)" />
              <ellipse cx="25" cy="10" rx="18" ry="6" fill="#8B5CF6" opacity="0.3" />
              <ellipse cx="25" cy="22" rx="18" ry="5" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
              <ellipse cx="25" cy="34" rx="18" ry="5" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
              <rect x="19" y="36" width="12" height="9" rx="1.5" fill="white" />
              <path d="M 21 36 L 21 33 Q 21 30, 25 30 Q 29 30, 29 33 L 29 36" fill="none" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="text-[7px] text-purple-600 mt-1 font-medium text-center leading-tight">Encrypted<br />Storage</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
          <svg width="20" height="16" viewBox="0 0 20 16">
            <path d="M 0 8 L 16 8 M 12 4 L 16 8 L 12 12" stroke="#6D5EF8" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }} className="flex flex-col items-center">
          <div className="bg-white rounded-xl border-2 border-purple-200 p-2 shadow-md">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[7px] font-bold text-zinc-600">History</span>
            </div>
            <div className="space-y-0.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-sm bg-purple-200" />
                  <div className="w-8 h-0.5 bg-zinc-200 rounded" />
                </div>
              ))}
            </div>
          </div>
          <p className="text-[7px] text-green-600 mt-1 font-medium">Accessible</p>
        </motion.div>
      </div>
      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <circle cx="6" cy="6" r="5" fill="none" stroke="#10B981" strokeWidth="1.5" />
          <path d="M 3 6 L 5 8 L 9 4" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className="text-[8px] text-green-600 font-semibold">No internet needed</p>
      </div>
    </div>
  );
}
