"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import AnatomyModel from "./AnatomyModel";
import { Flame, Activity, Zap, CheckCircle2, RotateCw, Eye } from "lucide-react";

interface ExerciseStage {
  id: string;
  title: string;
  category: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  anatomyMuscles: string[];
  defaultView: "front" | "back";
  stats: { engagement: number; rpe: string };
  exerciseCues: string[];
}

const STAGES: ExerciseStage[] = [
  {
    id: "pullup",
    title: "Weighted Vertical Pull",
    category: "Upper Back & Lats",
    primaryMuscles: ["Latissimus Dorsi", "Biceps Brachii"],
    secondaryMuscles: ["Rear Deltoids", "Lower Trapezius"],
    anatomyMuscles: ["lats", "biceps", "rear-delts", "traps"],
    defaultView: "back",
    stats: { engagement: 98, rpe: "8-9" },
    exerciseCues: ["Drive elbows down into ribs", "Pause 1 sec at peak contraction", "Control 3-sec eccentric lowering"],
  },
  {
    id: "incline-press",
    title: "Incline Power Press",
    category: "Upper Chest & Delts",
    primaryMuscles: ["Pectoralis Major", "Anterior Deltoids"],
    secondaryMuscles: ["Triceps Brachii"],
    anatomyMuscles: ["chest", "delts", "biceps", "abs"],
    defaultView: "front",
    stats: { engagement: 95, rpe: "8-10" },
    exerciseCues: ["Keep shoulder blades retracted", "Touch upper chest lightly", "Explode up without locking joints"],
  },
  {
    id: "deadlift",
    title: "Posterior Chain RDL",
    category: "Glutes & Hamstrings",
    primaryMuscles: ["Gluteus Maximus", "Hamstrings"],
    secondaryMuscles: ["Erector Spinae", "Trapezius"],
    anatomyMuscles: ["hamstrings", "glutes", "lower-back", "traps", "calves"],
    defaultView: "back",
    stats: { engagement: 99, rpe: "9-10" },
    exerciseCues: ["Push hips back toward wall", "Keep bar glued to shins", "Squeeze glutes hard at lockout"],
  },
  {
    id: "squat",
    title: "Compound Quad Squat",
    category: "Quads & Core",
    primaryMuscles: ["Quadriceps Femoris", "Core Abs"],
    secondaryMuscles: ["Gluteus Maximus", "Calves"],
    anatomyMuscles: ["quads", "abs", "calves"],
    defaultView: "front",
    stats: { engagement: 97, rpe: "8-9" },
    exerciseCues: ["Brace core with 360 breath", "Drive knees outward smoothly", "Push floor away through mid-foot"],
  },
];

export default function MuscleActivation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [manualView, setManualView] = useState<"front" | "back" | null>(null);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      let index = Math.floor(latest * STAGES.length);
      if (index >= STAGES.length) index = STAGES.length - 1;
      if (index < 0) index = 0;
      setCurrentStageIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const stage = STAGES[currentStageIndex];
  const activeView = manualView || stage.defaultView;

  return (
    <section
      id="muscle-activation"
      ref={containerRef}
      className="relative w-full bg-[#070707] text-white h-[320vh]"
    >
      {/* Sticky Pinned Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        
        {/* Clean Header */}
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 z-20">
          <div>
            <span className="text-xs font-mono text-orange-400 font-semibold uppercase tracking-widest block mb-1">
              REAL-TIME ANATOMICAL ENGAGEMENT
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
              MUSCLE ACTIVATION <span className="text-orange-500">//</span> ENGINE
            </h2>
          </div>

          {/* View Toggle Tabs */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setManualView("front")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono tracking-wider transition-all flex items-center gap-1.5 ${
                activeView === "front"
                  ? "bg-orange-500 text-black shadow-lg shadow-orange-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              FRONT VIEW
            </button>
            <button
              onClick={() => setManualView("back")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono tracking-wider transition-all flex items-center gap-1.5 ${
                activeView === "back"
                  ? "bg-orange-500 text-black shadow-lg shadow-orange-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              BACK VIEW
            </button>
          </div>
        </div>

        {/* Main Pinned Split Grid */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
          
          {/* Left Column: Interactive Anatomy Model */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center h-[320px] sm:h-[400px] lg:h-[460px]">
            <AnatomyModel view={activeView} activeMuscles={stage.anatomyMuscles} />

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[11px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              VIEW: <span className="text-orange-400 font-bold">{activeView}</span>
            </div>
          </div>

          {/* Right Column: Scroll-Driven Exercise Data Card */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden"
              >
                {/* Stage Counter Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-widest">
                    PHASE {currentStageIndex + 1} OF {STAGES.length}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    TARGET RPE: <strong className="text-white">{stage.stats.rpe}</strong>
                  </span>
                </div>

                {/* Exercise Title & Category */}
                <h3 className="text-3xl font-extrabold uppercase text-white tracking-tight">
                  {stage.title}
                </h3>
                <p className="text-xs font-mono text-orange-400 mt-1 uppercase tracking-wider font-semibold">
                  {stage.category}
                </p>

                {/* Muscle Activation Tags */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider block mb-2">
                      PRIMARY TARGETS
                    </span>
                    <ul className="space-y-1 text-xs text-zinc-200 font-medium">
                      {stage.primaryMuscles.map((m, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block mb-2">
                      SECONDARY SYNERGISTS
                    </span>
                    <ul className="space-y-1 text-xs text-zinc-400 font-medium">
                      {stage.secondaryMuscles.map((m, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Key Execution Cues */}
                <div className="mt-6">
                  <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block mb-2">
                    COACHING CUES
                  </span>
                  <div className="space-y-1.5">
                    {stage.exerciseCues.map((cue, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                        <span>{cue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engagement Meter */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                    <span>ENGAGEMENT EFFICIENCY</span>
                    <span className="text-orange-400 font-bold">{stage.stats.engagement}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stage.stats.engagement}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4 pt-4 border-t border-white/10 z-20">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:block">
            SCROLL TO PROGRESS ANATOMY
          </span>
          
          <div className="flex items-center gap-3 mx-auto sm:mx-0">
            {STAGES.map((s, idx) => (
              <div
                key={s.id}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentStageIndex
                    ? "w-10 bg-orange-500 shadow-md shadow-orange-500/80"
                    : "w-3 bg-zinc-700"
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">
            PHASE {currentStageIndex + 1} / {STAGES.length}
          </span>
        </div>
      </div>
    </section>
  );
}
