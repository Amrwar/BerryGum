"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

const oneTimePlans = [
  {
    name: "Starter",
    description: "Perfect for small businesses getting started online",
    price: "15,000",
    currency: "EGP",
    features: [
      "Up to 5 pages",
      "Mobile responsive design",
      "Basic SEO setup",
      "Contact form",
      "WhatsApp integration",
      "Social media links",
      "1 month support",
      "Basic analytics setup",
    ],
    notIncluded: [
      "E-commerce functionality",
      "Custom animations",
      "Blog setup",
    ],
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing businesses that need more features",
    price: "30,000",
    currency: "EGP",
    features: [
      "Up to 15 pages",
      "Premium responsive design",
      "Advanced SEO optimization",
      "Contact form with CRM",
      "WhatsApp chat widget",
      "Social media integration",
      "3 months support",
      "Google Analytics + Search Console",
      "Blog/News section",
      "Custom animations",
      "Speed optimization",
    ],
    notIncluded: [
      "E-commerce functionality",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Complete solution for established businesses",
    price: "55,000",
    currency: "EGP",
    features: [
      "Unlimited pages",
      "Custom premium design",
      "Full SEO package",
      "Advanced forms & integrations",
      "WhatsApp Business API ready",
      "Full social media suite",
      "6 months priority support",
      "Advanced analytics dashboard",
      "Blog with categories",
      "Premium animations",
      "E-commerce ready (up to 50 products)",
      "Multi-language support",
      "Custom admin panel",
    ],
    notIncluded: [],
    popular: false,
  },
];

const monthlyPlans = [
  {
    name: "Basic Care",
    description: "Essential maintenance for worry-free websites",
    price: "2,500",
    currency: "EGP/mo",
    features: [
      "Monthly updates & backups",
      "Security monitoring",
      "Uptime monitoring",
      "Minor content updates (2/month)",
      "Email support",
      "Monthly performance report",
      "Plugin/software updates",
    ],
    notIncluded: [
      "Design changes",
      "New feature development",
      "Priority support",
    ],
    popular: false,
  },
  {
    name: "Growth Plan",
    description: "Active management to grow your online presence",
    price: "5,000",
    currency: "EGP/mo",
    features: [
      "Everything in Basic Care",
      "Weekly backups",
      "Content updates (8/month)",
      "Priority email & phone support",
      "SEO monitoring & reports",
      "Social media graphics (4/month)",
      "Speed optimization",
      "Minor design adjustments",
      "Blog post formatting",
    ],
    notIncluded: [
      "Major feature development",
    ],
    popular: true,
  },
  {
    name: "Premium Partner",
    description: "Full-service digital partner for your business",
    price: "10,000",
    currency: "EGP/mo",
    features: [
      "Everything in Growth Plan",
      "Daily backups",
      "Unlimited content updates",
      "24/7 priority support",
      "Full SEO management",
      "Social media graphics (12/month)",
      "Monthly strategy calls",
      "A/B testing",
      "New feature development (4hrs/month)",
      "Dedicated account manager",
      "Competitor monitoring",
    ],
    notIncluded: [],
    popular: false,
  },
];

interface PricingCardsProps {
  showToggle?: boolean;
}

export default function PricingCards({ showToggle = true }: PricingCardsProps) {
  const [isMonthly, setIsMonthly] = useState(false);
  const plans = isMonthly ? monthlyPlans : oneTimePlans;

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
              One-Time Build
            </button>
            <button
              onClick={() => setIsMonthly(true)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                isMonthly
                  ? "bg-white text-slate-900 shadow-md"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Monthly Management
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
            12-month minimum contract required
          </span>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`card relative overflow-hidden ${
              plan.popular
                ? "border-2 border-amber-400 shadow-xl shadow-amber-500/10"
                : "border border-slate-200"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <div className="bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                  MOST POPULAR
                </div>
              </div>
            )}

            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-slate-500 text-sm mb-6">{plan.description}</p>

              <div className="mb-8">
                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                <span className="text-slate-500 ml-2">{plan.currency}</span>
              </div>

              <Link
                href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(`Ù…Ø±Ø­Ø¨Ø§Ù‹! Ø£Ø±ÙŠØ¯ Ø§Ù„Ø§Ø³ØªÙØ³Ø§Ø± Ø¹Ù† Ø¨Ø§Ù‚Ø© ${plan.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn w-full mb-8 ${
                  plan.popular ? "btn-primary" : "btn-outline"
                }`}
              >
                Get Started
              </Link>

              <div className="space-y-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  What&apos;s included
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
                  <>
                    <div className="border-t border-slate-100 pt-4 mt-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        Not included
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
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-12 text-center">
        <p className="text-slate-500 mb-4">
          Need a custom solution? We&apos;re happy to discuss your specific requirements.
        </p>
        <Link
          href="/contact"
          className="btn btn-secondary"
        >
          Contact Us for Custom Quote
        </Link>
      </div>
    </div>
  );
}
