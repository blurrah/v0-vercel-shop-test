"use client";

import { Bell, ChevronLeft, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const titles: Array<[RegExp, string]> = [
  [/^\/$/, "Home"],
  [/^\/collections\/all/, "Shop All"],
  [/^\/collections\/new-arrivals/, "New Arrivals"],
  [/^\/collections\/girls/, "Girls"],
  [/^\/collections\/boys/, "Boys"],
  [/^\/collections\/baby/, "Baby & Toddler"],
  [/^\/collections/, "Collection"],
  [/^\/products/, "Product"],
  [/^\/search/, "Search"],
  [/^\/cart/, "Your Bag"],
  [/^\/account/, "Account"],
  [/^\/about/, "About"],
];

function titleFor(pathname: string): string {
  return titles.find(([re]) => re.test(pathname))?.[1] ?? "Pippin";
}

export function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-30 px-4 pt-[max(env(safe-area-inset-top,0px),0.75rem)]">
      <div className="mx-auto flex max-w-screen-md items-center justify-between gap-3 py-2">
        {isHome ? (
          <Link
            href="/"
            className="font-display text-2xl font-semibold tracking-tight text-ink"
          >
            Pippin
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex size-10 items-center justify-center rounded-full bg-card text-ink shadow-sm ring-1 ring-border transition-transform active:scale-95"
          >
            <ChevronLeft className="size-5" strokeWidth={2.5} />
          </button>
        )}

        {!isHome && (
          <span className="font-display text-lg font-semibold text-ink">
            {titleFor(pathname)}
          </span>
        )}

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="flex size-10 items-center justify-center rounded-full bg-card text-ink shadow-sm ring-1 ring-border transition-transform active:scale-95"
          >
            <Search className="size-5" strokeWidth={2.25} />
          </Link>
          <Link
            href="/account"
            aria-label="Notifications"
            className="flex size-10 items-center justify-center rounded-full bg-primary text-ink shadow-sm transition-transform active:scale-95"
          >
            <Bell className="size-5" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </header>
  );
}
