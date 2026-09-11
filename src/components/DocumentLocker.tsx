import React, { useState } from "react";
import { COMMON_DOCUMENTS, SCHEMES } from "../data/schemes";
import { DocumentItem } from "../types";
import {
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Building2,
  FileText,
  Sparkles,
  Info,
  Check,
  X
} from "lucide-react";

interface DocumentLockerProps {
  onAskAI: (query: string) => void;
  onSelectSchemeById: (id: string) => void;
}

export const DocumentLocker: React.FC<DocumentLockerProps> = ({
  onAskAI,
  onSelectSchemeById,
}) => {
  const [documents, setDocuments] = useState<DocumentItem[]>(COMMON_DOCUMENTS);

  const toggleDocument = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, isAvailable: !doc.isAvailable } : doc
      )
    );
  };

  const availableCount = documents.filter((d) => d.isAvailable).length;
  const readinessPercentage = Math.round((availableCount / documents.length) * 100);

  // Determine which schemes are 100% ready based on core document availability
  const hasAadhaar = documents.find((d) => d.id === "doc-aadhaar")?.isAvailable;
  const hasBank = documents.find((d) => d.id === "doc-bank")?.isAvailable;
  const hasLand = documents.find((d) => d.id === "doc-land")?.isAvailable;
  const hasRation = documents.find((d) => d.id === "doc-ration")?.isAvailable;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-[#142a47] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-400/30">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Citizen Document Readiness Locker</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Government Document & KYC Readiness Checker
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Ensure your official documents and Direct Benefit Transfer (DBT) bank seeding are verified to prevent rejections or delays during scheme application.
          </p>
        </div>
      </div>

      {/* Readiness Status Meter */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs grid sm:grid-cols-12 gap-6 items-center">
        <div className="sm:col-span-8 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Overall Application Readiness
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                {readinessPercentage}% Documents Verified
              </h3>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800">
              {availableCount} of {documents.length} Ready
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-600 transition-all duration-500 rounded-full"
              style={{ width: `${readinessPercentage}%` }}
            />
          </div>

          <p className="text-xs text-slate-600">
            {readinessPercentage >= 75
              ? "Excellent! You possess the required documentation to apply for almost all flagship welfare programs."
              : "Tip: Obtain the remaining certificates (like Income or Land records) from your state Seva Kendra to maximize eligibility."}
          </p>
        </div>

        <div className="sm:col-span-4 bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Critical DBT Rule:</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            All direct cash transfer schemes (PM-KISAN, Ladli Behna, PMAY, Subsidies) require bank accounts to be mapped with <strong>NPCI (National Payments Corporation of India)</strong>.
          </p>
          <button
            onClick={() => onAskAI("How do I check my NPCI bank account DBT seeding status for government schemes?")}
            className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>Check NPCI status guide via AI</span>
          </button>
        </div>
      </div>

      {/* Interactive Document Checklist */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Your Document Portfolio Checklist
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => toggleDocument(doc.id)}
              className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                doc.isAvailable
                  ? "bg-white border-emerald-300 shadow-xs ring-1 ring-emerald-500/20"
                  : "bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-white"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition ${
                        doc.isAvailable
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {doc.isAvailable ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <X className="w-3 h-3 text-slate-300" />
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {doc.name}
                    </h3>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {doc.category}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3 pl-8">
                  {doc.description}
                </p>

                {doc.notes && (
                  <div className="pl-8 mb-3">
                    <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                      💡 {doc.notes}
                    </span>
                  </div>
                )}
              </div>

              {/* Schemes Requiring this */}
              <div className="pl-8 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold text-slate-400">
                    Required for:
                  </span>
                  {doc.requiredFor.map((sch, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                    >
                      {sch}
                    </span>
                  ))}
                </div>

                <span
                  className={`text-[10px] font-bold ${
                    doc.isAvailable ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  {doc.isAvailable ? "Ready" : "Missing"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Issuance Portals & DigiLocker Assistance */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#142a47]" />
          <span>Where to obtain official digital copies in India?</span>
        </h3>

        <div className="grid sm:grid-cols-3 gap-4 text-xs">
          <a
            href="https://www.digilocker.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-400 transition shadow-xs group"
          >
            <span className="font-bold text-slate-900 block group-hover:text-amber-700">
              DigiLocker Portal
            </span>
            <p className="text-slate-500 text-[11px] mt-1">
              Download legally recognized Aadhaar, Driving License, PAN, and Ration Card.
            </p>
            <div className="flex items-center gap-1 text-amber-700 font-semibold mt-2">
              <span>digilocker.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>

          <a
            href="https://myaadhaar.uidai.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-400 transition shadow-xs group"
          >
            <span className="font-bold text-slate-900 block group-hover:text-amber-700">
              UIDAI myAadhaar Portal
            </span>
            <p className="text-slate-500 text-[11px] mt-1">
              Check bank seeding status, update mobile number, and download e-Aadhaar.
            </p>
            <div className="flex items-center gap-1 text-amber-700 font-semibold mt-2">
              <span>myaadhaar.uidai.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>

          <a
            href="https://findmycsc.nic.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-400 transition shadow-xs group"
          >
            <span className="font-bold text-slate-900 block group-hover:text-amber-700">
              Find Nearest CSC Kendra
            </span>
            <p className="text-slate-500 text-[11px] mt-1">
              Locate physical Digital Seva CSC centres for biometric e-KYC and certificates.
            </p>
            <div className="flex items-center gap-1 text-amber-700 font-semibold mt-2">
              <span>findmycsc.nic.in</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
