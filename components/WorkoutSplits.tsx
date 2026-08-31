"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Dumbbell } from "lucide-react";

interface SplitProgram {
  id: string;
  name: string;
  shortStat: string;
  level: string;
  daysPerWeek: string;
  sessionDuration: string;
  intensity: string;
  popular?: boolean;
  tagline: string;
  image: string;
  imageAlt: string;
  weeklySchedule: { day: string; title: string; type: string }[];
  detailedRoutines: {
    dayName: string;
    focus: string;
    exercises: { name: string; sets: string; reps: string; rpe: string }[];
  }[];
}

const SPLIT_PROGRAMS: SplitProgram[] = [
  {
    id: "full-body",
    name: "Full Body 3X Foundation",
    shortStat: "3 Days / Wk — 45-60 Mins",
    level: "Basic / Beginner",
    daysPerWeek: "3 Days / Week",
    sessionDuration: "45-60 Mins",
    intensity: "Moderate",
    tagline: "Compound movement baseline & rapid strength progression.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Barbell Squat Athlete",
    weeklySchedule: [
      { day: "Mon", title: "Full Body Heavy Compounds", type: "Workout A" },
      { day: "Wed", title: "Full Body Hypertrophy", type: "Workout B" },
      { day: "Fri", title: "Full Body Power & Core", type: "Workout C" },
    ],
    detailedRoutines: [
      {
        dayName: "Workout A (Heavy Compounds)",
        focus: "Strength Foundation",
        exercises: [
          { name: "Barbell Back Squat", sets: "4", reps: "5", rpe: "8" },
          { name: "Flat Barbell Bench Press", sets: "4", reps: "6", rpe: "8" },
          { name: "Barbell Bent-Over Row", sets: "3", reps: "8", rpe: "7-8" },
          { name: "Standing Overhead Press", sets: "3", reps: "8", rpe: "8" },
        ],
      },
    ],
  },
  {
    id: "ppl",
    name: "PPL Hypertrophy 6X",
    shortStat: "6 Days / Wk — 60-75 Mins",
    level: "Medium / Intermediate",
    daysPerWeek: "6 Days / Week",
    sessionDuration: "60-75 Mins",
    intensity: "High Intensity",
    popular: true,
    tagline: "Aesthetic muscle balance & volume distribution split.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Heavy Dumbbell Training",
    weeklySchedule: [
      { day: "Mon", title: "Push (Chest, Delts, Tri)", type: "Push A" },
      { day: "Tue", title: "Pull (Lats, Back, Bi)", type: "Pull A" },
      { day: "Wed", title: "Legs (Quads, Calves, Core)", type: "Legs A" },
      { day: "Thu", title: "Push (Upper Chest)", type: "Push B" },
      { day: "Fri", title: "Pull (Back Thickness)", type: "Pull B" },
      { day: "Sat", title: "Legs (Hamstrings & Glutes)", type: "Legs B" },
    ],
    detailedRoutines: [
      {
        dayName: "Push A (Chest / Delts / Triceps)",
        focus: "Hypertrophy & Pump",
        exercises: [
          { name: "Incline Dumbbell Press", sets: "4", reps: "8-10", rpe: "8-9" },
          { name: "Cable Chest Flyes", sets: "3", reps: "12-15", rpe: "9" },
          { name: "Dumbbell Shoulder Press", sets: "4", reps: "10-12", rpe: "8" },
          { name: "Cable Lateral Raises", sets: "4", reps: "15-20", rpe: "9-10" },
        ],
      },
    ],
  },
  {
    id: "pro-split",
    name: "Elite Wave Periodization",
    shortStat: "6 Days / Wk — 75-90 Mins",
    level: "Advanced / Athlete",
    daysPerWeek: "6 Days / Week",
    sessionDuration: "75-90 Mins",
    intensity: "Maximum Effort",
    tagline: "High-volume, RPE periodization for plateau breaking.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Heavy Barbell Deadlift",
    weeklySchedule: [
      { day: "Mon", title: "Heavy Upper Power Wave", type: "Power" },
      { day: "Tue", title: "Heavy Lower Power Wave", type: "Power" },
      { day: "Wed", title: "Shoulders & Arm Hypertrophy", type: "Specialization" },
      { day: "Thu", title: "Chest & Back Density", type: "Hypertrophy" },
      { day: "Fri", title: "Quad & Posterior Chain Mass", type: "Hypertrophy" },
    ],
    detailedRoutines: [
      {
        dayName: "Upper Power Wave",
        focus: "Heavy Mechanical Tension",
        exercises: [
          { name: "Pause Bench Press", sets: "5", reps: "3", rpe: "9" },
          { name: "Weighted Chest Dips", sets: "4", reps: "6", rpe: "8-9" },
          { name: "Heavy Pendlay Rows", sets: "4", reps: "5", rpe: "8" },
        ],
      },
    ],
  },
];

