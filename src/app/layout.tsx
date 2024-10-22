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
  title: "toneCarrier - 35 mm and 120 film scanning system",
  description: "Scanning tools engineered for quality. Get perfect DSLR scans of your negatives in the most popular formats. toneCarrier keeps your film safe and flat, so you can focus on your photography.",
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
        className={`${inter.variable} font-inter antialiased text-center bg-black text-white flex flex-col items-center justify-center gap-6 fixed inset-0 tracking-tight`}
      >
        <img src="/tone-logo-white.png" className="w-48"/>
          The toneCarrier has a new home!
          <br/>Redirecting now...
        {/* <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip"> */}
          {/* <Header /> */}
          {children}
          {/* <Banner /> */}
          {/* <Footer /> */}
        {/* </div> */}
      </body>
      <GoogleAnalytics gaId="G-MBMWQ5ED7P" />
      <GoogleTagManager gtmId="GTM-WN6VB42T" />
    </html>
  );
}
