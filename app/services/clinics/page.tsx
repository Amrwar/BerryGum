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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              badge={t("clinicsPage.whyBadge")}
              title={t("clinicsPage.whyTitle")}
              subtitle=""
              centered={false}
            />
            <div className="space-y-4 text-slate-600">
              <p dangerouslySetInnerHTML={{ __html: t("clinicsPage.whyP1") }} />
              <p>{t("clinicsPage.whyP2")}</p>
              <p>{t("clinicsPage.whyP3")}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">{t("clinicsPage.withoutWebsite")}</h3>
            <ul className="space-y-3">
              {withoutItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
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
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What's Included */}
      <Section>
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
        <SectionHeader
          badge={t("clinicsPage.portfolioBadge")}
          title={t("clinicsPage.portfolioTitle")}
          subtitle={t("clinicsPage.portfolioSubtitle")}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item, index) => {
            const img = clinicPortfolioImages[index];
            const logo = clinicPortfolioLogos[index];
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
                    <h3 className="font-bold text-slate-900">{item.name}</h3>
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

      {/* Testimonial */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <svg className="w-12 h-12 text-blue-200 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-2xl text-slate-700 font-medium mb-6">
            &ldquo;{t("clinicsPage.testimonial.quote")}&rdquo;
          </blockquote>
          <div>
            <div className="font-bold text-slate-900">{t("clinicsPage.testimonial.author")}</div>
            <div className="text-slate-500">{t("clinicsPage.testimonial.company")}</div>
          </div>
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
