"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import Section, { SectionHeader } from "@/components/Section";
import FAQ from "@/components/FAQ";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: t("services.clinics.title"),
      description: t("services.clinics.description"),
      href: "/services/clinics",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t("services.restaurants.title"),
      description: t("services.restaurants.description"),
      href: "/services/restaurants",
      color: "from-orange-500 to-red-400",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      title: t("services.ecommerce.title"),
      description: t("services.ecommerce.description"),
      href: "/pricing",
      color: "from-purple-500 to-pink-400",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: t("services.corporate.title"),
      description: t("services.corporate.description"),
      href: "/pricing",
      color: "from-slate-600 to-slate-400",
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
        <SectionHeader badge={t("services.badge")} title={t("services.title")} subtitle={t("services.subtitle")} />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="group card p-6">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
              <div className="mt-4 flex items-center text-amber-600 font-medium text-sm">
                {t("services.learnMore")}
                <svg className="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* About Section */}
      <Section variant="alt" id="about">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="badge mb-6">{t("about.badge")}</span>
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
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-amber-100/50 to-slate-100 rounded-3xl overflow-hidden shadow-glass">
              {/* Decorative floating elements */}
              <div className="absolute top-8 right-8 w-16 h-16 bg-amber-400/20 rounded-xl rotate-12 animate-float" />
              <div className="absolute bottom-12 left-8 w-12 h-12 bg-blue-400/20 rounded-lg -rotate-6 animate-float animation-delay-400" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-white rounded-2xl shadow-glass-lg p-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-lg p-4">
                    <div className="w-1/3 h-4 bg-amber-200 rounded mb-3" />
                    <div className="w-full h-3 bg-slate-200 rounded mb-2" />
                    <div className="w-4/5 h-3 bg-slate-200 rounded mb-2" />
                    <div className="w-2/3 h-3 bg-slate-200 rounded mb-6" />
                    <div className="grid grid-cols-3 gap-2">
                      <div className="aspect-square bg-gradient-to-br from-amber-200 to-amber-100 rounded-lg" />
                      <div className="aspect-square bg-gradient-to-br from-emerald-200 to-emerald-100 rounded-lg" />
                      <div className="aspect-square bg-gradient-to-br from-blue-200 to-blue-100 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section>
        <SectionHeader badge={t("features.badge")} title={t("features.title")} subtitle={t("features.subtitle")} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="card p-6 group">
              <div className="feature-icon group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{feature.title}</h3>
              <p className="text-slate-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section variant="alt">
        <SectionHeader badge={t("faq.badge")} title={t("faq.title")} subtitle={t("faq.subtitle")} />
        <FAQ limit={5} />
        <div className="mt-8 text-center">
          <Link href="/pricing#faq" className="text-amber-600 font-medium hover:text-amber-700 transition-colors">
            {t("faq.viewAll")} &rarr;
          </Link>
        </div>
      </Section>

      {/* CTA Section */}
      <section className="hero py-20 overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-blue-500/15 rounded-full blur-[60px] animate-pulse-slow animation-delay-600" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-lg text-white mb-6">{t("cta.title")}</h2>
            <p className="text-xl text-slate-300 mb-10">{t("cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(siteConfig.whatsappMessages.general)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg glow-amber"
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
