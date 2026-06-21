"use client";

import { Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 px-4 pt-[max(env(safe-area-inset-top,0px),0.75rem)] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-3 py-2">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight text-ink"
        >
          Pippin
        </Link>

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
            aria-label="Account"
            className="flex size-10 items-center justify-center rounded-full bg-card text-ink shadow-sm ring-1 ring-border transition-transform active:scale-95"
          >
            <User className="size-5" strokeWidth={2.25} />
          </Link>
          <Link
            href="/cart"
            aria-label="Bag"
            className="flex size-10 items-center justify-center rounded-full bg-primary text-ink shadow-sm transition-transform active:scale-95"
          >
            <ShoppingBag className="size-5" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </header>
  );
}
