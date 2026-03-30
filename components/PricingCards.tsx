"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";

interface PricingCardsProps {
  showToggle?: boolean;
}

export default function PricingCards({ showToggle = true }: PricingCardsProps) {
  const [isMonthly, setIsMonthly] = useState(false);
  const { t, messages } = useLanguage();

  const plansData = isMonthly ? messages.pricing.plans.monthly : messages.pricing.plans.oneTime;
  const plans = Object.values(plansData) as {
    name: string;
    description: string;
    price: string;
    currency: string;
    features: string[];
    notIncluded: string[];
  }[];

  const popularIndex = 1;

  return (
    <div>
      {/* Toggle */}
      {showToggle && (
        <div className="flex items-center justify-center gap-3 mb-14">
          <div className="inline-flex items-center rounded-full p-1"
               style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <button
              onClick={() => setIsMonthly(false)}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
              style={!isMonthly
                ? { background: "var(--gradient-brand)", color: "white" }
                : { color: "rgba(255,255,255,0.5)" }
              }
            >
              {t("pricing.oneTime")}
            </button>
            <button
              onClick={() => setIsMonthly(true)}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
              style={isMonthly
                ? { background: "var(--gradient-brand)", color: "white" }
                : { color: "rgba(255,255,255,0.5)" }
              }
            >
              {t("pricing.monthly")}
            </button>
          </div>
          {isMonthly && (
            <span className="text-xs font-bold px-3 py-1 rounded-full border"
                  style={{ color: "#4ade80", background: "rgba(74,222,128,0.1)", borderColor: "rgba(74,222,128,0.25)" }}>
              {t("pricing.contractNote")}
            </span>
          )}
        </div>
      )}

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => {
          const isPopular = index === popularIndex;
          return (
            <div
              key={plan.name}
              className="relative rounded-2xl overflow-visible flex flex-col"
              style={{
                background: isPopular
                  ? "linear-gradient(145deg, rgba(60,10,100,0.8), rgba(30,5,60,0.9))"
                  : "rgba(255,255,255,0.03)",
                border: isPopular
                  ? "1px solid rgba(224,0,122,0.5)"
                  : "1px solid rgba(155,32,160,0.2)",
                boxShadow: isPopular
                  ? "0 0 50px rgba(224,0,122,0.12), 0 0 100px rgba(155,32,160,0.06)"
                  : "none",
              }}
            >
              {/* Most popular badge — centered at top */}
              {isPopular && (
                <div className="absolute -top-px left-0 right-0 flex justify-center">
                  <div className="text-white text-xs font-bold tracking-widest px-5 py-1.5 rounded-b-xl"
                       style={{ background: "var(--gradient-brand)" }}>
                    {t("pricing.popular")}
                  </div>
                </div>
              )}

              <div className="p-8 pt-10 flex flex-col flex-1">
                {/* Plan name */}
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
                    style={{ color: isPopular ? "#f472b6" : "#a78bfa" }}>
                  {plan.name}
                </h3>
                <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white">{plan.price}</span>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {plan.currency}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="mb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center"
                           style={{ background: "var(--gradient-brand)" }}>
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(`مرحباً! أريد الاستفسار عن باقة ${plan.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                  style={isPopular
                    ? { background: "var(--gradient-brand)", color: "white" }
                    : { background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white" }
                  }
                >
                  {t("pricing.getStarted")} →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Badges */}
      <div className="grid md:grid-cols-3 gap-8 mt-16 pt-12"
           style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        {[
          {
            title: t("pricing.trust.speed.title"),
            desc: t("pricing.trust.speed.desc"),
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
          {
            title: t("pricing.trust.secure.title"),
            desc: t("pricing.trust.secure.desc"),
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ),
          },
          {
            title: t("pricing.trust.support.title"),
            desc: t("pricing.trust.support.desc"),
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ),
          },
        ].map((badge) => (
          <div key={badge.title} className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                 style={{
                   background: "rgba(155,32,160,0.15)",
                   border: "1px solid rgba(155,32,160,0.25)",
                   color: "#a78bfa",
                 }}>
              {badge.icon}
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1 text-sm">{badge.title}</h4>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Need something custom? */}
      <div className="mt-10 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6"
           style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div>
          <h4 className="font-bold text-white mb-1">{t("pricing.customNote")}</h4>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            {t("pricing.customSubNote")}
          </p>
        </div>
        <Link
          href="/contact"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white flex-shrink-0 transition-all hover:opacity-90"
          style={{ background: "var(--gradient-brand)" }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {t("pricing.customButton")}
        </Link>
      </div>
    </div>
  );
}
