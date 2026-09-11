import React, { useState } from "react";
import { UserAccount } from "../types";
import { STATES_AND_UTS } from "../data/schemes";
import { Logo } from "./Logo";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Building,
  KeyRound,
  UserCheck,
  Check,
  ExternalLink
} from "lucide-react";

interface AuthPageProps {
  initialMode?: "login" | "register";
  onAuthSuccess: (user: UserAccount) => void;
  onBackToLanding: () => void;
  currentUser?: UserAccount | null;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = "login",
  onAuthSuccess,
  onBackToLanding,
  currentUser,
}) => {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");

  // Registration Form State
  const [regName, setRegName] = useState("");
  const [regMobile, setRegMobile] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regState, setRegState] = useState("");
  const [regCity, setRegCity] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  // Login Form State
  const [loginPhone, setLoginPhone] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to load registered users from localStorage
  const getStoredUsers = (): UserAccount[] => {
    try {
      const stored = localStorage.getItem("bharatscheme_registered_users");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const saveStoredUsers = (users: UserAccount[]) => {
    try {
      localStorage.setItem("bharatscheme_registered_users", JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  };

  // Handle Registration
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validation
    if (!regName.trim()) {
      setErrorMessage("Please enter your full name as per official government records.");
      return;
    }
    const cleanPhone = regMobile.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!regEmail.trim() || !regEmail.includes("@") || !regEmail.includes(".")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!regState) {
      setErrorMessage("Please select your State or Union Territory.");
      return;
    }
    if (!regCity.trim()) {
      setErrorMessage("Please enter your City or District.");
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage("Passwords do not match. Please verify and re-type.");
      return;
    }

    setIsSubmitting(true);
    const users = getStoredUsers();

    // Check if phone or email already registered
    const phoneExists = users.some((u) => u.mobile === cleanPhone);
    if (phoneExists) {
      setIsSubmitting(false);
      setErrorMessage("This mobile number is already registered. Please sign in instead.");
      return;
    }

    const emailExists = users.some((u) => u.email.toLowerCase() === regEmail.trim().toLowerCase());
    if (emailExists) {
      setIsSubmitting(false);
      setErrorMessage("This email ID is already registered. Please sign in instead.");
      return;
    }

    // Create new User Account
    const newUser: UserAccount = {
      id: "usr_" + Date.now(),
      name: regName.trim(),
      mobile: cleanPhone,
      email: regEmail.trim().toLowerCase(),
      state: regState,
      city: regCity.trim(),
      password: regPassword,
      registeredAt: new Date().toISOString(),
      aadhaarNumber: "XXXXXXXX" + cleanPhone.slice(-4),
      bankAccountNumber: "9102" + cleanPhone.slice(0, 6) + "78",
      ifscCode: "SBIN0000451",
      bankName: "State Bank of India",
      gender: "Citizen",
      age: "32",
      occupation: "Citizen",
      category: "General",
      rationCardNumber: "NFSA/2026/" + cleanPhone.slice(2, 8),
      landKhataNumber: "KH-8942/A",
      electricityConsumerId: "DISCOM-UP-984210",
    };

    users.push(newUser);
    saveStoredUsers(users);

    try {
      localStorage.setItem("bharatscheme_current_user", JSON.stringify(newUser));
    } catch (err) {
      console.error(err);
    }

    setSuccessMessage("Citizen profile registered successfully! Opening Web Portal...");
    setTimeout(() => {
      setIsSubmitting(false);
      onAuthSuccess(newUser);
    }, 900);
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const users = getStoredUsers();

    if (loginMethod === "phone") {
      const cleanPhone = loginPhone.replace(/\D/g, "");
      if (cleanPhone.length !== 10) {
        setErrorMessage("Please enter your 10-digit mobile number.");
        return;
      }
      if (!loginPassword) {
        setErrorMessage("Please enter your password.");
        return;
      }

      setIsSubmitting(true);
      const found = users.find((u) => u.mobile === cleanPhone);
      if (!found) {
        setIsSubmitting(false);
        setErrorMessage("No citizen account found with this phone number. Please register your profile first.");
        return;
      }

      if (found.password && found.password !== loginPassword) {
        setIsSubmitting(false);
        setErrorMessage("Incorrect password. Please try again.");
        return;
      }

      // Successful login
      try {
        localStorage.setItem("bharatscheme_current_user", JSON.stringify(found));
      } catch (err) {
        console.error(err);
      }
      setSuccessMessage("Authentication verified! Opening Web Portal...");
      setTimeout(() => {
        setIsSubmitting(false);
        onAuthSuccess(found);
      }, 700);
    } else {
      // Email Login
      const cleanEmail = loginEmail.trim().toLowerCase();
      if (!cleanEmail || !cleanEmail.includes("@")) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }
      if (!loginPassword) {
        setErrorMessage("Please enter your password.");
        return;
      }

      setIsSubmitting(true);
      const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
      if (!found) {
        setIsSubmitting(false);
        setErrorMessage("No citizen account found with this email ID. Please register first.");
        return;
      }

      if (found.password && found.password !== loginPassword) {
        setIsSubmitting(false);
        setErrorMessage("Incorrect password. Please try again.");
        return;
      }

      // Successful login
      try {
        localStorage.setItem("bharatscheme_current_user", JSON.stringify(found));
      } catch (err) {
        console.error(err);
      }
      setSuccessMessage("Authentication verified! Opening Web Portal...");
      setTimeout(() => {
        setIsSubmitting(false);
        onAuthSuccess(found);
      }, 700);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1626] via-[#0f2137] to-[#142a47] text-slate-100 flex flex-col justify-between py-6 px-4 sm:px-6 relative overflow-hidden selection:bg-amber-500 selection:text-slate-950">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="max-w-4xl mx-auto w-full mb-6 z-10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Welcome Landing</span>
          </button>

          <Logo size="sm" variant="dark" />
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="max-w-xl mx-auto w-full z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-[#142a47] text-white p-6 sm:p-7 relative overflow-hidden">
            <div className="relative z-10 space-y-1 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold mb-1 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Official Citizen Digital Welfare ID</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {mode === "login" ? "Sign In to Your Citizen Account" : "Register Your Citizen Profile"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                {mode === "login"
                  ? "Access your saved government schemes, track submitted applications & use 1-click auto-apply."
                  : "Register once to unlock automated scheme applications and instant eligibility calculation."}
              </p>
            </div>

            {/* Mode Switch Tabs */}
            <div className="relative z-10 mt-5 flex rounded-xl bg-[#0a1626]/80 p-1 border border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  mode === "login"
                    ? "bg-amber-400 text-slate-950 shadow-xs"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  mode === "register"
                    ? "bg-amber-400 text-slate-950 shadow-xs"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Register Profile</span>
              </button>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-7 space-y-5">
            {/* Feedback Messages */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* SIGN IN FORM */}
            {mode === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Method Toggle */}
                <div className="flex items-center justify-between text-xs pb-1">
                  <span className="font-semibold text-slate-600">Sign In Method:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setLoginMethod("phone")}
                      className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                        loginMethod === "phone"
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      Mobile Number
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginMethod("email")}
                      className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                        loginMethod === "email"
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      Email ID
                    </button>
                  </div>
                </div>

                {loginMethod === "phone" ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      10-Digit Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-bold border-r border-slate-200 pr-2 my-2">
                        +91
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="9876543210"
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ""))}
                        className="w-full pl-14 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#142a47] font-medium"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Registered Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        placeholder="citizen.name@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#142a47]"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      Account Password <span className="text-rose-500">*</span>
                    </label>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#142a47]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#142a47] hover:bg-[#1c385e] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Verifying Citizen Credentials...</span>
                  ) : (
                    <>
                      <span>Sign In & Open Web Portal</span>
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* REGISTER PROFILE FORM */}
            {mode === "register" && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name (as on Aadhaar / Official ID) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar Verma"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#142a47]"
                      required
                    />
                  </div>
                </div>

                {/* Mobile & Email 2-column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400 text-xs font-bold border-r border-slate-200 pr-1.5 my-1.5">
                        +91
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="9876543210"
                        value={regMobile}
                        onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ""))}
                        className="w-full pl-12 pr-2.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#142a47]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="email"
                        placeholder="name@gmail.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#142a47]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* State & City 2-column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      State / UT <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                      <select
                        value={regState}
                        onChange={(e) => setRegState(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#142a47] bg-white font-medium"
                        required
                      >
                        <option value="">Select State / UT</option>
                        {STATES_AND_UTS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City / District <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        placeholder="e.g. Varanasi / Pune"
                        value={regCity}
                        onChange={(e) => setRegCity(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#142a47]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Password (min 6 chars) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#142a47]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Confirm Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Re-enter password"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#142a47]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Info pill about auto-fill benefits */}
                <div className="p-3 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    <strong>Auto-Apply Enabled:</strong> Registering your profile automatically enables 1-click official form auto-fill for all Central & State welfare programs.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-sm font-extrabold flex items-center justify-center gap-2 shadow-md transition cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Registering Citizen Profile...</span>
                  ) : (
                    <>
                      <span>Register Profile & Open Web Portal</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Quick Toggle link between Sign In & Register */}
            <div className="text-center pt-2 text-xs text-slate-600">
              {mode === "login" ? (
                <span>
                  New to Bharat Schemes?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setErrorMessage("");
                    }}
                    className="text-[#142a47] font-bold hover:underline cursor-pointer"
                  >
                    Register citizen profile
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setErrorMessage("");
                    }}
                    className="text-[#142a47] font-bold hover:underline cursor-pointer"
                  >
                    Sign in here
                  </button>
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Footer Guarantee */}
        <div className="mt-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Secured with 256-bit encryption • Direct Benefit Transfer (DBT) Citizen Gateway</span>
        </div>
      </main>

      {/* Bottom spacer / copyright */}
      <footer className="max-w-4xl mx-auto w-full text-center text-[11px] text-slate-400 pt-4 z-10">
        © 2026 Bharat Schemes Portal • National Welfare Gateway • All data encrypted and protected
      </footer>
    </div>
  );
};
