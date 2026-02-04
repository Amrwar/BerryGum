export const siteConfig = {
  name: "BerryGum Developments",
  tagline: "نبني حضورك الرقمي",
  description: "Premium web design and development studio in Egypt. We craft stunning websites for clinics, restaurants, and businesses.",
  url: "https://BerryGum.studio",
  
  // Contact Information
  whatsapp: "+201234567890",
  email: "hello@BerryGum.studio",
  phone: "+20 2 1234 5678",
  address: "Smart Village, 6th of October City, Giza, Egypt",
  
  // Social Links
  social: {
    instagram: "https://instagram.com/BerryGumstudio",
    facebook: "https://facebook.com/BerryGumstudio",
    linkedin: "https://linkedin.com/company/BerryGumstudio",
    behance: "https://behance.net/BerryGumstudio",
  },
  
  // WhatsApp message templates
  whatsappMessages: {
    general: "مرحباً! أريد الاستفسار عن خدماتكم",
    pricing: "مرحباً! أريد معرفة المزيد عن الأسعار",
    contact: "مرحباً! أريد التواصل معكم بخصوص مشروع جديد",
  },
  
  // Business hours
  hours: {
    weekdays: "9:00 AM - 6:00 PM",
    weekend: "Closed",
  },
} as const;

export type SiteConfig = typeof siteConfig;
