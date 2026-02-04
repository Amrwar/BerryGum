import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "dark" | "alt";
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
  };

  return (
    <section
      id={id}
      className={`section ${variants[variant]} ${className}`}
    >
      <div className="container-custom">
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
