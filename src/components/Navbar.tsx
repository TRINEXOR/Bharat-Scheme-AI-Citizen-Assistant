import React from "react";
import { Logo } from "./Logo";
import { t } from "../utils/translations";
import { UserAccount } from "../types";
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  FileCheck2,
  PhoneCall,
  Bookmark,
  Languages,
  ExternalLink,
  User,
  LogOut,
  Zap,
  Home
} from "lucide-react";

interface NavbarProps {
  activeTab: "schemes" | "chat" | "eligibility" | "documents" | "helpline";
  setActiveTab: (tab: "schemes" | "chat" | "eligibility" | "documents" | "helpline") => void;
  savedCount: number;
  onOpenSaved: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  fontSize: "small" | "normal" | "large" | "xlarge";
  setFontSize: (size: "small" | "normal" | "large" | "xlarge") => void;
  currentUser: UserAccount | null;
  onOpenAuth: (mode: "login" | "register") => void;
  onLogout: () => void;
  onOpenApplications: () => void;
  applicationsCount: number;
  onOpenLanding: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSaved,
  language,
  setLanguage,
  fontSize,
  setFontSize,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenApplications,
  applicationsCount,
  onOpenLanding,
}) => {
  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी (Hindi)" },
    { code: "bn", label: "বাংলা (Bengali)" },
    { code: "te", label: "తెలుగు (Telugu)" },
    { code: "mr", label: "मराठी (Marathi)" },
    { code: "ta", label: "தமிழ் (Tamil)" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      {/* Top Official Portal Strip */}
      <div className="bg-[#142a47] text-white text-xs px-3 sm:px-4 py-1.5 font-medium border-b border-[#0f1f35]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Government of India Emblem & Tag */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-semibold tracking-wide text-slate-100 truncate">
              {t("gov_india", language)}
            </span>
            <span className="hidden md:inline text-slate-300">
              — {t("portal_subtitle", language)}
            </span>
          </div>

          {/* Quick Actions: Accessibility & Toll Free */}
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] shrink-0">
            {/* National Helpline Badge */}
            <div className="hidden lg:flex items-center gap-1.5 text-amber-300 font-semibold">
              <PhoneCall className="w-3 h-3" />
              <span>{t("helpline_strip", language)}</span>
            </div>

            {/* Font Size Adjusters */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-[#0c1a2d] px-1.5 py-0.5 rounded border border-slate-700/60 text-slate-300">
              <span className="text-[10px] text-slate-400 mr-0.5 hidden xs:inline">{t("text_size", language)}</span>
              <button
                onClick={() => setFontSize("small")}
                className={`px-1.5 py-0.5 rounded text-[11px] transition ${
                  fontSize === "small"
                    ? "font-extrabold bg-amber-400 text-slate-950 shadow-xs"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
                title="Decrease Font Size (14px)"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize("normal")}
                className={`px-1.5 py-0.5 rounded text-xs transition ${
                  fontSize === "normal"
                    ? "font-extrabold bg-amber-400 text-slate-950 shadow-xs"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
                title="Standard Font Size (16px)"
              >
                A
              </button>
              <button
                onClick={() => setFontSize("large")}
                className={`px-1.5 py-0.5 rounded text-sm transition ${
                  fontSize === "large"
                    ? "font-extrabold bg-amber-400 text-slate-950 shadow-xs"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
                title="Increase Font Size (18px)"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize("xlarge")}
                className={`px-1.5 py-0.5 rounded text-base transition ${
                  fontSize === "xlarge"
                    ? "font-extrabold bg-amber-400 text-slate-950 shadow-xs"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
                title="Extra Large Font Size (20px)"
              >
                A++
              </button>
            </div>

            {/* Language Selector Dropdown */}
            <div className="flex items-center gap-1 bg-[#0c1a2d] px-2 py-0.5 rounded border border-slate-700/60">
              <Languages className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-slate-100 text-[11px] font-semibold focus:outline-none cursor-pointer pr-1"
                aria-label="Select Language"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-slate-900 text-white py-1">
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        {/* Logo matching user's Image 1 & Image 2 */}
        <Logo
          size="md"
          onClick={() => setActiveTab("schemes")}
          className="hover:opacity-95"
        />

        {/* Navigation Tabs - Desktop */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab("schemes")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition cursor-pointer ${
              activeTab === "schemes"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{t("tab_schemes", language)}</span>
          </button>

          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition cursor-pointer ${
              activeTab === "chat"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse shrink-0" />
            <span>{t("tab_chat", language)}</span>
            <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-emerald-100 text-emerald-800">
              Live
            </span>
          </button>

          <button
            onClick={() => setActiveTab("eligibility")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition cursor-pointer ${
              activeTab === "eligibility"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{t("tab_eligibility", language)}</span>
          </button>

          <button
            onClick={() => setActiveTab("documents")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition cursor-pointer ${
              activeTab === "documents"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-purple-600 shrink-0" />
            <span>{t("tab_documents", language)}</span>
          </button>

          <button
            onClick={() => setActiveTab("helpline")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition cursor-pointer ${
              activeTab === "helpline"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <PhoneCall className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{t("tab_helpline", language)}</span>
          </button>
        </nav>

        {/* Right side: Landing, Bookmarks, My Applications, & Auth */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Welcome Screen Button */}
          <button
            onClick={onOpenLanding}
            className="hidden xl:flex items-center gap-1 px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition cursor-pointer shadow-xs"
            title="View Animated Landing Overview"
          >
            <Home className="w-3.5 h-3.5 text-amber-600" />
            <span>Welcome</span>
          </button>

          {/* My Applications (Submitted Applications) */}
          <button
            onClick={onOpenApplications}
            className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs"
            title="My Submitted Scheme Applications"
          >
            <Zap className={`w-4 h-4 ${applicationsCount > 0 ? "text-emerald-600" : "text-slate-400"}`} />
            <span className="hidden md:inline">Applications</span>
            {applicationsCount > 0 && (
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
                {applicationsCount}
              </span>
            )}
          </button>

          {/* Saved Schemes Bookmark */}
          <button
            onClick={onOpenSaved}
            className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs"
            title="View Saved Schemes"
          >
            <Bookmark className={`w-4 h-4 ${savedCount > 0 ? "fill-amber-500 text-amber-500" : "text-slate-500"}`} />
            <span className="hidden md:inline">{t("saved_btn", language)}</span>
            {savedCount > 0 && (
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-amber-500 text-white text-xs font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* User Auth Section */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 pl-1">
              <div
                onClick={() => onOpenAuth("login")}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-950 text-xs font-bold cursor-pointer hover:bg-emerald-100 transition"
                title={`Signed in as ${currentUser.name} (${currentUser.mobile})`}
              >
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-black">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <span className="block truncate max-w-[100px] text-xs font-bold leading-tight">
                    {currentUser.name.split(" ")[0]}
                  </span>
                  <span className="block text-[10px] text-emerald-700 font-medium leading-none">
                    {currentUser.city || currentUser.state || "Citizen"}
                  </span>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-2 rounded-lg border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth("login")}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 text-xs font-bold transition cursor-pointer shadow-xs"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth("register")}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold transition cursor-pointer shadow-xs"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Strip */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-200 bg-slate-50 px-2 py-2 text-xs font-medium overflow-x-auto gap-1 no-scrollbar">
        <button
          onClick={() => setActiveTab("schemes")}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition ${
            activeTab === "schemes" ? "bg-white text-slate-900 font-bold shadow-xs border border-slate-200" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
          <span>{t("tab_schemes", language)}</span>
        </button>
        <button
          onClick={() => setActiveTab("chat")}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition ${
            activeTab === "chat" ? "bg-white text-slate-900 font-bold shadow-xs border border-slate-200" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t("tab_chat", language)}</span>
        </button>
        <button
          onClick={() => setActiveTab("eligibility")}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition ${
            activeTab === "eligibility" ? "bg-white text-slate-900 font-bold shadow-xs border border-slate-200" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
          <span>{t("tab_eligibility", language)}</span>
        </button>
        <button
          onClick={() => setActiveTab("documents")}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition ${
            activeTab === "documents" ? "bg-white text-slate-900 font-bold shadow-xs border border-slate-200" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5 text-purple-600" />
          <span>{t("tab_documents", language)}</span>
        </button>
        <button
          onClick={() => setActiveTab("helpline")}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition ${
            activeTab === "helpline" ? "bg-white text-slate-900 font-bold shadow-xs border border-slate-200" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
          <span>{t("tab_helpline", language)}</span>
        </button>
      </div>
    </header>
  );
};
