"use client";

import { useEffect, useMemo, useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import HeroBg from "@/components/HeroBg";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import { generateAvailableSlots, type DaySlots } from "@/lib/scheduling/slotGenerator";
import { validateConsultationForm, type ConsultationFieldErrors } from "@/lib/validation/consultationSchema";

interface FormData {
  name: string;
  email: string;
  phone: string;
  topic: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

export default function ConsultationPage() {
  const { t } = useLanguage();

  // Slot generation depends on "now", so it can only run on the client —
  // computing it during the server-rendered/static pass would make the
  // hydrated markup disagree with what the server sent.
  const [slots, setSlots] = useState<DaySlots[] | null>(null);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const generated = generateAvailableSlots();
    setSlots(generated);
    if (generated.length > 0) {
      setSelectedDateKey(generated[0].dateKey);
      setSelectedTime(generated[0].times[0] ?? null);
    }
  }, []);

  const selectedDay = useMemo(
    () => slots?.find((d) => d.dateKey === selectedDateKey) ?? null,
    [slots, selectedDateKey]
  );

  function handleSelectDay(dateKey: string) {
    setSelectedDateKey(dateKey);
    const day = slots?.find((d) => d.dateKey === dateKey);
    setSelectedTime(day?.times[0] ?? null);
  }

  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "", topic: "" });
  const [fieldErrors, setFieldErrors] = useState<ConsultationFieldErrors>({});
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name as keyof ConsultationFieldErrors];
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = {
      ...formData,
      dateKey: selectedDateKey ?? "",
      time: selectedTime ?? "",
    };

    const validation = validateConsultationForm(payload);
    if (!validation.success) {
      trackEvent({ name: "consultation_error", reason: "validation" });
      setFieldErrors(validation.fieldErrors);
      setStatus({ type: "idle", message: "" });
      return;
    }
    setFieldErrors({});
    setStatus({ type: "loading", message: t("consultation.status.sending") });

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response.ok) {
        trackEvent({ name: "consultation_requested", dateKey: payload.dateKey, time: payload.time });
        setStatus({ type: "success", message: t("consultation.status.success") });
      } else {
        trackEvent({ name: "consultation_error", reason: "server" });
        setStatus({ type: "error", message: data.error || t("consultation.status.errorGeneric") });
      }
    } catch {
      trackEvent({ name: "consultation_error", reason: "network" });
      setStatus({ type: "error", message: t("consultation.status.errorNetwork") });
    }
  }

  const whatsappMessage = useMemo(() => {
    if (!selectedDateKey || !selectedTime) {
      return "Hello! I would like to book a free consultation.";
    }
    return `Hello! I would like to book a free consultation on ${selectedDateKey} at ${selectedTime}.`;
  }, [selectedDateKey, selectedTime]);

  const whatsappHref = `https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <section className="hero relative pt-44 pb-20 overflow-hidden">
        <HeroBg />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-sm font-medium text-white">{t("consultation.badge")}</span>
            </div>
            <h1 className="heading-xl text-white mb-4">
              {t("consultation.title")}{" "}
              <span className="text-gradient-gold">{t("consultation.titleHighlight")}</span>
            </h1>
            <p className="text-base text-white/70 leading-relaxed">{t("consultation.subtitle")}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-8">
              {status.type === "success" ? (
                <div className="card p-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-slate-600">{status.message}</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      {t("consultation.dateLabel")}
                    </label>
                    {slots === null ? (
                      <p className="text-sm text-slate-500">{t("consultation.loadingSlots")}</p>
                    ) : (
                      <div className="flex gap-2 overflow-x-auto pb-2" data-testid="day-picker">
                        {slots.map((day) => (
                          <button
                            key={day.dateKey}
                            type="button"
                            onClick={() => handleSelectDay(day.dateKey)}
                            aria-pressed={day.dateKey === selectedDateKey}
                            className="shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                            style={
                              day.dateKey === selectedDateKey
                                ? { background: "var(--gradient-brand)", color: "white" }
                                : { background: "#faf8ff", color: "#1e0a5e", border: "1px solid rgba(155,32,160,0.15)" }
                            }
                          >
                            {day.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedDay && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        {t("consultation.timeLabel")}
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2" data-testid="time-picker">
                        {selectedDay.times.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            aria-pressed={time === selectedTime}
                            className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                            style={
                              time === selectedTime
                                ? { background: "var(--gradient-brand)", color: "white" }
                                : { background: "#faf8ff", color: "#1e0a5e", border: "1px solid rgba(155,32,160,0.15)" }
                            }
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                          {t("consultation.form.nameLabel")} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="input"
                          placeholder={t("consultation.form.namePlaceholder")}
                          aria-invalid={!!fieldErrors.name}
                          aria-describedby={fieldErrors.name ? "name-error" : undefined}
                        />
                        {fieldErrors.name && (
                          <p id="name-error" className="mt-1.5 text-sm text-red-600">
                            {fieldErrors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                          {t("consultation.form.emailLabel")} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="input"
                          placeholder={t("consultation.form.emailPlaceholder")}
                          aria-invalid={!!fieldErrors.email}
                          aria-describedby={fieldErrors.email ? "email-error" : undefined}
                        />
                        {fieldErrors.email && (
                          <p id="email-error" className="mt-1.5 text-sm text-red-600">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                        {t("consultation.form.phoneLabel")}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input"
                        placeholder={t("consultation.form.phonePlaceholder")}
                      />
                    </div>

                    <div>
                      <label htmlFor="topic" className="block text-sm font-medium text-slate-700 mb-2">
                        {t("consultation.form.topicLabel")} *
                      </label>
                      <textarea
                        id="topic"
                        name="topic"
                        rows={4}
                        value={formData.topic}
                        onChange={handleChange}
                        className="input resize-none"
                        placeholder={t("consultation.form.topicPlaceholder")}
                        aria-invalid={!!fieldErrors.topic}
                        aria-describedby={fieldErrors.topic ? "topic-error" : undefined}
                      />
                      {fieldErrors.topic && (
                        <p id="topic-error" className="mt-1.5 text-sm text-red-600">
                          {fieldErrors.topic}
                        </p>
                      )}
                    </div>

                    {status.type === "error" && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                        {status.message}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status.type === "loading" || slots === null}
                      className="btn btn-primary w-full btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status.type === "loading" ? t("consultation.form.sending") : t("consultation.form.submit")}
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-28 rounded-2xl p-6 sm:p-8 text-white" style={{ background: "var(--gradient-brand)" }}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-2">
                  {t("consultation.summaryTitle")}
                </h3>
                <div className="text-2xl font-black mb-1" data-testid="selected-slot">
                  {selectedDay && selectedTime ? `${selectedDay.label} · ${selectedTime}` : "—"}
                </div>
                <p className="text-xs text-white/60 mb-6 mt-3">{t("consultation.summaryNote")}</p>

                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ name: "whatsapp_click", source: "consultation_page" })}
                  className="btn w-full justify-center font-bold"
                  style={{ background: "white", color: "#9b20a0" }}
                >
                  {t("consultation.whatsappCta")}
                </Link>

                <div className="text-center mt-4">
                  <p className="text-xs text-white/60 mb-1">{t("consultation.needSooner")}</p>
                  <Link href="/contact" className="text-sm font-semibold text-white underline">
                    {t("consultation.messageNow")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
