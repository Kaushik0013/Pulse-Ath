"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Check, Utensils } from "lucide-react";

interface MealPlanTier {
  id: string;
  title: string;
  shortStat: string;
  price: string;
  period: string;
  bestFor: string;
  popular?: boolean;
  image: string;
  imageAlt: string;
  macros: { carbs: number; protein: number; fats: number };
  sampleStructure: string[];
  features: string[];
}

const MEAL_PLANS: MealPlanTier[] = [
  {
    id: "basic",
    title: "Foundation Fuel",
    shortStat: "2,200 kcal / day — 40C : 35P : 25F",
    price: "$29",
    period: "/ mo",
    bestFor: "Clean baseline eating & habit building",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Clean Meal Prep Bowl",
    macros: { carbs: 40, protein: 35, fats: 25 },
    sampleStructure: [
      "Meal 1: Oats, Whey & Berries",
      "Meal 2: Chicken Breast, Rice & Broccoli",
      "Meal 3: Salmon, Sweet Potato & Asparagus",
      "Snack: Greek Yogurt & Almonds",
    ],
    features: [
      "Custom Calorie Baseline Calculator",
      "3-Meal + 1 Snack Daily Structure",
      "Weekly Grocery Shopping List",
      "Basic Supplement Protocol Guide",
    ],
  },
  {
    id: "medium",
    title: "Performance Recomp",
    shortStat: "2,700 kcal / day — 35C : 45P : 20F",
    price: "$59",
    period: "/ mo",
    bestFor: "Targeted fat loss while maintaining muscle strength",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Steak and Quinoa Healthy Meal",
    macros: { carbs: 35, protein: 45, fats: 20 },
    sampleStructure: [
      "Meal 1: Egg Whites, Whole Eggs & Avocados",
      "Meal 2: Turkey Breast & Sweet Potato",
      "Post-Workout: Isolate Whey & Banana",
      "Meal 4: Sirloin Steak, Quinoa & Spinach",
    ],
    features: [
      "Carb-Cycling & Refeed Day Protocol",
      "5-Meal Precision Timing Schedule",
      "Restaurant & Travel Cheat Sheet",
      "Bi-Weekly Progress Review Check-ins",
    ],
  },
  {
    id: "advanced",
    title: "Elite Anabolic Peak",
    shortStat: "3,400 kcal / day — 45C : 40P : 15F",
    price: "$89",
    period: "/ mo",
    popular: true,
    bestFor: "Maximal hypertrophy & anabolic muscle timing",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Pro Anabolic Salmon and Rice Prep",
    macros: { carbs: 45, protein: 40, fats: 15 },
    sampleStructure: [
      "Pre-Workout: Cream of Rice, Whey & Salt",
      "Intra-Workout: Cluster Dextrin + EAAs",
      "Post-Workout: White Rice, Lean Beef & Pineapple",
      "Meal 4: Turkey Breast, Jasmine Rice & Greens",
      "Bedtime: Casein, Peanut Butter & Berries",
    ],
    features: [
      "Nutrient Timing & Intra-Workout Protocol",
      "Custom Macro Adjustments Every 7 Days",
      "Competition & Refeed Peak Weeks",
      "1-on-1 WhatsApp Macro Coach Support",
    ],
  },
];

export default function MealPlans() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="meal-plans" className="relative py-32 bg-[#070707] text-white overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-mono text-orange-400 font-semibold uppercase tracking-widest block">
            MACRO ARCHITECTURE
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            NUTRITION <span className="text-orange-500">//</span> MEAL PLANS
          </h2>
        </div>

        {/* Horizontal Row Layout (Clean 1-Line Collapsed State) */}
        <div className="space-y-4">
          {MEAL_PLANS.map((plan, index) => {
            const isExpanded = expandedId === plan.id;
            const isImageLeft = index % 2 === 0;

            return (
              <div
                key={plan.id}
                className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? "border-orange-500 shadow-2xl shadow-orange-500/20 bg-[#121218]"
                    : "border-white/10 hover:border-orange-500/40 hover:bg-white/[0.02]"
                }`}
              >
                {/* Collapsed Row Bar — Ultra Clean Single Line */}
                <div
                  onClick={() => toggleRow(plan.id)}
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
                        src={plan.image}
                        alt={plan.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Title + 1-Line Short Stat */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                      <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-white tracking-tight group-hover:text-orange-400 transition-colors">
                        {plan.title}
                      </h3>
                      <span className="text-xs font-mono text-zinc-400">
                        — {plan.shortStat}
                      </span>
                    </div>
                  </div>

                  {/* Price & Expand Icon */}
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                    <span className="text-xl font-extrabold font-mono text-white">
                      {plan.price} <span className="text-xs text-zinc-500">{plan.period}</span>
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
                        
                        {/* Macro Chart & Target */}
                        <div className="lg:col-span-5 space-y-4">
                          <p className="text-xs text-zinc-300 font-light">
                            <strong className="text-orange-400 font-mono">TARGET:</strong> {plan.bestFor}
                          </p>

                          <div className="space-y-2">
                            <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider block">
                              MACRO SPLIT %
                            </span>
                            <div className="w-full h-3 rounded-full bg-white/10 flex overflow-hidden">
                              <div style={{ width: `${plan.macros.carbs}%` }} className="bg-orange-500 h-full" />
                              <div style={{ width: `${plan.macros.protein}%` }} className="bg-red-500 h-full" />
                              <div style={{ width: `${plan.macros.fats}%` }} className="bg-amber-400 h-full" />
                            </div>

                            <div className="flex justify-between text-xs font-mono text-zinc-300">
                              <span>Carbs: <strong className="text-white">{plan.macros.carbs}%</strong></span>
                              <span>Protein: <strong className="text-white">{plan.macros.protein}%</strong></span>
                              <span>Fats: <strong className="text-white">{plan.macros.fats}%</strong></span>
                            </div>
                          </div>

                          <div className="pt-2 space-y-1.5">
                            <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block">
                              SAMPLE DAILY SCHEDULE
                            </span>
                            {plan.sampleStructure.map((meal, i) => (
                              <div key={i} className="text-xs font-mono text-zinc-300 bg-white/5 px-3 py-1.5 rounded-lg">
                                {meal}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Features & CTA */}
                        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between h-full">
                          <div className="space-y-2">
                            <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block">
                              PROTOCOL INCLUSIONS
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                              {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <Check className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4">
                            <a
                              href="#lead-capture"
                              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/30"
                            >
                              <span>SELECT {plan.title.toUpperCase()} PROTOCOL</span>
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
