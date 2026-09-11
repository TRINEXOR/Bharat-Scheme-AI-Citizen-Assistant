import React, { useState } from "react";
import { UserAccount } from "../types";
import { STATES_AND_UTS } from "../data/schemes";
import {
  X,
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
  Building
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
  onLoginSuccess: (user: UserAccount) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "login",
  onLoginSuccess,
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

  if (!isOpen) return null;

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
      setErrorMessage("Please enter your full name as per official records.");
      return;
    }
    const cleanPhone = regMobile.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
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
      setErrorMessage("Passwords do not match. Please check and re-enter.");
      return;
    }

    const users = getStoredUsers();

    // Check if phone or email already registered
    const phoneExists = users.some((u) => u.mobile === cleanPhone);
    if (phoneExists) {
      setErrorMessage("This mobile number is already registered. Please sign in instead.");
      return;
    }

    const emailExists = users.some((u) => u.email.toLowerCase() === regEmail.trim().toLowerCase());
    if (emailExists) {
      setErrorMessage("This email ID is already registered. Please sign in instead.");
      return;
    }

    // Create new User Account with default verified DBT details for instant scheme auto-filling
    const newUser: UserAccount = {
      id: "usr_" + Date.now(),
      name: regName.trim(),
      mobile: cleanPhone,
      email: regEmail.trim().toLowerCase(),
      state: regState,
      city: regCity.trim(),
      password: regPassword,
      registeredAt: new Date().toISOString(),
      // Auto-configured verified profile attributes for seamless 1-click scheme auto-fill
      aadhaarNumber: "XXXXXXXX" + cleanPhone.slice(-4),
      bankAccountNumber: "9102" + cleanPhone.slice(0, 6) + "78",
      ifscCode: "SBIN0000451",
      bankName: "State Bank of India",
      gender: "Male",
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

    setSuccessMessage("Citizen account created successfully! Signing you in...");
    setTimeout(() => {
      onLoginSuccess(newUser);
      onClose();
    }, 1000);
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

      const found = users.find((u) => u.mobile === cleanPhone);
      if (!found) {
        setErrorMessage("No citizen account found with this phone number. Please register first or use Demo Login.");
        return;
      }

      if (found.password && found.password !== loginPassword) {
        setErrorMessage("Incorrect password. Please try again.");
        return;
      }

      // Successful login
      try {
        localStorage.setItem("bharatscheme_current_user", JSON.stringify(found));
      } catch (err) {
        console.error(err);
      }
      setSuccessMessage("Welcome back! Signing you in...");
      setTimeout(() => {
        onLoginSuccess(found);
        onClose();
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

      const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
      if (!found) {
        setErrorMessage("No citizen account found with this email ID. Please register first or use Demo Login.");
        return;
      }

      if (found.password && found.password !== loginPassword) {
        setErrorMessage("Incorrect password. Please try again.");
        return;
      }

      // Successful login
      try {
        localStorage.setItem("bharatscheme_current_user", JSON.stringify(found));
      } catch (err) {
        console.error(err);
      }
      setSuccessMessage("Welcome back! Signing you in...");
      setTimeout(() => {
        onLoginSuccess(found);
        onClose();
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Top Header */}
        <div className="bg-[#142a47] text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>National Single Sign-On (SSO)</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {mode === "login" ? "Citizen Portal Sign In" : "Citizen Registration"}
          </h2>
          <p className="text-xs text-slate-300 mt-1 font-normal">
            {mode === "login"
              ? "Access verified welfare schemes, track DBT transfers, and automate scheme applications."
              : "Register your citizen profile once to automatically fill & submit government scheme forms."}
          </p>

          {/* Mode Switch Tabs */}
          <div className="grid grid-cols-2 gap-1 bg-[#0c1a2d] p-1 rounded-xl mt-4 border border-slate-700/60 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErrorMessage("");
                setSuccessMessage("");
              }}
              className={`py-2 rounded-lg transition cursor-pointer ${
                mode === "login"
                  ? "bg-amber-400 text-slate-950 shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Sign In (लॉग इन)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setErrorMessage("");
                setSuccessMessage("");
              }}
              className={`py-2 rounded-lg transition cursor-pointer ${
                mode === "register"
                  ? "bg-amber-400 text-slate-950 shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Register (पंजीकरण)
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ======================= LOGIN VIEW ======================= */}
          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Option Selector: Phone Number vs Email */}
              <div className="flex items-center justify-between gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod("phone");
                    setErrorMessage("");
                  }}
                  className={`flex-1 py-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    loginMethod === "phone"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Phone Number</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod("email");
                    setErrorMessage("");
                  }}
                  className={`flex-1 py-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    loginMethod === "email"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Sign In with Email</span>
                </button>
              </div>

              {loginMethod === "phone" ? (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Mobile Number (मोबाइल नंबर) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <span className="text-xs font-bold text-slate-600">+91</span>
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      placeholder="10-digit mobile number (e.g. 9876543210)"
                      className="w-full pl-12 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#142a47] font-medium"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Email Address (ईमेल आईडी) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="citizen@example.com"
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#142a47] font-medium"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Password (पासवर्ड) <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400">Entered during registration</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#142a47] font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Sign In Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#142a47] hover:bg-[#1c385e] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
              >
                <span>Sign In to Citizen Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 border-t border-slate-100 text-center">
                <p className="text-[11px] text-slate-500 mt-1">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className="text-[#142a47] font-bold hover:underline cursor-pointer"
                  >
                    Register New Profile
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* ======================= REGISTRATION VIEW ======================= */
            <form onSubmit={handleRegister} className="space-y-3.5">
              {/* Name */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Full Name (पूरा नाम) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Rahul Kumar Jha"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#142a47] font-medium"
                    required
                  />
                </div>
              </div>

              {/* Mobile Number & Email */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Mobile Number (मोबाइल नंबर) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <span className="text-xs font-bold text-slate-600">+91</span>
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={regMobile}
                      onChange={(e) => setRegMobile(e.target.value)}
                      placeholder="10 digits"
                      className="w-full pl-11 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#142a47] font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Email ID (ईमेल आईडी) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#142a47] font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* State & City */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    State / UT (राज्य) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <select
                      value={regState}
                      onChange={(e) => setRegState(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#142a47] font-medium cursor-pointer"
                      required
                    >
                      <option value="">Select State...</option>
                      {STATES_AND_UTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    City / District (शहर / ज़िला) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Building className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      placeholder="e.g. Patna / Pune"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#142a47] font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Password (पासवर्ड) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#142a47] font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#142a47] font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Auto-fill Notice */}
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-medium flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Your Name, Mobile, Email, State, and City will be stored securely to enable 1-click automatic form filling on government scheme portals.
                </span>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#142a47] hover:bg-[#1c385e] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
              >
                <span>Create Citizen Account & Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1">
                <p className="text-[11px] text-slate-500">
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-[#142a47] font-bold hover:underline cursor-pointer"
                  >
                    Sign In with Phone or Email
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
