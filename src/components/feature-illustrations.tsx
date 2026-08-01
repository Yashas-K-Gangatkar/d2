"use client";

import { motion } from "framer-motion";

/* ============================================
 * BESPOKE FEATURE ILLUSTRATIONS
 * ==========================================
 * Custom SVG illustrations for each NotiFetch feature.
 * Vector-based with subtle gradients, soft lighting, minimal detail.
 * Each illustration communicates the feature without requiring text.
 */

// === Shared gradient defs ===
function GradientDefs({ id, from, to }: { id: string; from: string; to: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={from} stopOpacity="1" />
        <stop offset="100%" stopColor={to} stopOpacity="1" />
      </linearGradient>
      <linearGradient id={`${id}-glow`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={from} stopOpacity="0.3" />
        <stop offset="100%" stopColor={from} stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

/* ============================================
 * 1. UNIFIED FEED — notifications flowing into one timeline
 * ========================================== */
export function UnifiedFeedIllustration() {
  const notifications = [
    { icon: "🍔", color: "#FB923C", delay: 0 },
    { icon: "🛒", color: "#4ADE80", delay: 0.3 },
    { icon: "📦", color: "#60A5FA", delay: 0.6 },
    { icon: "💊", color: "#F472B6", delay: 0.9 },
  ];

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F7F5FF 0%, #FFFFFF 50%, #F0EDFF 100%)" }}>
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-3xl" style={{ background: "#A78BFA", opacity: 0.15 }} />

      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <GradientDefs id="feed" from="#6D5EF8" to="#8B5CF6" />

        {/* Source notifications (top) */}
        {notifications.map((n, i) => {
          const startX = 60 + i * 90;
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: n.delay, duration: 0.6 }}
            >
              {/* Notification card */}
              <rect x={startX - 25} y={40} width={50} height={36} rx={8} fill="white" stroke={n.color} strokeWidth="1.5" opacity="0.95" />
              <circle cx={startX - 12} cy={58} r={6} fill={n.color} opacity="0.2" />
              <rect x={startX - 2} y={54} width={20} height={3} rx={1.5} fill={n.color} opacity="0.6" />
              <rect x={startX - 2} y={61} width={14} height={2.5} rx={1} fill="#CBD5E1" />
            </motion.g>
          );
        })}

        {/* Flowing lines converging to center */}
        {notifications.map((n, i) => {
          const startX = 60 + i * 90;
          return (
            <motion.path
              key={`line-${i}`}
              d={`M ${startX} 76 Q ${startX} 120, 200 150`}
              stroke="url(#feed-grad)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
            />
          );
        })}

        {/* Central unified timeline */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <rect x={140} y={140} width={120} height={50} rx={12} fill="white" stroke="url(#feed-grad)" strokeWidth="2" />
          {/* Mini notification rows inside */}
          {notifications.map((n, i) => (
            <g key={i}>
              <circle cx={152 + i * 22} cy={158} r={4} fill={n.color} opacity="0.8" />
              <rect x={148 + i * 22} y={166} width={14} height={2} rx={1} fill="#E2E8F0" />
            </g>
          ))}
          {/* Glow under card */}
          <rect x={130} y={185} width={140} height={8} rx={4} fill="url(#feed-glow)" />
        </motion.g>

        {/* Timeline dots flowing down */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={200}
            cy={210 + i * 25}
            r={3}
            fill="#6D5EF8"
            opacity={0.3 - i * 0.08}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 - i * 0.08 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 + i * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ============================================
 * 2. PRIVACY — phone chip + shield, data stays in device
 * ========================================== */
export function PrivacyIllustration() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F3FFF8 0%, #FFFFFF 50%, #ECFDF5 100%)" }}>
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl" style={{ background: "#34D399", opacity: 0.12 }} />

      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="shield-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="1" />
            <stop offset="100%" stopColor="#059669" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="phone-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0E7FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C7D2FE" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Phone outline */}
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <rect x={140} y={70} width={120} height={180} rx={20} fill="url(#phone-grad)" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Notch */}
          <rect x={185} y={78} width={30} height={5} rx={2.5} fill="#94A3B8" opacity="0.4" />
        </motion.g>

        {/* Chip inside phone (represents on-device processing) */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <rect x={175} y={130} width={50} height={50} rx={8} fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
          {/* Chip pins */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={180 + i * 12} y={126} width={6} height={4} rx={1} fill="#CBD5E1" />
              <rect x={180 + i * 12} y={180} width={6} height={4} rx={1} fill="#CBD5E1" />
            </g>
          ))}
          {/* Chip center */}
          <rect x={188} y={143} width={24} height={24} rx={4} fill="url(#shield-grad)" opacity="0.15" />
        </motion.g>

        {/* Shield overlay */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        >
          <path
            d="M 200 100 L 175 110 L 175 135 Q 175 155, 200 165 Q 225 155, 225 135 L 225 110 Z"
            fill="url(#shield-grad)"
            opacity="0.9"
          />
          {/* Lock inside shield */}
          <rect x={193} y={125} width={14} height={10} rx={2} fill="white" />
          <path d="M 196 125 L 196 121 Q 196 117, 200 117 Q 204 117, 204 121 L 204 125" fill="none" stroke="white" strokeWidth="1.5" />
        </motion.g>

        {/* "No cloud" indicator — cloud with strikethrough */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          {/* Cloud (faded, with X) */}
          <g opacity="0.3" transform="translate(70, 120)">
            <ellipse cx={20} cy={15} rx={18} ry={12} fill="#CBD5E1" />
            <line x1={5} y1={5} x2={35} y2={25} stroke="#EF4444" strokeWidth="2" />
          </g>
          <text x={75} y={155} textAnchor="middle" fontSize="9" fill="#94A3B8" opacity="0.5">no cloud</text>
        </motion.g>

        {/* Data stays indicator — small dots inside phone */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={160 + i * 30}
            cy={210}
            r={3}
            fill="#10B981"
            opacity={0.6}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 + i * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ============================================
 * 3. INSTANT — notification appearing with ripple + 0ms
 * ========================================== */
export function InstantIllustration() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FFFBEF 0%, #FFFFFF 50%, #FEF9C3 100%)" }}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl" style={{ background: "#FBBF24", opacity: 0.15 }} />

      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="instant-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="1" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Ripple rings */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`ripple-${i}`}
            cx={200}
            cy={150}
            r={20}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1.5"
            initial={{ r: 20, opacity: 0.6 }}
            whileInView={{ r: 80, opacity: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
          />
        ))}

        {/* Central notification card */}
        <motion.g
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
        >
          <rect x={160} y={120} width={80} height={60} rx={12} fill="white" stroke="url(#instant-grad)" strokeWidth="2" />
          {/* Bell icon */}
          <circle cx={200} cy={145} r={10} fill="#FEF3C7" />
          <path d="M 196 148 Q 196 142, 200 142 Q 204 142, 204 148 L 204 150 L 196 150 Z" fill="#F59E0B" />
          <circle cx={200} cy={151} r={1.5} fill="#F59E0B" />
          {/* Text lines */}
          <rect x={170} y={165} width={40} height={3} rx={1.5} fill="#FBBF24" opacity="0.6" />
          <rect x={170} y={171} width={28} height={2.5} rx={1} fill="#E5E7EB" />
        </motion.g>

        {/* Motion blur lines (left side — incoming) */}
        {[0, 1, 2, 3].map((i) => (
          <motion.rect
            key={`blur-${i}`}
            x={80 + i * 15}
            y={145 + (i % 2) * 8}
            width={20 - i * 3}
            height={3}
            rx={1.5}
            fill="#F59E0B"
            opacity={0.4 - i * 0.08}
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 80 + i * 15, opacity: 0.4 - i * 0.08 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.1 }}
          />
        ))}

        {/* 0ms indicator */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <rect x={175} y={200} width={50} height={20} rx={10} fill="url(#instant-grad)" />
          <text x={200} y={214} textAnchor="middle" fontSize="11" fontWeight="700" fill="white">0ms</text>
        </motion.g>

        {/* Tiny timeline (bottom) */}
        {[0, 1, 2, 3, 4].map((i) => (
          <circle
            key={`tl-${i}`}
            cx={120 + i * 40}
            cy={245}
            r={2}
            fill="#F59E0B"
            opacity={i === 2 ? 1 : 0.3}
          />
        ))}
      </svg>
    </div>
  );
}

