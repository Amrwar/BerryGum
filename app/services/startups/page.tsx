"use client";

import Link from "next/link";
import Section, { SectionHeader } from "@/components/Section";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";

const featureIcons = [
  <svg key="0" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  <svg key="5" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
];

export default function StartupsPage() {
  const { t, messages } = useLanguage();

  const features = Object.values(messages.startupsPage.features) as { title: string; description: string }[];
  const includedItems = Object.values(messages.startupsPage.includedItems) as string[];
  const benefits = Object.values(messages.startupsPage.benefits) as string[];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pb-28 bg-white overflow-hidden" style={{ borderBottom: "1px solid rgba(155,32,160,0.1)" }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-500/10" />
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                 style={{ background: "rgba(155,32,160,0.08)", border: "1px solid rgba(155,32,160,0.2)" }}>
              <span className="text-xl">🚀</span>
              <span className="text-sm font-medium" style={{ color: "#9b20a0" }}>
                {t("startupsPage.badge")}
              </span>
            </div>

            <h1 className="heading-xl text-slate-900 mb-6">
              {t("startupsPage.title")}{" "}
              <span className="text-gradient-brand">
                {t("startupsPage.titleHighlight")}
              </span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              {t("startupsPage.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(t("startupsPage.whatsappStartup"))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t("startupsPage.cta")}
              </Link>
              <Link href="/pricing" className="btn btn-outline-light btn-lg">
                {t("startupsPage.viewPricing")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              badge={t("startupsPage.whyBadge")}
              title={t("startupsPage.whyTitle")}
              subtitle=""
              centered={false}
            />
            <div className="space-y-4 text-slate-600">
              <p dangerouslySetInnerHTML={{ __html: t("startupsPage.whyP1") }} />
              <p>{t("startupsPage.whyP2")}</p>
              <p>{t("startupsPage.whyP3")}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">{t("startupsPage.benefitsTitle")}</h3>
            <ul className="space-y-3">
              {benefits.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-fuchsia-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section variant="alt">
        <SectionHeader
          badge={t("startupsPage.featuresBadge")}
          title={t("startupsPage.featuresTitle")}
          subtitle={t("startupsPage.featuresSubtitle")}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card p-6 group">
              <div className="feature-icon group-hover:scale-110 transition-transform">
                {featureIcons[index]}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What's Included Section */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              badge={t("startupsPage.includedBadge")}
              title={t("startupsPage.includedTitle")}
              subtitle={t("startupsPage.includedSubtitle")}
              centered={false}
            />
            <ul className="grid sm:grid-cols-2 gap-3">
              {includedItems.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-fuchsia-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center">
            <div className="text-purple-300 text-sm font-medium mb-2">{t("startupsPage.startingAt")}</div>
            <div className="text-5xl font-bold text-white mb-2">15,000</div>
            <div className="text-slate-400 mb-6">EGP</div>
            <p className="text-slate-400 text-sm mb-6">{t("startupsPage.priceNote")}</p>
            <Link
              href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(t("startupsPage.whatsappQuote"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full"
            >
              {t("startupsPage.getFreeQuote")}
            </Link>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <section className="hero py-20 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-pink-500/15 rounded-full blur-[60px] animate-pulse-slow" />

        <div className="container-custom relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-lg text-white mb-6">{t("startupsPage.ctaTitle")}</h2>
            <p className="text-xl text-slate-300 mb-10">{t("startupsPage.ctaSubtitle")}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(t("startupsPage.whatsappStartup"))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                {t("startupsPage.startProject")}
              </Link>
              <Link href="/contact" className="btn btn-outline-light btn-lg">
                {t("startupsPage.contactUs")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
