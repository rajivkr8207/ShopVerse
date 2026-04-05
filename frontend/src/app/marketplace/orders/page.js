import React from "react";
import MarketplaceLayout from "@/features/marketplace/components/MarketplaceLayout";
import MyOrders from "@/features/marketplace/components/MyOrders";

export const metadata = {
  title: "Order History | ShopVerse",
  description: "View your past hardware acquisitions on ShopVerse.",
};

export default function OrdersPage() {
  return (
    <MarketplaceLayout>
      <MyOrders />
    </MarketplaceLayout>
  );
}
