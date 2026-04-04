import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/provider";
import ThemeManager from "@/components/ThemeManager";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShopVerse | Premium Ecommerce Analytics",
  description: "Next-generation ecommerce management dashboard with Digital Obsidian design.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-[#0b1326] text-slate-900 dark:text-[#dae2fd] transition-colors duration-300">
        <ReduxProvider>
          <ThemeManager />
          {children}
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}
