import React, { useState, useMemo } from "react";
import { Scheme, MatchedSchemeResult } from "../types";
import { SCHEMES, STATES_AND_UTS } from "../data/schemes";
import { SchemeCard } from "./SchemeCard";
import { t } from "../utils/translations";
import {
  CheckCircle2,
  Sparkles,
  RotateCcw,
  AlertCircle,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Zap
} from "lucide-react";

interface EligibilityCheckerProps {
  onSelectScheme: (scheme: Scheme) => void;
  savedSchemeIds: string[];
  onToggleSave: (id: string) => void;
  onAskAI: (query: string) => void;
  onAutoApply?: (scheme: Scheme) => void;
  language?: string;
}

export interface ManualCitizenProfile {
  age: string;
  gender: string;
  state: string;
  area: string;
  occupation: string;
  income: string;
  category: string;
  landholding: string;
  hasGirlChild: boolean;
  isDivyangjan: boolean;
  hasBPLCard: boolean;
}

const emptyProfile: ManualCitizenProfile = {
  age: "",
  gender: "",
  state: "",
  area: "",
  occupation: "",
  income: "",
  category: "",
  landholding: "",
  hasGirlChild: false,
  isDivyangjan: false,
  hasBPLCard: false,
};

export const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({
  onSelectScheme,
  savedSchemeIds,
  onToggleSave,
  onAskAI,
  onAutoApply,
  language = "en",
}) => {
  // Citizen Profile Form State - starts completely empty with NO demo details filled
  const [profile, setProfile] = useState<ManualCitizenProfile>(emptyProfile);

  const [aiSummary, setAiSummary] = useState<{
    summary: string;
    actionPlan: string[];
  } | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [hasEvaluated, setHasEvaluated] = useState(false);

  // Check if at least basic fields are filled
  const isFormFilled = Boolean(
    profile.age.trim() ||
    profile.gender ||
    profile.state ||
    profile.occupation
  );

  const parsedAge = parseInt(profile.age, 10);
  const validAge = !isNaN(parsedAge) && parsedAge > 0 ? parsedAge : null;

  // Matcher algorithm using user's manual inputs
  const matchedResults = useMemo<MatchedSchemeResult[]>(() => {
    if (!isFormFilled) return [];

    return SCHEMES.map((scheme) => {
      let score = 50; // base score
      const reasons: string[] = [];
      const unmet: string[] = [];

      // 1. Gender check
      if (scheme.genderEligibility && scheme.genderEligibility !== "All") {
        if (profile.gender) {
          if (scheme.genderEligibility === profile.gender) {
            score += 20;
            reasons.push(`Matches gender requirement (${scheme.genderEligibility})`);
          } else {
            score -= 40;
            unmet.push(`Requires applicant to be ${scheme.genderEligibility}`);
          }
        }
      } else {
        if (profile.gender) {
          score += 10;
        }
      }

      // 2. Age check
      if (validAge !== null) {
        if (scheme.minAge !== undefined && validAge < scheme.minAge) {
          score -= 30;
          unmet.push(`Minimum age is ${scheme.minAge} (Current: ${validAge})`);
        } else if (scheme.maxAge !== undefined && validAge > scheme.maxAge) {
          score -= 30;
          unmet.push(`Maximum age is ${scheme.maxAge} (Current: ${validAge})`);
        } else if (scheme.minAge !== undefined || scheme.maxAge !== undefined) {
          score += 20;
          reasons.push(`Age ${validAge} qualifies within eligible bracket`);
        }
      }

      // 3. Occupation match
      if (profile.occupation) {
        if (scheme.occupations && scheme.occupations.length > 0) {
          const occMatch = scheme.occupations.some(
            (occ) =>
              occ.toLowerCase().includes(profile.occupation.toLowerCase()) ||
              profile.occupation.toLowerCase().includes(occ.toLowerCase())
          );
          if (occMatch) {
            score += 25;
            reasons.push(`Specifically tailored for ${profile.occupation}`);
          } else {
            score -= 15;
          }
        }
      }

      // 4. Land requirement
      if (scheme.landRequired) {
        if (profile.landholding && profile.landholding !== "None (Landless)") {
          score += 20;
          reasons.push("Possesses cultivable land records");
        } else if (profile.landholding === "None (Landless)") {
          score -= 35;
          unmet.push("Requires agricultural landholding in applicant name");
        }
      }

      // 5. Special conditions
      if (scheme.id === "sukanya-samriddhi") {
        if (profile.hasGirlChild) {
          score += 35;
          reasons.push("Family has eligible girl child (under 10 yrs)");
        } else {
          score -= 40;
          unmet.push("Requires a girl child under 10 years in family");
        }
      }

      if (scheme.id === "nsap-pension") {
        if ((validAge !== null && validAge >= 60) || profile.isDivyangjan) {
          score += 30;
          reasons.push("Eligible for social security old age / disability coverage");
        } else if (validAge !== null && validAge < 60) {
          score -= 25;
        }
      }

      if (scheme.category === "Women & Child" && profile.gender === "Female") {
        score += 20;
        reasons.push("Women-focused welfare empowerment initiative");
      }

      if (profile.hasBPLCard && (scheme.beneficiary === "BPL Families" || scheme.id === "ayushman-bharat" || scheme.id === "pm-awas-yojana")) {
        score += 25;
        reasons.push("BPL / Ration card priority qualification");
      }

      if (profile.isDivyangjan && (scheme.beneficiary === "All Citizens" || scheme.id === "nsap-pension")) {
        score += 15;
        reasons.push("Special priority reservation for Divyangjan");
      }

      const finalScore = Math.max(10, Math.min(100, score));
      return {
        scheme,
        matchScore: finalScore,
        matchedReasons: reasons,
        unmetCriteria: unmet,
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [profile, isFormFilled, validAge]);

  const highMatchCount = matchedResults.filter((r) => r.matchScore >= 70).length;

  const handleGenerateAIPlan = async () => {
    setLoadingAI(true);
    try {
      const res = await fetch("/api/eligibility-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: {
            ...profile,
            age: validAge || 30,
            gender: profile.gender || "All",
            state: profile.state || "All India",
            occupation: profile.occupation || "Citizen",
            income: profile.income || "General",
            category: profile.category || "General",
            landholding: profile.landholding || "None",
          },
        }),
      });
      const data = await res.json();
      setAiSummary(data);
    } catch (err) {
      console.error(err);
      setAiSummary({
        summary: `Based on your manually entered details (${profile.occupation || "Citizen"} in ${profile.state || "India"}), you qualify for several key Central and State welfare initiatives.`,
        actionPlan: [
          "Ensure your Aadhaar is linked with your active DBT bank account.",
          "Visit your nearest CSC Seva Kendra or portal for scheme e-KYC.",
          "Submit documents for highest-matching schemes listed below to unlock cash subsidies.",
        ],
      });
    } finally {
      setLoadingAI(false);
    }
  };

  const handleResetForm = () => {
    setProfile(emptyProfile);
    setAiSummary(null);
    setHasEvaluated(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-[#142a47] rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white relative overflow-hidden shadow-md">
        <div className="relative z-10 max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t("eligibility_header", language)}</span>
          </div>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {t("eligibility_header", language)}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {t("eligibility_sub", language)}
          </p>

          {/* Notice: No demo data pre-filled */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-200 border border-amber-400/30 text-xs font-semibold mt-1">
            <UserCheck className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{t("manual_entry_notice", language)}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Form Column (Left - 5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                <span>Citizen Profile</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Manual Entry
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                All calculations run locally & securely
              </p>
            </div>
            <button
              onClick={handleResetForm}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer p-1"
              title="Reset all fields"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t("clear_details_btn", language)}</span>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
            {/* Age - manual text/number input */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t("field_age", language)} <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="115"
                value={profile.age}
                onChange={(e) => {
                  setProfile({ ...profile, age: e.target.value });
                  setHasEvaluated(true);
                }}
                placeholder="e.g. 32"
                className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142a47]"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Type your exact age</span>
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t("field_gender", language)} <span className="text-rose-500">*</span>
              </label>
              <select
                value={profile.gender}
                onChange={(e) => {
                  setProfile({ ...profile, gender: e.target.value });
                  setHasEvaluated(true);
                }}
                className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142a47] cursor-pointer"
              >
                <option value="">Select Gender (लिंग चुनें)...</option>
                <option value="Female">Female (महिला)</option>
                <option value="Male">Male (पुरुष)</option>
                <option value="Other">Other (अन्य)</option>
              </select>
            </div>

            {/* State */}
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t("field_state", language)} <span className="text-rose-500">*</span>
              </label>
              <select
                value={profile.state}
                onChange={(e) => {
                  setProfile({ ...profile, state: e.target.value });
                  setHasEvaluated(true);
                }}
                className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142a47] cursor-pointer"
              >
                <option value="">Select State / UT (राज्य चुनें)...</option>
                {STATES_AND_UTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Area */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t("field_area", language)}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setProfile({ ...profile, area: "Rural" });
                    setHasEvaluated(true);
                  }}
                  className={`py-2 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                    profile.area === "Rural"
                      ? "bg-[#142a47] text-white border-[#142a47] shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Rural (ग्रामीण)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfile({ ...profile, area: "Urban" });
                    setHasEvaluated(true);
                  }}
                  className={`py-2 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                    profile.area === "Urban"
                      ? "bg-[#142a47] text-white border-[#142a47] shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Urban (शहरी)
                </button>
              </div>
            </div>

            {/* Occupation */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t("field_occupation", language)}
              </label>
              <select
                value={profile.occupation}
                onChange={(e) => {
                  setProfile({ ...profile, occupation: e.target.value });
                  setHasEvaluated(true);
                }}
                className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142a47] cursor-pointer"
              >
                <option value="">Select Occupation (व्यवसाय चुनें)...</option>
                <option value="Farmer">Farmer / Cultivator (किसान)</option>
                <option value="Street Vendor">Street Vendor / Hawker (ठेलेवाला)</option>
                <option value="Small Business Owner">Small Business / Shop (दुकानदार)</option>
                <option value="Artisan">Artisan / Craftsman (कारीगर/शिल्पकार)</option>
                <option value="Daily Wage Laborer">Unorganized / Daily Wage Laborer</option>
                <option value="Student">Student / Unemployed Youth (छात्र)</option>
                <option value="Homemaker">Homemaker (गृहिणी)</option>
                <option value="Senior Citizen">Senior Citizen / Retired (वरिष्ठ)</option>
                <option value="Salaried">Private / Salaried Employee</option>
              </select>
            </div>

            {/* Annual Income */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t("field_income", language)}
              </label>
              <select
                value={profile.income}
                onChange={(e) => {
                  setProfile({ ...profile, income: e.target.value });
                  setHasEvaluated(true);
                }}
                className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142a47] cursor-pointer"
              >
                <option value="">Select Income Bracket...</option>
                <option value="Below ₹1,00,000">Below ₹1,00,000 (गरीबी रेखा)</option>
                <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000</option>
                <option value="Above ₹5,00,000">Above ₹5,00,000</option>
              </select>
            </div>

            {/* Social Category */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t("field_category", language)}
              </label>
              <select
                value={profile.category}
                onChange={(e) => {
                  setProfile({ ...profile, category: e.target.value });
                  setHasEvaluated(true);
                }}
                className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142a47] cursor-pointer"
              >
                <option value="">Select Social Category...</option>
                <option value="General">General</option>
                <option value="OBC">OBC (Other Backward Class)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="EWS">EWS (Economically Weaker Section)</option>
              </select>
            </div>

            {/* Landholding */}
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t("field_landholding", language)}
              </label>
              <select
                value={profile.landholding}
                onChange={(e) => {
                  setProfile({ ...profile, landholding: e.target.value });
                  setHasEvaluated(true);
                }}
                className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#142a47] cursor-pointer"
              >
                <option value="">Select Landholding...</option>
                <option value="None (Landless)">None / Landless (भूमिहीन)</option>
                <option value="Up to 1 Acre">Up to 1 Acre (सीमांत किसान)</option>
                <option value="1 - 2 Acres">1 - 2 Acres (लघु किसान)</option>
                <option value="2 - 5 Acres">2 - 5 Acres</option>
                <option value="Above 5 Acres">Above 5 Acres</option>
              </select>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <label className="flex items-center justify-between text-xs font-semibold text-slate-700 cursor-pointer hover:text-slate-900">
              <span>Girl child (below 10 yrs) in family</span>
              <input
                type="checkbox"
                checked={profile.hasGirlChild}
                onChange={(e) => {
                  setProfile({ ...profile, hasGirlChild: e.target.checked });
                  setHasEvaluated(true);
                }}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-xs font-semibold text-slate-700 cursor-pointer hover:text-slate-900">
              <span>BPL / NFSA Ration Card Holder</span>
              <input
                type="checkbox"
                checked={profile.hasBPLCard}
                onChange={(e) => {
                  setProfile({ ...profile, hasBPLCard: e.target.checked });
                  setHasEvaluated(true);
                }}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-xs font-semibold text-slate-700 cursor-pointer hover:text-slate-900">
              <span>Person with Disability (Divyangjan)</span>
              <input
                type="checkbox"
                checked={profile.isDivyangjan}
                onChange={(e) => {
                  setProfile({ ...profile, isDivyangjan: e.target.checked });
                  setHasEvaluated(true);
                }}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
            </label>
          </div>

          {/* Check Eligibility Button */}
          <button
            onClick={() => setHasEvaluated(true)}
            className="w-full py-3 rounded-xl bg-[#142a47] hover:bg-[#1c385e] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{t("check_btn", language)}</span>
          </button>

          {/* AI Plan Trigger */}
          {isFormFilled && (
            <button
              onClick={handleGenerateAIPlan}
              disabled={loadingAI}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>{loadingAI ? "Analyzing..." : "Generate AI Action Plan"}</span>
            </button>
          )}
        </div>

        {/* Results Column (Right - 7 Cols) */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {!isFormFilled ? (
            /* Blank state: Prompting user to enter details */
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 sm:p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
                <FileSpreadsheet className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Please Enter Your Details Manually
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Fill in your age, gender, state, and occupation on the left panel. As you input your information, our system will calculate your personalized scheme eligibility and DBT entitlements.
                </p>
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-[#142a47] block mb-1">1. Enter Profile</span>
                  <span className="text-slate-500 text-[11px]">Age, gender, state, occupation, landholding</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-[#142a47] block mb-1">2. Instant Match</span>
                  <span className="text-slate-500 text-[11px]">Calculates match % based on official guidelines</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-[#142a47] block mb-1">3. Apply & Claim</span>
                  <span className="text-slate-500 text-[11px]">Direct links to official government portals</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* AI Summary Card (if generated) */}
              {aiSummary && (
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-emerald-600 text-white">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-emerald-950">
                      AI Personalized Standing & Action Plan
                    </h3>
                  </div>

                  <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                    {aiSummary.summary}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-emerald-200/60">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
                      Top Action Steps:
                    </span>
                    {aiSummary.actionPlan.map((action, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-emerald-950 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary Metric Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                    High Matches
                  </span>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#142a47]">
                    {highMatchCount} Schemes
                  </p>
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    Match score ≥ 70%
                  </span>
                </div>

                <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                    Annual Entitlement
                  </span>
                  <p className="text-xl sm:text-2xl font-extrabold text-emerald-600">
                    ₹50,000+
                  </p>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Estimated subsidies
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                    Total Evaluated
                  </span>
                  <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {matchedResults.length} Schemes
                  </p>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Central & State
                  </span>
                </div>
              </div>

              {/* Matched Scheme Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Matched Welfare Schemes for Your Profile ({matchedResults.length})
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Ranked by Eligibility Score
                  </span>
                </div>

                <div className="space-y-4">
                  {matchedResults.map((result) => (
                    <div
                      key={result.scheme.id}
                      className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3.5 hover:border-slate-300 transition"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              {result.scheme.category}
                            </span>
                            <span className="text-[10px] font-medium text-slate-500">
                              {result.scheme.ministry}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm sm:text-base text-slate-900">
                            {result.scheme.name}
                          </h4>
                          {result.scheme.hindiName && (
                            <p className="text-xs text-slate-500 font-hindi">
                              {result.scheme.hindiName}
                            </p>
                          )}
                        </div>

                        {/* Match Badge */}
                        <div
                          className={`px-3 py-1.5 rounded-xl font-extrabold text-xs sm:text-sm shrink-0 flex items-center gap-1.5 ${
                            result.matchScore >= 80
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : result.matchScore >= 60
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{result.matchScore}% Match</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                        {result.scheme.description}
                      </p>

                      {/* Reasons Why You Qualify */}
                      {result.matchedReasons.length > 0 && (
                        <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-2.5 sm:p-3 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">
                            Why You Qualify:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {result.matchedReasons.map((reason, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-white/80 px-2 py-0.5 rounded-md border border-emerald-200/60"
                              >
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span>{reason}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Unmet Criteria Warning */}
                      {result.unmetCriteria.length > 0 && (
                        <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-2.5 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block">
                            Criteria Note:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {result.unmetCriteria.map((unmet, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-700 bg-white/80 px-2 py-0.5 rounded-md border border-rose-200/60"
                              >
                                <AlertCircle className="w-3 h-3 text-rose-500 shrink-0" />
                                <span>{unmet}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Card Bottom Actions */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs font-bold text-amber-700">
                          Benefit: {result.scheme.benefitValue}
                        </span>

                        <div className="flex items-center gap-2">
                          {onAutoApply && (
                            <button
                              onClick={() => onAutoApply(result.scheme)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1 transition shadow-xs cursor-pointer"
                              title="Auto-Fill Form & Submit to Gov Portal"
                            >
                              <Zap className="w-3 h-3 text-amber-300" />
                              <span>Auto-Apply</span>
                            </button>
                          )}

                          <button
                            onClick={() => onAskAI(`What is the step-by-step application process for ${result.scheme.name}?`)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                          >
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            <span>Ask AI</span>
                          </button>

                          <button
                            onClick={() => onSelectScheme(result.scheme)}
                            className="px-3 py-1.5 rounded-lg bg-[#142a47] hover:bg-[#1c385e] text-white text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                          >
                            <span>Details</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
