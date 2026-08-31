"use client";

import { motion } from "framer-motion";

interface AnatomyModelProps {
  view: "front" | "back";
  activeMuscles: string[];
}

export default function AnatomyModel({ view, activeMuscles }: AnatomyModelProps) {
  // Helper function to determine if muscle is highlighted
  const isHighlighted = (id: string) => activeMuscles.includes(id);

  // SVG path styling helper
  const getMuscleStyle = (id: string) => {
    const active = isHighlighted(id);
    return {
      fill: active ? "url(#orangeGlow)" : "#222228",
      stroke: active ? "#ff6b35" : "#3f3f46",
      strokeWidth: active ? 2 : 1,
      filter: active ? "url(#glowFilter)" : "none",
      transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    };
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Background SVG Glow Orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 sm:w-80 sm:h-80 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <svg
        viewBox="0 0 300 500"
        className="w-full h-full max-h-[480px] object-contain drop-shadow-2xl z-10"
        aria-label={`Human Anatomy Silhouette - ${view} view`}
      >
        <defs>
          {/* Active Gradient for Muscle Highlight */}
          <linearGradient id="orangeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff5500" />
            <stop offset="50%" stopColor="#ff3b00" />
            <stop offset="100%" stopColor="#e53e3e" />
          </linearGradient>

          {/* SVG Glow Filter */}
          <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Head & Neck Base Neutral */}
          <radialGradient id="baseBody" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2e2e34" />
            <stop offset="100%" stopColor="#18181b" />
          </radialGradient>
        </defs>

        {/* --- HEAD & NECK SILHOUETTE --- */}
        <g id="head-neck">
          {/* Head Oval */}
          <ellipse cx="150" cy="45" rx="22" ry="28" fill="url(#baseBody)" stroke="#3f3f46" strokeWidth="1" />
          {/* Neck */}
          <path d="M138 70 Q 150 75 162 70 L 166 90 Q 150 94 134 90 Z" fill="url(#baseBody)" stroke="#3f3f46" strokeWidth="1" />
        </g>

        {view === "front" ? (
          /* ================= FRONT VIEW MUSCLES ================= */
          <g id="front-view">
            {/* Traps (Front upper shoulders) */}
            <path
              id="traps"
              d="M134 85 Q 150 78 166 85 L 180 98 Q 150 94 120 98 Z"
              style={getMuscleStyle("traps")}
            />

            {/* Anterior Delts (Shoulders) */}
            <path
              id="delts-left"
              d="M118 98 Q 100 105 95 125 Q 110 135 122 120 Z"
              style={getMuscleStyle("delts")}
            />
            <path
              id="delts-right"
              d="M182 98 Q 200 105 205 125 Q 190 135 178 120 Z"
              style={getMuscleStyle("delts")}
            />

            {/* Chest (Pectoralis Major) */}
            <path
              id="chest-left"
              d="M124 100 Q 148 102 148 132 Q 124 136 116 118 Z"
              style={getMuscleStyle("chest")}
            />
            <path
              id="chest-right"
              d="M176 100 Q 152 102 152 132 Q 176 136 184 118 Z"
              style={getMuscleStyle("chest")}
            />

            {/* Biceps */}
            <path
              id="biceps-left"
              d="M95 126 Q 88 145 92 165 Q 104 165 110 140 Z"
              style={getMuscleStyle("biceps")}
            />
            <path
              id="biceps-right"
              d="M205 126 Q 212 145 208 165 Q 196 165 190 140 Z"
              style={getMuscleStyle("biceps")}
            />

            {/* Forearms (Front) */}
            <path
              id="forearms-left"
              d="M90 168 Q 80 195 86 215 Q 96 212 100 185 Z"
              style={getMuscleStyle("forearms")}
            />
            <path
              id="forearms-right"
              d="M210 168 Q 220 195 214 215 Q 204 212 200 185 Z"
              style={getMuscleStyle("forearms")}
            />

            {/* Abs (Rectus Abdominis / Core) */}
            <g id="abs-group">
              {/* Upper Abs */}
              <path
                d="M126 140 Q 150 138 174 140 L 172 160 Q 150 162 128 160 Z"
                style={getMuscleStyle("abs")}
              />
              {/* Mid Abs */}
              <path
                d="M128 164 Q 150 166 172 164 L 170 186 Q 150 188 130 186 Z"
                style={getMuscleStyle("abs")}
              />
              {/* Lower Abs / Obliques */}
              <path
                d="M130 190 Q 150 192 170 190 L 165 220 Q 150 226 135 220 Z"
                style={getMuscleStyle("abs")}
              />
            </g>

            {/* Quads (Quadriceps) */}
            <g id="quads-group">
              <path
                id="quads-left"
                d="M120 230 Q 110 280 125 340 Q 142 335 145 270 Z"
                style={getMuscleStyle("quads")}
              />
              <path
                id="quads-right"
                d="M180 230 Q 190 280 175 340 Q 158 335 155 270 Z"
                style={getMuscleStyle("quads")}
              />
            </g>

            {/* Calves (Front Tibialis / Gastrocnemius side) */}
            <g id="calves-front-group">
              <path
                id="calves-left"
                d="M122 355 Q 112 400 124 450 Q 134 445 136 390 Z"
                style={getMuscleStyle("calves")}
              />
              <path
                id="calves-right"
                d="M178 355 Q 188 400 176 450 Q 166 445 164 390 Z"
                style={getMuscleStyle("calves")}
              />
            </g>
          </g>
        ) : (
          /* ================= BACK VIEW MUSCLES ================= */
          <g id="back-view">
            {/* Traps (Trapezius upper back diamond) */}
            <path
              id="traps-back"
              d="M150 76 L 180 98 L 150 135 L 120 98 Z"
              style={getMuscleStyle("traps")}
            />

            {/* Rear Delts */}
            <path
              id="rear-delts-left"
              d="M118 98 Q 98 106 94 125 Q 110 132 120 120 Z"
              style={getMuscleStyle("rear-delts")}
            />
            <path
              id="rear-delts-right"
              d="M182 98 Q 202 106 206 125 Q 190 132 180 120 Z"
              style={getMuscleStyle("rear-delts")}
            />

            {/* Triceps */}
            <path
              id="triceps-left"
              d="M93 126 Q 86 148 94 168 Q 106 162 110 138 Z"
              style={getMuscleStyle("triceps")}
            />
            <path
              id="triceps-right"
              d="M207 126 Q 214 148 206 168 Q 194 162 190 138 Z"
              style={getMuscleStyle("triceps")}
            />

            {/* Lats (Latissimus Dorsi) */}
            <path
              id="lats-left"
              d="M120 130 Q 102 155 125 195 Q 148 190 148 145 Z"
              style={getMuscleStyle("lats")}
            />
            <path
              id="lats-right"
              d="M180 130 Q 198 155 175 195 Q 152 190 152 145 Z"
              style={getMuscleStyle("lats")}
            />

            {/* Erector Spinae (Lower Back) */}
            <path
              id="lower-back"
              d="M140 195 Q 150 192 160 195 L 158 225 Q 150 228 142 225 Z"
              style={getMuscleStyle("lower-back")}
            />

            {/* Glutes (Gluteus Maximus) */}
            <g id="glutes-group">
              <path
                id="glute-left"
                d="M116 228 Q 110 260 148 268 Q 150 240 142 228 Z"
                style={getMuscleStyle("glutes")}
              />
              <path
                id="glute-right"
                d="M184 228 Q 190 260 152 268 Q 150 240 158 228 Z"
                style={getMuscleStyle("glutes")}
              />
            </g>

            {/* Hamstrings */}
            <g id="hamstrings-group">
              <path
                id="hamstring-left"
                d="M120 272 Q 112 315 126 345 Q 144 340 146 272 Z"
                style={getMuscleStyle("hamstrings")}
              />
              <path
                id="hamstring-right"
                d="M180 272 Q 188 315 174 345 Q 156 340 154 272 Z"
                style={getMuscleStyle("hamstrings")}
              />
            </g>

            {/* Calves (Gastrocnemius Back) */}
            <g id="calves-back-group">
              <path
                id="calves-back-left"
                d="M122 355 Q 106 395 124 450 Q 138 440 138 385 Z"
                style={getMuscleStyle("calves")}
              />
              <path
                id="calves-back-right"
                d="M178 355 Q 194 395 176 450 Q 162 440 162 385 Z"
                style={getMuscleStyle("calves")}
              />
            </g>
          </g>
        )}

        {/* Outline contour accent */}
        <path
          d="M150 20 L150 480"
          stroke="rgba(255,255,255,0.04)"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
