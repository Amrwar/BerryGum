"use client";

import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Section, { SectionHeader } from "@/components/Section";
import ServicesIllustration from "@/components/ServicesIllustration";
import AboutIllustration from "@/components/AboutIllustration";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  const services = [
    {
      icon: (
        // Medical cross in circle — clinic / healthcare
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t("services.clinics.title"),
      description: t("services.clinics.description"),
      href: "/services/clinics",
      color: "from-purple-500 to-fuchsia-400",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=360&fit=crop&auto=format",
    },
    {
      icon: (
        // Fork & knife — restaurant / dining
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 2v5m-2-4h4m-4 2h4M6 7v15M18 2v20M16 2a4 4 0 014 4v1h-4" />
        </svg>
      ),
      title: t("services.restaurants.title"),
      description: t("services.restaurants.description"),
      href: "/services/restaurants",
      color: "from-fuchsia-500 to-pink-400",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=360&fit=crop&auto=format",
    },
    {
      icon: (
        // Shopping cart — e-commerce
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: t("services.ecommerce.title"),
      description: t("services.ecommerce.description"),
      href: "/pricing",
      color: "from-pink-500 to-fuchsia-400",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=360&fit=crop&auto=format",
    },
    {
      icon: (
        // Briefcase — corporate / business
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: t("services.corporate.title"),
      description: t("services.corporate.description"),
      href: "/pricing",
      color: "from-purple-600 to-pink-500",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=360&fit=crop&auto=format",
    },
  ];

  const features = [
    { title: t("features.fast.title"), description: t("features.fast.description"), icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
    { title: t("features.seo.title"), description: t("features.seo.description"), icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> },
    { title: t("features.mobile.title"), description: t("features.mobile.description"), icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
    { title: t("features.secure.title"), description: t("features.secure.description"), icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
    { title: t("features.analytics.title"), description: t("features.analytics.description"), icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
    { title: t("features.support.title"), description: t("features.support.description"), icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
  ];

  const stats = [
    { value: "150+", label: t("about.stats.projects") },
    { value: "98%", label: t("about.stats.satisfaction") },
    { value: "5+", label: t("about.stats.experience") },
    { value: "50+", label: t("about.stats.clients") },
  ];

  return (
    <>
      <Hero />

      {/* Services Section */}
      <Section id="services" variant="glass">
        <div className="flex justify-center mb-6">
          <ServicesIllustration />
        </div>
        <SectionHeader badge={t("services.badge")} title={t("services.title")} subtitle={t("services.subtitle")} />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="group card border-t-2 border-b-2 border-t-purple-300 border-b-purple-300 border-l border-r border-l-slate-200 border-r-slate-200 overflow-hidden flex flex-col p-0">
              {/* Card image */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Card content */}
              <div className="p-5 flex flex-col flex-1">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-pink-600 transition-colors">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{service.description}</p>
                <div className="mt-4 flex items-center text-fuchsia-700 font-medium text-sm">
                  {t("services.learnMore")}
                  <svg className="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* About Section */}
      <Section variant="alt" id="about">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: "rgba(155,32,160,0.08)", border: "1px solid rgba(155,32,160,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gradient-brand)" }} />
              <span className="text-sm font-medium" style={{ color: "#9b20a0" }}>{t("about.badge")}</span>
            </div>
            <h2 className="heading-lg text-slate-900 mb-6">{t("about.title")}</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">{t("about.description1")}</p>
            <p className="text-slate-600 leading-relaxed mb-8">{t("about.description2")}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="group">
                  <div className="text-3xl font-bold text-gradient-gold group-hover:scale-105 transition-transform">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <AboutIllustration />
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section>
        <SectionHeader badge={t("features.badge")} title={t("features.title")} subtitle={t("features.subtitle")} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-white px-6 py-7 rounded-xl border border-slate-200 border-t-2 border-b-2 border-t-purple-200 border-b-purple-200 transition-all duration-300 hover:shadow-md"
            >
              <div className="feature-icon group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-pink-600 transition-colors">{feature.title}</h3>
              <p className="text-slate-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden" style={{ background: "var(--gradient-brand)" }}>
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-lg text-white mb-4">{t("cta.title")}</h2>
            <p className="text-base mb-8" style={{ color: "rgba(255,200,230,0.9)" }}>{t("cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(siteConfig.whatsappMessages.general)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t("cta.whatsapp")}
              </Link>
              <Link href="/contact" className="btn btn-outline-light btn-lg">
                {t("cta.contact")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
