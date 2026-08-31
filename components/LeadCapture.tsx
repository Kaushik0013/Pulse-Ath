"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Send, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export default function LeadCapture() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    goal: "Muscle Gain",
    plan: "Advanced Elite Peak",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ff3b00", "#ff6b35", "#ffffff", "#e53e3e"],
      });
    }, 800);
  };

  return (
    <section id="lead-capture" className="relative py-32 bg-[#070707] text-white overflow-hidden border-t border-white/5">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Centered Large Header — No Extra Paragraph Text */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
            START YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-red-600">
              TRANSFORMATION
            </span>
          </h2>
        </div>

        {/* Centered Lead Form */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl text-left">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name & Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Mercer"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                      EMAIL OR PHONE *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="alex@domain.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Goal & Plan Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                      PRIMARY FITNESS GOAL
                    </label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500 transition-all font-sans"
                    >
                      <option value="Muscle Gain">Muscle Gain & Hypertrophy</option>
                      <option value="Weight Loss">Fat Loss & Recomposition</option>
                      <option value="Strength">Peak Max Strength</option>
                      <option value="Athletic Performance">Athletic Mobility & Power</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                      PREFERRED PLAN TIER
                    </label>
                    <select
                      value={formData.plan}
                      onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500 transition-all font-sans"
                    >
                      <option value="Advanced Elite Peak">Advanced Elite Peak ($89/mo)</option>
                      <option value="Performance Recomp">Performance Recomp ($59/mo)</option>
                      <option value="Foundation Fuel">Foundation Fuel ($29/mo)</option>
                    </select>
                  </div>
                </div>

                {/* Optional Message */}
                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                    CURRENT ROUTINE / NOTES (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Current lifts or specific targets..."
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 transition-all font-sans"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-orange-400 to-red-600 hover:from-orange-400 hover:to-red-500 text-black font-extrabold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 fill-black" />
                      <span>START YOUR TRANSFORMATION</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-mono text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                  <span>100% Encrypted & Private Assessment.</span>
                </div>
              </motion.form>
            ) : (
              /* Success State */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 p-1 mx-auto shadow-2xl shadow-orange-500/40">
                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-orange-500" />
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold uppercase text-white tracking-tight">
                  ASSESSMENT SUBMITTED!
                </h3>

                <p className="text-zinc-300 text-sm max-w-md mx-auto font-light">
                  Welcome, <strong className="text-orange-400">{formData.name}</strong>! Your <strong className="text-white">{formData.goal}</strong> protocol is being prepared.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                >
                  <span>SUBMIT ANOTHER</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
