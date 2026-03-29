import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "dark" | "alt" | "glass";
  id?: string;
}

/** Gradient line + diamond ornament divider, sits at a section boundary */
function BrandDivider({ position }: { position: "top" | "bottom" }) {
  const edge = position === "top" ? "top-0" : "bottom-0";
  return (
    <div
      className={`absolute ${edge} left-0 right-0 flex items-center pointer-events-none`}
      style={{ zIndex: 2, padding: "0 5%" }}
    >
      {/* Left gradient line */}
      <div
        className="flex-1"
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(155,32,160,0.5))",
        }}
      />

      {/* Center ornament — diamond flanked by small dots */}
      <div className="flex items-center gap-1.5 mx-4 flex-shrink-0">
        <span
          className="block w-1.5 h-1.5 rounded-full"
          style={{ background: "rgba(155,32,160,0.4)" }}
        />
        <span
          className="block w-2.5 h-2.5 rotate-45"
          style={{
            background: "linear-gradient(135deg, #9b20a0, #e0007a)",
            borderRadius: "2px",
          }}
        />
        <span
          className="block w-1.5 h-1.5 rounded-full"
          style={{ background: "rgba(224,0,122,0.4)" }}
        />
      </div>

      {/* Right gradient line */}
      <div
        className="flex-1"
        style={{
          height: "1px",
          background:
            "linear-gradient(to left, transparent, rgba(224,0,122,0.5))",
        }}
      />
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
      {isAlt && <BrandDivider position="top" />}
      {variant === "glass" && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-50/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </>
      )}
      <div className="container-custom relative z-10">
        {children}
      </div>
      {isAlt && <BrandDivider position="bottom" />}
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
