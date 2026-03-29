"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface FAQProps {
  limit?: number;
}

export default function FAQ({ limit }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { messages } = useLanguage();

  const faqItems = messages.faq.items;
  const allFaqs = Object.values(faqItems) as { question: string; answer: string }[];
  const displayedFaqs = limit ? allFaqs.slice(0, limit) : allFaqs;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {displayedFaqs.map((faq, index) => (
          <div
            key={index}
            className={`card overflow-hidden transition-all duration-300 ${
              openIndex === index ? "border-purple-200 shadow-md" : ""
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left"
            >
              <span className="font-semibold text-slate-900 pr-4">
                {faq.question}
              </span>
              <span
                className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  openIndex === index
                    ? "text-white rotate-180"
                    : "bg-slate-100 text-slate-500"
                }`}
                style={openIndex === index ? { background: "var(--gradient-brand)" } : undefined}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
