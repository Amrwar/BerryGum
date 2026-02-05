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
    dark: "bg-slate-900 text-white",
    alt: "bg-slate-50",
    glass: "bg-gradient-to-b from-slate-50 to-white",
  };

  return (
    <section
      id={id}
      className={`section ${variants[variant]} ${className} relative overflow-hidden`}
    >
      {/* Subtle decorative background for visual interest */}
      {variant === "glass" && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
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
    <div className={`mb-12 lg:mb-16 ${centered ? "text-center max-w-3xl mx-auto" : ""}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
          light 
            ? "bg-amber-500/10 border border-amber-500/20" 
            : "bg-amber-100 border border-amber-200"
        }`}>
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
          <span className={`text-sm font-medium ${light ? "text-amber-400" : "text-amber-700"}`}>
            {badge}
          </span>
        </div>
      )}
      <h2 className={`heading-lg ${light ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg ${light ? "text-slate-400" : "text-slate-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