/* ============================================
 * 4. SEARCH — magnifying glass over notification history
 * ========================================== */
export function SearchIllustration() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F0F4FF 0%, #FFFFFF 50%, #E0E7FF 100%)" }}>
      {/* Ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full blur-3xl" style={{ background: "#818CF8", opacity: 0.15 }} />

      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="search-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D5EF8" stopOpacity="1" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Background notification cards (stacked, slightly faded) */}
        {[0, 1, 2, 3].map((i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 0.4 - i * 0.05, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <rect x={60} y={60 + i * 40} width={200} height={32} rx={8} fill="white" stroke="#E2E8F0" strokeWidth="1" />
            <circle cx={75} cy={76 + i * 40} r={6} fill="#CBD5E1" />
            <rect x={88} y={71 + i * 40} width={60} height={4} rx={2} fill="#CBD5E1" />
            <rect x={88} y={79 + i * 40} width={40} height={3} rx={1.5} fill="#E2E8F0" />
          </motion.g>
        ))}

        {/* Search input bar (foreground) */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <rect x={100} y={210} width={200} height={40} rx={20} fill="white" stroke="url(#search-grad)" strokeWidth="2" />
          {/* Magnifying glass */}
          <circle cx={125} cy={230} r={8} fill="none" stroke="url(#search-grad)" strokeWidth="2.5" />
          <line x1={131} y1={236} x2={137} y2={242} stroke="url(#search-grad)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Placeholder text */}
          <rect x={145} y={227} width={100} height={4} rx={2} fill="#E2E8F0" />
          <rect x={145} y={234} width={60} height={3} rx={1.5} fill="#F1F5F9" />
        </motion.g>

        {/* Highlighted result (one card lights up) */}
        <motion.rect
          x={60}
          y={100}
          width={200}
          height={32}
          rx={8}
          fill="none"
          stroke="url(#search-grad)"
          strokeWidth="2.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.4 }}
        />

        {/* Connection line from search to highlighted result */}
        <motion.path
          d="M 200 210 Q 200 180, 160 132"
          stroke="url(#search-grad)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          fill="none"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 0.5 }}
        />
      </svg>
    </div>
  );
}

