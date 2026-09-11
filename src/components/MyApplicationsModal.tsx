import React from "react";
import { SubmittedApplication } from "../types";
import {
  X,
  FileCheck2,
  ExternalLink,
  ShieldCheck,
  Calendar,
  IndianRupee,
  Building2,
  Printer,
  ChevronRight,
  Sparkles
} from "lucide-react";

interface MyApplicationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: SubmittedApplication[];
  onOpenSchemeApply?: (schemeId: string) => void;
  onApplyNew?: () => void;
}

export const MyApplicationsModal: React.FC<MyApplicationsModalProps> = ({
  isOpen,
  onClose,
  applications,
  onApplyNew,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="bg-[#142a47] text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct Benefit Transfer (DBT) Registry</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            My Submitted Applications (मेरे आवेदन)
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Track real-time status of your automated scheme submissions to Central & State government portals.
          </p>
        </div>

        {/* Body List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {applications.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mx-auto">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-700">
                No Applications Submitted Yet
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Browse any scheme from the explorer and use the "⚡ Auto-Fill & Apply" button to automatically fill and submit forms to official government portals.
              </p>
              {onApplyNew && (
                <button
                  onClick={onApplyNew}
                  className="px-4 py-2 rounded-xl bg-[#142a47] hover:bg-[#1c385e] text-white text-xs font-bold transition shadow-xs cursor-pointer mt-2"
                >
                  Browse Schemes & Auto-Apply
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition space-y-3 shadow-2xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div>
                      <span className="font-mono font-bold text-xs text-[#142a47] bg-slate-100 px-2 py-0.5 rounded">
                        ARN: {app.arnNumber}
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900 mt-1">
                        {app.schemeName}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 self-start sm:self-center">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>{app.status}</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-2 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{app.ministry}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-bold text-emerald-800">{app.benefitValue}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{app.submittedAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-slate-500 text-[11px]">
                      Applicant: <strong className="text-slate-800">{app.applicantName}</strong> (+91 {app.applicantMobile})
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.print()}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1 text-[11px] transition cursor-pointer"
                        title="Print Receipt"
                      >
                        <Printer className="w-3 h-3 text-slate-500" />
                        <span>Receipt</span>
                      </button>

                      <a
                        href={app.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-[#142a47] text-white hover:bg-[#1c385e] font-semibold flex items-center gap-1 text-[11px] transition"
                      >
                        <span>Portal</span>
                        <ExternalLink className="w-3 h-3 text-slate-300" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#142a47] hover:bg-[#1c385e] text-white text-xs font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
