"use client";

import PricingCards from "@/components/PricingCards";
import { useLanguage } from "@/lib/LanguageContext";

export default function PricingPage() {
  const { t } = useLanguage();

  return (
    <div style={{ background: "#0d0120", minHeight: "100vh" }}>
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-40"
             style={{ background: "radial-gradient(ellipse, rgba(155,32,160,0.25) 0%, rgba(30,10,94,0.15) 50%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-20"
             style={{ background: "radial-gradient(circle, rgba(224,0,122,0.2) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-20"
             style={{ background: "radial-gradient(circle, rgba(30,10,94,0.3) 0%, transparent 70%)" }} />
      </div>

      <div className="relative container-custom pt-44 pb-24">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
               style={{ background: "rgba(155,32,160,0.15)", border: "1px solid rgba(155,32,160,0.3)", color: "#d946ef" }}>
            {t("pricing.badge")}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            {t("pricing.heroTitle")}{" "}
            <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t("pricing.heroTitleGradient")}
            </span>
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            {t("pricing.subtitle")}
          </p>
        </div>

        {/* Pricing Cards */}
        <PricingCards showToggle={true} />
      </div>
    </div>
  );
}
