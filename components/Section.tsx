import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "dark" | "alt" | "glass";
  id?: string;
}

/**
 * Centered divider: container is 18 px tall, offset -9 px so its midpoint
 * is exactly on the section's top edge. Line + ornament both at 50% height.
 * Requires the parent section to have overflow-visible (alt / default).
 */
function BrandDivider({ bgColor }: { bgColor: string }) {
  return (
    <div
      className="absolute left-0 right-0 pointer-events-none"
      style={{ top: "-9px", height: "18px", zIndex: 10 }}
    >
      {/* Gradient line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "5%",
          right: "5%",
          height: "1px",
          transform: "translateY(-50%)",
          background:
            "linear-gradient(to right, transparent, rgba(155,32,160,0.5) 30%, rgba(224,0,122,0.5) 70%, transparent)",
        }}
      />
      {/* Ornament — dot · diamond · dot, centered on the line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          padding: "0 8px",
          background: bgColor,
        }}
      >
        <span style={{ display: "block", width: "5px", height: "5px", borderRadius: "50%", background: "rgba(155,32,160,0.45)" }} />
        <span style={{ display: "block", width: "8px", height: "8px", borderRadius: "2px", transform: "rotate(45deg)", background: "linear-gradient(135deg, #9b20a0, #e0007a)" }} />
        <span style={{ display: "block", width: "5px", height: "5px", borderRadius: "50%", background: "rgba(224,0,122,0.45)" }} />
      </div>
    </div>
  );
}


export default function Section({
  children,
  className = "",
  variant = "default",
  id,
}: SectionProps) {
  const variantClass = {
    default: "bg-white",
    dark: "section-dark",
    alt: "bg-[#f8fafc]",
    glass: "bg-[#f8fafc]",
  }[variant];

  // All non-dark sections use overflow-visible so BrandDivider can straddle the boundary.
  const overflowClass = variant === "dark" ? "overflow-hidden" : "overflow-visible";

  const bgColor = variant === "alt" || variant === "glass" ? "#f8fafc" : "white";

  return (
    <section
      id={id}
      className={`section ${variantClass} ${overflowClass} ${className} relative`}
    >
      {/* Every non-dark section gets a top divider — one per boundary, no doubles */}
      {variant !== "dark" && <BrandDivider bgColor={bgColor} />}

      {variant === "glass" && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-50/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </>
      )}

      <div className="container-custom relative z-10">{children}</div>
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
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
          style={{ background: "rgba(155,32,160,0.08)", border: "1px solid rgba(155,32,160,0.2)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gradient-brand)" }} />
          <span className="text-sm font-medium" style={{ color: "#9b20a0" }}>{badge}</span>
        </div>
      )}
      <h2 className={`heading-lg ${light ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-3 text-base ${light ? "text-slate-400" : "text-slate-600"}`}>{subtitle}</p>
      )}
    </div>
  );
}
