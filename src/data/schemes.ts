import { Scheme } from "../types";

export const SCHEMES: Scheme[] = [
  {
    id: "pm-kisan",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    hindiName: "प्रधानमंत्री किसान सम्मान निधि",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: "Agriculture",
    beneficiary: "Farmers",
    type: "Central Sector",
    tagline: "Direct income support of ₹6,000/year to all landholding farmer families",
    benefitValue: "₹6,000 / year (Direct Bank Transfer in 3 installments)",
    isDBT: true,
    featured: true,
    occupations: ["Farmer", "Small Farmer", "Marginal Farmer", "Agriculture Worker"],
    landRequired: true,
    description:
      "A flagship initiative by the Government of India to augment financial needs of all landholding farmers' families in procuring various inputs to ensure proper crop health and appropriate yields.",
    benefits: [
      "Direct financial assistance of ₹6,000 per year transferred straight to Aadhaar-seeded bank accounts.",
      "Disbursed in three equal four-monthly installments of ₹2,000 each (April-July, August-November, December-March).",
      "Over 11 Crore+ farmer families actively supported across all States & Union Territories.",
      "100% funding provided by the Central Government of India without intermediaries."
    ],
    eligibilityCriteria: [
      "All landholding farmer families with cultivable land parcels registered in land revenue records in their names.",
      "Both small and marginal farmers as well as other landholding farmers are eligible.",
      "Not an institutional landholder.",
      "No family member holding a constitutional post, serving as regular government employee, or paying income tax in the last assessment year.",
      "Mandatory Aadhaar e-KYC completion and NPCI-seeded bank account."
    ],
    requiredDocuments: [
      "Aadhaar Card of the farmer",
      "Land ownership documents (Khasra/Khatauni, RoR, 7/12 extract)",
      "Aadhaar-seeded active Savings Bank Account Passbook",
      "Mobile number linked to Aadhaar (for OTP e-KYC)",
      "Citizenship proof"
    ],
    howToApply: [
      "Step 1: Visit the official portal at pmkisan.gov.in and click on 'Farmer Corner' -> 'New Farmer Registration'.",
      "Step 2: Enter Aadhaar Number, select State, and verify with Aadhaar OTP.",
      "Step 3: Fill in landholding details (survey number, khasra number, area in hectares) and upload verified land records.",
      "Step 4: Alternatively, visit your nearest CSC (Common Service Centre) or State Agriculture Office with physical land papers.",
      "Step 5: Check DBT Aadhaar seeding status in your bank to ensure smooth transfer."
    ],
    officialPortalUrl: "https://pmkisan.gov.in",
    helpline: "155261 / 011-24300606 (Toll Free)"
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat PM-JAY (Pradhan Mantri Jan Arogya Yojana)",
    hindiName: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना",
    ministry: "Ministry of Health and Family Welfare",
    category: "Healthcare",
    beneficiary: "All Citizens",
    type: "Centrally Sponsored",
    tagline: "World's largest free health assurance scheme offering ₹5 Lakh cover per family",
    benefitValue: "₹5,00,000 / year Cashless Hospitalization Coverage",
    isDBT: false,
    featured: true,
    maxIncomeLakhs: 3.5,
    description:
      "Ayushman Bharat PM-JAY provides financial protection of up to ₹5 Lakhs per family per year for secondary and tertiary care hospitalization across more than 27,000 empaneled public and private hospitals across India.",
    benefits: [
      "₹5,00,000 per family per year cashless and paperless access to medical treatment.",
      "Covers 1,949+ medical procedures including oncology, cardiology, neurosurgery, and orthopedics.",
      "No restriction on family size, age, or gender.",
      "Pre-existing medical conditions covered from Day 1 of enrollment.",
      "Covers 3 days of pre-hospitalization and 15 days of post-hospitalization diagnostics and medicines.",
      "Senior citizens aged 70+ receive exclusive distinct top-up cover under Ayushman Vay Vandana card!"
    ],
    eligibilityCriteria: [
      "Households identified in Socio-Economic Caste Census (SECC 2011) deprivation criteria or NFSA ration card databases.",
      "Rural households with kutcha houses, no adult member aged 16-59, female-headed households, landless laborers.",
      "Urban households working in identified occupational categories (beggar, ragpicker, domestic worker, street vendor, rickshaw puller, construction worker).",
      "All senior citizens aged 70 and above, regardless of income level."
    ],
    requiredDocuments: [
      "Aadhaar Card of all family members",
      "Ration Card (NFSA or State Ration Card) or Family ID",
      "Active Mobile number for OTP generation"
    ],
    howToApply: [
      "Step 1: Visit beneficiary.nha.gov.in or download the Ayushman App on mobile.",
      "Step 2: Enter your Mobile Number and verify with OTP.",
      "Step 3: Search using your State, Scheme (PMJAY), and Aadhaar number or Family ID.",
      "Step 4: Perform e-KYC using Aadhaar OTP, IRIS, or Face Auth on camera.",
      "Step 5: Once verified, instantly download your Ayushman Card (Golden Card) to present at any empaneled hospital."
    ],
    officialPortalUrl: "https://beneficiary.nha.gov.in",
    helpline: "14555 (National Health Authority 24x7 Toll Free)"
  },
  {
    id: "pm-surya-ghar",
    name: "PM Surya Ghar: Muft Bijli Yojana",
    hindiName: "पीएम सूर्य घर: मुफ्त बिजली योजना",
    ministry: "Ministry of New and Renewable Energy",
    category: "Energy & Housing",
    beneficiary: "All Citizens",
    type: "Central Sector",
    tagline: "Free rooftop solar electricity up to 300 units/month + subsidy up to ₹78,000",
    benefitValue: "Up to 300 Units Free Power + ₹78,000 Capital Subsidy",
    isDBT: true,
    featured: true,
    description:
      "A visionary initiative launched to provide 1 Crore households with rooftop solar installations, enabling up to 300 units of free electricity every single month and creating surplus revenue through grid export.",
    benefits: [
      "Up to 300 units of zero-cost electricity per month for residential households.",
      "Direct capital subsidy: ₹30,000 for 1 kW systems, ₹60,000 for 2 kW systems, and ₹78,000 for 3 kW and higher systems.",
      "Annual savings of ₹15,000 - ₹25,000 on household electricity bills.",
      "Opportunity to sell excess generated power back to local DISCOM through Net Metering.",
      "Concessional collateral-free bank loans available at around 7% interest for the remaining amount."
    ],
    eligibilityCriteria: [
      "The applicant must be a citizen of India residing in own residential house.",
      "Must have an active domestic/residential electricity connection in own or family member's name.",
      "Must have adequate shadow-free roof area (approx. 100 sq.ft. per 1 kW of solar capacity).",
      "Must not have availed any other central subsidy for solar rooftop previously for the same premises."
    ],
    requiredDocuments: [
      "Aadhaar Card of the electricity consumer",
      "Recent Electricity Bill (last 6 months) showing Consumer Account Number",
      "Cancelled Cheque or Bank Passbook copy for direct subsidy credit",
      "Proof of house ownership or electricity meter connection proof"
    ],
    howToApply: [
      "Step 1: Register on the National Portal at pmsuryaghar.gov.in by selecting your State and local Electricity DISCOM.",
      "Step 2: Enter your Consumer Account Number, Mobile Number, and Email.",
      "Step 3: Apply for Rooftop Solar installation with desired capacity (1 kW, 2 kW, 3 kW).",
      "Step 4: Await DISCOM technical feasibility approval, then choose an empaneled registered solar vendor.",
      "Step 5: Post installation and net meter commissioning by DISCOM, the central subsidy is directly transferred to your bank account within 30 days."
    ],
    officialPortalUrl: "https://pmsuryaghar.gov.in",
    helpline: "15555 / 1800-180-3333 (Toll Free)"
  },
  {
    id: "pm-awas-yojana",
    name: "Pradhan Mantri Awas Yojana (PMAY - Urban 2.0 & Gramin)",
    hindiName: "प्रधानमंत्री आवास योजना (शहरी 2.0 एवं ग्रामीण)",
    ministry: "Ministry of Housing and Urban Affairs & MoRD",
    category: "Energy & Housing",
    beneficiary: "BPL Families",
    type: "Centrally Sponsored",
    tagline: "Financial assistance up to ₹2.5 Lakh for building a permanent pucca house",
    benefitValue: "₹1,20,000 to ₹2,50,000 direct construction subsidy",
    isDBT: true,
    featured: true,
    maxIncomeLakhs: 6.0,
    description:
      "A mega housing mission providing pucca houses with basic amenities like water, sanitation, and electricity to all eligible houseless and those living in dilapidated/kutcha houses across rural and urban India.",
    benefits: [
      "Direct financial assistance of ₹1.20 Lakh (plain areas) to ₹1.30 Lakh (hilly/difficult areas) for rural beneficiaries.",
      "Interest subsidy up to ₹2.5 Lakh on home loans for urban EWS and LIG families under PMAY-U 2.0.",
      "Additional assistance of ₹12,000 for toilet construction under Swachh Bharat Mission (IHHL).",
      "90-95 days of unskilled labor assistance under MGNREGS (approx. ₹20,000+).",
      "Mandatory joint or female ownership of the house to promote women empowerment."
    ],
    eligibilityCriteria: [
      "Beneficiary family should not own a pucca house anywhere in India.",
      "Identified through SECC 2011 / Awas+ survey in rural areas or EWS/LIG category in urban areas.",
      "Annual household income up to ₹3 Lakh for EWS, up to ₹6 Lakh for LIG in urban areas.",
      "Priority given to SC/ST, women heads, widows, Divyangjan, and senior citizens."
    ],
    requiredDocuments: [
      "Aadhaar Card of all family members",
      "Bank Account details (Aadhaar linked)",
      "Income Certificate / BPL Ration Card",
      "Land possession certificate / RoR / Patta",
      "Affidavit affirming non-ownership of any pucca house in India"
    ],
    howToApply: [
      "Rural (PMAY-G): Registered through Gram Panchayat and Block Development Officer (BDO) via Awas+ mobile app.",
      "Urban (PMAY-U): Apply online through pmaymis.gov.in or through Citizen Service Centres (CSC).",
      "Geo-tagging of house stages (foundation, lintel, roof, completion) triggers automatic direct bank payments."
    ],
    officialPortalUrl: "https://pmay-urban.gov.in",
    helpline: "1800-11-6163 (Urban) / 1800-11-6446 (Rural)"
  },
  {
    id: "pm-mudra-yojana",
    name: "Pradhan Mantri MUDRA Yojana (PMMY)",
    hindiName: "प्रधानमंत्री मुद्रा योजना",
    ministry: "Ministry of Finance",
    category: "Business & MSME",
    beneficiary: "Small Business Owners",
    type: "Central Sector",
    tagline: "Collateral-free business loans up to ₹20 Lakhs for micro-enterprises and shops",
    benefitValue: "Loans from ₹50,000 to ₹20,00,000 without collateral",
    isDBT: false,
    featured: true,
    occupations: ["Shopkeeper", "Small Business Owner", "Artisan", "Trader", "Service Provider", "Food Vendor"],
    description:
      "MUDRA provides non-corporate, non-farm small and micro enterprises with loans to fund manufacturing, processing, trading, or service activities without the burden of submitting physical security collateral.",
    benefits: [
      "Three loan tiers: Shishu (up to ₹50,000), Kishore (₹50,001 to ₹5,00,000), and Tarun (₹5,00,001 to ₹10,00,000, extended to ₹20,00,000).",
      "Zero processing fees for Shishu and Kishore loans.",
      "No collateral, third-party guarantee, or mortgage required.",
      "Convenient MUDRA RuPay debit card issued for easy working capital withdrawal.",
      "Repayment tenure up to 5 to 7 years with affordable bank interest rates."
    ],
    eligibilityCriteria: [
      "Any Indian citizen who has a business plan for a non-farm income-generating activity.",
      "Small manufacturing units, shopkeepers, fruits/vegetable vendors, artisans, beauty parlors, transport operators, repair shops.",
      "Applicant should not have defaulted on any previous bank loan.",
      "Must have a valid KYC and basic business address proof."
    ],
    requiredDocuments: [
      "Identity Proof (Aadhaar, Voter ID, PAN Card, Passport)",
      "Residence Proof (Utility bill, Aadhaar, Ration card)",
      "Passport size photographs",
      "Bank statement of last 6 months",
      "Quotation of machinery/items to be purchased (if applicable)",
      "Business establishment proof or Udyam Registration Certificate"
    ],
    howToApply: [
      "Step 1: Formulate a clear business proposal and estimate financial needs.",
      "Step 2: Apply online on the Udyami Mitra portal at udyamimitra.in or JanSamarth portal at jansamarth.in.",
      "Step 3: Alternatively, walk into any Public Sector Bank, Regional Rural Bank (RRB), NBFC, or Micro-Finance Institution.",
      "Step 4: Submit filled loan application form along with KYC and business details.",
      "Step 5: Sanctioned funds are credited directly to your business account with a MUDRA Card."
    ],
    officialPortalUrl: "https://www.mudra.org.in",
    helpline: "1800-180-1111 / 1800-11-0001 (National Toll Free)"
  },
  {
    id: "pm-svanidhi",
    name: "PM SVANidhi (PM Street Vendor's AtmaNirbhar Nidhi)",
    hindiName: "पीएम स्वनिधि योजना",
    ministry: "Ministry of Housing and Urban Affairs",
    category: "Business & MSME",
    beneficiary: "Small Business Owners",
    type: "Central Sector",
    tagline: "Collateral-free working capital loan up to ₹50,000 for street vendors with 7% subsidy",
    benefitValue: "₹10,000 to ₹50,000 Working Capital Loan + 7% Interest Subsidy",
    isDBT: true,
    occupations: ["Street Vendor", "Hawker", "Thelewala", "Cart Vendor", "Footpath Vendor"],
    description:
      "A dedicated micro-credit facility empowering urban street vendors to resume and expand their livelihoods post-pandemic, promoting digital banking and formal financial inclusion.",
    benefits: [
      "1st Loan: ₹10,000 collateral-free working capital loan for 1-year tenure.",
      "2nd Loan: Enhanced to ₹20,000 upon timely repayment of first loan.",
      "3rd Loan: Enhanced up to ₹50,000 for sustained digital vendors.",
      "7% annual interest subsidy credited directly to bank accounts via DBT on early/timely repayment.",
      "Cashback up to ₹1,200 per year for conducting digital transactions (UPI/QR code payments)."
    ],
    eligibilityCriteria: [
      "Street vendors engaged in vending in urban areas on or before March 24, 2020.",
      "Possession of Certificate of Vending (CoV) or Identity Card issued by Urban Local Bodies (ULBs).",
      "Vendors identified in vending census surveys or recommended by Town Vending Committees (TVC) through Letter of Recommendation (LoR)."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Voter ID / Driving License",
      "Certificate of Vending (CoV) / Identity Card / Letter of Recommendation (LoR)",
      "Bank Account details (Passbook or cancelled cheque)",
      "Active Mobile number linked to Aadhaar"
    ],
    howToApply: [
      "Step 1: Visit the PM SVANidhi portal at pmsvanidhi.mohua.gov.in.",
      "Step 2: Enter Aadhaar-linked mobile number to request OTP.",
      "Step 3: Enter your Urban Local Body (ULB) name and Vendor Survey Reference Number or CoV/LoR number.",
      "Step 4: Select lending institution (preferred bank) and submit application.",
      "Step 5: Collect loan sanction from branch or via digital approval."
    ],
    officialPortalUrl: "https://pmsvanidhi.mohua.gov.in",
    helpline: "1800-11-1979 (Toll Free)"
  },
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana (SSY)",
    hindiName: "सुकन्या समृद्धि योजना",
    ministry: "Ministry of Finance & Women and Child Development",
    category: "Women & Child",
    beneficiary: "Women",
    type: "Central Sector",
    tagline: "High 8.2% guaranteed tax-free return savings account for girl child future",
    benefitValue: "8.2% Compound Interest + Triple Tax Exemption (EEE)",
    isDBT: false,
    featured: true,
    genderEligibility: "Female",
    minAge: 0,
    maxAge: 10,
    description:
      "A government-backed small deposit scheme launched under the 'Beti Bachao Beti Padhao' initiative, designed exclusively to build a handsome fund for girl child higher education and marriage.",
    benefits: [
      "Offers the highest sovereign interest rate among small savings schemes (currently 8.2% per annum, compounded annually).",
      "Triple Tax Benefit (EEE): Tax deduction under Section 80C up to ₹1.5 Lakh, interest earned is 100% tax-free, and maturity amount is completely tax-free.",
      "Minimum deposit of just ₹250 per financial year, maximum up to ₹1,50,000 per year.",
      "Partial withdrawal up to 50% allowed for girl's higher education after age 18 or passing 10th standard.",
      "Account matures upon 21 years from account opening date or upon marriage after age 18."
    ],
    eligibilityCriteria: [
      "Account can be opened by parents or legal guardian for a girl child from birth up to 10 years of age.",
      "Maximum of two accounts allowed in a family (one for each girl child; 3 allowed in case of firstborn twins/triplets).",
      "The girl child must be an Indian resident citizen."
    ],
    requiredDocuments: [
      "Birth Certificate of the girl child",
      "Identity Proof (Aadhaar/PAN) of the parent/guardian",
      "Address Proof (Aadhaar/Passport/Utility bill) of the parent/guardian",
      "Passport size photographs of parent and child"
    ],
    howToApply: [
      "Step 1: Download or collect the SSY Account Opening Form from any Post Office or authorized commercial bank (SBI, PNB, BoB, ICICI, etc.).",
      "Step 2: Fill in the girl child and guardian details.",
      "Step 3: Attach birth certificate and KYC documents.",
      "Step 4: Submit the form with initial deposit amount (minimum ₹250) in cash or cheque.",
      "Step 5: Receive the SSY Passbook recording all deposits and accrued interest."
    ],
    officialPortalUrl: "https://www.indiapost.gov.in",
    helpline: "1800-266-6868 (India Post Toll Free)"
  },
  {
    id: "lakhpati-didi",
    name: "Lakhpati Didi Yojana",
    hindiName: "लखपति दीदी योजना",
    ministry: "Ministry of Rural Development",
    category: "Women & Child",
    beneficiary: "Women",
    type: "Centrally Sponsored",
    tagline: "Empowering rural women in Self-Help Groups to earn at least ₹1 Lakh annually",
    benefitValue: "Interest-free loans up to ₹5,00,000 + Skilling & Business Setup Support",
    isDBT: true,
    genderEligibility: "Female",
    minAge: 18,
    maxAge: 60,
    occupations: ["Self Help Group Member", "Homemaker", "Artisan", "Poultry/Dairy Farmer", "Micro Entrepreneur"],
    description:
      "A national movement to enable rural women members of Deendayal Antyodaya Yojana-NRLM Self Help Groups (SHGs) to earn a sustainable income of at least ₹1,00,000 per year through micro-enterprises.",
    benefits: [
      "Specialized vocational training in high-value sectors: LED bulb assembly, drone operations (Drone Didi), tailoring, mushroom cultivation, organic farming, food processing.",
      "Access to community investment fund and bank linkage loans up to ₹5 Lakh at zero or highly subsidized interest rates.",
      "Direct market access through GeM portal, Saras fairs, and e-commerce platforms.",
      "Digital financial literacy and micro-insurance coverage."
    ],
    eligibilityCriteria: [
      "Must be an active member of a registered Women's Self-Help Group (SHG) under DAY-NRLM.",
      "Resident of a rural area in India.",
      "Committed to taking up an income-generating economic activity."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "SHG Membership passbook / Register proof",
      "Aadhaar-linked Bank Account Passbook",
      "Income proof / BPL declaration",
      "Passport size photographs"
    ],
    howToApply: [
      "Step 1: Contact your Village Organization (VO) or Cluster Level Federation (CLF) under the State Rural Livelihood Mission (SRLM).",
      "Step 2: Submit your Micro Investment Plan (MIP) through your Self-Help Group.",
      "Step 3: Undergo specialized livelihood training arranged by the Block Mission Management Unit (BMMU).",
      "Step 4: Receive credit sanction and business setup support through Community Resource Persons (CRPs)."
    ],
    officialPortalUrl: "https://aajeevika.gov.in",
    helpline: "011-23382230"
  },
  {
    id: "pm-vishwakarma",
    name: "PM Vishwakarma Scheme",
    hindiName: "पीएम विश्वकर्मा योजना",
    ministry: "Ministry of Micro, Small and Medium Enterprises",
    category: "Business & MSME",
    beneficiary: "Artisans & Workers",
    type: "Central Sector",
    tagline: "Comprehensive support for 18 traditional artisan trades with ₹15,000 toolkit & 5% loans",
    benefitValue: "₹15,000 Toolkit Incentive + Concessional Loans up to ₹3,00,000 at 5%",
    isDBT: true,
    featured: true,
    minAge: 18,
    occupations: ["Carpenter", "Blacksmith", "Potter", "Sculptor", "Cobbler", "Mason", "Barber", "Washerman", "Tailor", "Weaver"],
    description:
      "A holistic scheme to support traditional artisans and craftspeople across 18 trades who work with their hands and tools, providing recognition, skill upgrades, modern toolkit grants, and collateral-free credit.",
    benefits: [
      "Official Recognition: PM Vishwakarma Certificate and Digital ID Card.",
      "Skill Training: Basic (5-7 days) and Advanced (15 days) training with a stipend of ₹500 per day.",
      "Modern Toolkit Incentive: ₹15,000 e-voucher/direct transfer to purchase advanced tools.",
      "Credit Support: Collateral-free enterprise loan up to ₹1,00,000 (Tranche 1, 18 months) and ₹2,00,000 (Tranche 2, 30 months) at a concessional interest rate of just 5%.",
      "Digital Transaction Incentive: ₹1 per digital transaction up to 100 transactions per month."
    ],
    eligibilityCriteria: [
      "Artisan or craftsperson working in one of the 18 specified traditional family-based trades.",
      "Minimum age of 18 years on the date of application.",
      "Not have availed loans under PMEGP, PM Mudra, or PM SVANidhi in the last 5 years.",
      "Registration restricted to one member per family."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Mobile number linked to Aadhaar",
      "Bank Account details (IFSC, Account Number)",
      "Ration Card or Family ID"
    ],
    howToApply: [
      "Step 1: Visit nearest Common Service Centre (CSC) with Aadhaar and active mobile.",
      "Step 2: Complete Aadhaar biometric authentication on the PM Vishwakarma portal at pmvishwakarma.gov.in.",
      "Step 3: Select your specific trade from the 18 eligible traditional artisan categories.",
      "Step 4: Verification process conducted by Gram Panchayat / Urban Local Body.",
      "Step 5: Download digital certificate and attend free training with daily ₹500 stipend."
    ],
    officialPortalUrl: "https://pmvishwakarma.gov.in",
    helpline: "1800-267-7777 / 17923 (Toll Free)"
  },
  {
    id: "pm-ujjwala-yojana",
    name: "Pradhan Mantri Ujjwala Yojana (PMUY 2.0)",
    hindiName: "प्रधानमंत्री उज्ज्वला योजना 2.0",
    ministry: "Ministry of Petroleum and Natural Gas",
    category: "Energy & Housing",
    beneficiary: "Women",
    type: "Central Sector",
    tagline: "Free LPG gas connection with stove & first refill + ₹300 per cylinder subsidy",
    benefitValue: "Free Gas Connection + Stove + First Refill + ₹300 Subsidy per cylinder",
    isDBT: true,
    genderEligibility: "Female",
    minAge: 18,
    maxIncomeLakhs: 2.5,
    description:
      "A landmark social welfare scheme aimed at protecting the health of women and children by providing clean cooking fuel (LPG) free of security deposit to deprived households across India.",
    benefits: [
      "100% free LPG gas connection without deposit fee to the woman head of the family.",
      "Free first LPG refill cylinder and free gas stove (hotplate) provided by Oil Marketing Companies (OMCs).",
      "Targeted direct subsidy of ₹300 per 14.2 kg LPG cylinder (up to 12 refills per year) transferred to Aadhaar bank account.",
      "Protection from smoke, respiratory diseases, and indoor air pollution."
    ],
    eligibilityCriteria: [
      "Applicant must be an adult woman (at least 18 years of age).",
      "Belonging to poor households (SC/ST, PMAY beneficiaries, Antyodaya Anna Yojana, Most Backward Classes, Tea garden tribes).",
      "No other existing LPG connection in the same household."
    ],
    requiredDocuments: [
      "Aadhaar Card of the applicant woman and adult family members",
      "Ration Card proving family composition (or self-declaration in Ujjwala 2.0 for migrant workers)",
      "Bank Account details (Aadhaar linked with NPCI)",
      "Passport size photograph"
    ],
    howToApply: [
      "Step 1: Apply online at pmuy.gov.in or visit your nearest LPG distributor (Indane, Bharatgas, HP Gas).",
      "Step 2: Submit KYC form along with Aadhaar card and Ration Card.",
      "Step 3: Verification of non-duplication of LPG connection through OMC centralized database.",
      "Step 4: Collect your gas cylinder, pressure regulator, hose pipe, and free stove from the agency."
    ],
    officialPortalUrl: "https://www.pmuy.gov.in",
    helpline: "1800-266-6696 / 1906 (24x7 Emergency)"
  },
  {
    id: "atal-pension-yojana",
    name: "Atal Pension Yojana (APY)",
    hindiName: "अटल पेंशन योजना",
    ministry: "Ministry of Finance (PFRDA)",
    category: "Pensions & Social Security",
    beneficiary: "All Citizens",
    type: "Central Sector",
    tagline: "Guaranteed monthly pension of ₹1,000 to ₹5,000 for unorganized sector workers",
    benefitValue: "₹1,000 to ₹5,000 / month Guaranteed Lifetime Pension after age 60",
    isDBT: true,
    minAge: 18,
    maxAge: 40,
    description:
      "A government-administered pension scheme focusing on workers in the unorganized sector, providing a sovereign guaranteed monthly pension from age 60 until lifetime.",
    benefits: [
      "Fixed lifetime pension choice: ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month.",
      "After the subscriber's demise, the same pension amount is paid to the spouse for lifetime.",
      "After the death of both subscriber and spouse, the entire accumulated pension corpus is returned to the nominee.",
      "Tax benefit under Section 80CCD(1B) up to ₹50,000 additional deduction.",
      "Low monthly contribution: as low as ₹42/month for an 18-year-old for ₹1,000 pension."
    ],
    eligibilityCriteria: [
      "Any Indian citizen aged between 18 and 40 years.",
      "Must have an active savings bank account or Post Office savings account.",
      "Must not be an income taxpayer (effective from October 1, 2022)."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Active Savings Bank Account Passbook",
      "Mobile number registered with bank for auto-debit alerts"
    ],
    howToApply: [
      "Step 1: Walk into your bank branch or Post Office where you maintain a savings account.",
      "Step 2: Fill the APY Registration Form and choose your desired pension slab (₹1,000 to ₹5,000).",
      "Step 3: Provide Aadhaar number and designate your spouse as primary beneficiary / nominee.",
      "Step 4: Enable auto-debit from your savings account (monthly, quarterly, or half-yearly).",
      "Step 5: Receive your Permanent Retirement Account Number (PRAN) card by SMS."
    ],
    officialPortalUrl: "https://www.npscra.nsdl.co.in",
    helpline: "1800-110-069 (Toll Free PFRDA)"
  },
  {
    id: "pm-shram-yogi",
    name: "PM Shram Yogi Maan-dhan (PM-SYM)",
    hindiName: "प्रधानमंत्री श्रम योगी मान-धन योजना",
    ministry: "Ministry of Labour & Employment",
    category: "Pensions & Social Security",
    beneficiary: "Artisans & Workers",
    type: "Central Sector",
    tagline: "Assured ₹3,000/month pension for unorganized workers with 50:50 govt matching",
    benefitValue: "₹3,000 / month Assured Pension after age 60",
    isDBT: true,
    minAge: 18,
    maxAge: 40,
    occupations: ["Daily Wage Laborer", "Construction Worker", "Rickshaw Puller", "Domestic Worker", "Agricultural Laborer", "Driver"],
    description:
      "A central voluntary and contributory pension scheme for unorganized workers to ensure old age protection, with equal 50% matching contribution deposited directly by the Central Government.",
    benefits: [
      "Assured monthly pension of ₹3,000 per month after reaching 60 years of age.",
      "50:50 matching contribution: If you deposit ₹100, the Central Government also deposits ₹100 into your pension account every month.",
      "Family pension: If subscriber passes away, spouse receives 50% of the pension (₹1,500/month).",
      "Monthly contribution ranges from just ₹55 to ₹200 depending on your entry age."
    ],
    eligibilityCriteria: [
      "Unorganized worker (street vendor, agriculture worker, domestic maid, construction worker, rickshaw driver, beedi worker, etc.).",
      "Entry age between 18 and 40 years.",
      "Monthly income must not exceed ₹15,000 per month.",
      "Should not be covered under New Pension Scheme (NPS), ESIC, or EPFO, and not an income tax payer."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Savings Bank Account Passbook with IFSC (Jan Dhan account eligible)",
      "Mobile phone for biometric and OTP verification"
    ],
    howToApply: [
      "Step 1: Visit the nearest CSC (Digital Seva Kendra) with Aadhaar and bank passbook.",
      "Step 2: CSC VLE will authenticate subscriber details via biometric on maandhan.in.",
      "Step 3: Pay the first month's contribution in cash; subsequent months auto-debited.",
      "Step 4: Immediate generation of unique Shram Yogi Pension Card (SYM Card)."
    ],
    officialPortalUrl: "https://maandhan.in",
    helpline: "1800-267-6888 (Toll Free)"
  },
  {
    id: "kisan-credit-card",
    name: "Kisan Credit Card (KCC) Scheme",
    hindiName: "किसान क्रेडिट कार्ड (केसीसी)",
    ministry: "Ministry of Agriculture & Farmers Welfare & RBI",
    category: "Agriculture",
    beneficiary: "Farmers",
    type: "Central Sector",
    tagline: "Subsidized farm loan up to ₹3 Lakh at an effective 4% annual interest rate",
    benefitValue: "Credit up to ₹3,00,000 at only 4% interest rate",
    isDBT: false,
    occupations: ["Farmer", "Tenant Farmer", "Sharecropper", "Dairy Farmer", "Fisherman"],
    landRequired: true,
    description:
      "Provides farmers with timely credit from the banking system to meet short-term credit requirements for cultivation of crops, post-harvest expenses, animal husbandry, and fisheries.",
    benefits: [
      "Flexible revolving credit line up to ₹3 Lakh at a subsidized interest rate.",
      "Nominal interest of 7%, reduced to an effective 4% per year with 3% Prompt Repayment Incentive (PRI).",
      "No collateral required for loans up to ₹1.60 Lakh.",
      "ATM-enabled RuPay Kisan Card provided for convenient seed, fertilizer, and cash withdrawals.",
      "Extended to animal husbandry, dairy, and fisheries farmers with credit limit up to ₹2 Lakh."
    ],
    eligibilityCriteria: [
      "All farmers - individual or joint borrowers who are owner-cultivators.",
      "Tenant farmers, oral lessees, and sharecroppers.",
      "Self Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers.",
      "Animal husbandry and fisheries rearers."
    ],
    requiredDocuments: [
      "Duly completed KCC Application Form",
      "Identity Proof (Aadhaar Card, Voter ID, PAN)",
      "Land ownership record (Khatauni/Jamabandi/7-12) or tenancy agreement",
      "Cropping pattern details and acreage"
    ],
    howToApply: [
      "Step 1: Download one-page KCC application form from pmkisan.gov.in or obtain from your local bank branch.",
      "Step 2: Fill in personal details, PM-KISAN beneficiary ID, and land parcel information.",
      "Step 3: Submit to your local Commercial Bank, Regional Rural Bank (RRB), or Cooperative Bank.",
      "Step 4: Banks issue the Kisan Credit Card within 14 days of receiving completed application."
    ],
    officialPortalUrl: "https://www.myscheme.gov.in/schemes/kcc",
    helpline: "1800-11-5526 / 011-24300606"
  },
  {
    id: "pm-kaushal-vikas",
    name: "PM Kaushal Vikas Yojana 4.0 (PMKVY)",
    hindiName: "प्रधानमंत्री कौशल विकास योजना 4.0",
    ministry: "Ministry of Skill Development and Entrepreneurship",
    category: "Education & Youth",
    beneficiary: "Youth & Students",
    type: "Central Sector",
    tagline: "Free industry skill certification with ₹8,000 stipend and job placement support",
    benefitValue: "100% Free Training + Skill Certification + Placement Assistance",
    isDBT: true,
    minAge: 15,
    maxAge: 45,
    occupations: ["Student", "Unemployed Youth", "School Dropout", "Job Seeker"],
    description:
      "Skill certification scheme to encourage Indian youth to take up industry-relevant skill training, including cutting-edge Industry 4.0 technologies (AI, Robotics, Drones, IoT, 3D Printing, EV).",
    benefits: [
      "100% free government-sponsored training and certification recognized across industries.",
      "Direct monetary reward and post-placement stipend of up to ₹8,000 credited via DBT.",
      "Recognition of Prior Learning (RPL) to formally certify existing hands-on skills.",
      "Direct placement drives with top national and regional corporate employers.",
      "Free digital tablet/study materials and uniform support in specialized trades."
    ],
    eligibilityCriteria: [
      "Indian citizen aged between 15 and 45 years.",
      "Unemployed youth, college/school dropouts, or job seekers looking for formal skilling.",
      "Possess a valid Aadhaar Card and bank account."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Educational certificates (10th/12th/Graduation, if applicable)",
      "Bank Passbook copy for stipend transfer",
      "Passport size photograph"
    ],
    howToApply: [
      "Step 1: Register on the Skill India Digital Hub at skillindiadigital.gov.in.",
      "Step 2: Search for certified training centers and courses in your district.",
      "Step 3: Enroll in your preferred course (e.g., Solar Technician, Drone Operator, Healthcare Assistant, Data Entry).",
      "Step 4: Complete coursework, practical lab training, and clear the National Skill Qualification Framework (NSQF) exam.",
      "Step 5: Download digital Skill Certificate via DigiLocker and participate in Rozgar Melas."
    ],
    officialPortalUrl: "https://www.skillindiadigital.gov.in",
    helpline: "088000-55555 / 1800-123-9626 (Toll Free)"
  },
  {
    id: "pm-matru-vandana",
    name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    hindiName: "प्रधानमंत्री मातृ वंदना योजना",
    ministry: "Ministry of Women and Child Development",
    category: "Women & Child",
    beneficiary: "Women",
    type: "Centrally Sponsored",
    tagline: "Direct cash maternity incentive of ₹5,000 - ₹6,000 for pregnant mothers",
    benefitValue: "₹5,000 for First Child, ₹6,000 for Second Girl Child (DBT)",
    isDBT: true,
    genderEligibility: "Female",
    minAge: 19,
    description:
      "A conditional cash transfer maternity benefit scheme providing wage compensation and nutritional support to pregnant and lactating mothers for health checkups and institutional delivery.",
    benefits: [
      "₹5,000 in two installments for the birth of the first child upon early registration, ANC, and immunization.",
      "₹6,000 in a single installment for the birth of a second girl child to encourage female child sex ratio.",
      "Directly transferred into mother's Aadhaar-seeded bank account.",
      "Prevents low birth weight and improves infant immunization coverage."
    ],
    eligibilityCriteria: [
      "Pregnant women and lactating mothers (PW&LM) who are at least 19 years old.",
      "Belonging to socially and economically disadvantaged sections (SC/ST, BPL, EWS, Ayushman Bharat beneficiaries, MGNREGA job card holders).",
      "Women in regular employment with Central/State Government or PSUs are excluded."
    ],
    requiredDocuments: [
      "Mother's and Father's Aadhaar Card",
      "Mother and Child Protection (MCP) Card issued by Anganwadi/Health Centre",
      "Aadhaar-linked Bank Account Passbook of the mother",
      "Child's Birth Certificate and vaccination record (for subsequent installments)"
    ],
    howToApply: [
      "Step 1: Register at your local Anganwadi Centre (AWC) or Government Primary Health Centre (PHC).",
      "Step 2: Alternatively, apply online at pmmvy.wcd.gov.in using citizen login.",
      "Step 3: Upload MCP card registration details and bank passbook.",
      "Step 4: Cash installments are credited via DBT upon completing designated health milestones."
    ],
    officialPortalUrl: "https://pmmvy.wcd.gov.in",
    helpline: "011-23382393"
  },
  {
    id: "pm-janaushadhi",
    name: "Pradhan Mantri Bharatiya Janaushadhi Pariyojana (PMBJP)",
    hindiName: "प्रधानमंत्री भारतीय जनऔषधि परियोजना",
    ministry: "Ministry of Chemicals and Fertilizers",
    category: "Healthcare",
    beneficiary: "All Citizens",
    type: "Central Sector",
    tagline: "Quality generic medicines at 50% to 90% cheaper rates than branded equivalents",
    benefitValue: "Up to 90% Savings on 2,000+ Quality Medicines & Surgical Devices",
    isDBT: false,
    description:
      "A nationwide campaign to make quality generic medicines available at affordable prices for all citizens through dedicated Pradhan Mantri Bharatiya Janaushadhi Kendras (PMBJK).",
    benefits: [
      "More than 2,046 generic medicines and 300 surgical devices available at 50% to 90% lower prices compared to market brands.",
      "Oxo-biodegradable sanitary napkins 'Suvidha' available at just ₹1 per pad.",
      "Over 12,000+ Janaushadhi Kendras operating across every district in India.",
      "All medicines undergo strict double testing in NABL-accredited laboratories ensuring WHO-GMP quality."
    ],
    eligibilityCriteria: [
      "Open to all citizens of India without any income, age, or category restrictions.",
      "Any valid doctor's prescription for generic or equivalent branded medicine is accepted."
    ],
    requiredDocuments: [
      "Doctor's prescription (Rx) for prescription medicines",
      "No documents required for OTC items, sanitary pads, or vitamins"
    ],
    howToApply: [
      "Locate your nearest Kendra via the 'Jan Aushadhi Sugam' mobile app or janaushadhi.gov.in.",
      "Walk in with your doctor's prescription and purchase high-grade generic medicines at a fraction of market price."
    ],
    officialPortalUrl: "https://janaushadhi.gov.in",
    helpline: "1800-180-8080 (Toll Free)"
  },
  {
    id: "ladli-behna",
    name: "Mukhyamantri Ladli Behna Yojana (State Welfare Model)",
    hindiName: "मुख्यमंत्री लाड़ली बहना योजना",
    ministry: "State Department of Women and Child Development",
    category: "Women & Child",
    beneficiary: "Women",
    type: "State Specific",
    tagline: "Monthly direct financial transfer of ₹1,250 to bank accounts of adult women",
    benefitValue: "₹1,250 / month (₹15,000 / year DBT)",
    isDBT: true,
    genderEligibility: "Female",
    minAge: 21,
    maxAge: 60,
    maxIncomeLakhs: 2.5,
    description:
      "A flagship direct income transfer scheme for married and adult women to foster self-reliance, ensure better nutrition, and increase women's decision-making power in the family.",
    benefits: [
      "₹1,250 per month deposited directly into the beneficiary's Aadhaar-seeded bank account on the 10th of every month.",
      "Total annual financial assistance of ₹15,000.",
      "Enhances economic autonomy and personal savings for women."
    ],
    eligibilityCriteria: [
      "Permanent resident woman of the respective state.",
      "Age between 21 and 60 years.",
      "Married, widowed, divorced, or abandoned women.",
      "Family annual income below ₹2.5 Lakh and not paying income tax."
    ],
    requiredDocuments: [
      "Samagra Family ID / State Resident ID",
      "Aadhaar Card",
      "Aadhaar-linked DBT enabled Bank Account Passbook",
      "Mobile number for OTP"
    ],
    howToApply: [
      "Step 1: Camps organized at Gram Panchayat and Ward level.",
      "Step 2: Biometric e-KYC completed on site; no physical documents need to be submitted.",
      "Step 3: Verification of DBT status and immediate application acknowledgment receipt."
    ],
    officialPortalUrl: "https://cmladlibehna.mp.gov.in",
    helpline: "0755-2700800"
  },
  {
    id: "nsap-pension",
    name: "National Social Assistance Programme (NSAP)",
    hindiName: "राष्ट्रीय सामाजिक सहायता कार्यक्रम (वृद्धावस्था, विधवा, दिव्यांग पेंशन)",
    ministry: "Ministry of Rural Development",
    category: "Pensions & Social Security",
    beneficiary: "Senior Citizens",
    type: "Centrally Sponsored",
    tagline: "Monthly social security pension for destitute elderly, widows, and persons with disabilities",
    benefitValue: "₹1,000 to ₹3,000 / month (Central + State Top-up Pension)",
    isDBT: true,
    minAge: 60,
    description:
      "A constitutional welfare safety net providing basic monthly social security pensions to impoverished elderly persons, destitute widows, and individuals with severe disabilities (Divyangjan).",
    benefits: [
      "Indira Gandhi National Old Age Pension Scheme (IGNOAPS): Monthly pension for citizens aged 60+ living below the poverty line.",
      "Indira Gandhi National Widow Pension Scheme (IGNWPS): Monthly financial support for BPL widows aged 40-79.",
      "Indira Gandhi National Disability Pension Scheme (IGNDPS): Monthly pension for BPL persons aged 18+ with 80% or severe disability.",
      "National Family Benefit Scheme (NFBS): One-time lump sum of ₹20,000 on natural or accidental death of primary breadwinner."
    ],
    eligibilityCriteria: [
      "Belonging to a household living Below Poverty Line (BPL) as per central/state criteria.",
      "Age 60 years or above for Old Age pension; 40+ for Widow pension; 18+ with 80%+ disability certificate for Divyangjan pension."
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "BPL Ration Card or BPL Certificate",
      "Age Proof / Birth Certificate / Voter Card",
      "Disability Certificate from Chief Medical Officer (CMO) for IGNDPS",
      "Husband's Death Certificate for Widow pension",
      "Bank Account details linked to Aadhaar"
    ],
    howToApply: [
      "Step 1: Submit application to your Gram Panchayat Secretary, Block Development Office (BDO), or Municipality Office.",
      "Step 2: Apply online on State Social Welfare Portal or nsap.nic.in.",
      "Step 3: Field verification by revenue inspector.",
      "Step 4: Monthly pension disbursed directly to your bank/post office account via DBT."
    ],
    officialPortalUrl: "https://nsap.nic.in",
    helpline: "1800-111-555"
  }
];

