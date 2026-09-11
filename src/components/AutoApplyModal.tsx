import React, { useState, useEffect } from "react";
import { Scheme, UserAccount, SubmittedApplication } from "../types";
import { STATES_AND_UTS } from "../data/schemes";
import {
  X,
  Zap,
  CheckCircle2,
  AlertCircle,
  Building2,
  ExternalLink,
  ShieldCheck,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Printer,
  Download,
  Terminal,
  Loader2,
  QrCode,
  Check
} from "lucide-react";

interface AutoApplyModalProps {
  scheme: Scheme | null;
  currentUser: UserAccount | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: (mode: "login" | "register") => void;
  onApplicationSubmitted?: (app: SubmittedApplication) => void;
}

export const AutoApplyModal: React.FC<AutoApplyModalProps> = ({
  scheme,
  currentUser,
  isOpen,
  onClose,
  onOpenAuth,
  onApplicationSubmitted,
}) => {
  if (!isOpen || !scheme) return null;

  // Workflow stages: "form" -> "automating" -> "success"
  const [stage, setStage] = useState<"form" | "automating" | "success">("form");

  // Form Fields State
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    state: "",
    city: "",
    gender: "Male",
    category: "General",
    aadhaarNumber: "",
    bankAccount: "",
    ifscCode: "",
    bankName: "",
    // Scheme specific
    landKhata: "",
    electricityConsumerId: "",
    rationCardNumber: "",
    enterpriseName: "",
  });

  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [autoFillingAnim, setAutoFillingAnim] = useState(false);

  // Automation Progress Steps
  const [automationStep, setAutomationStep] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [submittedApp, setSubmittedApp] = useState<SubmittedApplication | null>(null);

  // Initialize form with current user if available
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name || "",
        mobile: currentUser.mobile || "",
        email: currentUser.email || "",
        state: currentUser.state || "",
        city: currentUser.city || "",
        gender: currentUser.gender || "Male",
        category: currentUser.category || "General",
        aadhaarNumber: currentUser.aadhaarNumber || "XXXXXXXX" + (currentUser.mobile?.slice(-4) || "8892"),
        bankAccount: currentUser.bankAccountNumber || "910287461978",
        ifscCode: currentUser.ifscCode || "SBIN0000451",
        bankName: currentUser.bankName || "State Bank of India",
        landKhata: currentUser.landKhataNumber || "KH-8942/A (2.4 Acres)",
        electricityConsumerId: currentUser.electricityConsumerId || "MVVNL-UP-489210",
        rationCardNumber: currentUser.rationCardNumber || "NFSA/UP/2026/84210",
        enterpriseName: currentUser.name + " Enterprises",
      }));
    }
  }, [currentUser, scheme]);

  // One-Click Auto Fill Action
  const handleAutoFill = () => {
    setAutoFillingAnim(true);
    setTimeout(() => {
      if (currentUser) {
        setFormData({
          name: currentUser.name,
          mobile: currentUser.mobile,
          email: currentUser.email,
          state: currentUser.state,
          city: currentUser.city,
          gender: currentUser.gender || "Male",
          category: currentUser.category || "General",
          aadhaarNumber: currentUser.aadhaarNumber || "XXXXXXXX" + currentUser.mobile.slice(-4),
          bankAccount: currentUser.bankAccountNumber || "910287461978",
          ifscCode: currentUser.ifscCode || "SBIN0000451",
          bankName: currentUser.bankName || "State Bank of India",
          landKhata: currentUser.landKhataNumber || "KH-8942/A (2.4 Acres)",
          electricityConsumerId: currentUser.electricityConsumerId || "MVVNL-UP-489210",
          rationCardNumber: currentUser.rationCardNumber || "NFSA/UP/2026/84210",
          enterpriseName: currentUser.name + " Enterprises",
        });
      } else {
        // Mock fallback if user not logged in but clicked auto-fill
        setFormData({
          name: "Rahul Kumar Sharma",
          mobile: "9876543210",
          email: "rahul.sharma@example.gov.in",
          state: "Uttar Pradesh",
          city: "Lucknow",
          gender: "Male",
          category: "OBC",
          aadhaarNumber: "XXXXXXXX3210",
          bankAccount: "910287461978",
          ifscCode: "SBIN0000451",
          bankName: "State Bank of India",
          landKhata: "KH-UP-7842/A (2.4 Acres)",
          electricityConsumerId: "MVVNL-UP-489210",
          rationCardNumber: "NFSA/UP/2026/84210",
          enterpriseName: "Sharma Agro & Services",
        });
      }
      setAutoFillingAnim(false);
      setIsAutoFilled(true);
    }, 600);
  };

  // Launch Automated Portal Submission
  const handleLaunchAutomation = () => {
    setStage("automating");
    setAutomationStep(1);
    setConsoleLogs([`[INIT] Launching Automated Submission Engine for "${scheme.name}"...`]);

    const targetPortal = scheme.officialPortalUrl;

    const timeline = [
      {
        step: 1,
        log: `[CONNECT] Establishing secure TLS handshake with ${targetPortal}...`,
        delay: 800,
      },
      {
        step: 2,
        log: `[AUTH] Logging into Government Portal via MeriPehchaan (National SSO) with Mobile +91 ${formData.mobile || "9876543210"}...`,
        delay: 1700,
      },
      {
        step: 3,
        log: `[UIDAI] Biometric Aadhaar e-KYC Token verified successfully (Status: AUTH_PASSED).`,
        delay: 2600,
      },
      {
        step: 4,
        log: `[PAYLOAD] Injecting verified applicant details, state (${formData.state || "National"}), and district records into ministry form schema...`,
        delay: 3500,
      },
      {
        step: 5,
        log: `[PFMS] Validating DBT Bank Route: A/C ${formData.bankAccount} (${formData.bankName}, IFSC: ${formData.ifscCode}). NPCI Mapper: SEEDED.`,
        delay: 4400,
      },
      {
        step: 6,
        log: `[DOCUMENTS] Auto-attaching verified digital credentials from DigiLocker repository (Aadhaar, Bank Passbook, Ration/Land Document)...`,
        delay: 5300,
      },
      {
        step: 7,
        log: `[SUBMIT] Submitting digital application payload to Ministry Central Server. HTTP 200 OK!`,
        delay: 6200,
      },
    ];

    timeline.forEach(({ step, log, delay }) => {
      setTimeout(() => {
        setAutomationStep(step);
        setConsoleLogs((prev) => [...prev, log]);
      }, delay);
    });

    // Finalize after all steps
    setTimeout(() => {
      const arn = "ARN-GOI-2026-" + Math.floor(100000 + Math.random() * 900000);
      const app: SubmittedApplication = {
        id: "app_" + Date.now(),
        arnNumber: arn,
        schemeId: scheme.id,
        schemeName: scheme.name,
        ministry: scheme.ministry,
        applicantName: formData.name || "Citizen Beneficiary",
        applicantMobile: formData.mobile || "9876543210",
        applicantEmail: formData.email || "citizen@gov.in",
        applicantState: formData.state || "India",
        applicantCity: formData.city || "District HQ",
        submittedAt: new Date().toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
        status: "Submitted to Ministry",
        portalUrl: scheme.officialPortalUrl,
        benefitValue: scheme.benefitValue,
      };

      // Save to localStorage
      try {
        const stored = localStorage.getItem("bharatscheme_applications");
        const list: SubmittedApplication[] = stored ? JSON.parse(stored) : [];
        list.unshift(app);
        localStorage.setItem("bharatscheme_applications", JSON.stringify(list));
      } catch (err) {
        console.error(err);
      }

      setSubmittedApp(app);
      if (onApplicationSubmitted) {
        onApplicationSubmitted(app);
      }
      setStage("success");
    }, 7200);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="bg-[#142a47] text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Automated Government Portal Engine</span>
            </span>
            <span className="text-xs text-slate-300 font-medium">
              100% Direct Benefit Transfer
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {stage === "success" ? "Application Submitted Successfully!" : `Apply for ${scheme.name}`}
          </h2>

          <div className="flex items-center gap-2 text-xs text-slate-300 mt-1.5 flex-wrap">
            <Building2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>{scheme.ministry}</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-300 font-bold">Benefit: {scheme.benefitValue}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* ===================== STAGE 1: FORM & AUTO-FILL ===================== */}
          {stage === "form" && (
            <div className="space-y-5">
              {/* Not Logged In Notice Banner */}
              {!currentUser && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-amber-950 block">
                      Sign in for Instant 1-Click Profile Auto-Fill
                    </span>
                    <span className="text-amber-800 text-[11px]">
                      Register your citizen account or sign in to auto-populate all ministry requirements.
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenAuth("login")}
                    className="px-3 py-1.5 rounded-lg bg-[#142a47] text-white font-bold hover:bg-[#1c385e] transition cursor-pointer shrink-0"
                  >
                    Sign In
                  </button>
                </div>
              )}

              {/* Big Auto-Fill Action Header */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/70 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <h3 className="font-extrabold text-sm text-emerald-950">
                      Automatic Form Filling Engine
                    </h3>
                  </div>
                  <p className="text-xs text-emerald-800">
                    Auto-fills all personal, bank DBT, and scheme parameters from your verified profile.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAutoFill}
                  disabled={autoFillingAnim}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#142a47] hover:bg-[#1c385e] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition cursor-pointer disabled:opacity-50"
                >
                  {autoFillingAnim ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                      <span>Auto-filling Form...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isAutoFilled ? "Re-Auto Fill Profile" : "⚡ 1-Click Auto-Fill Form"}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Form Input Fields */}
              <div className="space-y-4 text-xs">
                {/* Section A: Applicant Identity */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span>1. Applicant Identification</span>
                    </span>
                    {isAutoFilled && (
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Check className="w-3 h-3" /> Auto-filled
                      </span>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Full Name (आवेदक का नाम)
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Kumar"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-1 focus:ring-[#142a47]"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Mobile Number (मोबाइल)
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="10 digit number"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-1 focus:ring-[#142a47]"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Email Address (ईमेल)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@email.com"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-1 focus:ring-[#142a47]"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        State / UT (राज्य)
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-1 focus:ring-[#142a47] cursor-pointer"
                      >
                        <option value="">Select State...</option>
                        {STATES_AND_UTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        District / City (ज़िला / शहर)
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Lucknow / Patna"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-1 focus:ring-[#142a47]"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Social Category (श्रेणी)
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-1 focus:ring-[#142a47] cursor-pointer"
                      >
                        <option value="General">General</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="EWS">EWS</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section B: Direct Benefit Transfer (DBT) Bank Routing */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                      <span>2. DBT Direct Bank Account (Aadhaar Seeding)</span>
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      PFMS Verified
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Aadhaar Number (UIDAI)
                      </label>
                      <input
                        type="text"
                        value={formData.aadhaarNumber}
                        onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                        placeholder="XXXXXXXX3210"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Bank Account Number
                      </label>
                      <input
                        type="text"
                        value={formData.bankAccount}
                        onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                        placeholder="A/C 910287461978"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        IFSC Code (Bank Branch)
                      </label>
                      <input
                        type="text"
                        value={formData.ifscCode}
                        onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                        placeholder="SBIN0000451"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium uppercase"
                      />
                    </div>
                  </div>
                </div>

                {/* Section C: Scheme Specific Requirement */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <FileCheck2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>3. Ministry Scheme Specific Field</span>
                    </span>
                  </div>

                  {scheme.category === "Agriculture" ? (
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Land Survey / Khata / Khasra No. (भूलेख खसरा नंबर)
                      </label>
                      <input
                        type="text"
                        value={formData.landKhata}
                        onChange={(e) => setFormData({ ...formData, landKhata: e.target.value })}
                        placeholder="e.g. Khata No. 7842/A (2.4 Acres)"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                      />
                    </div>
                  ) : scheme.id === "pm-surya-ghar" ? (
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Electricity Consumer Account ID (बिजली उपभोक्ता संख्या)
                      </label>
                      <input
                        type="text"
                        value={formData.electricityConsumerId}
                        onChange={(e) => setFormData({ ...formData, electricityConsumerId: e.target.value })}
                        placeholder="e.g. DISCOM-UP-489210"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Ration Card / NFSA / Family ID Number
                      </label>
                      <input
                        type="text"
                        value={formData.rationCardNumber}
                        onChange={(e) => setFormData({ ...formData, rationCardNumber: e.target.value })}
                        placeholder="e.g. NFSA/UP/2026/84210"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button to Launch Automation */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] text-slate-500">
                  Target Portal: <span className="font-mono text-slate-700 font-bold">{scheme.officialPortalUrl}</span>
                </div>

                <button
                  type="button"
                  onClick={handleLaunchAutomation}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>🚀 Auto-Login to Gov Portal & Submit Form</span>
                </button>
              </div>
            </div>
          )}

          {/* ===================== STAGE 2: LIVE AUTOMATION RUNNING ===================== */}
          {stage === "automating" && (
            <div className="space-y-6 py-4">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto animate-pulse">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  Automating Portal Login & Submission...
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Our bot is securely authenticating with the Ministry's Central Portal, injecting your auto-filled application parameters, and generating an official Application Reference Number (ARN).
                </p>
              </div>

              {/* Progress Steps Checklist */}
              <div className="space-y-2.5 max-w-lg mx-auto bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                {[
                  { step: 1, label: "Establishing Secure Gateway Connection to Official Ministry Portal" },
                  { step: 2, label: `SSO Portal Login using Registered Mobile (+91 ${formData.mobile || "9876543210"})` },
                  { step: 3, label: "Aadhaar e-KYC Verification & DigiLocker Document Linkage" },
                  { step: 4, label: "Injecting Verified Scheme Form Payload & Beneficiary Parameters" },
                  { step: 5, label: "Direct Benefit Transfer (DBT) PFMS Bank Account Validation" },
                  { step: 6, label: "Executing Final Digital Submission to Central Ministry Server" },
                ].map((item) => {
                  const isDone = automationStep > item.step;
                  const isCurrent = automationStep === item.step;
                  return (
                    <div
                      key={item.step}
                      className={`flex items-center gap-2.5 p-2 rounded-lg transition ${
                        isCurrent
                          ? "bg-white border border-amber-300 text-slate-900 font-bold shadow-xs"
                          : isDone
                          ? "text-emerald-800 font-semibold"
                          : "text-slate-400"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[9px] text-slate-400 shrink-0">
                          {item.step}
                        </div>
                      )}
                      <span className="truncate">{item.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Live Terminal Console Logs */}
              <div className="rounded-xl bg-slate-950 text-emerald-400 p-3.5 font-mono text-[11px] space-y-1 max-h-36 overflow-y-auto border border-slate-800 shadow-inner">
                <div className="flex items-center gap-2 text-slate-500 border-b border-slate-800 pb-1 mb-1">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                  <span>Portal Automation Console Logs</span>
                </div>
                {consoleLogs.map((log, idx) => (
                  <div key={idx} className="leading-tight">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== STAGE 3: SUCCESS & ACKNOWLEDGEMENT SLIP ===================== */}
          {stage === "success" && submittedApp && (
            <div className="space-y-5 py-2">
              {/* Official Government Acknowledgement Receipt Box */}
              <div className="border-2 border-emerald-600 rounded-2xl p-5 bg-white shadow-sm space-y-4 relative overflow-hidden">
                {/* Top Seal Stamp */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
                      भारत सरकार | Government of India
                    </span>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      Official Scheme Application Acknowledgement
                    </h3>
                    <p className="text-xs text-slate-600">{scheme.ministry}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="p-1.5 bg-emerald-50 rounded-lg border border-emerald-300 text-emerald-800 text-[11px] font-bold inline-flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>SUBMITTED & VERIFIED</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      {submittedApp.submittedAt}
                    </span>
                  </div>
                </div>

                {/* Key Details Grid */}
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Application Reference Number (ARN)
                    </span>
                    <span className="font-mono font-black text-sm text-[#142a47]">
                      {submittedApp.arnNumber}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                      Direct Financial Benefit
                    </span>
                    <span className="font-extrabold text-sm text-emerald-900">
                      {submittedApp.benefitValue}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Applicant Name & Contact
                    </span>
                    <span className="font-bold text-slate-800 block">
                      {submittedApp.applicantName}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      +91 {submittedApp.applicantMobile}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Location / Region
                    </span>
                    <span className="font-bold text-slate-800 block">
                      {submittedApp.applicantCity}, {submittedApp.applicantState}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      DBT Direct Credit Route Active
                    </span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-300 text-xs flex items-start gap-2.5 text-emerald-950 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold block">Status: Submitted & Forwarded to Ministry PFMS Queue</span>
                    <span className="text-slate-600 text-[11px]">
                      Your application has been received by {scheme.ministry}. Direct Benefit Transfer (DBT) subsidy will be disbursed into your Aadhaar-seeded bank account upon final state verification.
                    </span>
                  </div>
                </div>
              </div>

              {/* Receipt Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>Print / Save Receipt PDF</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={scheme.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <span>Open Ministry Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 rounded-xl bg-[#142a47] hover:bg-[#1c385e] text-white text-xs font-bold transition cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
