"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

import { CartItemsList } from "@/components/cart-page/cart-items-list";
import { Summary } from "@/components/cart-page/summary";
import { useCartRender } from "@/components/cart/context-sync";

export function CartBody({ locale }: { locale: string }) {
  const cart = useCartRender();
  const isEmpty = !cart || cart.lines.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[2rem] bg-card px-6 py-16 text-center shadow-sm ring-1 ring-border">
        <span className="flex size-20 items-center justify-center rounded-full bg-primary text-ink">
          <ShoppingBag className="size-9" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight">
          Your bag is empty
        </h2>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Let&apos;s find something cute and comfy for the little one.
        </p>
        <Link
          href="/collections/all"
          className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-105 active:scale-95"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] bg-card p-5 shadow-sm ring-1 ring-border sm:p-6">
        <CartItemsList locale={locale} />
      </div>
      <div className="rounded-[2rem] bg-card p-5 shadow-sm ring-1 ring-border sm:p-6">
        <Summary locale={locale} />
      </div>
    </div>
  );
}
