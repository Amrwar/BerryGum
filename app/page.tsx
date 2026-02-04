import Link from "next/link";
import Hero from "@/components/Hero";
import Section, { SectionHeader } from "@/components/Section";
import PortfolioGrid from "@/components/PortfolioGrid";
import FAQ from "@/components/FAQ";
import { siteConfig } from "@/lib/config";

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Clinic Websites",
    description: "Professional medical websites with appointment booking, patient portals, and HIPAA-compliant forms.",
    href: "/services/clinics",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Restaurant Websites",
    description: "Mouth-watering designs with online menus, table reservations, and delivery integration.",
    href: "/services/restaurants",
    color: "from-orange-500 to-red-400",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    title: "E-Commerce",
    description: "Full-featured online stores with payment gateways, inventory management, and order tracking.",
    href: "/pricing",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Corporate Sites",
    description: "Establish credibility with professional corporate websites that showcase your brand.",
    href: "/pricing",
    color: "from-slate-600 to-slate-400",
  },
];

const features = [
  {
    title: "Lightning Fast",
    description: "Optimized for speed with Core Web Vitals in mind",
    icon: "âš¡",
  },
  {
    title: "SEO Optimized",
    description: "Built to rank higher on Google search results",
    icon: "ðŸ”",
  },
  {
    title: "Mobile First",
    description: "Perfect experience on all devices and screen sizes",
    icon: "ðŸ“±",
  },
  {
    title: "Secure",
    description: "SSL certificates and security best practices",
    icon: "ðŸ”’",
  },
  {
    title: "Analytics Ready",
    description: "Track visitors and measure your success",
    icon: "ðŸ“Š",
  },
  {
    title: "24/7 Support",
    description: "Always here when you need assistance",
    icon: "ðŸ’¬",
  },
];

const stats = [
  { value: "150+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5+", label: "Years Experience" },
  { value: "50+", label: "Active Clients" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Section id="services">
        <SectionHeader
          badge="Our Services"
          title="Websites Built for Your Industry"
          subtitle="We specialize in creating stunning, functional websites tailored to specific industries. Each solution is crafted with your unique needs in mind."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group card p-6 card-hover"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 flex items-center text-amber-600 font-medium text-sm">
                Learn more
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* About Section */}
      <Section variant="alt" id="about">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-200 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
              <span className="text-sm font-medium text-amber-700">About Us</span>
            </div>
            <h2 className="heading-lg text-slate-900 mb-6">
              Your Digital Partner in Egypt
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              We&apos;re a passionate team of designers and developers based in Egypt, dedicated to helping businesses establish a powerful online presence. With over 5 years of experience, we&apos;ve helped 150+ businesses across the Middle East grow with stunning, conversion-focused websites.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Our approach combines international design standards with local market understanding, ensuring your website not only looks world-class but also resonates with your target audience.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-50 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-white rounded-2xl shadow-2xl p-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-slate-100 rounded-lg p-4">
                    <div className="w-1/3 h-4 bg-slate-300 rounded mb-3" />
                    <div className="w-full h-3 bg-slate-200 rounded mb-2" />
                    <div className="w-4/5 h-3 bg-slate-200 rounded mb-2" />
                    <div className="w-2/3 h-3 bg-slate-200 rounded mb-6" />
                    <div className="grid grid-cols-3 gap-2">
                      <div className="aspect-square bg-amber-200 rounded-lg" />
                      <div className="aspect-square bg-blue-200 rounded-lg" />
                      <div className="aspect-square bg-green-200 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-slate-500/10 rounded-full blur-2xl" />
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section>
        <SectionHeader
          badge="Why Choose Us"
          title="Everything You Need to Succeed Online"
          subtitle="We don't just build websites. We build growth engines for your business."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="card p-6 hover:border-amber-200 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Portfolio Preview */}
      <Section variant="alt">
        <SectionHeader
          badge="Our Work"
          title="Projects We're Proud Of"
          subtitle="Take a look at some of our recent work and see the quality we deliver."
        />
        <PortfolioGrid limit={6} showFilters={false} />
      </Section>

      {/* FAQ Section */}
      <Section>
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Got questions? We've got answers. Here are some common questions about our services."
        />
        <FAQ limit={5} />
        <div className="mt-8 text-center">
          <Link href="/pricing#faq" className="text-amber-600 font-medium hover:text-amber-700">
            View all FAQs â†’
          </Link>
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="dark" className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
        </div>

        <div className="relative text-center max-w-3xl mx-auto">
          <h2 className="heading-lg text-white mb-6">
            Ready to Transform Your Online Presence?
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            Let&apos;s discuss your project and see how we can help your business grow. Get in touch today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(siteConfig.whatsappMessages.general)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
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
