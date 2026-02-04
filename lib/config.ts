export const siteConfig = {
  name: "BerryGum Developments",
  tagline: "Ù†Ø¨Ù†ÙŠ Ø­Ø¶ÙˆØ±Ùƒ Ø§Ù„Ø±Ù‚Ù…ÙŠ",
  description: "Premium web design and development studio in Egypt. We craft stunning websites for clinics, restaurants, and businesses.",
  url: "https://BerryGum.studio",
  
  // Contact Information
  whatsapp: "+201107578212",
  email: "hello@BerryGum.studio",
  phone: "+20 110 757 8212",
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
    general: "Ù…Ø±Ø­Ø¨Ø§Ù‹! Ø£Ø±ÙŠØ¯ Ø§Ù„Ø§Ø³ØªÙØ³Ø§Ø± Ø¹Ù† Ø®Ø¯Ù…Ø§ØªÙƒÙ…",
    pricing: "Ù…Ø±Ø­Ø¨Ø§Ù‹! Ø£Ø±ÙŠØ¯ Ù…Ø¹Ø±ÙØ© Ø§Ù„Ù…Ø²ÙŠØ¯ Ø¹Ù† Ø§Ù„Ø£Ø³Ø¹Ø§Ø±",
    contact: "Ù…Ø±Ø­Ø¨Ø§Ù‹! Ø£Ø±ÙŠØ¯ Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹ÙƒÙ… Ø¨Ø®ØµÙˆØµ Ù…Ø´Ø±ÙˆØ¹ Ø¬Ø¯ÙŠØ¯",
  },
  
  // Business hours
  hours: {
    weekdays: "9:00 AM - 6:00 PM",
    weekend: "Closed",
  },
} as const;

export type SiteConfig = typeof siteConfig;
