export const siteConfig = {
  name: "BerryGum",
  tagline: "We Build Digital Experiences",
  description: "Premium web design and development studio in Egypt. We craft stunning websites for clinics, restaurants, and businesses.",
  url: "https://berry-gum.vercel.app",

  // Contact Information
  whatsapp: "+201107578212",
  email: "berrygumstudio@yahoo.com",
  phone: "+201110410498",
  address: "Smart Village, 6th of October City, Giza, Egypt",

  // Social Links
  social: {
    instagram: "https://instagram.com/BerryGumStudio",
  },

  // WhatsApp message templates
  whatsappMessages: {
    general: "Hello! I would like to inquire about your services",
    pricing: "Hello! I would like to know more about your pricing",
    contact: "Hello! I would like to discuss a new project",
  },

  // Business hours
  hours: {
    weekdays: "9:00 AM - 6:00 PM",
    weekend: "Closed",
  },
} as const;

export type SiteConfig = typeof siteConfig;
