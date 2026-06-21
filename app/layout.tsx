import "./globals.css";
import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { AnalyticsComponents } from "@/components/analytics";
import { CartBootstrap } from "@/components/cart/bootstrap";
import { CartProvider } from "@/components/cart/context";
import { BottomNav } from "@/components/chrome/bottom-nav";
import { ThemeController } from "@/components/chrome/theme-controller";
import { TopBar } from "@/components/chrome/top-bar";
import { SiteSchema } from "@/components/schema/site-schema";
import { siteConfig } from "@/lib/config";
import { getLocale } from "@/lib/params";
import { buildAlternates } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()]);

  return (
    <html
      lang={locale}
      data-theme="sunny"
      className={`${jakarta.variable} ${fraunces.variable} bg-background`}
    >
      <head />
      <body className="font-sans antialiased">
        <SiteSchema locale={locale} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CartProvider initialCart={null}>
            <Suspense fallback={null}>
              <CartBootstrap />
            </Suspense>
            <ThemeController />
            <TopBar />
            <main id="main-content" className="mx-auto max-w-screen-md px-4 pb-32">
              {children}
            </main>
            <BottomNav />
          </CartProvider>
        </NextIntlClientProvider>
        <AnalyticsComponents />
      </body>
    </html>
  );
}

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("seo");

  return {
    alternates: buildAlternates({ pathname: "/" }),
    description: t("defaultDescription", { name: siteConfig.name }),
    generator: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
  };
};
