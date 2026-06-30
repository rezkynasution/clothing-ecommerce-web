import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopView } from "@/components/shop/shop-view";

export const metadata: Metadata = {
  title: "Shop — MAISON",
  description: "Browse the full MAISON collection. Filter, sort and discover premium essentials.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-muted">
          Loading the collection…
        </div>
      }
    >
      <ShopView />
    </Suspense>
  );
}
