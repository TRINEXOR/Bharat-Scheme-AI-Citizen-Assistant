import React, { useState } from "react";
import { Scheme } from "../types";
import {
  X,
  ExternalLink,
  PhoneCall,
  CheckCircle2,
  FileText,
  IndianRupee,
  Building2,
  Bookmark,
  Sparkles,
  ClipboardCheck,
  ChevronRight,
  ShieldCheck,
  Copy,
  Check,
  Zap
} from "lucide-react";

interface SchemeModalProps {
  scheme: Scheme | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onAskAI: (schemeName: string) => void;
  onAutoApply: (scheme: Scheme) => void;
}

export const SchemeModal: React.FC<SchemeModalProps> = ({
  scheme,
  onClose,
  isSaved,
  onToggleSave,
  onAskAI,
  onAutoApply,
}) => {
  if (!scheme) return null;

  const [activeTab, setActiveTab] = useState<"overview" | "eligibility" | "documents" | "apply">("overview");
  const [checkedCriteria, setCheckedCriteria] = useState<Record<number, boolean>>({});
  const [copiedHelpline, setCopiedHelpline] = useState(false);

  const toggleCriteria = (idx: number) => {
    setCheckedCriteria((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCopyHelpline = () => {
    navigator.clipboard.writeText(scheme.helpline);
    setCopiedHelpline(true);
    setTimeout(() => setCopiedHelpline(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="bg-[#142a47] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900">
              {scheme.category}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/15 text-slate-200">
              {scheme.type}
            </span>
            {scheme.isDBT && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950 flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                DBT Beneficiary
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {scheme.name}
          </h2>
          {scheme.hindiName && (
            <p className="text-slate-300 text-sm font-medium font-['Noto_Sans_Devanagari',sans-serif] mt-1">
              {scheme.hindiName}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs text-slate-300 mt-2">
            <Building2 className="w-4 h-4 shrink-0 text-amber-300" />
            <span>{scheme.ministry}</span>
          </div>

          {/* Quick Key Benefit Strip */}
          <div className="mt-4 p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 flex items-center justify-between gap-3 flex-wrap">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">
                Official Benefit Value
              </span>
              <span className="text-sm font-bold text-white">
                {scheme.benefitValue}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleSave(scheme.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isSaved
                    ? "bg-amber-400 text-slate-900 font-bold"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-slate-900" : ""}`} />
                <span>{isSaved ? "Saved" : "Save Scheme"}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onAskAI(scheme.name);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 px-6 bg-slate-50 text-xs font-semibold text-slate-600 overflow-x-auto gap-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3.5 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === "overview"
                ? "border-amber-600 text-amber-700 font-bold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            Overview & Benefits
          </button>
          <button
            onClick={() => setActiveTab("eligibility")}
            className={`py-3.5 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === "eligibility"
                ? "border-amber-600 text-amber-700 font-bold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            Eligibility Self-Check
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`py-3.5 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === "documents"
                ? "border-amber-600 text-amber-700 font-bold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            Required Documents ({scheme.requiredDocuments.length})
          </button>
          <button
            onClick={() => setActiveTab("apply")}
            className={`py-3.5 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === "apply"
                ? "border-amber-600 text-amber-700 font-bold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            Application Roadmap
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Scheme Description
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {scheme.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Direct Benefits to Beneficiary
                </h4>
                <div className="grid gap-2.5">
                  {scheme.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs text-slate-800 font-medium leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Beneficiary Card */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-amber-900 block">
                    Targeted Beneficiary Group
                  </span>
                  <p className="text-xs text-amber-800 mt-0.5">
                    {scheme.beneficiary} • {scheme.type}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-white text-amber-900 text-xs font-bold border border-amber-300">
                  {scheme.category}
                </span>
              </div>
            </div>
          )}

          {/* ELIGIBILITY SELF CHECK TAB */}
          {activeTab === "eligibility" && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs">
                <span className="font-bold block mb-1">
                  Interactive Eligibility Self-Assessment:
                </span>
                Check off each condition below to verify whether you qualify for {scheme.name}.
              </div>

              <div className="space-y-2.5">
                {scheme.eligibilityCriteria.map((crit, idx) => {
                  const isChecked = !!checkedCriteria[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCriteria(idx)}
                      className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? "bg-emerald-50/80 border-emerald-300 text-slate-900"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition ${
                          isChecked
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs leading-relaxed font-medium">
                        {crit}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Eligibility verdict */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-700">
                    Criteria Checked:
                  </span>
                  <p className="text-sm font-extrabold text-slate-900">
                    {Object.values(checkedCriteria).filter(Boolean).length} /{" "}
                    {scheme.eligibilityCriteria.length} Passed
                  </p>
                </div>

                {Object.values(checkedCriteria).filter(Boolean).length ===
                scheme.eligibilityCriteria.length ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    High Eligibility Match!
                  </span>
                ) : (
                  <span className="text-xs text-slate-500 font-medium">
                    Review each criterion to verify
                  </span>
                )}
              </div>
            </div>
          )}

          {/* REQUIRED DOCUMENTS TAB */}
          {activeTab === "documents" && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Keep the following official documents ready before applying on the national portal or visiting your nearest CSC Seva Kendra:
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {scheme.requiredDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3"
                  >
                    <FileText className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        {doc}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Mandatory verification document
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 space-y-1">
                <span className="font-bold block text-slate-900">
                  Tip for DBT (Direct Bank Transfer):
                </span>
                <p>
                  Ensure your Aadhaar is linked with your primary savings bank account and NPCI mapping is activated. You can verify your status via your bank branch or the UIDAI Aadhaar portal.
                </p>
              </div>
            </div>
          )}

          {/* APPLICATION ROADMAP TAB */}
          {activeTab === "apply" && (
            <div className="space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Step-by-Step Procedure
              </h4>

              <div className="space-y-3 relative before:absolute before:top-3 before:bottom-3 before:left-3.5 before:w-0.5 before:bg-slate-200">
                {scheme.howToApply.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 pl-1">
                    <div className="w-6 h-6 rounded-full bg-[#142a47] text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs z-10">
                      {idx + 1}
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 leading-relaxed flex-1">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {/* Helpline */}
          <div className="flex items-center gap-2 text-xs">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Official Helpline
              </span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">
                  {scheme.helpline}
                </span>
                <button
                  onClick={handleCopyHelpline}
                  className="text-slate-400 hover:text-slate-700 p-0.5 rounded cursor-pointer"
                  title="Copy number"
                >
                  {copiedHelpline ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onAutoApply(scheme);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>⚡ 1-Click Auto-Fill & Apply</span>
            </button>

            <a
              href={scheme.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#142a47] hover:bg-[#1c385e] text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
            >
              <span>Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