export const STATES_AND_UTS = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi (NCT)",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh"
];

export const COMMON_DOCUMENTS = [
  {
    id: "doc-aadhaar",
    name: "Aadhaar Card",
    description: "12-digit unique identity number with biometric e-KYC linked to active mobile",
    category: "Identity" as const,
    requiredFor: ["PM-KISAN", "Ayushman Bharat", "PM Surya Ghar", "PM SVANidhi", "SSY", "Mudra"],
    isAvailable: true,
    notes: "Ensure mobile number is linked for OTP verification."
  },
  {
    id: "doc-bank",
    name: "Bank Passbook / Cancelled Cheque",
    description: "Active savings bank account with Aadhaar & NPCI DBT seeding for direct cash transfers",
    category: "Financial" as const,
    requiredFor: ["PM-KISAN", "PM Surya Ghar", "PMAY", "PM SVANidhi", "Lakhpati Didi", "APY"],
    isAvailable: true,
    notes: "Verify NPCI seeding status at your branch to avoid DBT failures."
  },
  {
    id: "doc-ration",
    name: "Ration Card (NFSA / BPL / AAY)",
    description: "Official family composition record and food subsidy entitlement card",
    category: "Income & Caste" as const,
    requiredFor: ["Ayushman Bharat", "PMAY Housing", "PM Ujjwala", "NSAP Pension"],
    isAvailable: true,
    notes: "Mandatory for subsidized healthcare and social security welfare."
  },
  {
    id: "doc-income",
    name: "Income Certificate (Aay Praman Patra)",
    description: "Issued by Tehsildar / Sub-Divisional Magistrate verifying annual family income",
    category: "Income & Caste" as const,
    requiredFor: ["PMAY Housing", "Ayushman Bharat", "Scholarships", "EWS Certificates"],
    isAvailable: false,
    notes: "Typically valid for 1-3 years from date of issuance."
  },
  {
    id: "doc-land",
    name: "Land Records (Khasra / Khatauni / 7-12 / RoR)",
    description: "Official Revenue Department landholding ownership records in the applicant's name",
    category: "Property & Utility" as const,
    requiredFor: ["PM-KISAN", "Kisan Credit Card (KCC)", "PM Fasal Bima"],
    isAvailable: false,
    notes: "Download digital signed extract from state Bhulekh portal."
  },
  {
    id: "doc-electricity",
    name: "Recent Electricity Bill (Bijli Bill)",
    description: "Domestic electricity bill with Consumer Account Number (CAN / CA No.)",
    category: "Property & Utility" as const,
    requiredFor: ["PM Surya Ghar Solar", "Residence Proof"],
    isAvailable: true,
    notes: "Required within the last 6 months for rooftop solar verification."
  },
  {
    id: "doc-caste",
    name: "Caste Certificate (Jati Praman Patra)",
    description: "Official verification for SC / ST / OBC / EWS categories",
    category: "Income & Caste" as const,
    requiredFor: ["Stand-Up India", "Post-Matric Scholarship", "Special Subsidies"],
    isAvailable: false,
    notes: "Permanent validity for SC/ST; Non-Creamy Layer (NCL) renewal for OBC."
  }
];
