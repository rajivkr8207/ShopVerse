import React from "react";
import MarketplaceLayout from "@/features/marketplace/components/MarketplaceLayout";
import Checkout from "@/features/marketplace/components/Checkout";

export const metadata = {
  title: "Secure Checkout | ShopVerse",
  description: "Securely finalize your ShopVerse hardware acquisition.",
};

export default function CheckoutPage() {
  return (
    <MarketplaceLayout>
      <Checkout />
    </MarketplaceLayout>
  );
}
