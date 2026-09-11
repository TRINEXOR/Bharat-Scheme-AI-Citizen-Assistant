import React, { useState } from "react";
import {
  PhoneCall,
  ExternalLink,
  Copy,
  Check,
  Building2,
  ShieldCheck,
  Globe,
  MapPin,
  HelpCircle,
  Clock,
  Sparkles
} from "lucide-react";

interface HelplineDirectoryProps {
  onAskAI: (query: string) => void;
}

export const HelplineDirectory: React.FC<HelplineDirectoryProps> = ({ onAskAI }) => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const copyToClipboard = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const flagshipHelplines = [
    {
      scheme: "Ayushman Bharat (PM-JAY)",
      number: "14555",
      timing: "24x7 All Days (Toll Free)",
      purpose: "Hospitalization, Golden Card generation, hospital grievance & cashless claims",
      portal: "https://beneficiary.nha.gov.in",
      category: "Healthcare",
    },
    {
      scheme: "PM-KISAN Samman Nidhi",
      number: "155261",
      altNumber: "011-24300606",
      timing: "9:30 AM - 6:00 PM (Working Days)",
      purpose: "₹6,000 installment tracking, e-KYC issues, land seeding & bank account errors",
      portal: "https://pmkisan.gov.in",
      category: "Agriculture",
    },
    {
      scheme: "PM Surya Ghar: Muft Bijli",
      number: "15555",
      altNumber: "1800-180-3333",
      timing: "9:00 AM - 7:00 PM",
      purpose: "Rooftop solar application status, DISCOM net meter inspection & subsidy credit",
      portal: "https://pmsuryaghar.gov.in",
      category: "Energy & Solar",
    },
    {
      scheme: "PM MUDRA & Jan Dhan Yojana",
      number: "1800-11-0001",
      altNumber: "1800-180-1111",
      timing: "24x7 (Toll Free)",
      purpose: "Collateral-free business loans, bank branch grievances & RuPay card support",
      portal: "https://www.mudra.org.in",
      category: "Business & Loans",
    },
    {
      scheme: "PM Vishwakarma Artisan Support",
      number: "1800-267-7777",
      altNumber: "17923",
      timing: "9:00 AM - 6:00 PM",
      purpose: "18 traditional trades registration, ₹15,000 toolkit voucher & 5% loans",
      portal: "https://pmvishwakarma.gov.in",
      category: "Artisans & MSME",
    },
    {
      scheme: "PM Ujjwala Yojana 2.0 (LPG)",
      number: "1800-266-6696",
      altNumber: "1906 (24x7 Emergency)",
      timing: "24x7 All Days",
      purpose: "Free gas connection, ₹300 refill subsidy status & gas leakage safety",
      portal: "https://www.pmuy.gov.in",
      category: "Energy & LPG",
    },
    {
      scheme: "Atal Pension Yojana (PFRDA)",
      number: "1800-110-069",
      timing: "9:30 AM - 6:00 PM",
      purpose: "PRAN card inquiry, monthly pension contribution updates & spouse nomination",
      portal: "https://www.npscra.nsdl.co.in",
      category: "Pensions",
    },
    {
      scheme: "PM SVANidhi (Street Vendors)",
      number: "1800-11-1979",
      timing: "9:00 AM - 5:30 PM",
      purpose: "Working capital loan approval, ULB vendor recommendation letters & 7% subsidy",
      portal: "https://pmsvanidhi.mohua.gov.in",
      category: "Micro Credit",
    },
  ];

  const nationalEmergencyNumbers = [
    { name: "Emergency Response Support (Police/Fire/Ambulance)", number: "112" },
    { name: "Women in Distress National Helpline", number: "181" },
    { name: "Childline (Support for Children)", number: "1098" },
    { name: "Senior Citizen National Helpline (Elderline)", number: "14567" },
    { name: "National Cyber Crime Reporting Portal Helpline", number: "1930" },
    { name: "Kisan Call Centre (Crop & Weather Advice)", number: "1800-180-1551" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#142a47] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-400/30">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>National Citizen Welfare Directory</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Official Toll-Free Helplines & Portals
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Direct access to verified Government of India toll-free numbers, scheme redressal authorities, and official digital portals. All lines are maintained by respective Ministries.
          </p>
        </div>
      </div>

      {/* Flagship Scheme Helplines Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Flagship Scheme Helplines
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Toll-Free Across India
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {flagshipHelplines.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {item.scheme}
                    </h3>
                  </div>

                  <a
                    href={item.portal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    title="Visit Official Portal"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.purpose}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                {/* Helpline button */}
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-extrabold text-slate-900">
                      {item.number}
                    </span>
                    {item.altNumber && (
                      <span className="text-xs text-slate-500 ml-1.5 font-medium">
                        / {item.altNumber}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.number)}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
                    title="Copy number"
                  >
                    {copiedNumber === item.number ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{item.timing}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* National Emergency & Citizen Support Strip */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-rose-600" />
          <span>National Emergency & Citizen Assistance Toll-Free Numbers</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {nationalEmergencyNumbers.map((em, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
            >
              <div className="truncate">
                <span className="text-xs font-semibold text-slate-800 block truncate">
                  {em.name}
                </span>
                <span className="text-sm font-extrabold text-[#142a47]">
                  {em.number}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(em.number)}
                className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-500 border border-slate-200 transition cursor-pointer"
                title="Copy phone number"
              >
                {copiedNumber === em.number ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CSC Digital Seva Kendra Locator Guidance */}
      <div className="bg-gradient-to-r from-[#142a47] to-[#1e3e6b] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
            <MapPin className="w-4 h-4" />
            <span>Over 5,00,000+ Centres Across Gram Panchayats & Wards</span>
          </div>
          <h3 className="text-xl font-bold">
            Need In-Person Support? Visit Your Local CSC Seva Kendra
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Common Services Centres (CSCs) are access points for delivery of essential public utility services, social welfare schemes, healthcare, financial, education, and agriculture services to rural and remote areas.
          </p>
        </div>

        <a
          href="https://findmycsc.nic.in"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 whitespace-nowrap shadow-sm transition"
        >
          <span>Find Nearest CSC Center</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
