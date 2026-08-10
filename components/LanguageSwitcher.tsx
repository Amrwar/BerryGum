"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { trackEvent } from "@/lib/analytics";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  function handleClick() {
    const next = locale === "en" ? "ar" : "en";
    trackEvent({ name: "language_switched", from: locale, to: next });
    setLocale(next);
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors"
      aria-label="Switch language"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
}
