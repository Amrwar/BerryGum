import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "dark" | "alt" | "glass";
  id?: string;
}

function WaveTop() {
  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: "52px", zIndex: 1 }}>
      <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
        <path d="M0,0 L1440,0 L1440,32 C1200,12 960,52 720,32 C480,12 240,52 0,32 Z" fill="white" />
      </svg>
    </div>
  );
}

function WaveBottom() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: "52px", zIndex: 1 }}>
      <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
        <path d="M0,52 L1440,52 L1440,20 C1200,40 960,0 720,20 C480,40 240,0 0,20 Z" fill="white" />
      </svg>
    </div>
  );
}

export default function Section({
  children,
  className = "",
  variant = "default",
  id,
}: SectionProps) {
  const variants = {
    default: "bg-white",
    dark: "section-dark",
    alt: "bg-[#f8fafc]",
    glass: "bg-[#f8fafc]",
  };

  const isAlt = variant === "alt" || variant === "glass";

  return (
    <section
      id={id}
      className={`section ${variants[variant]} ${className} relative overflow-hidden`}
    >
      {isAlt && <WaveTop />}
      {variant === "glass" && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-50/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </>
      )}
      <div className="container-custom relative z-10">
        {children}
      </div>
      {isAlt && <WaveBottom />}
    </section>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-8 lg:mb-10 ${centered ? "text-center max-w-3xl mx-auto" : ""}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
             style={{ background: "rgba(155,32,160,0.08)", border: "1px solid rgba(155,32,160,0.2)" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gradient-brand)" }} />
          <span className="text-sm font-medium" style={{ color: "#9b20a0" }}>
            {badge}
          </span>
        </div>
      )}
      <h2 className={`heading-lg ${light ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base ${light ? "text-slate-400" : "text-slate-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
