"use client";

import Link from "next/link";
import HeroBg from "@/components/HeroBg";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  const stats = [
    { value: "50+", label: t("about.stats.projects") },
    { value: "5+",   label: t("about.stats.experience") },
    { value: "98%",  label: t("about.stats.satisfaction") },
    { value: "2019", label: t("hero.established") },
  ];

  return (
    <section className="hero min-h-[88vh] flex items-center relative overflow-hidden">
      <HeroBg />

      <div className="container-custom relative z-10 pt-36 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Stats card — left on LTR, right on RTL ── */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm">

              {/* Card */}
              <div className="rounded-3xl overflow-hidden shadow-2xl"
                   style={{ background: "var(--gradient-brand)", boxShadow: "0 20px 60px rgba(155,32,160,0.35)" }}>

                {/* Header */}
                <div className="px-8 pt-8 pb-6 text-center border-b border-white/10">
                  <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-lg">BerryGum Studio</h3>
                  <p className="text-white/60 text-xs mt-1">{t("hero.badge")}</p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-px bg-white/10">
                  {stats.map((stat) => (
                    <div key={stat.label} className="px-6 py-5 bg-white/5 text-center">
                      <div className="text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="px-8 py-5 bg-white/5">
                  <Link
                    href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(siteConfig.whatsappMessages.general)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl bg-white font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                    style={{ color: "#9b20a0" }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t("hero.cta")}
                  </Link>
                </div>
              </div>


            </div>
          </div>

          {/* ── Text content — right on LTR, left on RTL ── */}
          <div className="order-1 lg:order-2">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-fade-in"
                 style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse bg-white" />
              <span className="text-sm font-medium text-white">
                {t("hero.badge")}
              </span>
            </div>

            {/* Heading */}
            <h1 className="heading-xl text-white mb-6 animate-fade-in">
              {t("hero.title")}{" "}
              <span className="text-gradient-gold">{t("hero.titleHighlight")}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base text-white/70 mb-8 leading-relaxed animate-fade-in">
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-8 animate-fade-in">
              <Link href="/contact" className="btn btn-primary btn-lg">
                {t("nav.getStarted")}
              </Link>
              <Link href="/pricing" className="btn btn-outline-light btn-lg">
                {t("hero.viewPricing")}
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                t("hero.trustDelivery"),
                t("hero.trustConsultation"),
                t("hero.trustSupport"),
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-white/60">
                  <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "var(--gradient-brand)" }}>
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {item}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
