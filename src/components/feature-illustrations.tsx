"use client";

import { motion } from "framer-motion";

/* ============================================
 * EXPLANATORY FEATURE ILLUSTRATIONS
 * ==========================================
 * Each illustration tells a visual story that explains the feature
 * in under 1 second — without requiring text.
 *
 * Design principles:
 * - 60-80% visual coverage (fills the card)
 * - Recognizable UI elements (phones, search bars, notifications, timelines)
 * - Clear visual flow (top-to-bottom or left-to-right narrative)
 * - No abstract shapes, circles, or random lines
 * - The feature must be understandable with text hidden
 */

/* ============================================
 * 1. UNIFIED FEED — multiple apps → one timeline
 * Shows: 4 app icons on left → flowing into → unified feed on right
 * ========================================== */
export function UnifiedFeedIllustration() {
  const apps = [
    { icon: "🍔", name: "Food", color: "#FB923C" },
    { icon: "🛒", name: "Grocery", color: "#4ADE80" },
    { icon: "📦", name: "Package", color: "#60A5FA" },
    { icon: "💊", name: "Pharmacy", color: "#F472B6" },
  ];
  const feedItems = [
    { icon: "🍔", label: "New order · 2.3 km", time: "now", color: "#FB923C" },
    { icon: "🛒", label: "Batch ready · 1.8 km", time: "1m", color: "#4ADE80" },
    { icon: "📦", label: "Pickup · 5.1 km", time: "3m", color: "#60A5FA" },
    { icon: "💊", label: "Delivery · 0.9 km", time: "5m", color: "#F472B6" },
  ];

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden p-4 sm:p-6"
      style={{ background: "linear-gradient(135deg, #F7F5FF 0%, #FFFFFF 100%)" }}>
      <div className="relative w-full h-full grid grid-cols-[1fr_0.8fr_1.4fr] items-center gap-2 sm:gap-4">
        {/* LEFT: Source apps */}
        <div className="flex flex-col justify-center gap-2 sm:gap-3">
          {apps.map((app, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex items-center gap-2"
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl shadow-sm shrink-0"
                style={{ background: `${app.color}20` }}
              >
                {app.icon}
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-zinc-500 hidden sm:block">{app.name}</span>
            </motion.div>
          ))}
        </div>

        {/* MIDDLE: Flowing arrows (smaller, contained) */}
        <div className="relative h-full flex items-center justify-center">
          <svg viewBox="0 0 80 120" className="h-24 sm:h-32 w-auto" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6D5EF8" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#6D5EF8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {[15, 40, 65, 90].map((y, i) => (
              <motion.path
                key={i}
                d={`M 0 ${y} C 30 ${y}, 50 60, 80 60`}
                stroke="url(#flow-grad)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }}
              />
            ))}
            {/* Arrow head at convergence point */}
            <motion.path
              d="M 75 56 L 80 60 L 75 64"
              stroke="#8B5CF6"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
            />
          </svg>
        </div>

        {/* RIGHT: Unified feed */}
        <div className="flex flex-col justify-center gap-1.5">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-gradient-to-br from-[#6D5EF8] to-[#8B5CF6] flex items-center justify-center shrink-0">
              <span className="text-white text-[8px] sm:text-[9px] font-bold">NF</span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-zinc-700">Unified Feed</span>
          </div>
          {feedItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.12 }}
              className="flex items-center gap-2 bg-white rounded-lg px-2 py-1.5 border border-zinc-200/80 shadow-sm"
            >
              <div
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center text-xs sm:text-sm shrink-0"
                style={{ background: `${item.color}15` }}
              >
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] sm:text-[10px] font-medium text-zinc-700 truncate">{item.label}</p>
              </div>
              <span className="text-[8px] sm:text-[9px] text-zinc-400 shrink-0">{item.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================
 * 2. PRIVACY — phone with shield, data stays inside, no cloud
 * Shows: Phone with notifications inside → shield → cloud crossed out
 * ========================================== */
export function PrivacyIllustration() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden p-4"
      style={{ background: "linear-gradient(135deg, #F3FFF8 0%, #FFFFFF 100%)" }}>
      <div className="relative w-full h-full flex items-center justify-center gap-4">
        {/* Phone with notifications inside */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-20 h-32 rounded-2xl bg-white border-2 border-zinc-200 shadow-md p-1.5 flex flex-col gap-1">
            {/* Notch */}
            <div className="w-6 h-1 bg-zinc-300 rounded-full mx-auto mb-1" />
            {/* Notification cards inside phone */}
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
          {/* "Your data" label */}
          <p className="text-[8px] text-center text-zinc-500 mt-1.5 font-medium">Your data</p>
        </motion.div>

        {/* Shield with lock */}
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
              <path
                d="M 30 5 L 10 12 L 10 35 Q 10 55, 30 65 Q 50 55, 50 35 L 50 12 Z"
                fill="url(#shield-grad-2)"
              />
              {/* Lock body */}
              <rect x="22" y="30" width="16" height="12" rx="2" fill="white" />
              <path d="M 25 30 L 25 25 Q 25 20, 30 20 Q 35 20, 35 25 L 35 30" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="30" cy="36" r="2" fill="#059669" />
            </svg>
          </div>
          <p className="text-[8px] text-emerald-600 mt-1 font-medium">Protected</p>
        </motion.div>

        {/* Cloud crossed out */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="w-14 h-12 relative">
            <svg viewBox="0 0 60 50" className="w-full h-full">
              {/* Cloud (gray, faded) */}
              <ellipse cx="30" cy="28" rx="22" ry="14" fill="#D1D5DB" opacity="0.5" />
              <ellipse cx="20" cy="22" rx="10" ry="8" fill="#D1D5DB" opacity="0.5" />
              <ellipse cx="40" cy="22" rx="10" ry="8" fill="#D1D5DB" opacity="0.5" />
              {/* Red strikethrough */}
              <line x1="8" y1="8" x2="52" y2="44" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-[8px] text-zinc-400 mt-1 font-medium">No cloud</p>
        </motion.div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-3 left-0 right-0 text-center">
        <p className="text-[9px] text-emerald-700 font-semibold">All processing happens on your device</p>
      </div>
    </div>
  );
}

/* ============================================
 * 3. INSTANT — notification arrives → appears in feed instantly
 * Shows: Notification bell → timeline → "0ms" → instant appearance
 * ========================================== */
export function InstantIllustration() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden p-4"
      style={{ background: "linear-gradient(135deg, #FFFBEF 0%, #FFFFFF 100%)" }}>
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-2">
        {/* Top: Incoming notification */}
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

        {/* Arrow down */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <svg width="16" height="20" viewBox="0 0 16 20">
            <motion.path
              d="M 8 0 L 8 14 M 4 10 L 8 14 L 12 10"
              stroke="#F59E0B"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
            />
          </svg>
        </motion.div>

        {/* Middle: 0ms badge */}
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

        {/* Arrow down */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <svg width="16" height="20" viewBox="0 0 16 20">
            <path d="M 8 0 L 8 14 M 4 10 L 8 14 L 12 10" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Bottom: Feed with notification appearing */}
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
          {/* Highlighted new notification (just appeared) */}
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
          {/* Older notifications */}
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
 * Shows: Search bar with typed query → filtered results below
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
        {/* Search bar */}
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

        {/* Results count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-[8px] text-zinc-400 px-1"
        >
          2 results found
        </motion.p>

        {/* Results list */}
        <div className="space-y-1">
          {allItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: item.match ? 1 : 0.3, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 border ${
                item.match
                  ? "bg-indigo-50 border-indigo-200 shadow-sm"
                  : "bg-white border-zinc-100"
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span className={`text-[9px] flex-1 ${item.match ? "font-medium text-zinc-700" : "text-zinc-400"}`}>
                {item.label}
              </span>
              {item.match && (
                <span className="text-[7px] bg-indigo-100 text-indigo-600 px-1 py-0.5 rounded font-bold">
                  MATCH
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================
 * 5. OFFLINE — phone with local storage, no cloud needed
 * Shows: Phone → encrypted local storage → history accessible → cloud crossed out
 * ========================================== */
export function OfflineIllustration() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden p-4"
      style={{ background: "linear-gradient(135deg, #F5F3FF 0%, #FFFFFF 100%)" }}>
      <div className="relative w-full h-full flex items-center justify-center gap-3">
        {/* Left: Phone with notifications */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
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

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <svg width="20" height="16" viewBox="0 0 20 16">
            <path d="M 0 8 L 16 8 M 12 4 L 16 8 L 12 12" stroke="#6D5EF8" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Center: Encrypted local storage (cylinder/database with lock) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring" }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <svg viewBox="0 0 50 60" className="w-12 h-14">
              <defs>
                <linearGradient id="db-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6D5EF8" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              {/* Database cylinder */}
              <ellipse cx="25" cy="10" rx="18" ry="6" fill="url(#db-grad)" />
              <path d="M 7 10 L 7 45 Q 7 51, 25 51 Q 43 51, 43 45 L 43 10" fill="url(#db-grad)" />
              <ellipse cx="25" cy="10" rx="18" ry="6" fill="#8B5CF6" opacity="0.3" />
              {/* Database layers */}
              <ellipse cx="25" cy="22" rx="18" ry="5" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
              <ellipse cx="25" cy="34" rx="18" ry="5" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
              {/* Lock icon on front */}
              <rect x="19" y="36" width="12" height="9" rx="1.5" fill="white" />
              <path d="M 21 36 L 21 33 Q 21 30, 25 30 Q 29 30, 29 33 L 29 36" fill="none" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="text-[7px] text-purple-600 mt-1 font-medium text-center leading-tight">
            Encrypted<br />Storage
          </p>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <svg width="20" height="16" viewBox="0 0 20 16">
            <path d="M 0 8 L 16 8 M 12 4 L 16 8 L 12 12" stroke="#6D5EF8" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Right: History accessible badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center"
        >
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

      {/* Bottom: "No internet needed" */}
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
