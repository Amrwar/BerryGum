"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer:
      "Typically, a Starter website takes 2-3 weeks, Professional takes 4-6 weeks, and Enterprise projects take 8-12 weeks. Timeline depends on content readiness and revision rounds.",
  },
  {
    question: "Do you require a deposit to start?",
    answer:
      "Yes, we require a 50% deposit to begin work. The remaining 50% is due upon project completion before the site goes live.",
  },
  {
    question: "What do I need to provide to get started?",
    answer:
      "We need your brand assets (logo, colors, fonts if any), content (text, images, videos), and a clear understanding of your goals. We also offer content writing services at an additional cost.",
  },
  {
    question: "Will my website work on mobile devices?",
    answer:
      "Absolutely! All our websites are fully responsive and optimized for mobile, tablet, and desktop devices. Mobile-first design is a standard in all our packages.",
  },
  {
    question: "Do you provide website hosting?",
    answer:
      "Yes, we can help you set up hosting on premium providers. Monthly management plans include hosting monitoring. We recommend reliable Egyptian and international hosting providers.",
  },
  {
    question: "What's included in the monthly management plans?",
    answer:
      "Monthly plans include regular updates, security monitoring, backups, content updates, and support. The level of service increases with each tier. A 12-month minimum contract is required.",
  },
  {
    question: "Can I update the website myself after it's built?",
    answer:
      "Yes! We build websites on user-friendly platforms with content management systems. We provide training on how to make basic updates. For complex changes, our monthly plans cover that.",
  },
  {
    question: "Do you offer SEO services?",
    answer:
      "All packages include basic SEO setup. Our Professional and Enterprise packages include advanced SEO. For ongoing SEO management, our monthly plans include SEO monitoring and optimization.",
  },
  {
    question: "What if I need changes after the website is launched?",
    answer:
      "Minor changes within the first month are included. After that, our monthly management plans cover regular updates. For one-time changes, we offer hourly rates.",
  },
  {
    question: "Can you help with e-commerce websites?",
    answer:
      "Yes! Our Enterprise package includes e-commerce functionality for up to 50 products. For larger stores, we offer custom solutions. We integrate with local payment gateways in Egypt.",
  },
];

interface FAQProps {
  limit?: number;
}

export default function FAQ({ limit }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayedFaqs = limit ? faqs.slice(0, limit) : faqs;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {displayedFaqs.map((faq, index) => (
          <div
            key={index}
            className={`card overflow-hidden transition-all duration-300 ${
              openIndex === index ? "border-amber-200 shadow-md" : ""
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
                    ? "bg-amber-500 text-white rotate-180"
                    : "bg-slate-100 text-slate-500"
                }`}
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
