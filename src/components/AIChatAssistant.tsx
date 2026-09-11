import React, { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import { ChatMessage } from "../types";
import { t } from "../utils/translations";
import {
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  VolumeX,
  RotateCcw,
  Copy,
  Check,
  Building2,
  PhoneCall,
  ExternalLink,
  ShieldCheck,
  Lightbulb
} from "lucide-react";

interface AIChatAssistantProps {
  initialQuery?: string;
  onClearInitialQuery?: () => void;
  language?: string;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({
  initialQuery,
  onClearInitialQuery,
  language = "en",
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: `### 🇮🇳 Namaste! Welcome to BharatScheme AI Citizen Assistant
I am your official AI guide for **Central and State Government Welfare Schemes (Yojanas)**.

You can ask me questions in **English**, **हिन्दी (Hindi)**, or **Hinglish**, such as:
- *"Am I eligible for PM-KISAN ₹6,000 income support?"*
- *"How do I apply for the PM Surya Ghar 300 free units solar subsidy?"*
- *"What documents are needed to make an Ayushman Golden Card?"*
- *"How can I get a collateral-free Mudra or PM SVANidhi business loan?"*

How may I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const suggestedPrompts = [
    "🌾 Am I eligible for PM-KISAN ₹6,000?",
    "🏥 How to generate Ayushman Golden Card?",
    "☀️ PM Surya Ghar: How much subsidy for 2 kW?",
    "💼 Collateral-free Mudra Loan for small shop",
    "🌸 Sukanya Samriddhi account rules & interest rate",
    "🛠️ PM Vishwakarma: How to claim ₹15,000 toolkit?",
  ];

  // Internal scroll function that only scrolls the message list without affecting window scroll
  const scrollChatToBottom = (smooth = true) => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // First mount: scroll message div to bottom without moving the page window
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
      return;
    }
    scrollChatToBottom(true);
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialQuery]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: data.reply || "I am currently processing your request. Please try again or visit your nearest CSC Seva Kendra.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: data.source || "gemini-3.8-flash",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const fallbackMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: `### 🇮🇳 Official Citizen Welfare Guidance
I apologize for the transient network delay. 

For verified information on government schemes:
- **PM-KISAN**: [pmkisan.gov.in](https://pmkisan.gov.in) | Helpline: 155261
- **Ayushman Bharat (PM-JAY)**: [beneficiary.nha.gov.in](https://beneficiary.nha.gov.in) | Helpline: 14555
- **PM Surya Ghar Solar**: [pmsuryaghar.gov.in](https://pmsuryaghar.gov.in) | Helpline: 15555
- **PM Mudra Yojana**: [mudra.org.in](https://www.mudra.org.in) | Helpline: 1800-11-0001
- **General Inquiries**: Visit your nearest Common Service Centre (CSC Digital Seva Kendra).`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if (!("speechSynthesis" in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown symbols for cleaner voice
    const cleanText = text
      .replace(/[*#_\[\]()]/g, "")
      .replace(/https?:\/\/\S+/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleResetChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setMessages([
      {
        id: "welcome",
        sender: "assistant",
        text: `### 🇮🇳 Namaste! Welcome to BharatScheme AI Citizen Assistant
I am your official AI guide for Central and State Government Welfare Schemes. Ask any question about eligibility, benefits, or documents!`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-3 sm:py-5 h-[calc(100vh-135px)] min-h-[480px] flex flex-col">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs mb-3 sm:mb-4 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#142a47] text-white flex items-center justify-center shadow-xs shrink-0">
            <Bot className="w-5 h-5 text-amber-300" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-bold text-slate-900 text-sm sm:text-base truncate">
                {t("ai_advisor_title", language)}
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 shrink-0">
                <ShieldCheck className="w-3 h-3" />
                <span>{t("verified_ai", language)}</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate hidden xs:block">
              {t("ai_advisor_sub", language)}
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-600 flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-xs"
          title="Clear chat session"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t("new_chat", language)}</span>
        </button>
      </div>

      {/* Messages Scroll Area with chatContainerRef */}
      <div
        ref={chatContainerRef}
        className="flex-1 bg-white rounded-2xl border border-slate-200 p-3 sm:p-6 overflow-y-auto shadow-xs space-y-4"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 sm:gap-3 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === "user"
                  ? "bg-amber-600 text-white"
                  : "bg-[#142a47] text-white"
              }`}
            >
              {msg.sender === "user" ? (
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[88%] sm:max-w-[78%] rounded-2xl p-3 sm:p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-amber-600 text-white font-medium rounded-tr-none shadow-xs"
                  : "bg-slate-50 text-slate-900 border border-slate-200 rounded-tl-none shadow-xs"
              }`}
            >
              {msg.sender === "assistant" ? (
                <div className="markdown-body space-y-2 prose-sm prose-slate">
                  <Markdown>{msg.text}</Markdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{msg.text}</p>
              )}

              {/* Timestamp & Tool Actions for Assistant */}
              <div
                className={`mt-2.5 pt-2 flex items-center justify-between text-[10px] ${
                  msg.sender === "user"
                    ? "text-amber-100 border-t border-amber-500/40"
                    : "text-slate-400 border-t border-slate-200"
                }`}
              >
                <span>{msg.timestamp}</span>

                {msg.sender === "assistant" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSpeak(msg.id, msg.text)}
                      className="hover:text-slate-800 p-0.5 rounded cursor-pointer"
                      title={speakingId === msg.id ? "Stop voice" : "Read aloud"}
                    >
                      {speakingId === msg.id ? (
                        <VolumeX className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-slate-800 p-0.5 rounded cursor-pointer"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#142a47] text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-amber-300" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none p-3 sm:p-4 text-xs text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span>Analyzing government guidelines and eligibility criteria...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompts Strip */}
      <div className="py-2 overflow-x-auto flex items-center gap-2 no-scrollbar shrink-0">
        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 shrink-0">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>{t("quick_ask", language)}</span>
        </div>
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            disabled={isLoading}
            className="px-3 py-1 rounded-full bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-slate-700 text-xs font-semibold whitespace-nowrap transition cursor-pointer disabled:opacity-50 shadow-xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-1.5 sm:p-2 shadow-xs flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={t("chat_placeholder", language)}
          className="flex-1 px-3 py-2 text-xs sm:text-sm bg-transparent focus:outline-none text-slate-900 placeholder-slate-400"
        />

        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-xl bg-[#142a47] hover:bg-[#1c385e] text-white disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-xs"
          title="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
