"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";

const screenshots = [
  { src: "/portfolio/vroom-collab.png", label: "Overview" },
  { src: "/portfolio/vroom-1.png", label: "Car Wash List" },
  { src: "/portfolio/vroom-3.png", label: "Monthly Reports" },
  { src: "/portfolio/vroom-4.png", label: "Workers & Stats" },
];

const tags = ["Car Wash", "Analytics", "Multi-service", "Payments", "Workers Management"];

export default function VRoomPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="hero relative pt-44 pb-12 overflow-hidden" style={{ borderBottom: "1px solid rgba(155,32,160,0.1)" }}>
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
             style={{ background: "radial-gradient(circle, rgba(155,32,160,0.09) 0%, rgba(224,0,122,0.05) 50%, transparent 70%)" }} />
        <div className="container-custom relative">
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <Link href="/portfolio" className="hover:text-pink-600 transition-colors">{t("nav.portfolio")}</Link>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              <span className="text-slate-600 font-medium">VRoom Car Wash</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                 style={{ background: "rgba(155,32,160,0.08)", border: "1px solid rgba(155,32,160,0.2)" }}>
              <span className="text-xs font-semibold text-fuchsia-700 bg-purple-50 px-2 py-0.5 rounded-md">Business Systems</span>
            </div>

            <h1 className="heading-xl text-slate-900 mb-4">
              <span style={{ color: "#ef4444" }}>VRoom</span>{" "}
              <span className="text-gradient">Car Wash</span> System
            </h1>
            <p className="text-base text-slate-600 leading-relaxed mb-6 max-w-xl">
              A full car wash operations platform — vehicle entry tracking, payment processing, mechanic & wash services, worker management, and detailed monthly analytics. Fully in Arabic.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag) => (
                <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full font-medium">{tag}</span>
              ))}
            </div>

            <Link
              href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent("Hi! I'm interested in a similar management system for my business. Can we discuss?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <svg className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Build Something Similar
            </Link>
          </div>
        </div>
      </section>

      {/* Screenshot Gallery */}
      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">

            {/* Main screenshot */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 mb-4"
                 style={{ aspectRatio: "16/10" }}>
              <Image
                key={screenshots[activeIdx].src}
                src={screenshots[activeIdx].src}
                alt={`VRoom Car Wash — ${screenshots[activeIdx].label}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 900px"
                priority
              />
              {/* Label pill */}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg text-sm font-semibold text-white"
                   style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}>
                {screenshots[activeIdx].label}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="grid grid-cols-4 gap-3">
              {screenshots.map((shot, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    i === activeIdx
                      ? "border-fuchsia-500 shadow-lg shadow-fuchsia-100"
                      : "border-transparent opacity-60 hover:opacity-90 hover:border-slate-300"
                  }`}
                  style={{ aspectRatio: "16/10" }}
                >
                  <Image
                    src={shot.src}
                    alt={shot.label}
                    fill
                    className="object-cover object-top"
                    sizes="200px"
                  />
                  <div className="absolute inset-x-0 bottom-0 py-1 text-center text-xs font-medium text-white"
                       style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                    {shot.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features breakdown */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-lg text-slate-900 mb-3">What the System Does</h2>
              <p className="text-slate-500 text-base">A complete digital operations hub for a modern car wash business.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", title: "Vehicle Entry Tracking", desc: "Log every incoming car with plate number, type, and selected services in seconds." },
                { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", title: "Payments & Billing", desc: "Record cash and card payments with daily totals and transaction history." },
                { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title: "Worker Management", desc: "Track individual worker performance, services handled, and productivity metrics." },
                { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Monthly Reports", desc: "Breakdown of revenue by wash type, service category, and worker for full visibility." },
                { icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", title: "Multi-Service Types", desc: "Supports wash, mechanic, and other service categories from a single platform." },
                { icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129", title: "Full Arabic Support", desc: "Entire interface built in Arabic for seamless use by local teams." },
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-purple-200 hover:-translate-y-0.5 transition-all duration-200"
                     style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white"
                       style={{ background: "var(--gradient-brand)" }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={f.icon} />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <div className="relative rounded-3xl overflow-hidden text-center px-8 py-14" style={{ background: "var(--gradient-brand)" }}>
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-xl mx-auto">
              <h2 className="heading-lg text-white mb-3">Want a System Like This?</h2>
              <p className="mb-8 text-sm" style={{ color: "rgba(255,220,240,0.85)" }}>
                We build custom management systems tailored to your business — from car washes to warehouses. Let&apos;s talk.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent("Hi! I'm interested in a custom management system for my business. Can we discuss?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ color: "#9b20a0" }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </Link>
                <Link href="/services/systems" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-white/40 text-white font-semibold text-sm transition-all duration-300 hover:bg-white/10 hover:border-white/70">
                  View Systems Page
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