/* ============================================
 * 5. OFFLINE — phone with signal-off indicator
 * ========================================== */
export function OfflineIllustration() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F5F3FF 0%, #FFFFFF 50%, #EDE9FE 100%)" }}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl" style={{ background: "#A78BFA", opacity: 0.15 }} />

      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="offline-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D5EF8" stopOpacity="1" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Phone */}
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <rect x={150} y={60} width={100} height={180} rx={16} fill="white" stroke="#CBD5E1" strokeWidth="1.5" />
          <rect x={185} y={68} width={30} height={4} rx={2} fill="#CBD5E1" opacity="0.5" />

          {/* Notification cards inside phone (visible but offline) */}
          {[0, 1, 2].map((i) => (
            <motion.g key={i}>
              <rect x={162} y={90 + i * 35} width={76} height={28} rx={6} fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
              <circle cx={173} cy={104 + i * 35} r={5} fill="#CBD5E1" />
              <rect x={183} y={100 + i * 35} width={30} height={3} rx={1.5} fill="#CBD5E1" />
              <rect x={183} y={107 + i * 35} width={20} height={2.5} rx="1" fill="#E2E8F0" />
            </motion.g>
          ))}
        </motion.g>

        {/* Wi-Fi off indicator */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <circle cx={320} cy={80} r={24} fill="white" stroke="#EF4444" strokeWidth="2" />
          {/* Wi-Fi arcs (faded) */}
          <path d="M 310 85 Q 320 75, 330 85" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M 313 88 Q 320 82, 327 88" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Strikethrough */}
          <line x1={304} y1={64} x2={336} y2={96} stroke="#EF4444" strokeWidth="2" />
        </motion.g>

        {/* "Available" badge */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <rect x={165} y={215} width={70} height={18} rx={9} fill="url(#offline-grad)" />
          <text x={200} y={227} textAnchor="middle" fontSize="9" fontWeight="600" fill="white">Available</text>
        </motion.g>

        {/* Local storage indicator (small database icon) */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <ellipse cx={80} cy={140} rx={16} ry={6} fill="none" stroke="url(#offline-grad)" strokeWidth="1.5" />
          <path d="M 64 140 L 64 160 Q 64 166, 80 166 Q 96 166, 96 160 L 96 140" fill="none" stroke="url(#offline-grad)" strokeWidth="1.5" />
          <ellipse cx={80} cy={150} rx={16} ry={6} fill="none" stroke="url(#offline-grad)" strokeWidth="1" opacity="0.5" />
        </motion.g>

        {/* Sync arrows (showing data flows locally) */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        >
          <path d="M 100 150 Q 120 150, 140 150" fill="none" stroke="url(#offline-grad)" strokeWidth="1.5" strokeDasharray="2 3" />
        </motion.g>
      </svg>
    </div>
  );
}
