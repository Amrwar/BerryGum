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
    {
      icon: (
        // Server stack — management systems
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 14a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
          <circle cx="8" cy="7" r="1" fill="currentColor" />
          <circle cx="8" cy="15" r="1" fill="currentColor" />
        </svg>
      ),
      title: t("services.systems.title"),
      description: t("services.systems.description"),
      href: "/pricing",
      color: "from-indigo-500 to-violet-500",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=360&fit=crop&auto=format",
    },
  ];

  const features = [
    {
      title: t("features.fast.title"),
      description: t("features.fast.description"),
      bullets: [t("features.fast.b1"), t("features.fast.b2"), t("features.fast.b3")],
      color: "from-violet-500 to-fuchsia-500",
      icon: <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    },
    {
      title: t("features.seo.title"),
      description: t("features.seo.description"),
      bullets: [t("features.seo.b1"), t("features.seo.b2"), t("features.seo.b3")],
      color: "from-fuchsia-500 to-pink-500",
      icon: <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    },
    {
      title: t("features.mobile.title"),
      description: t("features.mobile.description"),
      bullets: [t("features.mobile.b1"), t("features.mobile.b2"), t("features.mobile.b3")],
      color: "from-pink-500 to-rose-500",
      icon: <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    },
    {
      title: t("features.secure.title"),
      description: t("features.secure.description"),
      bullets: [t("features.secure.b1"), t("features.secure.b2"), t("features.secure.b3")],
      color: "from-indigo-500 to-violet-600",
      icon: <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    },
    {
      title: t("features.analytics.title"),
      description: t("features.analytics.description"),
      bullets: [t("features.analytics.b1"), t("features.analytics.b2"), t("features.analytics.b3")],
      color: "from-purple-600 to-fuchsia-500",
      icon: <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    },
    {
      title: t("features.support.title"),
      description: t("features.support.description"),
      bullets: [t("features.support.b1"), t("features.support.b2"), t("features.support.b3")],
      color: "from-fuchsia-500 to-purple-600",
      icon: <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    },
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
        <div className="flex justify-center mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: "var(--gradient-brand)",
              color: "white",
              boxShadow: "0 4px 20px rgba(155,32,160,0.25)",
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {t("services.visitPortfolio")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Section>

      {/* About Section */}
      <Section variant="alt" id="about">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="mb-6 inline-flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "var(--gradient-brand)" }}>
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* centre person */}
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  {/* left person */}
                  <circle cx="4.5" cy="10" r="2.5" />
                  <path d="M1 20c0-2.8 1.5-5 3.5-5" />
                  {/* right person */}
                  <circle cx="19.5" cy="10" r="2.5" />
                  <path d="M23 20c0-2.8-1.5-5-3.5-5" />
                </svg>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: "rgba(155,32,160,0.08)", border: "1px solid rgba(155,32,160,0.2)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gradient-brand)" }} />
                <span className="text-sm font-medium" style={{ color: "#9b20a0" }}>{t("about.badge")}</span>
              </div>
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
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "var(--gradient-brand)" }}>
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        </div>
        <SectionHeader badge={t("features.badge")} title={t("features.title")} subtitle={t("features.subtitle")} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-white rounded-2xl p-6 border-l border-r border-l-slate-100 border-r-slate-100 border-t-2 border-b-2 border-t-purple-300 border-b-purple-300 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-100/60"
            >
              {/* Hover top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Icon tile */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>

              {/* Description */}
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{feature.description}</p>

              {/* Bullet points */}
              <ul className="space-y-2">
                {feature.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <svg className="w-3.5 h-3.5 text-fuchsia-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="container-custom">
          <div className="relative rounded-3xl overflow-hidden" style={{ background: "var(--gradient-brand)" }}>

            {/* Background decorations */}
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-6 left-6 w-28 h-28 border border-white/10 rounded-full pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-20 h-20 border border-white/10 rounded-full pointer-events-none" />
            {/* Sparkles */}
            <svg className="absolute top-8 right-32 w-6 h-6 text-white/20 pointer-events-none" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
            <svg className="absolute bottom-10 left-28 w-4 h-4 text-white/15 pointer-events-none" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>

            {/* Content */}
            <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20 max-w-4xl mx-auto text-center">

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>

              {/* Heading */}
              <h2 className="heading-lg text-white mb-4">{t("cta.title")}</h2>

              {/* Subtitle */}
              <p className="text-base max-w-2xl mx-auto mb-10" style={{ color: "rgba(255,220,240,0.85)" }}>
                {t("cta.subtitle")}
              </p>

              {/* Stats row */}
              <div className="inline-grid grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden mb-10 border border-white/15">
                <div className="px-8 py-4 bg-white/5 text-center">
                  <div className="text-3xl font-bold text-white">150+</div>
                  <div className="text-white/55 text-xs mt-1">{t("about.stats.projects")}</div>
                </div>
                <div className="px-8 py-4 bg-white/5 text-center">
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-white/55 text-xs mt-1">{t("about.stats.satisfaction")}</div>
                </div>
                <div className="px-8 py-4 bg-white/5 text-center">
                  <div className="text-3xl font-bold text-white">5+</div>
                  <div className="text-white/55 text-xs mt-1">{t("about.stats.experience")}</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(siteConfig.whatsappMessages.general)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ color: "#9b20a0" }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t("cta.whatsapp")}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-white/40 text-white font-semibold text-sm transition-all duration-300 hover:bg-white/10 hover:border-white/70"
                >
                  {t("cta.contact")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
