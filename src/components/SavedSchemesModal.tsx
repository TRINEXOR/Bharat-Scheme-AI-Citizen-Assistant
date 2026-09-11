import React from "react";
import { Scheme } from "../types";
import {
  X,
  Bookmark,
  Trash2,
  ExternalLink,
  ArrowRight,
  IndianRupee,
  Share2
} from "lucide-react";

interface SavedSchemesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedSchemes: Scheme[];
  onRemove: (id: string) => void;
  onSelectScheme: (scheme: Scheme) => void;
}

export const SavedSchemesModal: React.FC<SavedSchemesModalProps> = ({
  isOpen,
  onClose,
  savedSchemes,
  onRemove,
  onSelectScheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#142a47] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500 text-slate-950 font-bold">
              <Bookmark className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <h3 className="text-lg font-bold">My Saved Schemes</h3>
              <p className="text-xs text-slate-300">
                {savedSchemes.length} schemes bookmarked for application
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Schemes List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {savedSchemes.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                No saved schemes yet
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click the bookmark icon on any scheme card while exploring to keep track of schemes you want to apply for.
              </p>
            </div>
          ) : (
            savedSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition flex items-center justify-between gap-4 flex-wrap"
              >
                <div className="space-y-1 flex-1 min-w-[240px]">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                      {scheme.category}
                    </span>
                    {scheme.isDBT && (
                      <span className="text-[10px] font-bold text-emerald-700">
                        DBT Enabled
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {scheme.name}
                  </h4>
                  <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5" />
                    {scheme.benefitValue}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectScheme(scheme);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#142a47] text-white text-xs font-semibold hover:bg-[#1c385e] transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onRemove(scheme.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
