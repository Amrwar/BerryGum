# PixelCraft Studio Website

A production-ready Next.js 14 website for a web design studio in Egypt. Built with TypeScript, Tailwind CSS, and optimized for conversions.

## Features

- 🚀 **Next.js 14 App Router** - Latest React framework with server components
- 💅 **Tailwind CSS** - Utility-first styling with custom design system
- 📱 **Fully Responsive** - Mobile-first design that looks great on all devices
- 💬 **WhatsApp Integration** - Floating button on all pages for instant contact
- 📧 **Contact Form** - API route with Resend email integration
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and structured data
- ⚡ **Performance Focused** - Optimized images, fonts, and code splitting

## Pages

- `/` - Home page with hero, services, process, and CTAs
- `/pricing` - One-time and monthly pricing plans
- `/portfolio` - Project showcase with filtering
- `/contact` - Contact form with validation
- `/services/clinics` - Specialized page for medical clinics
- `/services/restaurants` - Specialized page for restaurants

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-repo/pixelcraft-studio.git
cd pixelcraft-studio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Edit `.env.local` with your values:
```env
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your@email.com
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts       # Contact form API endpoint
│   ├── contact/
│   │   └── page.tsx           # Contact page
│   ├── portfolio/
│   │   └── page.tsx           # Portfolio page
│   ├── pricing/
│   │   └── page.tsx           # Pricing page
│   ├── services/
│   │   ├── clinics/
│   │   │   └── page.tsx       # Clinics service page
│   │   └── restaurants/
│   │       └── page.tsx       # Restaurants service page
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── FAQ.tsx                # Accordion FAQ component
│   ├── Footer.tsx             # Site footer
│   ├── Hero.tsx               # Home page hero
│   ├── Navbar.tsx             # Navigation bar
│   ├── PortfolioGrid.tsx      # Filterable portfolio grid
│   ├── PricingCards.tsx       # Pricing tier cards
│   ├── Section.tsx            # Reusable section wrapper
│   └── WhatsAppFloat.tsx      # Floating WhatsApp button
├── lib/
│   ├── config.ts              # Site configuration
│   └── seo.ts                 # SEO utilities
├── styles/
│   └── globals.css            # Global styles and Tailwind
└── public/                    # Static assets
```

## Configuration

### Site Config (`lib/config.ts`)

Update the following in `lib/config.ts`:
- Company name and tagline
- WhatsApp number
- Contact information
- Pricing tiers
- Portfolio projects

### SEO (`lib/seo.ts`)

Customize meta tags and Open Graph data for each page.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Email Setup (Resend)

1. Create an account at [resend.com](https://resend.com)
2. Verify your domain
3. Get your API key
4. Add `RESEND_API_KEY` to your environment variables

If `RESEND_API_KEY` is not set, contact form submissions will be logged to the console.

## Customization

### Colors

Edit the color palette in `tailwind.config.ts`:
- Primary: Slate (dark, professional)
- Accent: Rose (vibrant, attention-grabbing)

### Fonts

The site uses:
- **Syne** - Display/headings (bold, modern)
- **DM Sans** - Body text (clean, readable)

Update font imports in `app/layout.tsx` and `tailwind.config.ts`.

### WhatsApp Number

Update in `lib/config.ts`:
```typescript
export const siteConfig = {
  whatsapp: "+201234567890", // Your number
  // ...
};
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## License

Private - All rights reserved.

---

Built with ❤️ by PixelCraft Studio
