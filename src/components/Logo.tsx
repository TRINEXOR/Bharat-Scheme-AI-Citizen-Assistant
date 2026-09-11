import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "footer" | "dark";
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showSubtitle = true,
  className = "",
  onClick,
  variant = "default",
}) => {
  const isFooter = variant === "footer";
  const isDark = variant === "dark" || isFooter;
  // Dimensions based on size
  const iconSize = size === "sm" ? 36 : size === "lg" ? 56 : 46;
  const titleSize = size === "sm" ? "text-xl" : size === "lg" ? "text-3xl" : "text-2xl";
  const badgeSize = size === "sm" ? "text-[10px] px-1.5 py-0.5" : size === "lg" ? "text-xs px-2.5 py-1" : "text-[11px] px-2 py-0.5";
  const subSize = size === "sm" ? "text-[9px] tracking-[0.14em]" : size === "lg" ? "text-[13px] tracking-[0.2em]" : "text-[11px] tracking-[0.18em]";

  return (
    <div
      className={`inline-flex items-center gap-3 select-none cursor-pointer ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Indian Tricolor Emblem in Navy Container (Matching Image 1 & 2) */}
      <div
        className="relative shrink-0 overflow-hidden shadow-sm transition-transform hover:scale-105"
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius: size === "sm" ? "10px" : size === "lg" ? "16px" : "13px",
          border: `${size === "sm" ? 3 : size === "lg" ? 4.5 : 3.5}px solid ${isDark ? "#10b981" : "#138808"}`,
          backgroundColor: "#ffffff",
        }}
      >
        {/* Tricolor Bands */}
        <div className="flex flex-col h-full w-full">
          {/* Saffron Band */}
          <div className="h-1/3 w-full bg-[#FF9933]" />

          {/* White Band with Ashoka Chakra */}
          <div className="h-1/3 w-full bg-white relative flex items-center justify-center">
            {/* SVG Ashoka Chakra */}
            <svg
              viewBox="0 0 100 100"
              className="h-[85%] w-[85%] text-[#000080]"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            >
              {/* Outer ring */}
              <circle cx="50" cy="50" r="44" strokeWidth="6" />
              {/* Center hub */}
              <circle cx="50" cy="50" r="10" fill="#000080" />
              {/* 24 Spokes */}
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * 360) / 24;
                const rad = (angle * Math.PI) / 180;
                const x2 = 50 + 44 * Math.cos(rad);
                const y2 = 50 + 44 * Math.sin(rad);
                return (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={x2}
                    y2={y2}
                    strokeWidth="2.5"
                  />
                );
              })}
            </svg>
          </div>

          {/* Green Band */}
          <div className="h-1/3 w-full bg-[#138808]" />
        </div>
      </div>

      {/* Brand Typography: Bharat in Orange & Scheme in Green in all pages */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`font-extrabold ${titleSize} tracking-tight ${
              isDark ? "text-orange-400" : "text-[#EA580C]"
            }`}
          >
            Bharat
          </span>
          <span
            className={`font-extrabold ${titleSize} tracking-tight ${
              isDark ? "text-emerald-400" : "text-[#138808]"
            }`}
          >
            Scheme
          </span>
          <span
            className={`font-bold uppercase tracking-wider rounded-md border shadow-xs ${badgeSize} ${
              isDark
                ? "border-emerald-500/40 bg-emerald-950/60 text-emerald-300"
                : "border-emerald-300 bg-[#E6F4EA] text-[#065F46]"
            }`}
          >
            .GOV.IN
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`font-bold uppercase mt-1 font-mono ${subSize} ${
              isDark ? "text-slate-300" : "text-slate-500"
            }`}
          >
            AI CITIZEN ASSISTANT
          </span>
        )}
      </div>
    </div>
  );
};
