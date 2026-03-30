"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { t } = useLanguage();

  const serviceLinks = [
    {
      href: "/services/clinics",
      label: t("services.clinics.title"),
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      href: "/services/restaurants",
      label: t("services.restaurants.title"),
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      href: "/services/startups",
      label: t("services.startups.title"),
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      href: "/services/systems",
      label: t("services.systems.title"),
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="hidden md:block" style={{ background: "var(--gradient-brand)" }}>
        <div className="container-custom">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-6">
              {/* Phone */}
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-xs"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>
              {/* Email */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-xs"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {siteConfig.email}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-sm"
            : "bg-white"
        }`}
        style={{ borderBottom: "1px solid #e2e8f0" }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between relative py-2">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative w-48 h-16 sm:w-56 sm:h-20">
                <Image
                  src="/logo.png"
                  alt={siteConfig.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation — centered */}
            <div className="hidden md:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2">
              <Link
                href="/"
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-pink-600 hover:bg-slate-50 transition-colors"
              >
                {t("nav.home")}
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-pink-600 hover:bg-slate-50 transition-colors flex items-center gap-1">
                  {t("nav.services")}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`absolute top-full left-0 rtl:left-auto rtl:right-0 mt-1 w-60 transition-all duration-200 ${
                    servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden p-1.5">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-pink-600 transition-colors text-sm group/item"
                      >
                        <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-slate-100 text-slate-500 group-hover/item:bg-pink-50 group-hover/item:text-pink-600 transition-colors">
                          {service.icon}
                        </span>
                        <span className="font-medium">{service.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/pricing"
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-pink-600 hover:bg-slate-50 transition-colors"
              >
                {t("nav.pricing")}
              </Link>

              <Link
                href="/portfolio"
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-pink-600 hover:bg-slate-50 transition-colors"
              >
                {t("nav.portfolio")}
              </Link>

              <Link
                href="/contact"
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-pink-600 hover:bg-slate-50 transition-colors"
              >
                {t("nav.contact")}
              </Link>
            </div>

            {/* Right: CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/contact" className="btn btn-primary btn-sm">
                {t("nav.getStarted")}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2">
            {/* Mobile contact info */}
            <div className="flex flex-col gap-1 mb-3 py-3 border-b border-slate-100">
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 text-xs text-slate-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-xs text-slate-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {siteConfig.email}
              </a>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="relative w-40 h-14">
                <Image src="/logo.png" alt={siteConfig.name} fill className="object-contain" />
              </div>
              <LanguageSwitcher />
            </div>

            <Link href="/" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-slate-700 hover:text-pink-600 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium">
              {t("nav.home")}
            </Link>

            <div className="py-1">
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("nav.services")}</div>
              {serviceLinks.map((service) => (
                <Link key={service.href} href={service.href} onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 py-2.5 px-3 text-slate-700 hover:text-pink-600 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium group/item">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-slate-100 text-slate-500 group-hover/item:bg-pink-50 group-hover/item:text-pink-600 transition-colors">
                    {service.icon}
                  </span>
                  <span>{service.label}</span>
                </Link>
              ))}
            </div>

            <Link href="/pricing" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-slate-700 hover:text-pink-600 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium">{t("nav.pricing")}</Link>
            <Link href="/portfolio" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-slate-700 hover:text-pink-600 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium">{t("nav.portfolio")}</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-slate-700 hover:text-pink-600 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium">{t("nav.contact")}</Link>

            <Link
              href="/contact"
              className="btn btn-primary w-full mt-3"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.getStarted")}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
