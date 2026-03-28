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

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/pricing", label: t("nav.pricing") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const serviceLinks = [
    { href: "/services/clinics", label: t("services.clinics.title"), icon: "🏥" },
    { href: "/services/restaurants", label: t("services.restaurants.title"), icon: "🍽️" },
    { href: "/services/startups", label: t("services.startups.title"), icon: "🚀" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "navbar-scrolled py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-44 h-16 sm:w-52 sm:h-[72px]">
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`font-medium transition-colors duration-200 ${
                isScrolled
                  ? "text-slate-600 hover:text-amber-600"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {t("nav.home")}
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`font-medium transition-colors duration-200 flex items-center gap-1 ${
                  isScrolled
                    ? "text-slate-600 hover:text-amber-600"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {t("nav.services")}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 rtl:left-auto rtl:right-0 mt-2 w-64 transition-all duration-200 ${
                  servicesOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden p-2">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                    >
                      <span className="text-xl">{service.icon}</span>
                      <span className="font-medium">{service.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/pricing"
              className={`font-medium transition-colors duration-200 ${
                isScrolled
                  ? "text-slate-600 hover:text-amber-600"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {t("nav.pricing")}
            </Link>

            <Link
              href="/portfolio"
              className={`font-medium transition-colors duration-200 ${
                isScrolled
                  ? "text-slate-600 hover:text-amber-600"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {t("nav.portfolio")}
            </Link>

            <Link
              href="/contact"
              className={`font-medium transition-colors duration-200 ${
                isScrolled
                  ? "text-slate-600 hover:text-amber-600"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {t("nav.contact")}
            </Link>

            <LanguageSwitcher />
            <Link
              href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(siteConfig.whatsappMessages.general)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              {t("nav.getStarted")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? "text-slate-900 hover:bg-slate-100"
                : "text-white hover:bg-white/10"
            }`}
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

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white rounded-xl shadow-xl p-4 border border-slate-100">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="relative w-40 h-14">
                <Image
                  src="/logo.png"
                  alt={siteConfig.name}
                  fill
                  className="object-contain"
                />
              </div>
              <LanguageSwitcher />
            </div>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors font-medium"
            >
              {t("nav.home")}
            </Link>

            {/* Mobile Services Section */}
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {t("nav.services")}
              </div>
              {serviceLinks.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors font-medium"
                >
                  <span>{service.icon}</span>
                  <span>{service.label}</span>
                </Link>
              ))}
            </div>

            <Link
              href="/pricing"
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors font-medium"
            >
              {t("nav.pricing")}
            </Link>

            <Link
              href="/portfolio"
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors font-medium"
            >
              {t("nav.portfolio")}
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors font-medium"
            >
              {t("nav.contact")}
            </Link>
            <Link
              href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(siteConfig.whatsappMessages.general)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full mt-3"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t("cta.whatsapp")}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
