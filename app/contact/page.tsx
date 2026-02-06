"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

export default function ContactPage() {
  const { t, messages } = useLanguage();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: t("contact.status.sending") });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: t("contact.status.success"),
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          budget: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || t("contact.status.errorGeneric"),
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: t("contact.status.errorNetwork"),
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const budgetOptions = messages.contact.form.budgetOptions;
  const budgetValues = ["15000-30000", "30000-55000", "55000+", "monthly", "not-sure"];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-sm font-medium">
                {t("contact.badge")}
              </span>
            </div>
            <h1 className="heading-xl text-white mb-6">
              {t("contact.heroTitle")}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              {t("contact.heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="heading-md text-slate-900 mb-6">
                {t("contact.info.title")}
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {t("contact.info.subtitle")}
              </p>

              <div className="space-y-6">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(siteConfig.whatsappMessages.contact)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{t("contact.info.whatsappFastest")}</div>
                    <div className="text-slate-600" dir="ltr">{siteConfig.whatsapp}</div>
                    <div className="text-sm text-green-600 mt-1">{t("contact.info.whatsappReply")}</div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{t("contact.info.email")}</div>
                    <div className="text-slate-600">{siteConfig.email}</div>
                    <div className="text-sm text-slate-500 mt-1">{t("contact.info.emailReply")}</div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{t("contact.info.phone")}</div>
                    <div className="text-slate-600" dir="ltr">{siteConfig.phone}</div>
                    <div className="text-sm text-slate-500 mt-1">{siteConfig.hours.weekdays}</div>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50">
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{t("contact.info.office")}</div>
                    <div className="text-slate-600">{siteConfig.address}</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <h3 className="font-semibold text-slate-900 mb-4">{t("contact.info.followUs")}</h3>
                <div className="flex gap-3">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-100 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors group"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="card p-8 lg:p-10">
                <h2 className="heading-md text-slate-900 mb-6">{t("contact.form.sendUs")}</h2>

                {status.type === "success" ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{t("contact.status.messageSent")}</h3>
                    <p className="text-slate-600 mb-6">{status.message}</p>
                    <Link
                      href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(siteConfig.whatsappMessages.contact)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                    >
                      <svg className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      {t("contact.status.orWhatsapp")}
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                          {t("contact.form.fullName")} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="input"
                          placeholder={t("contact.form.namePlaceholder")}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                          {t("contact.form.email")} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="input"
                          placeholder={t("contact.form.emailPlaceholder")}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                          {t("contact.form.phone")}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="input"
                          placeholder={t("contact.form.phonePlaceholder")}
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                          {t("contact.form.company")}
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="input"
                          placeholder={t("contact.form.companyPlaceholder")}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-slate-700 mb-2">
                        {t("contact.form.budget")}
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="input"
                      >
                        <option value="">{t("contact.form.budgetPlaceholder")}</option>
                        {Object.values(budgetOptions).map((label: any, index: number) => (
                          <option key={index} value={budgetValues[index]}>{label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        {t("contact.form.projectLabel")} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="input resize-none"
                        placeholder={t("contact.form.messagePlaceholder")}
                      />
                    </div>

                    {status.type === "error" && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                        {status.message}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status.type === "loading"}
                      className="btn btn-primary w-full btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status.type === "loading" ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 rtl:ml-3 rtl:-mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          {t("contact.form.sending")}
                        </>
                      ) : (
                        <>
                          {t("contact.form.send")}
                          <svg className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
