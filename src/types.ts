export type SchemeCategory =
  | "All"
  | "Agriculture"
  | "Healthcare"
  | "Energy & Housing"
  | "Women & Child"
  | "Business & MSME"
  | "Pensions & Social Security"
  | "Education & Youth";

export type BeneficiaryType =
  | "All Citizens"
  | "Farmers"
  | "Women"
  | "Youth & Students"
  | "Artisans & Workers"
  | "Senior Citizens"
  | "Small Business Owners"
  | "BPL Families";

export interface Scheme {
  id: string;
  name: string;
  hindiName?: string;
  ministry: string;
  category: SchemeCategory;
  beneficiary: BeneficiaryType;
  type: "Central Sector" | "Centrally Sponsored" | "State Specific";
  tagline: string;
  benefitValue: string;
  isDBT: boolean;
  featured?: boolean;
  minAge?: number;
  maxAge?: number;
  genderEligibility?: "All" | "Female" | "Male";
  occupations?: string[];
  maxIncomeLakhs?: number;
  landRequired?: boolean;
  description: string;
  benefits: string[];
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  howToApply: string[];
  officialPortalUrl: string;
  helpline: string;
}

export interface CitizenProfile {
  age: number;
  gender: "Female" | "Male" | "Other";
  state: string;
  area: "Rural" | "Urban";
  occupation: string;
  income: string;
  category: "General" | "OBC" | "SC" | "ST" | "EWS";
  landholding: string;
  hasGirlChild: boolean;
  isDivyangjan: boolean;
  hasBPLCard: boolean;
}

export interface MatchedSchemeResult {
  scheme: Scheme;
  matchScore: number;
  matchedReasons: string[];
  unmetCriteria?: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  source?: string;
  suggestedActions?: string[];
}

export interface DocumentItem {
  id: string;
  name: string;
  description: string;
  category: "Identity" | "Financial" | "Income & Caste" | "Property & Utility";
  requiredFor: string[];
  isAvailable: boolean;
  notes?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  mobile: string;
  email: string;
  state: string;
  city: string;
  password?: string;
  registeredAt: string;
  // Extended fields for scheme auto-fill
  aadhaarNumber?: string;
  bankAccountNumber?: string;
  ifscCode?: string;
  bankName?: string;
  gender?: string;
  age?: string;
  occupation?: string;
  category?: string;
  rationCardNumber?: string;
  landKhataNumber?: string;
  electricityConsumerId?: string;
}

export interface SubmittedApplication {
  id: string;
  arnNumber: string;
  schemeId: string;
  schemeName: string;
  ministry: string;
  applicantName: string;
  applicantMobile: string;
  applicantEmail: string;
  applicantState: string;
  applicantCity: string;
  submittedAt: string;
  status: "Submitted to Ministry" | "e-KYC Verified" | "Under PFMS Verification" | "Sanctioned & Direct Transfer Approved";
  portalUrl: string;
  benefitValue: string;
}
