import { CartContextSync } from "@/components/cart/context-sync";
import type { Locale } from "@/lib/i18n";
import type { Cart } from "@/lib/types";

import { CartBody } from "./ui/cart-body";

interface CartViewProps {
  cart: Cart | null;
  locale: Locale;
}

export function CartView({ cart, locale }: CartViewProps) {
  return (
    <CartContextSync cart={cart}>
      <div className="space-y-5 pt-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Your bag</h1>
        <CartBody locale={locale} />
      </div>
    </CartContextSync>
  );
}

export function CartViewFallback({ locale: _locale }: { locale: Locale }) {
  return (
    <div className="space-y-5 pt-2">
      <div className="h-9 w-40 animate-pulse rounded-full bg-accent" />
      <div className="h-64 animate-pulse rounded-[2rem] bg-accent" />
    </div>
  );
}
