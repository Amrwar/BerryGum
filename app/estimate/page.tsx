"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Section, { SectionHeader } from "@/components/Section";
import HeroBg from "@/components/HeroBg";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/lib/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import { calculateEstimate, formatEstimateAmount } from "@/lib/pricing/estimateCalculator";
import {
  addOns,
  includedPages,
  type ServiceType,
} from "@/lib/pricing/estimatorConfig";

const serviceTypeOrder: ServiceType[] = ["clinic", "restaurant", "startup", "systems", "other"];

export default function EstimatePage() {
  const { t } = useLanguage();

  const [serviceType, setServiceType] = useState<ServiceType>("clinic");
  const [pageCount, setPageCount] = useState(includedPages);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [isRush, setIsRush] = useState(false);

  const estimate = useMemo(
    () => calculateEstimate({ serviceType, pageCount, selectedAddOnIds, isRush }),
    [serviceType, pageCount, selectedAddOnIds, isRush]
  );

  function toggleAddOn(id: string) {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id]
    );
  }

  const whatsappMessage = useMemo(() => {
    const lines = [
      "Hello! I used the price estimator on your site and would like to discuss a project.",
      `Service type: ${t(`estimate.serviceTypes.${serviceType}`)}`,
      `Pages: ${pageCount}`,
    ];
    if (selectedAddOnIds.length > 0) {
      const labels = addOns
        .filter((a) => selectedAddOnIds.includes(a.id))
        .map((a) => t(a.labelKey));
      lines.push(`Add-ons: ${labels.join(", ")}`);
    }
    if (isRush) lines.push("Rush delivery requested.");
    lines.push(
      `Estimated range: ${formatEstimateAmount(estimate.low)} - ${formatEstimateAmount(estimate.high)} ${estimate.currency}`
    );
    return lines.join("\n");
  }, [serviceType, pageCount, selectedAddOnIds, isRush, estimate, t]);

  function handleSendEstimate() {
    trackEvent({
      name: "pricing_estimate_requested",
      serviceType,
      estimatedTotal: estimate.total,
    });
  }

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
              <span className="text-sm font-medium text-white">{t("estimate.badge")}</span>
            </div>
            <h1 className="heading-xl text-white mb-4">
              {t("estimate.title")} <span className="text-gradient-gold">{t("estimate.titleHighlight")}</span>
            </h1>
            <p className="text-base text-white/70 leading-relaxed">{t("estimate.subtitle")}</p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Service type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                {t("estimate.serviceTypeLabel")}
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {serviceTypeOrder.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setServiceType(type)}
                    aria-pressed={serviceType === type}
                    className="text-left rtl:text-right px-4 py-3 rounded-xl text-sm font-medium transition-all"
                    style={
                      serviceType === type
                        ? { background: "var(--gradient-brand)", color: "white" }
                        : { background: "#faf8ff", color: "#1e0a5e", border: "1px solid rgba(155,32,160,0.15)" }
                    }
                  >
                    {t(`estimate.serviceTypes.${type}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Page count */}
            <div>
              <label htmlFor="pageCount" className="block text-sm font-semibold text-slate-700 mb-3">
                {t("estimate.pageCountLabel")}
              </label>
              <input
                id="pageCount"
                type="number"
                min={1}
                step={1}
                value={pageCount}
                onChange={(e) => setPageCount(Number(e.target.value))}
                className="input max-w-[140px]"
              />
              <p className="text-xs text-slate-500 mt-2">
                {t("estimate.pageCountHint").replace("{count}", String(includedPages))}
              </p>
            </div>

            {/* Add-ons */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                {t("estimate.addOnsLabel")}
              </label>
              <div className="space-y-2">
                {addOns.map((addOn) => (
                  <label
                    key={addOn.id}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors"
                    style={{
                      background: selectedAddOnIds.includes(addOn.id) ? "rgba(155,32,160,0.06)" : "#faf8ff",
                      border: selectedAddOnIds.includes(addOn.id)
                        ? "1px solid rgba(155,32,160,0.3)"
                        : "1px solid rgba(155,32,160,0.1)",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddOnIds.includes(addOn.id)}
                      onChange={() => toggleAddOn(addOn.id)}
                      className="w-4 h-4 accent-fuchsia-600"
                    />
                    <span className="text-sm text-slate-700 flex-1">{t(addOn.labelKey)}</span>
                    <span className="text-xs text-slate-400">
                      +{formatEstimateAmount(addOn.cost)} {estimate.currency}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rush */}
            <div>
              <label
                className="flex items-center gap-3 p-4 rounded-xl cursor-pointer"
                style={{
                  background: isRush ? "rgba(155,32,160,0.06)" : "#faf8ff",
                  border: isRush ? "1px solid rgba(155,32,160,0.3)" : "1px solid rgba(155,32,160,0.1)",
                }}
              >
                <input
                  type="checkbox"
                  checked={isRush}
                  onChange={(e) => setIsRush(e.target.checked)}
                  className="w-4 h-4 accent-fuchsia-600"
                />
                <span className="flex-1">
                  <span className="block text-sm font-medium text-slate-700">{t("estimate.rushLabel")}</span>
                  <span className="block text-xs text-slate-500 mt-0.5">{t("estimate.rushHint")}</span>
                </span>
              </label>
            </div>
          </div>

          {/* Result */}
          <div className="lg:col-span-2">
            <div
              className="sticky top-28 rounded-2xl p-6 sm:p-8 text-white"
              style={{ background: "var(--gradient-brand)" }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-2">
                {t("estimate.resultTitle")}
              </h3>
              <div
                className="text-3xl sm:text-4xl font-black mb-1"
                data-testid="estimate-range"
              >
                {formatEstimateAmount(estimate.low)} - {formatEstimateAmount(estimate.high)}
              </div>
              <div className="text-sm text-white/70 mb-6">{estimate.currency}</div>

              <div className="border-t border-white/20 pt-4 mb-6 space-y-2 text-sm">
                <h4 className="font-semibold mb-2">{t("estimate.breakdownTitle")}</h4>
                <div className="flex justify-between text-white/80">
                  <span>{t("estimate.breakdownBase")}</span>
                  <span>{formatEstimateAmount(estimate.baseRate)}</span>
                </div>
                {estimate.addOnLines.map((line) => (
                  <div key={line.labelKey} className="flex justify-between text-white/80">
                    <span>{t(line.labelKey)}</span>
                    <span>+{formatEstimateAmount(line.cost)}</span>
                  </div>
                ))}
                {estimate.extraPageCount > 0 && (
                  <div className="flex justify-between text-white/80">
                    <span>
                      {t("estimate.breakdownExtraPages").replace("{count}", String(estimate.extraPageCount))}
                    </span>
                    <span>+{formatEstimateAmount(estimate.extraPagesCost)}</span>
                  </div>
                )}
                {estimate.rushSurcharge > 0 && (
                  <div className="flex justify-between text-white/80">
                    <span>{t("estimate.breakdownRush")}</span>
                    <span>+{formatEstimateAmount(estimate.rushSurcharge)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold pt-2 border-t border-white/10">
                  <span>{t("estimate.breakdownSubtotal")}</span>
                  <span>{formatEstimateAmount(estimate.total)}</span>
                </div>
              </div>

              <p className="text-xs text-white/60 mb-6">{t("estimate.resultNote")}</p>

              <Link
                href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSendEstimate}
                className="btn w-full justify-center font-bold"
                style={{ background: "white", color: "#9b20a0" }}
              >
                {t("estimate.sendEstimate")}
              </Link>

              <div className="text-center mt-4">
                <p className="text-xs text-white/60 mb-1">{t("estimate.getPreciseQuote")}</p>
                <Link href="/contact" className="text-sm font-semibold text-white underline">
                  {t("estimate.contactUs")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
