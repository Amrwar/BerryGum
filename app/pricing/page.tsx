"use client";

import HeroBg from "@/components/HeroBg";
import PricingCards from "@/components/PricingCards";
import { useLanguage } from "@/lib/LanguageContext";

export default function PricingPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="hero relative pt-44 pb-20 overflow-hidden">
        <HeroBg />
        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-6"
                 style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white mr-2" />
              <span className="text-sm font-medium text-white">{t("pricing.badge")}</span>
            </div>
            <h1 className="heading-xl text-white mb-4">
              {t("pricing.heroTitle")}{" "}
              <span className="text-gradient-gold">{t("pricing.heroTitleGradient")}</span>
            </h1>
            <p className="text-base text-white/70 leading-relaxed">
              {t("pricing.subtitle")}
            </p>
          </div>

          {/* Pricing Cards */}
          <PricingCards showToggle={true} />
        </div>
      </section>
    </>
  );
}
