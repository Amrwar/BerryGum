"use client";

import Link from "next/link";
import Image from "next/image";
import Section, { SectionHeader } from "@/components/Section";
import HeroBg from "@/components/HeroBg";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";

// Real images for clinic portfolio items — index matches portfolioItems order
// undefined = show generic placeholder
const clinicPortfolioImages: (string | undefined)[] = [
  undefined,
  undefined,
  undefined,
  "/portfolio/arty-dental-collab.png",
  "/portfolio/onmedical-collab.png",
];

// Company logos — shown as overlay badge on thumbnail and in card header
const clinicPortfolioLogos: (string | undefined)[] = [
  undefined,
  undefined,
  undefined,
  "/portfolio/logo-arty-dental.png",
  "/portfolio/logo-onmedical.png",
];

const featureIcons = [
  <svg key="0" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  <svg key="5" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
];

export default function ClinicsPage() {
  const { t, messages } = useLanguage();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const features: any[] = Object.values(messages.clinicsPage.features as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const includedItems: any[] = Object.values(messages.clinicsPage.includedItems as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const withoutItems: any[] = Object.values(messages.clinicsPage.withoutItems as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const portfolioItems: any[] = Object.values(messages.clinicsPage.portfolioItems as any);

  return (
    <>
      {/* Hero Section */}
      <section className="hero relative pt-44 pb-20 overflow-hidden">
        <HeroBg />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                 style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-sm font-medium text-white">
                {t("clinicsPage.badge")}
              </span>
            </div>

            <h1 className="heading-xl text-white mb-4">
              {t("clinicsPage.title")}{" "}
              <span className="text-gradient">
                {t("clinicsPage.titleHighlight")}
              </span>
            </h1>

            <p className="text-base text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto">
              {t("clinicsPage.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(t("clinicsPage.whatsappClinic"))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t("clinicsPage.cta")}
              </Link>
              <Link href="/pricing" className="btn btn-outline-light btn-lg">
                {t("clinicsPage.viewPricing")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <Section>
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "var(--gradient-brand)" }}>
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path d="M9 10a3 3 0 116 0c0 2-3 3-3 5" />
              <path d="M12 18h.01" />
            </svg>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Why text */}
          <div>
            <SectionHeader
              badge={t("clinicsPage.whyBadge")}
              title={t("clinicsPage.whyTitle")}
              subtitle=""
              centered={false}
            />

            {/* Stat callout */}
            <div className="flex items-center gap-5 p-5 rounded-2xl mb-6"
                 style={{ background: "rgba(155,32,160,0.06)", border: "1px solid rgba(155,32,160,0.18)" }}>
              <span className="text-5xl font-black leading-none flex-shrink-0"
                    style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                87%
              </span>
              <p className="text-slate-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("clinicsPage.whyP1").replace(/^<strong>87%<\/strong>\s*of/, "of") }} />
            </div>

            {/* Bullet points */}
            <div className="space-y-4">
              {[t("clinicsPage.whyP2"), t("clinicsPage.whyP3")].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                       style={{ background: "var(--gradient-brand)" }}>
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Without a website card */}
          <div className="rounded-2xl overflow-hidden"
               style={{ background: "linear-gradient(145deg, #0e0025 0%, #2a0a5e 60%, #180038 100%)", border: "1px solid rgba(155,32,160,0.3)", boxShadow: "0 8px 40px rgba(30,10,94,0.3)" }}>
            {/* Card header */}
            <div className="flex items-center gap-3 px-6 py-4"
                 style={{ background: "rgba(224,0,122,0.12)", borderBottom: "1px solid rgba(155,32,160,0.2)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                   style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.3)" }}>
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-base">{t("clinicsPage.withoutWebsite")}</h3>
            </div>

            {/* Items */}
            <ul className="px-6 py-5 space-y-4">
              {withoutItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                       style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}>
                    <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-white/65 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            {/* Footer note */}
            <div className="mx-6 mb-5 px-4 py-3 rounded-xl"
                 style={{ background: "rgba(155,32,160,0.12)", border: "1px solid rgba(155,32,160,0.2)" }}>
              <p className="text-xs text-fuchsia-300/70 text-center leading-relaxed">
                {t("clinicsPage.whyP3")}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section variant="alt">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "var(--gradient-brand)" }}>
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        </div>
        <SectionHeader
          badge={t("clinicsPage.featuresBadge")}
          title={t("clinicsPage.featuresTitle")}
          subtitle={t("clinicsPage.featuresSubtitle")}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card group">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {featureIcons[index]}
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#1e0a5e" }}>{feature.title}</h3>
              <p className="text-slate-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What's Included */}
      <Section>
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "var(--gradient-brand)" }}>
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              badge={t("clinicsPage.includedBadge")}
              title={t("clinicsPage.includedTitle")}
              subtitle={t("clinicsPage.includedSubtitle")}
              centered={false}
            />
            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {includedItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-2xl p-8 text-white overflow-hidden text-center" style={{ background: "var(--gradient-brand)" }}>
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-4">
                {t("clinicsPage.startingAt")}
              </span>
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <span className="text-5xl font-bold">25,000</span>
                <span className="text-xl text-white/70">{t("pricing.egp")}</span>
              </div>
              <p className="text-white/70 text-sm mb-6 mt-2">{t("clinicsPage.priceNote")}</p>
              <Link
                href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(t("clinicsPage.whatsappQuote"))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full justify-center font-bold shadow-lg"
                style={{ background: "white", color: "#9b20a0" }}
              >
                <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t("clinicsPage.getFreeQuote")}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Portfolio Preview */}
      <Section variant="alt">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "var(--gradient-brand)" }}>
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <SectionHeader
          badge={t("clinicsPage.portfolioBadge")}
          title={t("clinicsPage.portfolioTitle")}
          subtitle={t("clinicsPage.portfolioSubtitle")}
        />

        <div className="grid md:grid-cols-2 gap-6">
          {portfolioItems.map((item, index) => {
            const img = clinicPortfolioImages[index];
            const logo = clinicPortfolioLogos[index];
            if (!img) return null;
            return (
              <div key={index} className="card group overflow-hidden p-0">
                <div className="aspect-video relative bg-slate-900 overflow-hidden rounded-t-2xl">
                  {img ? (
                    <Image
                      src={img}
                      alt={item.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                      <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  )}
                  {/* Company logo badge */}
                  {logo && (
                    <div className="absolute bottom-2 left-2 rounded-xl overflow-hidden shadow-lg"
                         style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", padding: "4px 8px" }}>
                      <div className="relative h-5 w-16">
                        <Image src={logo} alt="" fill className="object-contain object-left" sizes="64px" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold" style={{ color: "#1e0a5e" }}>{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.type}</p>
                  </div>
                  {logo && (
                    <div className="relative h-5 w-14 flex-shrink-0 opacity-60 mt-0.5">
                      <Image src={logo} alt="" fill className="object-contain object-right" sizes="56px" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/portfolio" className="btn btn-primary">
            {t("clinicsPage.viewFullPortfolio")}
          </Link>
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="dark" className="relative overflow-hidden">
        <div className="relative text-center max-w-3xl mx-auto">
          <h2 className="heading-lg text-white mb-6">
            {t("clinicsPage.ctaTitle")}
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            {t("clinicsPage.ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(t("clinicsPage.whatsappClinic"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t("clinicsPage.startProject")}
            </Link>
            <Link href="/contact" className="btn btn-primary btn-lg">
              {t("clinicsPage.contactUs")}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
