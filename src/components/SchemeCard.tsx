import React from "react";
import { Scheme } from "../types";
import {
  IndianRupee,
  CheckCircle,
  ExternalLink,
  Bookmark,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  Zap
} from "lucide-react";

interface SchemeCardProps {
  scheme: Scheme;
  onSelect: (scheme: Scheme) => void;
  isSaved: boolean;
  onToggleSave: (schemeId: string) => void;
  onAskAI: (schemeName: string) => void;
  onAutoApply: (scheme: Scheme) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  onSelect,
  isSaved,
  onToggleSave,
  onAskAI,
  onAutoApply,
}) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Agriculture":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Healthcare":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Energy & Housing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Women & Child":
        return "bg-pink-50 text-pink-700 border-pink-200";
      case "Business & MSME":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Pensions & Social Security":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      case "Education & Youth":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between overflow-hidden group">
      {/* Top Card Section */}
      <div className="p-5 flex-1">
        {/* Category, DBT and Bookmark Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryColor(
                scheme.category
              )}`}
            >
              {scheme.category}
            </span>

            {scheme.isDBT && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                DBT Enabled
              </span>
            )}

            <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Users className="w-3 h-3" />
              {scheme.beneficiary}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(scheme.id);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition"
            title={isSaved ? "Remove from saved" : "Save scheme"}
          >
            <Bookmark
              className={`w-4 h-4 ${
                isSaved ? "fill-amber-500 text-amber-500" : "text-slate-400"
              }`}
            />
          </button>
        </div>

        {/* Scheme Titles */}
        <div className="mb-2">
          <h3 className="font-bold text-lg text-slate-900 leading-snug group-hover:text-amber-700 transition">
            {scheme.name}
          </h3>
          {scheme.hindiName && (
            <p className="text-xs text-slate-500 font-medium font-['Noto_Sans_Devanagari',sans-serif] mt-0.5">
              {scheme.hindiName}
            </p>
          )}
        </div>

        {/* Ministry */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <Building2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          <span className="truncate">{scheme.ministry}</span>
        </div>

        {/* Tagline */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {scheme.tagline}
        </p>

        {/* Direct Financial Benefit Box */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-4">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
            Financial Benefit / Assistance
          </span>
          <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            {scheme.benefitValue}
          </p>
        </div>

        {/* Key Requirements Highlights */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Key Eligibility Highlight
          </span>
          <div className="flex items-start gap-1.5 text-xs text-slate-600">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{scheme.eligibilityCriteria[0]}</span>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onAskAI(scheme.name)}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 py-1 hover:underline cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask AI</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onAutoApply(scheme)}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1 transition shadow-xs cursor-pointer"
            title="Auto-Fill Form & Submit to Gov Portal"
          >
            <Zap className="w-3 h-3 text-amber-300" />
            <span>Auto-Apply</span>
          </button>

          <button
            onClick={() => onSelect(scheme)}
            className="px-3 py-1.5 rounded-lg bg-[#142a47] hover:bg-[#1c385e] text-white text-xs font-semibold flex items-center gap-1 transition shadow-xs cursor-pointer"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
