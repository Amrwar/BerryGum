"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";

interface PricingCardsProps {
  showToggle?: boolean;
}

export default function PricingCards({ showToggle = true }: PricingCardsProps) {
  const [isMonthly, setIsMonthly] = useState(false);
  const { t, messages } = useLanguage();

  const plansData = isMonthly ? messages.pricing.plans.monthly : messages.pricing.plans.oneTime;
  const plans = Object.values(plansData) as {
    name: string;
    description: string;
    price: string;
    currency: string;
    features: string[];
    notIncluded: string[];
  }[];

  // The middle plan (index 1) is the popular one
  const popularIndex = 1;

  return (
    <div>
      {showToggle && (
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setIsMonthly(false)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                !isMonthly
                  ? "bg-white text-slate-900 shadow-md"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t("pricing.oneTime")}
            </button>
            <button
              onClick={() => setIsMonthly(true)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                isMonthly
                  ? "bg-white text-slate-900 shadow-md"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t("pricing.monthly")}
            </button>
          </div>
        </div>
      )}

      {isMonthly && (
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t("pricing.contractNote")}
          </span>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const isPopular = index === popularIndex;
          return (
            <div
              key={plan.name}
              className={`card relative overflow-hidden ${
                isPopular
                  ? "border-2 border-amber-400 shadow-xl shadow-amber-500/10"
                  : "border border-slate-200"
              }`}
            >
              {isPopular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                    {t("pricing.popular")}
                  </div>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500 ml-2 rtl:ml-0 rtl:mr-2">{plan.currency}</span>
                </div>

                <Link
                  href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(`مرحباً! أريد الاستفسار عن باقة ${plan.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn w-full mb-8 ${
                    isPopular ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {t("pricing.getStarted")}
                </Link>

                <div className="space-y-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {t("pricing.whatsIncluded")}
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.notIncluded.length > 0 && (
                    <div className="border-t border-slate-100 pt-4 mt-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        {t("pricing.notIncluded")}
                      </p>
                      <ul className="space-y-2">
                        {plan.notIncluded.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <svg
                              className="w-5 h-5 text-slate-300 shrink-0 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            <span className="text-slate-400 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="mt-12 text-center">
        <p className="text-slate-500 mb-4">
          {t("pricing.customNote")}
        </p>
        <Link
          href="/contact"
          className="btn btn-secondary"
        >
          {t("pricing.customButton")}
        </Link>
      </div>
    </div>
  );
}
