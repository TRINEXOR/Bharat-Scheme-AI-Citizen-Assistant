import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client with proper header
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (aiClient) return aiClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    return aiClient;
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI:", err);
    return null;
  }
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "BharatScheme Server" });
});

// AI Chat Assistant endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, citizenProfile } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are "BharatScheme AI", the official Government of India AI Citizen Welfare Assistant.
Your mission is to empower citizens of India to discover, understand, and apply for Central and State government welfare schemes (Yojanas) in their preferred language (English, Hindi, or Hinglish).

You possess authoritative knowledge of major schemes including:
- Agriculture: PM-KISAN (₹6,000/yr), PM Fasal Bima Yojana, Kisan Credit Card (KCC), PM Krishi Sinchayee.
- Health: Ayushman Bharat (PM-JAY - ₹5 Lakh free hospitalization coverage/family), PM Jan Aushadhi Kendras.
- Energy & Housing: PM Surya Ghar Muft Bijli Yojana (up to 300 free units/month & ₹78,000 subsidy), PM Awas Yojana (PMAY-G & PMAY-U 2.0).
- Women & Family: Sukanya Samriddhi Yojana (8.2% tax-free savings for girl child), Lakhpati Didi, Ladli Behna Yojana, PM Matru Vandana Yojana (PMMVY), Ujjwala 2.0 (free LPG).
- MSME, Business & Livelihood: PM Mudra Yojana (loans up to ₹20 Lakhs), PM SVANidhi (street vendor collateral-free loans up to ₹50,000), PM Vishwakarma (artisans & craftsmen support with ₹15,000 toolkit voucher and loan at 5%), Stand Up India.
- Social Security & Pension: Atal Pension Yojana (APY), PM Shram Yogi Maan-dhan (PM-SYM ₹3,000/mo pension), National Social Assistance Programme (NSAP).
- Youth & Skilling: PM Kaushal Vikas Yojana (PMKVY 4.0), National Apprenticeship Scheme, Post-Matric Scholarships.

Guidelines:
1. Always greet warmly and respectfully (e.g., "Namaste Citizen" / "नमस्ते").
2. Answer in the same language the user asks (Hindi, Hinglish, or English).
3. Be clear, accurate, practical, and compassionate.
4. When mentioning a scheme, include:
   - Specific Benefit (amount in ₹, subsidy percentage, or free service)
   - Key Eligibility Criteria (income limit, land holding, age bracket)
   - Mandatory Documents (Aadhaar, Bank Passbook linked to Aadhaar/NPCI DBT, Ration Card, etc.)
   - Application Steps (Official portal URL like pmkisan.gov.in, beneficiaries.nha.gov.in, pmsuryaghar.gov.in, or nearest CSC Digital Seva Kendra)
   - Official Helpline toll-free number (if known, like 14555 for Ayushman, 155261 for PM-KISAN, 1800-11-0001 for Mudra)
5. Keep explanations direct and readable with bullet points and bold key terms.
${citizenProfile ? `Active citizen profile context: Age: ${citizenProfile.age || "Unknown"}, Gender: ${citizenProfile.gender || "Unknown"}, State: ${citizenProfile.state || "India"}, Occupation: ${citizenProfile.occupation || "General Citizen"}, Income Category: ${citizenProfile.income || "Not specified"}. Use this context to tailor advice.` : ""}`;

    if (!ai) {
      // High-quality fallback response if API key is not active
      const fallbackReply = generateFallbackResponse(message, citizenProfile);
      return res.json({ reply: fallbackReply, source: "offline-knowledge-base" });
    }

    // Build chat context
    let promptText = "";
    if (history && Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-4);
      promptText += "Previous conversation context:\n";
      recentHistory.forEach((h: { sender: string; text: string }) => {
        promptText += `${h.sender === "user" ? "Citizen" : "BharatScheme AI"}: ${h.text}\n`;
      });
      promptText += `\nCurrent Citizen question: ${message}`;
    } else {
      promptText = message;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I am here to assist you with all Indian government schemes. Please tell me more about your requirements.";
    res.json({ reply, source: "gemini-3.8-flash" });
  } catch (error) {
    console.error("Chat API error:", error);
    const fallbackReply = generateFallbackResponse(req.body.message || "government schemes", req.body.citizenProfile);
    res.json({ reply: fallbackReply, source: "offline-fallback" });
  }
});

// Personalized Eligibility Analysis endpoint
app.post("/api/eligibility-ai", async (req, res) => {
  try {
    const { profile } = req.body;
    if (!profile) {
      return res.status(400).json({ error: "Profile is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        summary: `Based on your profile as a ${profile.occupation || "citizen"} residing in ${profile.state || "India"}, you are eligible for key Central and State welfare initiatives. Priority areas for you include direct income/health safety nets, subsidized credit, and digital welfare enablement.`,
        actionPlan: [
          "Ensure your Bank Account is seeded with Aadhaar and NPCI DBT-enabled for direct transfers.",
          "Visit your local CSC (Common Service Centre) or official portal to submit your e-KYC.",
          "Keep your Ration Card, Income Certificate, and Aadhaar card updated.",
        ],
      });
    }

    const prompt = `Analyze this Indian citizen's profile and provide a concise 2-sentence summary and exactly 3 priority action points for claiming their entitled government welfare schemes:
