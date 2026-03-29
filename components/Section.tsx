import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "dark" | "alt" | "glass";
  id?: string;
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
    alt: "bg-[#fdf6ff]",
    glass: "bg-gradient-to-b from-[#fdf6ff] to-white",
  };

  return (
    <section
      id={id}
      className={`section ${variants[variant]} ${className} relative overflow-hidden`}
    >
      {/* Subtle decorative background for visual interest */}
      {variant === "glass" && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-50/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </>
      )}
      <div className="container-custom relative z-10">
        {children}
      </div>
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
