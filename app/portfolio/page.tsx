"use client";

import Link from "next/link";
import Section, { SectionHeader } from "@/components/Section";
import PortfolioGrid from "@/components/PortfolioGrid";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";

type Testimonial = { quote: string; author: string; role: string };

export default function PortfolioPage() {
  const { t, messages } = useLanguage();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const testimonials: any[] = Object.values(messages.portfolioPage.testimonials.items as any);

  return (
    <>
      {/* Hero */}
      <section className="hero relative pt-44 pb-16 overflow-hidden" style={{ borderBottom: "1px solid rgba(155,32,160,0.1)" }}>
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
             style={{ background: "radial-gradient(circle, rgba(155,32,160,0.09) 0%, rgba(224,0,122,0.05) 50%, transparent 70%)" }} />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
             style={{ background: "radial-gradient(circle, rgba(30,10,94,0.09) 0%, rgba(155,32,160,0.05) 50%, transparent 70%)" }} />
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                 style={{ background: "rgba(155,32,160,0.08)", border: "1px solid rgba(155,32,160,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gradient-brand)" }} />
              <span className="text-sm font-medium" style={{ color: "#9b20a0" }}>
                {t("portfolioPage.badge")}
              </span>
            </div>
            <h1 className="heading-xl text-slate-900 mb-4">
              {t("portfolioPage.title")}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              {t("portfolioPage.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <Section>
        <PortfolioGrid showFilters={true} />
      </Section>

      {/* Testimonials */}
      <Section variant="alt">
        <SectionHeader
          badge={t("portfolioPage.testimonials.badge")}
          title={t("portfolioPage.testimonials.title")}
          subtitle={t("portfolioPage.testimonials.subtitle")}
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card p-8">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-fuchsia-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-slate-600 mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: "var(--gradient-brand)" }}>
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section>
        <div className="rounded-3xl p-10 lg:p-16" style={{ background: "var(--gradient-brand)" }}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "150+", label: t("portfolioPage.stats.projects") },
              { value: "98%", label: t("portfolioPage.stats.satisfaction") },
              { value: "50+", label: t("portfolioPage.stats.clients") },
              { value: "5+", label: t("portfolioPage.stats.experience") },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-purple-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="dark" className="relative overflow-hidden">
        <div className="relative text-center max-w-3xl mx-auto">
          <h2 className="heading-lg text-white mb-6">
            {t("portfolioPage.cta.title")}
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            {t("portfolioPage.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(siteConfig.whatsappMessages.contact)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t("portfolioPage.cta.startProject")}
            </Link>
            <Link href="/pricing" className="btn btn-primary btn-lg">
              {t("portfolioPage.cta.viewPricing")}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