export default function WorkoutSplits() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="workout-splits" className="relative py-32 bg-[#070707] text-white overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-mono text-orange-400 font-semibold uppercase tracking-widest block">
            PERIODIZED HYPERTROPHY
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            WORKOUT <span className="text-orange-500">//</span> SPLITS
          </h2>
        </div>

        {/* Horizontal Row Layout (Clean 1-Line Collapsed State) */}
        <div className="space-y-4">
          {SPLIT_PROGRAMS.map((program, index) => {
            const isExpanded = expandedId === program.id;
            const isImageLeft = index % 2 === 0;

            return (
              <div
                key={program.id}
                className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? "border-orange-500 shadow-2xl shadow-orange-500/20 bg-[#121218]"
                    : "border-white/10 hover:border-orange-500/40 hover:bg-white/[0.02]"
                }`}
              >
                {/* Collapsed Row Bar — Ultra Clean Single Line */}
                <div
                  onClick={() => toggleRow(program.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 group select-none"
                >
                  <div
                    className={`flex items-center gap-5 w-full sm:w-auto ${
                      isImageLeft ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    {/* Small Square Thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 group-hover:border-orange-500/50 transition-colors">
                      <img
                        src={program.image}
                        alt={program.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Title + 1-Line Short Stat */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                      <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-white tracking-tight group-hover:text-orange-400 transition-colors">
                        {program.name}
                      </h3>
                      <span className="text-xs font-mono text-zinc-400">
                        — {program.shortStat}
                      </span>
                    </div>
                  </div>

                  {/* Intensity & Expand Icon */}
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                    <span className="text-xs font-mono font-bold text-orange-400 uppercase">
                      {program.intensity}
                    </span>

                    <div
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                        isExpanded
                          ? "bg-orange-500 border-orange-500 text-black shadow-lg shadow-orange-500/40"
                          : "bg-white/5 border-white/15 text-zinc-300 group-hover:border-orange-500 group-hover:text-orange-400"
                      }`}
                    >
                      {isExpanded ? (
                        <Minus className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-5 h-5 stroke-[2.5]" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded State Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/10 bg-black/40 p-6 sm:p-8"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Weekly Schedule */}
                        <div className="lg:col-span-5 space-y-3">
                          <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider block">
                            WEEKLY CYCLE
                          </span>
                          <div className="space-y-1.5">
                            {program.weeklySchedule.map((s, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/5"
                              >
                                <span className="font-mono font-bold text-orange-400 w-10">{s.day}</span>
                                <span className="text-zinc-200 truncate flex-1 text-center font-medium px-2">
                                  {s.title}
                                </span>
                                <span className="text-[10px] font-mono text-zinc-400 bg-black/40 px-2 py-0.5 rounded">
                                  {s.type}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Exercise Table & CTA */}
                        <div className="lg:col-span-7 space-y-4">
                          <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block">
                            EXERCISE SPECIFICATION
                          </span>

                          <div className="space-y-3">
                            {program.detailedRoutines.map((routine, rIdx) => (
                              <div key={rIdx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                                  <h4 className="text-xs font-bold uppercase text-white">{routine.dayName}</h4>
                                  <span className="text-[11px] font-mono text-orange-400">{routine.focus}</span>
                                </div>

                                <table className="w-full text-left text-xs font-mono">
                                  <thead>
                                    <tr className="text-zinc-500 border-b border-white/5">
                                      <th className="py-1">EXERCISE</th>
                                      <th className="py-1 text-center">SETS</th>
                                      <th className="py-1 text-center">REPS</th>
                                      <th className="py-1 text-right">RPE</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-white/5">
                                    {routine.exercises.map((ex, exIdx) => (
                                      <tr key={exIdx} className="text-zinc-300">
                                        <td className="py-2 font-sans font-medium text-white">{ex.name}</td>
                                        <td className="py-2 text-center text-orange-400 font-bold">{ex.sets}</td>
                                        <td className="py-2 text-center">{ex.reps}</td>
                                        <td className="py-2 text-right text-zinc-400">{ex.rpe}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2">
                            <a
                              href="#lead-capture"
                              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/30"
                            >
                              <span>START {program.name.toUpperCase()}</span>
                            </a>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
