"use client";

import Link from "next/link";
import Section, { SectionHeader } from "@/components/Section";
import PricingCards from "@/components/PricingCards";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";

type CompareRow = { feature: string; starter: string; pro: string; enterprise: string };
type ProcessStep = { step: string; title: string; description: string };

export default function PricingPage() {
  const { t, messages } = useLanguage();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const compareRows: any[] = Object.values(messages.pricing.compare.rows as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processSteps: any[] = Object.values(messages.pricing.process.steps as any);

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
            <span className="badge mb-4">{t("pricing.badge")}</span>
            <h1 className="heading-xl text-slate-900 mb-4">
              {t("pricing.title")}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              {t("pricing.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <Section className="-mt-10">
        <PricingCards showToggle={true} />
      </Section>

      {/* Comparison Table */}
      <Section variant="alt">
        <SectionHeader
          badge={t("pricing.compare.badge")}
          title={t("pricing.compare.title")}
          subtitle={t("pricing.compare.subtitle")}
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left rtl:text-right py-4 px-4 font-semibold text-slate-900">{t("pricing.compare.feature")}</th>
                <th className="text-center py-4 px-4 font-semibold text-slate-900">{messages.pricing.plans.oneTime["0"].name}</th>
                <th className="text-center py-4 px-4 font-semibold text-slate-900 bg-purple-50/50">{messages.pricing.plans.oneTime["1"].name}</th>
                <th className="text-center py-4 px-4 font-semibold text-slate-900">{messages.pricing.plans.oneTime["2"].name}</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-700">{row.feature}</td>
                  <td className="py-4 px-4 text-center text-slate-600">{row.starter}</td>
                  <td className="py-4 px-4 text-center text-slate-900 font-medium bg-purple-50/30">{row.pro}</td>
                  <td className="py-4 px-4 text-center text-slate-600">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Process Section */}
      <Section>
        <SectionHeader
          badge={t("pricing.process.badge")}
          title={t("pricing.process.title")}
          subtitle={t("pricing.process.subtitle")}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((phase) => (
            <div key={phase.step} className="relative">
              <div className="text-6xl font-bold text-slate-100 mb-4">{phase.step}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{phase.title}</h3>
              <p className="text-slate-500 text-sm">{phase.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="hero py-20 overflow-hidden">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-lg text-slate-900 mb-6">
              {t("pricing.cta.title")}
            </h2>
            <p className="text-xl text-slate-600 mb-10">
              {t("pricing.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(siteConfig.whatsappMessages.pricing)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t("pricing.cta.button")}
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg">
                {t("cta.contact")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
