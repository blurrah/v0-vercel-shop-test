import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const missingShopify = ["SHOPIFY_STORE_DOMAIN", "SHOPIFY_STOREFRONT_ACCESS_TOKEN"].filter(
  (key) => !process.env[key],
);

// These vars may be injected at request runtime rather than at config-compile time.
// Warn instead of throwing so the dev server always boots; data fetches read them at runtime.
if (missingShopify.length > 0) {
  console.warn(
    `[next.config] Shopify env vars not visible at config load: ${missingShopify.join(", ")}. ` +
      `Continuing — these are expected to be present at request runtime.`,
  );
}

if (process.env.NEXT_PUBLIC_ENABLE_AUTH === "1") {
  const missing = [
    "BETTER_AUTH_SECRET",
    "SHOPIFY_CUSTOMER_CLIENT_ID",
    "SHOPIFY_CUSTOMER_CLIENT_SECRET",
  ].filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `NEXT_PUBLIC_ENABLE_AUTH=1 requires: ${missing.join(", ")}. ` +
        `Set the missing variables or unset NEXT_PUBLIC_ENABLE_AUTH.`,
    );
  }
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    inlineCss: true,
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    deviceSizes: [1080, 1920],
    imageSizes: [],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        hostname: "cdn.shopify.com",
        protocol: "https",
      },
    ],
    unoptimized: !!process.env.V0_CALLBACK_URL,
  },
  partialPrefetching: true,
  reactCompiler: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/collections/:handle",
          destination: "/md/collections/:handle",
          has: [{ type: "header", key: "accept", value: "(.*)text/markdown(.*)" }],
        },
        {
          source: "/products/:handle",
          destination: "/md/products/:handle",
          has: [{ type: "header", key: "accept", value: "(.*)text/markdown(.*)" }],
        },
        {
          source: "/search",
          destination: "/md/search",
          has: [{ type: "header", key: "accept", value: "(.*)text/markdown(.*)" }],
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  serverExternalPackages: ["better-auth"],
};

const withNextIntl = createNextIntlPlugin({
  experimental: { createMessagesDeclaration: "./lib/i18n/messages/en.json" },
  requestConfig: "./lib/i18n/request.ts",
});

export default withNextIntl(nextConfig);
