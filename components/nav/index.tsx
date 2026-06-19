import Link from "next/link";
import { Suspense } from "react";

import { isAuthEnabled } from "@/lib/auth";
import { navItems, siteConfig } from "@/lib/config";

import { NavAccount, NavAccountFallback } from "./account";
import { CartIcon, CartIconFallback } from "./cart";
import { MobileMenu } from "./mobile-menu";
import { QuickLinks } from "./quick-links";
import { SearchModal } from "./search-modal";

export async function Nav({ locale }: { locale: string }) {
  const items = navItems;

  return (
    <nav
      className="sticky top-0 z-30 w-full border-b border-border bg-background/80 backdrop-blur-md pt-[env(safe-area-inset-top,0px)] transition-shadow duration-250"
      id="nav-outer"
    >
      <div className="mx-auto flex h-16 items-center gap-2.5 md:gap-5 px-5 lg:px-10">
        <MobileMenu items={items} />

        <Link className="flex items-center shrink-0 gap-2" href="/">
          <span className="text-lg font-semibold uppercase leading-none tracking-[0.05em]">
            {siteConfig.name}
          </span>
        </Link>

        <QuickLinks items={items} />

        <div className="flex items-center gap-5 ml-auto">
          <SearchModal />
          {isAuthEnabled && (
            <Suspense fallback={<NavAccountFallback />}>
              <NavAccount />
            </Suspense>
          )}
          <Suspense fallback={<CartIconFallback />}>
            <CartIcon />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
