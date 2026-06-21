"use client";

import { Home, LayoutGrid, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCart } from "@/components/cart/context";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/collections/all", label: "Shop", icon: LayoutGrid },
  { href: "/search", label: "Search", icon: Search, center: true },
  { href: "/cart", label: "Cart", icon: ShoppingBag, badge: true },
  { href: "/account", label: "Account", icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const { cartWithPending } = useCart();
  const count = cartWithPending?.totalQuantity ?? 0;

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(env(safe-area-inset-bottom,0px),1rem)] pt-2"
    >
      <div className="flex items-center gap-1 rounded-full bg-ink px-3 py-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)]">
        {items.map(({ href, label, icon: Icon, ...rest }) => {
          const isCenter = "center" in rest && rest.center;
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          const showBadge = "badge" in rest && rest.badge && count > 0;

          if (isCenter) {
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className="mx-1 flex size-12 items-center justify-center rounded-full bg-background text-ink transition-transform hover:scale-105 active:scale-95"
              >
                <Icon className="size-5" strokeWidth={2.5} />
              </Link>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex size-11 items-center justify-center rounded-full transition-colors",
                isActive
                  ? "bg-primary text-ink"
                  : "text-background/60 hover:text-background",
              )}
            >
              <Icon className="size-5" strokeWidth={2.25} />
              {showBadge && (
                <span className="absolute -right-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-ink ring-2 ring-ink">
                  {count}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
