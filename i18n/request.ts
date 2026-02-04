import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale } from "../i18n.config";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale && locales.includes(locale as any) ? locale : defaultLocale;
  
  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  };
});
