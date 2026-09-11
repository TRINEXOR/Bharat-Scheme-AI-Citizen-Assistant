import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SCHEMES } from "./data/schemes";
import { Scheme, SchemeCategory, BeneficiaryType, UserAccount, SubmittedApplication } from "./types";
import { Navbar } from "./components/Navbar";
import { SchemeCard } from "./components/SchemeCard";
import { SchemeModal } from "./components/SchemeModal";
import { EligibilityChecker } from "./components/EligibilityChecker";
import { AIChatAssistant } from "./components/AIChatAssistant";
import { DocumentLocker } from "./components/DocumentLocker";
import { HelplineDirectory } from "./components/HelplineDirectory";
import { SavedSchemesModal } from "./components/SavedSchemesModal";
import { LandingHero } from "./components/LandingHero";
import { AuthPage } from "./components/AuthPage";
import { AuthModal } from "./components/AuthModal";
import { AutoApplyModal } from "./components/AutoApplyModal";
import { MyApplicationsModal } from "./components/MyApplicationsModal";
import { Logo } from "./components/Logo";
import { t } from "./utils/translations";
import {
  Search,
  Filter,
  Sparkles,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Building2,
  Users
} from "lucide-react";

export default function App() {
  // 3-Stage Guided Citizen Flow:
  // Step 1: Landing Page opens first
  // Step 2: Citizen Sign In & Register page opens
  // Step 3: National Welfare Web Page opens
  const [stage, setStage] = useState<"landing" | "auth" | "portal">("landing");
  const [authInitialMode, setAuthInitialMode] = useState<"login" | "register">("login");

  // Citizen Authentication state
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const stored = localStorage.getItem("bharatscheme_current_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");

  // Automated Scheme Application & Portal Submission state
  const [autoApplyScheme, setAutoApplyScheme] = useState<Scheme | null>(null);
  const [isAutoApplyOpen, setIsAutoApplyOpen] = useState(false);

  // Submitted Applications registry
  const [submittedApplications, setSubmittedApplications] = useState<SubmittedApplication[]>(() => {
    try {
      const stored = localStorage.getItem("bharatscheme_applications");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isMyApplicationsOpen, setIsMyApplicationsOpen] = useState(false);

  // Navigation
  const [activeTab, setActiveTab] = useState<
    "schemes" | "chat" | "eligibility" | "documents" | "helpline"
  >("schemes");

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<SchemeCategory>("All");
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<BeneficiaryType>("All Citizens");
  const [dbtOnly, setDbtOnly] = useState(false);

  // Selected Scheme for Modal
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  // Saved Schemes (Local Storage)
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("bharatscheme_saved");
      return saved ? JSON.parse(saved) : ["pm-kisan", "ayushman-bharat", "pm-surya-ghar"];
    } catch {
      return ["pm-kisan", "ayushman-bharat", "pm-surya-ghar"];
    }
  });
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Language & Font Size Settings
  const [language, setLanguage] = useState("en");
  const [fontSize, setFontSize] = useState<"small" | "normal" | "large" | "xlarge">("normal");

  // AI Chat initial query (passed when clicking 'Ask AI' from a card)
  const [aiInitialQuery, setAiInitialQuery] = useState<string | undefined>(undefined);

  // Persist saved schemes
  useEffect(() => {
    try {
      localStorage.setItem("bharatscheme_saved", JSON.stringify(savedSchemeIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedSchemeIds]);

  // Global Font Size Adjuster - changes root font-size so all rem units scale across the entire portal
  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === "small") {
      root.style.fontSize = "14px";
    } else if (fontSize === "large") {
      root.style.fontSize = "18px";
    } else if (fontSize === "xlarge") {
      root.style.fontSize = "20px";
    } else {
      root.style.fontSize = "16px";
    }
  }, [fontSize]);

  // Tab switcher that resets window scroll to top (solves AI Advisor scrolling down issue)
  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const toggleSaveScheme = (id: string) => {
    setSavedSchemeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAskAIAboutScheme = (schemeName: string) => {
    setAiInitialQuery(`Can you explain the eligibility criteria, benefits, and required documents for ${schemeName}?`);
    handleTabChange("chat");
  };

  const handleGeneralAskAI = (query: string) => {
    setAiInitialQuery(query);
    handleTabChange("chat");
  };

  const handleOpenAuth = (mode: "login" | "register") => {
    setAuthInitialMode(mode);
    setAuthModalMode(mode);
    setStage("auth");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("bharatscheme_current_user");
    } catch (e) {
      console.error(e);
    }
    setCurrentUser(null);
  };

  const handleOpenAutoApply = (scheme: Scheme) => {
    setAutoApplyScheme(scheme);
    setIsAutoApplyOpen(true);
  };

  const handleApplicationSubmitted = (app: SubmittedApplication) => {
    setSubmittedApplications((prev) => [app, ...prev]);
  };

  // Filtered schemes
  const filteredSchemes = useMemo(() => {
    return SCHEMES.filter((scheme) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = scheme.name.toLowerCase().includes(q);
        const matchesHindi = scheme.hindiName?.toLowerCase().includes(q);
        const matchesDesc = scheme.description.toLowerCase().includes(q);
        const matchesMinistry = scheme.ministry.toLowerCase().includes(q);
        const matchesBenefits = scheme.benefits.some((b) => b.toLowerCase().includes(q));
        if (!matchesName && !matchesHindi && !matchesDesc && !matchesMinistry && !matchesBenefits) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== "All" && scheme.category !== selectedCategory) {
        return false;
      }

      // Beneficiary
      if (
        selectedBeneficiary !== "All Citizens" &&
        scheme.beneficiary !== selectedBeneficiary &&
        scheme.beneficiary !== "All Citizens"
      ) {
        return false;
      }

      // DBT
      if (dbtOnly && !scheme.isDBT) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedBeneficiary, dbtOnly]);

  const categories: SchemeCategory[] = [
    "All",
    "Agriculture",
    "Healthcare",
    "Energy & Housing",
    "Women & Child",
    "Business & MSME",
    "Pensions & Social Security",
    "Education & Youth",
  ];

  const beneficiaries: BeneficiaryType[] = [
    "All Citizens",
    "Farmers",
    "Women",
    "Youth & Students",
    "Artisans & Workers",
    "Senior Citizens",
    "Small Business Owners",
    "BPL Families",
  ];

  const savedSchemesList = useMemo(() => {
    return SCHEMES.filter((s) => savedSchemeIds.includes(s.id));
  }, [savedSchemeIds]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-amber-100 selection:text-slate-900">
      <AnimatePresence mode="wait">
        {stage === "landing" ? (
          <motion.div
            key="landing-page-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <LandingHero
              onEnterPortal={() => {
                setAuthInitialMode("login");
                setStage("auth");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onOpenAuth={(mode) => {
                setAuthInitialMode(mode);
                setStage("auth");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onOpenEligibility={() => {
                setAuthInitialMode("register");
                setStage("auth");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              currentUser={currentUser}
            />
          </motion.div>
        ) : stage === "auth" ? (
          <motion.div
            key="auth-page-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <AuthPage
              initialMode={authInitialMode}
              currentUser={currentUser}
              onAuthSuccess={(user) => {
                setCurrentUser(user);
                setStage("portal");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onBackToLanding={() => {
                setStage("landing");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="portal-full-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {/* Top Navigation Bar with Language and Font Size Adjusters */}
            <Navbar
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              savedCount={savedSchemeIds.length}
              onOpenSaved={() => setIsSavedModalOpen(true)}
              language={language}
              setLanguage={setLanguage}
              fontSize={fontSize}
              setFontSize={setFontSize}
              currentUser={currentUser}
              onOpenAuth={handleOpenAuth}
              onLogout={handleLogout}
              onOpenApplications={() => setIsMyApplicationsOpen(true)}
              applicationsCount={submittedApplications.length}
              onOpenLanding={() => {
                setStage("landing");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />

            {/* Main Tab Content with Animated Transitions */}
            <main className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
            {activeTab === "schemes" && (
              <div className="space-y-6 sm:space-y-8 pb-16">
                {/* Hero Section */}
                <div className="bg-[#142a47] text-white py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden border-b border-[#0f1f35]">
                  {/* Subtle tricolor decorative glow in background */}
                  <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FF9933]/15 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#138808]/15 blur-3xl pointer-events-none" />

                  <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="space-y-2 max-w-2xl">
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                          {t("hero_title", language)}
                        </h1>

                        <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                          {t("hero_sub", language)}
                        </p>
                      </div>

                      {/* Quick Action Cards on Desktop */}
                      <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full sm:w-auto">
                        <button
                          onClick={() => handleTabChange("eligibility")}
                          className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center justify-between gap-3 shadow-xs transition cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-slate-950" />
                            <span>{t("tab_eligibility", language)}</span>
                          </div>
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Subtle Pulsing Ask AI Button to draw user attention */}
                        <motion.button
                          onClick={() => handleTabChange("chat")}
                          animate={{ scale: [1, 1.025, 1] }}
                          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                          className="relative px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center justify-between gap-3 shadow-md shadow-emerald-950/40 ring-2 ring-emerald-400/70 hover:ring-emerald-300 transition cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                            </span>
                            <Sparkles className="w-4 h-4 text-emerald-200" />
                            <span className="font-extrabold">{t("tab_chat", language)}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-emerald-200" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Primary Search Bar */}
                    <div className="bg-white rounded-2xl p-1.5 sm:p-2 shadow-xl flex items-center gap-2 max-w-4xl border border-slate-200 text-slate-900">
                      <div className="pl-2 sm:pl-3 text-slate-400">
                        <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t("search_placeholder", language)}
                        className="flex-1 py-2 sm:py-2.5 px-1 sm:px-2 text-xs sm:text-sm bg-transparent focus:outline-none text-slate-900 placeholder-slate-400 font-medium"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="text-xs text-slate-400 hover:text-slate-600 px-2 cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                      <button
                        onClick={() => {}}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#142a47] hover:bg-[#1c385e] text-white text-xs font-bold transition shadow-xs cursor-pointer shrink-0"
                      >
                        {t("search_btn", language) || "Search"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Schemes Filter & Grid Area */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-5 sm:space-y-6">
                  {/* Category Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                      <Filter className="w-3.5 h-3.5" />
                      <span>{t("filter_category", language)}:</span>
                    </span>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                          selectedCategory === cat
                            ? "bg-[#142a47] text-white shadow-xs"
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Beneficiary Filter Strip & DBT toggle */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-1 border-b border-slate-200 text-xs">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                      <span className="font-bold text-slate-500 uppercase text-[11px] tracking-wider shrink-0">
                        {t("filter_beneficiary", language)}:
                      </span>
                      <select
                        value={selectedBeneficiary}
                        onChange={(e) => setSelectedBeneficiary(e.target.value as any)}
                        className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                      >
                        {beneficiaries.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                      {/* DBT Only Toggle */}
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dbtOnly}
                          onChange={(e) => setDbtOnly(e.target.checked)}
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span className="font-semibold text-slate-700 flex items-center gap-1">
                          <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                          {t("dbt_filter", language)}
                        </span>
                      </label>

                      <span className="text-slate-400 font-medium hidden sm:inline">|</span>

                      <span className="font-bold text-slate-600">
                        {filteredSchemes.length} {t("all_schemes", language)}
                      </span>
                    </div>
                  </div>

                  {/* Grid of Scheme Cards */}
                  {filteredSchemes.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                        <Search className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">
                        No schemes found matching "{searchQuery}"
                      </h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Try adjusting your search terms or reset filters to see all available government welfare programs.
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("All");
                          setSelectedBeneficiary("All Citizens");
                          setDbtOnly(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-[#142a47] text-white text-xs font-bold hover:bg-[#1c385e] transition cursor-pointer"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                      {filteredSchemes.map((scheme) => (
                        <SchemeCard
                          key={scheme.id}
                          scheme={scheme}
                          onSelect={(s) => setSelectedScheme(s)}
                          isSaved={savedSchemeIds.includes(scheme.id)}
                          onToggleSave={toggleSaveScheme}
                          onAskAI={handleAskAIAboutScheme}
                          onAutoApply={handleOpenAutoApply}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AI Chat Tab */}
            {activeTab === "chat" && (
              <AIChatAssistant
                initialQuery={aiInitialQuery}
                onClearInitialQuery={() => setAiInitialQuery(undefined)}
                language={language}
              />
            )}

            {/* Eligibility Checker Tab */}
            {activeTab === "eligibility" && (
              <EligibilityChecker
                onSelectScheme={(s) => setSelectedScheme(s)}
                savedSchemeIds={savedSchemeIds}
                onToggleSave={toggleSaveScheme}
                onAskAI={handleGeneralAskAI}
                onAutoApply={handleOpenAutoApply}
                language={language}
              />
            )}

            {/* Document Readiness Locker Tab */}
            {activeTab === "documents" && (
              <DocumentLocker
                onAskAI={handleGeneralAskAI}
                onSelectSchemeById={(id) => {
                  const found = SCHEMES.find((s) => s.id === id);
                  if (found) setSelectedScheme(found);
                }}
              />
            )}

            {/* Helpline Directory Tab */}
            {activeTab === "helpline" && (
              <HelplineDirectory onAskAI={handleGeneralAskAI} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Official Government Portal Footer */}
      <footer className="bg-[#0c1a2d] text-slate-300 border-t border-slate-800 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Column 1: Brand & Logo with green/white Bharat branding */}
            <div className="space-y-3">
              <Logo size="md" showSubtitle={true} variant="footer" />
              <p className="text-slate-400 text-xs leading-relaxed">
                National AI Citizen Assistant platform designed to simplify access to Central and State government welfare schemes, direct benefit transfers (DBT), and citizen services.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Verified .GOV.IN Scheme Registry</span>
              </div>
            </div>

            {/* Column 2: Flagship Portals */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Official National Portals
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>
                  <a
                    href="https://www.myscheme.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition flex items-center gap-1"
                  >
                    <span>myScheme National Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://pmkisan.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition flex items-center gap-1"
                  >
                    <span>PM-KISAN Samman Nidhi</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://beneficiary.nha.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition flex items-center gap-1"
                  >
                    <span>Ayushman Bharat (NHA)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://pmsuryaghar.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition flex items-center gap-1"
                  >
                    <span>PM Surya Ghar Solar Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.digilocker.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition flex items-center gap-1"
                  >
                    <span>DigiLocker Digital Documents</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Citizen Services */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Citizen Assistance
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>
                  <button
                    onClick={() => handleTabChange("eligibility")}
                    className="hover:text-white transition cursor-pointer"
                  >
                    1-Minute Eligibility Checker
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleTabChange("chat")}
                    className="hover:text-white transition cursor-pointer"
                  >
                    AI Citizen Assistant (Hindi/English)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleTabChange("documents")}
                    className="hover:text-white transition cursor-pointer"
                  >
                    Document Readiness & NPCI Checklist
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleTabChange("helpline")}
                    className="hover:text-white transition cursor-pointer"
                  >
                    All-India National Helpline Directory
                  </button>
                </li>
                <li>
                  <a
                    href="https://findmycsc.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition flex items-center gap-1"
                  >
                    <span>Find Nearest CSC Seva Kendra</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: 24x7 Helplines */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Emergency & Helplines
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">
                    Ayushman Bharat PM-JAY
                  </span>
                  <span className="font-extrabold text-amber-300 text-sm">
                    14555 (Toll Free 24x7)
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">
                    PM-KISAN Samman Helpline
                  </span>
                  <span className="font-extrabold text-emerald-400 text-sm">
                    155261 / 011-24300606
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">
                    PM Surya Ghar Solar Helpline
                  </span>
                  <span className="font-extrabold text-amber-300 text-sm">
                    15555
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
            <div>
              © 2026 BharatScheme AI Citizen Assistant | National Welfare Portal.
            </div>
            <div className="flex items-center gap-4">
              <span>All rights reserved</span>
              <span>•</span>
              <span>Official Government of India Scheme Registry Data</span>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  )}
</AnimatePresence>

      {/* Scheme Detail Modal View */}
      <SchemeModal
        scheme={selectedScheme}
        onClose={() => setSelectedScheme(null)}
        isSaved={selectedScheme ? savedSchemeIds.includes(selectedScheme.id) : false}
        onToggleSave={toggleSaveScheme}
        onAskAI={handleAskAIAboutScheme}
        onAutoApply={handleOpenAutoApply}
      />

      {/* Bookmarked Schemes Modal */}
      <SavedSchemesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedSchemes={savedSchemesList}
        onRemove={toggleSaveScheme}
        onSelectScheme={(s) => setSelectedScheme(s)}
      />

      {/* Citizen Authentication Modal (Registration & Login) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthModalOpen(false);
        }}
      />

      {/* Automated Scheme Application & Portal Submission Modal */}
      <AutoApplyModal
        isOpen={isAutoApplyOpen}
        onClose={() => setIsAutoApplyOpen(false)}
        scheme={autoApplyScheme}
        currentUser={currentUser}
        onOpenAuth={() => {
          setIsAutoApplyOpen(false);
          handleOpenAuth("register");
        }}
        onApplicationSubmitted={handleApplicationSubmitted}
      />

      {/* Submitted Applications History & Receipt Modal */}
      <MyApplicationsModal
        isOpen={isMyApplicationsOpen}
        onClose={() => setIsMyApplicationsOpen(false)}
        applications={submittedApplications}
        onApplyNew={() => {
          setIsMyApplicationsOpen(false);
          setStage("portal");
          handleTabChange("schemes");
        }}
      />
    </div>
  );
}
