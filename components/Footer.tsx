"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { label: t("nav.home"),      href: "/" },
    { label: t("nav.pricing"),   href: "/pricing" },
    { label: t("nav.portfolio"), href: "/portfolio" },
    { label: t("nav.contact"),   href: "/contact" },
  ];

  const serviceNames = [
    t("services.clinics.title"),
    t("services.restaurants.title"),
    t("services.ecommerce.title"),
    t("services.startups.title"),
    t("services.corporate.title"),
  ];

  return (
    <footer className="footer">
      {/* ── Main grid ── */}
      <div className="container-custom pt-16 pb-10 lg:pt-20 lg:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── 1. Brand ── */}
          <div className="lg:pr-8">
            <Link href="/" className="inline-block mb-5">
              <div className="relative w-56 h-20">
                <Image
                  src="/logo.png"
                  alt={siteConfig.name}
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: "rgba(155,32,160,0.15)", border: "1px solid rgba(155,32,160,0.25)" }}
              >
                <svg className="w-4 h-4 text-fuchsia-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── 2. Navigation ── */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5 pb-3 border-b"
                style={{ color: "#c084fc", borderColor: "rgba(155,32,160,0.2)" }}>
              {t("footer.company")}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-fuchsia-300 transition-colors duration-200"
                  >
                    <svg
                      className="w-3 h-3 text-fuchsia-600/50 group-hover:text-fuchsia-400 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-all duration-200 flex-shrink-0"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── 3. Services ── */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5 pb-3 border-b"
                style={{ color: "#c084fc", borderColor: "rgba(155,32,160,0.2)" }}>
              {t("footer.services")}
            </h4>
            <ul className="space-y-3">
              {serviceNames.map((name) => (
                <li key={name} className="flex items-center gap-2.5 text-sm text-slate-400">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #9b20a0, #e0007a)" }}
                  />
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* ── 4. Contact ── */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5 pb-3 border-b"
                style={{ color: "#c084fc", borderColor: "rgba(155,32,160,0.2)" }}>
              {t("footer.contact")}
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}`}
                  className="group flex items-center gap-3 hover:text-fuchsia-300 transition-colors duration-200"
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                        style={{ background: "rgba(155,32,160,0.15)", border: "1px solid rgba(155,32,160,0.2)" }}>
                    <svg className="w-4 h-4 text-fuchsia-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </span>
                  <span dir="ltr">{siteConfig.whatsapp}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-center gap-3 hover:text-fuchsia-300 transition-colors duration-200"
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                        style={{ background: "rgba(155,32,160,0.15)", border: "1px solid rgba(155,32,160,0.2)" }}>
                    <svg className="w-4 h-4 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(155,32,160,0.15)", border: "1px solid rgba(155,32,160,0.2)" }}>
                  <svg className="w-4 h-4 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span className="leading-relaxed">{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid rgba(155,32,160,0.15)" }}>
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} {siteConfig.name}. {t("footer.rights")}
          </p>
          <p className="text-slate-500 text-xs">{t("footer.madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
