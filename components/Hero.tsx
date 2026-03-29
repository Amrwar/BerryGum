"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero min-h-[88vh] flex items-center justify-center relative overflow-hidden">
      {/* Brand glow — top-right */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(155,32,160,0.10) 0%, rgba(224,0,122,0.06) 50%, transparent 70%)" }} />
      {/* Brand glow — top-left (mirrored) */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(30,10,94,0.09) 0%, rgba(155,32,160,0.05) 50%, transparent 70%)" }} />

      <div className="container-custom relative z-10 pt-44 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in"
               style={{ background: "rgba(155,32,160,0.08)", border: "1px solid rgba(155,32,160,0.2)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--gradient-brand)" }} />
            <span className="text-sm font-medium" style={{ color: "#9b20a0" }}>
              {t("hero.badge")}
            </span>
          </div>

          {/* Heading */}
          <h1 className="heading-xl text-slate-900 mb-6 animate-fade-in">
            {t("hero.title")}{" "}
            <span className="text-gradient-gold">{t("hero.titleHighlight")}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Link
              href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(siteConfig.whatsappMessages.general)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t("hero.cta")}
            </Link>
            <Link href="/pricing" className="btn btn-outline btn-lg">
              {t("hero.viewPricing")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
