import "./css/style.css";

import { Inter } from "next/font/google";

import Header from "@/components/ui/header";
import Banner from "@/components/banner";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "toneCarrier - film scanning system",
  description: "Get perfect scans every time with our easy to use tools",
};

import Analytics from "@/components/gtmComponent";
import { Suspense } from "react";
import Footer from "@/components/ui/footer";

// To be placed within the <body> tag of your layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-inter antialiased bg-white text-gray-900 tracking-tight`}
      >
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          <Header />
          {children}
          {/* <Banner /> */}
          <Footer />
        </div>

        {/* <Suspense>
          <Analytics />
        </Suspense> */}
      </body>
      <GoogleAnalytics gaId="G-MBMWQ5ED7P" />
      <GoogleTagManager gtmId="GTM-WN6VB42T" />
    </html>
  );
}
