export const siteConfig = {
  name: "PixelCraft Studio",
  tagline: "نبني حضورك الرقمي",
  description: "Premium web design and development studio in Egypt. We craft stunning websites for clinics, restaurants, and businesses.",
  url: "https://pixelcraft.studio",
  
  // Contact Information
  whatsapp: "+201107578212",
  email: "hello@pixelcraft.studio",
  phone: "+20 2 1234 5678",
  address: "Smart Village, 6th of October City, Giza, Egypt",
  
  // Social Links
  social: {
    instagram: "https://instagram.com/pixelcraftstudio",
    facebook: "https://facebook.com/pixelcraftstudio",
    linkedin: "https://linkedin.com/company/pixelcraftstudio",
    behance: "https://behance.net/pixelcraftstudio",
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
