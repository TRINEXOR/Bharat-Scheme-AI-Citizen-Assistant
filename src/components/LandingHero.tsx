import React from "react";
import { motion } from "motion/react";
import { Logo } from "./Logo";
import { UserAccount } from "../types";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  IndianRupee,
  CheckCircle2,
  ArrowRight,
  FileCheck2,
  Building2,
  Users,
  TrendingUp,
  Cpu,
  UserCheck
} from "lucide-react";

interface LandingHeroProps {
  onEnterPortal: () => void;
  onOpenAuth: (mode: "login" | "register") => void;
  onOpenEligibility: () => void;
  currentUser?: UserAccount | null;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onEnterPortal,
  onOpenAuth,
  onOpenEligibility,
  currentUser,
}) => {
  return (
    <div className="min-h-screen bg-[#0a1626] text-white relative overflow-hidden flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Background Tricolor Ambient Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF9933]/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Grid overlay pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d0f_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Navbar of Landing Page */}
      <header className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between">
        <Logo size="md" variant="dark" />

        <div className="flex items-center gap-2 sm:gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-slate-200">
                  Welcome, <strong className="text-white">{currentUser.name.split(" ")[0]}</strong>
                </span>
              </div>
              <button
                onClick={onEnterPortal}
                className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
              >
                Go to Portal
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth("login")}
                className="px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth("register")}
                className="px-3.5 py-1.5 sm:py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
              >
                Register Profile
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Landing Animated Body */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 my-auto text-center space-y-8 sm:space-y-10">
        {/* Official Portal Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold backdrop-blur-md shadow-xs mx-auto"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-200">National Citizen Welfare Gateway • Government of India</span>
        </motion.div>

        {/* Animated Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="space-y-4 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Connecting Every Citizen to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400">
              Government Welfare Schemes
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Discover your verified entitlements, auto-fill official ministry forms with 1-click using your citizen profile, and submit directly to Central & State government portals.
          </p>
        </motion.div>

        {/* Primary CTA Buttons with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="space-y-3 max-w-lg mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onEnterPortal}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#FF9933] hover:bg-[#f28e26] text-slate-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-amber-950/40 transition transform active:scale-98 cursor-pointer group"
            >
              <span>{currentUser ? "Proceed to Web Portal" : "Get Started: Sign In & Register"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onOpenAuth(currentUser ? "login" : "register")}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-bold text-sm sm:text-base border border-slate-700 flex items-center justify-center gap-2 transition cursor-pointer backdrop-blur-md"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>{currentUser ? "Switch Account" : "Register Profile"}</span>
            </button>
          </div>

          <p className="text-xs text-slate-400 text-center">
            {currentUser ? (
              <span>Currently signed in as <strong className="text-white">{currentUser.name}</strong></span>
            ) : (
              <span>Sign in or register your citizen profile to access welfare schemes</span>
            )}
          </p>
        </motion.div>

        {/* 3 Core Highlight Features (Cards) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="grid sm:grid-cols-3 gap-4 text-left max-w-4xl mx-auto pt-4"
        >
          {/* Card 1 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition space-y-2 backdrop-blur-xs">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Automated Portal Submission</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auto-fills complex ministry forms from your registered profile and submits directly to official portals with generated ARN.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition space-y-2 backdrop-blur-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Direct Benefit Transfer (DBT)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time NPCI Aadhaar bank mapping ensures cash assistance (PM-KISAN, PM Surya Ghar) is deposited directly to your account.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition space-y-2 backdrop-blur-xs">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Multilingual AI Advisor</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ask scheme questions in English, हिन्दी, বাংলা, తెలుగు, मराठी, or தமிழ் and receive instant official step-by-step guidance.
            </p>
          </div>
        </motion.div>

        {/* Live National Statistics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="pt-6 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div>
            <span className="text-xl sm:text-2xl font-black text-amber-400">₹34 Lakh Cr+</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">DBT Disbursed Directly</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-emerald-400">140+ Crore</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Citizens Benefited</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-blue-400">100+ Flagship</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Central & State Schemes</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-purple-400">99.8% Success</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Automated e-KYC Rate</span>
          </div>
        </motion.div>
      </main>

      {/* Landing Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 border-t border-slate-800/60">
        <div className="flex items-center gap-2">
          <span>भारत सरकार | Government of India</span>
          <span>•</span>
          <span>National AI Citizen Welfare Portal</span>
        </div>

        <div className="flex items-center gap-2 text-emerald-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Unified Citizen Services Gateway</span>
        </div>
      </footer>
    </div>
  );
};
