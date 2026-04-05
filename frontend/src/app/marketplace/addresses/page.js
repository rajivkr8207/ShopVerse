import React from "react";
import MarketplaceLayout from "@/features/marketplace/components/MarketplaceLayout";
import MyAddresses from "@/features/marketplace/components/MyAddresses";

export const metadata = {
  title: "My Addresses | ShopVerse",
  description: "Manage your delivery addresses and secure vectors.",
};

export default function AddressesPage() {
  return (
    <MarketplaceLayout>
      <MyAddresses />
    </MarketplaceLayout>
  );
}
