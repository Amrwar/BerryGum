import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "dark" | "alt" | "glass";
  id?: string;
}

/**
 * Divider container is 18px tall and offset by -9px so its vertical midpoint
 * sits exactly on the section boundary. The gradient line and ornament are both
 * centered at 50% of that container — i.e. right on the boundary edge.
 *
 * Requires the parent section to NOT have overflow-hidden (alt/default drop it).
 * Glass keeps overflow-hidden, so it uses a simpler in-bounds line instead.
 */
function BrandDivider({
  position,
  bgColor,
}: {
  position: "top" | "bottom";
  bgColor: string;
}) {
  const isTop = position === "top";
  const offset = "-9px"; // half of the 18px container

  return (
    <div
      className="absolute left-0 right-0 pointer-events-none"
      style={{
        [isTop ? "top" : "bottom"]: offset,
        height: "18px",
        zIndex: 10,
      }}
    >
      {/* Gradient line — centered vertically in the 18px container */}
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

      {/* Ornament — centered both horizontally and vertically on the line */}
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
        <span
          style={{
            display: "block",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "rgba(155,32,160,0.45)",
          }}
        />
        <span
          style={{
            display: "block",
            width: "8px",
            height: "8px",
            borderRadius: "2px",
            transform: "rotate(45deg)",
            background: "linear-gradient(135deg, #9b20a0, #e0007a)",
          }}
        />
        <span
          style={{
            display: "block",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "rgba(224,0,122,0.45)",
          }}
        />
      </div>
    </div>
  );
}

/** Simpler in-bounds line for sections that must keep overflow-hidden (glass). */
function SimpleLine() {
  return (
    <div
      className="absolute top-0 left-0 right-0 pointer-events-none"
      style={{ height: "1px", zIndex: 2 }}
    >
      <div
        style={{
          margin: "0 5%",
          height: "100%",
          background:
            "linear-gradient(to right, transparent, rgba(155,32,160,0.4) 30%, rgba(224,0,122,0.4) 70%, transparent)",
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

  // glass keeps overflow-hidden (needed for decorative blobs);
  // alt and default drop it so BrandDivider can straddle the boundary.
  const overflowClass =
    variant === "glass" ? "overflow-hidden" : "overflow-visible";

  return (
    <section
      id={id}
      className={`section ${variants[variant]} ${overflowClass} ${className} relative`}
    >
      {/* Top divider — white→gray transition */}
      {variant === "alt" && <BrandDivider position="top" bgColor="#f8fafc" />}
      {variant === "glass" && <SimpleLine />}

      {variant === "glass" && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-50/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </>
      )}

      <div className="container-custom relative z-10">{children}</div>

      {/* Bottom divider — gray→white transition */}
      {variant === "default" && <BrandDivider position="bottom" bgColor="white" />}
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
    <div
      className={`mb-8 lg:mb-10 ${centered ? "text-center max-w-3xl mx-auto" : ""}`}
    >
      {badge && (
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
          style={{
            background: "rgba(155,32,160,0.08)",
            border: "1px solid rgba(155,32,160,0.2)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--gradient-brand)" }}
          />
          <span className="text-sm font-medium" style={{ color: "#9b20a0" }}>
            {badge}
          </span>
        </div>
      )}
      <h2 className={`heading-lg ${light ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base ${light ? "text-slate-400" : "text-slate-600"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
