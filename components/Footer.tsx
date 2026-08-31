"use client";

import { Share2, Globe, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white border-t border-white/10 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Navigation Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-medium">
              <li>
                <a href="#muscle-activation" className="hover:text-orange-400 transition-colors">
                  Anatomy Engine
                </a>
              </li>
              <li>
                <a href="#meal-plans" className="hover:text-orange-400 transition-colors">
                  Macro Meal Plans
                </a>
              </li>
              <li>
                <a href="#workout-splits" className="hover:text-orange-400 transition-colors">
                  Workout Splits
                </a>
              </li>
              <li>
                <a href="#lead-capture" className="hover:text-orange-400 transition-colors">
                  Transformation Assessment
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Powered By TakCtrl (Centered Text) */}
          <div className="flex flex-col items-center justify-center text-center py-4">
            <span className="text-sm font-mono text-zinc-400 tracking-wider">
              Powered by <strong className="text-orange-400 font-extrabold">TakCtrl</strong>
            </span>
            <span className="text-[11px] text-zinc-600 font-mono mt-1">
              Precision Digital Engineering
            </span>
          </div>

          {/* Column 3: System Status & Social */}
          <div className="space-y-4 md:text-right">
            <h4 className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest mb-2">
              SYSTEM STATUS
            </h4>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ALL SYSTEMS OPERATIONAL
            </div>

            <div className="pt-2">
              <h5 className="text-[11px] font-mono text-zinc-500 uppercase mb-2">CONNECT WITH US</h5>
              <div className="flex items-center gap-3 md:justify-end">
                {[Share2, Globe, MessageSquare].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/50 flex items-center justify-center text-zinc-400 hover:text-orange-400 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-4">
          <div>
            © {new Date().getFullYear()} ATHLETICS INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-zinc-300">PRIVACY POLICY</a>
            <span>•</span>
            <a href="#" className="hover:text-zinc-300">TERMS OF SERVICE</a>
            <span>•</span>
            <a href="#" className="hover:text-zinc-300">SECURITY</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
