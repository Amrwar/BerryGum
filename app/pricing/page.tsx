import { Metadata } from "next";
import Link from "next/link";
import { generateSEO } from "@/lib/seo";
import Section, { SectionHeader } from "@/components/Section";
import PricingCards from "@/components/PricingCards";
import FAQ from "@/components/FAQ";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = generateSEO({
  title: "Pricing",
  description: "Transparent pricing for website development and monthly management plans. One-time builds starting at 15,000 EGP. Monthly management from 2,500 EGP/month.",
  keywords: ["web design pricing Egypt", "website cost Egypt", "web development rates"],
});

export default function PricingPage() {
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
                Transparent Pricing
              </span>
            </div>
            <h1 className="heading-xl text-white mb-6">
              Simple, Honest Pricing
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Choose between one-time website builds or ongoing management plans. 
              No hidden fees, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <Section className="-mt-10">
        <PricingCards showToggle={true} />
      </Section>

      {/* Comparison Table */}
      <Section variant="alt">
        <SectionHeader
          badge="Compare Plans"
          title="What's Included in Each Plan"
          subtitle="A detailed comparison to help you choose the right plan for your business."
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-4 font-semibold text-slate-900">Feature</th>
                <th className="text-center py-4 px-4 font-semibold text-slate-900">Starter</th>
                <th className="text-center py-4 px-4 font-semibold text-slate-900 bg-amber-50">Professional</th>
                <th className="text-center py-4 px-4 font-semibold text-slate-900">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Number of Pages", starter: "Up to 5", pro: "Up to 15", enterprise: "Unlimited" },
                { feature: "Custom Design", starter: "Template-based", pro: "Custom", enterprise: "Premium Custom" },
                { feature: "Mobile Responsive", starter: "✓", pro: "✓", enterprise: "✓" },
                { feature: "SEO Optimization", starter: "Basic", pro: "Advanced", enterprise: "Full Package" },
                { feature: "Contact Forms", starter: "1", pro: "Multiple + CRM", enterprise: "Advanced + API" },
                { feature: "WhatsApp Integration", starter: "Button", pro: "Chat Widget", enterprise: "Business API" },
                { feature: "Blog/News Section", starter: "—", pro: "✓", enterprise: "✓ with Categories" },
                { feature: "E-commerce", starter: "—", pro: "—", enterprise: "Up to 50 Products" },
                { feature: "Custom Animations", starter: "—", pro: "✓", enterprise: "Premium" },
                { feature: "Multi-language", starter: "—", pro: "—", enterprise: "✓" },
                { feature: "Support Period", starter: "1 Month", pro: "3 Months", enterprise: "6 Months" },
                { feature: "Revisions", starter: "2 Rounds", pro: "4 Rounds", enterprise: "Unlimited" },
              ].map((row, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-700">{row.feature}</td>
                  <td className="py-4 px-4 text-center text-slate-600">{row.starter}</td>
                  <td className="py-4 px-4 text-center text-slate-900 font-medium bg-amber-50/50">{row.pro}</td>
                  <td className="py-4 px-4 text-center text-slate-600">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Process Section */}
      <Section>
        <SectionHeader
          badge="Our Process"
          title="How We Work"
          subtitle="A transparent, collaborative process that ensures your project's success."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Discovery",
              description: "We learn about your business, goals, and target audience through detailed discussions.",
            },
            {
              step: "02",
              title: "Design",
              description: "Our designers create mockups that capture your brand and vision perfectly.",
            },
            {
              step: "03",
              title: "Development",
              description: "We build your website with clean code, optimized for speed and search engines.",
            },
            {
              step: "04",
              title: "Launch",
              description: "After testing and your approval, we launch your website and provide training.",
            },
          ].map((phase) => (
            <div key={phase.step} className="relative">
              <div className="text-6xl font-bold text-slate-100 mb-4">{phase.step}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{phase.title}</h3>
              <p className="text-slate-500 text-sm">{phase.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section variant="alt" id="faq">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our services and pricing."
        />
        <FAQ />
      </Section>

      {/* CTA Section */}
      <Section variant="dark" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative text-center max-w-3xl mx-auto">
          <h2 className="heading-lg text-white mb-6">
            Need a Custom Quote?
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            Every business is unique. Let&apos;s discuss your specific requirements and create a tailored solution.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(siteConfig.whatsappMessages.pricing)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat About Pricing
            </Link>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