Profile:
- Age: ${profile.age}
- Gender: ${profile.gender}
- State: ${profile.state}
- Area: ${profile.area} (Rural/Urban)
- Occupation: ${profile.occupation}
- Annual Income: ${profile.income}
- Category: ${profile.category}
- Landholding: ${profile.landholding || "None"}
- Girl child in family: ${profile.hasGirlChild ? "Yes" : "No"}
- Disability: ${profile.isDivyangjan ? "Yes" : "No"}

Format response as valid JSON with keys:
{
  "summary": "2 concise sentences explaining their overall eligibility standing and top scheme categories",
  "actionPlan": ["Action 1", "Action 2", "Action 3"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error) {
    console.error("Eligibility AI error:", error);
    res.json({
      summary: "Based on your citizen profile details, you qualify for several prominent welfare programs. Check the list of matched schemes below.",
      actionPlan: [
        "Link Aadhaar with your primary savings bank account to receive DBT subsidies.",
        "Check land/caste/income certificate validity for state-specific benefits.",
        "Apply directly on the official portal or visit your nearest Digital Seva CSC Kendra.",
      ],
    });
  }
});

// Fallback response generator for prompt queries
function generateFallbackResponse(query: string, profile?: any): string {
  const q = query.toLowerCase();

  if (q.includes("kisan") || q.includes("farmer") || q.includes("kheti") || q.includes("land")) {
    return `### 🌾 PM-KISAN (Pradhan Mantri Kisan Samman Nidhi) & Farmer Schemes
**Namaste!** For farmers, the Government of India provides several crucial welfare programs:

1. **PM-KISAN Samman Nidhi**:
   - **Benefit**: ₹6,000 per year directly transferred in 3 equal four-monthly installments of ₹2,000 each into your Aadhaar-seeded bank account.
   - **Eligibility**: All landholding farmer families having cultivable landholding in their names.
   - **Mandatory**: Aadhaar e-KYC, Land record (Khatauni/7-12) upload, and bank account linked to NPCI.
   - **Official Portal**: [pmkisan.gov.in](https://pmkisan.gov.in) | **Helpline**: 155261 / 011-24300606.

2. **Kisan Credit Card (KCC)**:
   - Concessional institutional credit up to ₹3 Lakh at an effective interest rate of just 4% with prompt repayment incentive.

3. **PM Fasal Bima Yojana (PMFBY)**:
   - Comprehensive crop insurance covering natural calamities at nominal premium (1.5% - 2% for food & oilseeds).`;
  }

  if (q.includes("solar") || q.includes("bijli") || q.includes("electricity") || q.includes("surya")) {
    return `### ☀️ PM Surya Ghar: Muft Bijli Yojana
**Namaste!** The landmark rooftop solar scheme empowers households with free green electricity and hefty subsidies:

- **Core Benefits**:
  - Up to **300 units of free electricity every month** for your household.
  - Substantial direct capital subsidy:
    - **₹30,000** for 1 kW rooftop systems
    - **₹60,000** for 2 kW systems
    - **₹78,000** for 3 kW and higher systems
  - Surplus power can be fed back to the grid for extra DISCOM earnings via net metering.
- **Eligibility**:
  - The applicant must be an Indian citizen with a residential electricity connection.
  - Must have adequate rooftop shadow-free space.
- **How to Apply**:
  - Register on the National Portal: [pmsuryaghar.gov.in](https://pmsuryaghar.gov.in)
  - Select your DISCOM and upload recent electricity bill.
  - Choose an empaneled vendor for installation.
- **National Helpline**: 15555`;
  }

  if (q.includes("ayushman") || q.includes("health") || q.includes("hospital") || q.includes("swasthya") || q.includes("card")) {
    return `### 🏥 Ayushman Bharat PM-JAY (Pradhan Mantri Jan Arogya Yojana)
**Namaste!** Ayushman Bharat is the world's largest government-funded health assurance program:

- **Core Benefit**:
  - **₹5,00,000 cashless hospitalization coverage** per family per year across 27,000+ empaneled public & private hospitals across India.
  - Covers pre-existing conditions from Day 1, diagnostic tests, surgeries, medicines, and 15 days post-discharge care.
  - Senior citizens aged 70+ now receive an additional distinct top-up cover of ₹5 Lakh under Ayushman Vay Vandana!
- **Documents Required**:
  - Aadhaar Card
  - Ration Card / Family ID
- **How to generate Ayushman Golden Card**:
  - Check your eligibility on [beneficiary.nha.gov.in](https://beneficiary.nha.gov.in)
  - Complete Aadhaar face/OTP authentication or visit any nearby Government Hospital / CSC Seva Kendra.
- **Toll-Free Helpline**: 14555`;
  }

  if (q.includes("loan") || q.includes("business") || q.includes("mudra") || q.includes("svanidhi") || q.includes("vendor") || q.includes("shop")) {
    return `### 💼 PM Mudra Yojana & PM SVANidhi Schemes
**Namaste!** For micro-enterprises, small shopkeepers, and street vendors:

1. **PM Mudra Yojana (PMMY)**:
   - **Shishu**: Loans up to ₹50,000 for starting a small business.
   - **Kishore**: Loans from ₹50,001 up to ₹5 Lakhs for expanding operations.
   - **Tarun**: Loans up to ₹10 Lakhs (extended up to ₹20 Lakhs for previous prompt repayers).
   - **Collateral**: No collateral or guarantor required!
   - Apply at any public/private commercial bank or online at [udyamimitra.in](https://udyamimitra.in).

2. **PM SVANidhi (For Street Vendors)**:
   - 1st Tranche: ₹10,000 collateral-free working capital loan.
   - 2nd & 3rd Tranches: Up to ₹20,000 and ₹50,000 on timely repayment with 7% interest subsidy and cashback on digital transactions!
   - Portal: [pmsvanidhi.mohua.gov.in](https://pmsvanidhi.mohua.gov.in)`;
  }

  if (q.includes("women") || q.includes("girl") || q.includes("mahila") || q.includes("beti") || q.includes("sukanya") || q.includes("behna")) {
    return `### 🌸 Top Welfare Schemes for Women & Girls
**Namaste!** The Government offers dedicated programs to empower women financially and socially:

1. **Sukanya Samriddhi Yojana (SSY)**:
   - High government-backed interest rate of **8.2% per annum** (tax-free under 80C).
   - Can be opened for any girl child up to 10 years of age at Post Offices or authorized banks with as low as ₹250.
2. **Lakhpati Didi Yojana**:
   - Skilling, mentorship, and interest-free institutional credit up to ₹5 Lakh for women in Self Help Groups (SHGs) to earn at least ₹1 Lakh annually.
3. **PM Matru Vandana Yojana (PMMVY)**:
   - Direct cash incentive of ₹5,000 (first child) and ₹6,000 (second girl child) for pregnant and lactating mothers to offset wage loss.
4. **PM Ujjwala Yojana 2.0**:
   - Free LPG connection, stove, first cylinder, and targeted subsidy of ₹300 per cylinder.`;
  }

  return `### 🇮🇳 BharatScheme AI Citizen Assistant
**Namaste!** I am here to help you navigate over 350+ Central and State government welfare schemes.

You can ask me about:
- **Agriculture & Farmers**: PM-KISAN, Fasal Bima, Kisan Credit Card
- **Healthcare**: Ayushman Bharat (₹5L cashless treatment), Jan Aushadhi Kendras
- **Energy & Housing**: PM Surya Ghar (Free solar electricity), PM Awas Yojana (PMAY)
- **Business & Loans**: PM Mudra Yojana, PM SVANidhi for vendors, PM Vishwakarma for artisans
- **Women & Child**: Sukanya Samriddhi, Lakhpati Didi, Ladli Behna, Matru Vandana
- **Pensions & Labor**: Atal Pension Yojana, PM Shram Yogi Maan-dhan

Tell me your age, occupation, state, or the specific benefit you are looking for!`;
}

// Start Server with Vite
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BharatScheme server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
