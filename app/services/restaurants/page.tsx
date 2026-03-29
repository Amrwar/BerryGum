"use client";

import Link from "next/link";
import Section from "@/components/Section";
import FAQ from "@/components/FAQ";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";

const featureIcons = [
  <svg key="0" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  <svg key="4" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
  <svg key="5" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
];

export default function RestaurantsPage() {
  const { t, messages } = useLanguage();

  const features = Object.values(messages.restaurantsPage.features) as { title: string; description: string }[];
  const stats = Object.values(messages.restaurantsPage.stats) as { stat: string; label: string }[];
  const menuItems = Object.values(messages.restaurantsPage.menuItems) as string[];
  const menuCategories = Object.values(messages.restaurantsPage.menuCategories) as string[];
  const processSteps = Object.values(messages.restaurantsPage.processSteps) as { step: string; title: string; description: string }[];

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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                   style={{ background: "rgba(155,32,160,0.08)", border: "1px solid rgba(155,32,160,0.2)" }}>
                <span className="text-xl">🍽️</span>
                <span className="text-sm font-medium" style={{ color: "#9b20a0" }}>{t("restaurantsPage.badge")}</span>
              </div>
              <h1 className="heading-xl text-slate-900 mb-6">
                {t("restaurantsPage.title")} <span className="text-gradient-brand">{t("restaurantsPage.titleHighlight")}</span>
              </h1>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                {t("restaurantsPage.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(/\+/g, "")}?text=${encodeURIComponent(t("restaurantsPage.whatsappRestaurant"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t("restaurantsPage.cta")}
                </a>
                <Link href="/pricing" className="btn btn-outline-light btn-lg">
                  {t("restaurantsPage.viewPricing")}
                </Link>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative hidden lg:block">
              <div className="aspect-square rounded-3xl p-8 shadow-2xl" style={{ background: "var(--gradient-brand)" }}>
                <div className="bg-white rounded-2xl h-full p-6 shadow-lg overflow-hidden">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-xl">🍽️</span>
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">Zamalek Bistro</div>
                          <div className="text-xs text-slate-500">Fine Dining</div>
                        </div>
                      </div>
                      <div className="text-white text-xs px-3 py-1 rounded-full" style={{ background: "var(--gradient-brand)" }}>
                        {t("restaurantsPage.bookNow")}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {["🥗", "🍔", "🍖", "🍰"].map((emoji, i) => (
                        <div key={i} className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center text-3xl">
                          {emoji}
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-50 rounded-lg p-3">
                      <div className="text-xs font-bold text-slate-700 mb-2">{t("restaurantsPage.todaysSpecial")}</div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-slate-600">Grilled Sea Bass</div>
                        <div className="text-sm font-bold text-fuchsia-700">350 EGP</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <div className="font-bold text-slate-900">4.9/5</div>
                    <div className="text-xs text-slate-500">500+ {t("restaurantsPage.reviews")}</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{t("restaurantsPage.orderConfirmed")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section text-white py-12 relative overflow-hidden" style={{ background: "var(--gradient-brand)" }}>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((benefit, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold mb-1">{benefit.stat}</div>
                <div className="text-purple-100 text-sm">{benefit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <Section>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="badge badge-accent mb-4">{t("restaurantsPage.featuresBadge")}</span>
          <h2 className="heading-lg mb-4">
            {t("restaurantsPage.featuresTitle")}
          </h2>
          <p className="text-slate-600 text-lg">
            {t("restaurantsPage.featuresSubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card p-8 hover:border-purple-200 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-fuchsia-700 flex items-center justify-center mb-6">
                {featureIcons[index]}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Menu Showcase Section */}
      <Section className="bg-slate-900 text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge bg-purple-500/20 text-fuchsia-400 mb-4">{t("restaurantsPage.menuBadge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("restaurantsPage.menuTitle")}
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              {t("restaurantsPage.menuSubtitle")}
            </p>
            <ul className="space-y-4">
              {menuItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--gradient-brand)" }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-800 rounded-3xl p-8">
            <div className="bg-white rounded-2xl p-6 text-slate-900">
              <div className="text-center mb-6">
                <div className="text-2xl font-bold">{t("restaurantsPage.ourMenu")}</div>
                <div className="flex justify-center gap-4 mt-4">
                  {menuCategories.map((cat, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded-full text-sm ${
                        i === 0 ? "text-white" : "bg-slate-100"
                      }`}
                      style={i === 0 ? { background: "var(--gradient-brand)" } : undefined}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Grilled Salmon", desc: "With herbs and lemon butter", price: "280" },
                  { name: "Beef Tenderloin", desc: "Served with seasonal vegetables", price: "350" },
                  { name: "Chocolate Fondant", desc: "Warm chocolate cake with ice cream", price: "120" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center text-2xl">
                      {i === 0 ? "\u{1F41F}" : i === 1 ? "\u{1F969}" : "\u{1F36B}"}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm text-slate-500">{item.desc}</div>
                    </div>
                    <div className="text-fuchsia-700 font-bold">{item.price} EGP</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section className="bg-slate-50">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="badge badge-accent mb-4">{t("restaurantsPage.processBadge")}</span>
          <h2 className="heading-lg mb-4">{t("restaurantsPage.processTitle")}</h2>
          <p className="text-slate-600 text-lg">
            {t("restaurantsPage.processSubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {processSteps.map((phase, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ background: "var(--gradient-brand)" }}>
                {phase.step}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{phase.title}</h3>
              <p className="text-slate-600 text-sm">{phase.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-4">{t("restaurantsPage.faqBadge")}</span>
            <h2 className="heading-lg mb-4">{t("restaurantsPage.faqTitle")}</h2>
          </div>
          <FAQ />
        </div>
      </Section>

      {/* CTA Section */}
      <section className="hero py-20 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-pink-500/15 rounded-full blur-[60px] animate-pulse-slow" />

        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg text-white mb-6">
              {t("restaurantsPage.ctaTitle")}
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              {t("restaurantsPage.ctaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/\+/g, "")}?text=${encodeURIComponent(t("restaurantsPage.whatsappRestaurant"))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t("restaurantsPage.cta")}
              </a>
              <Link href="/contact" className="btn btn-outline-light btn-lg">
                {t("restaurantsPage.contactUs")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
