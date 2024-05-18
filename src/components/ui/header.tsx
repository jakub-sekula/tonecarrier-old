"use client";

import { useState, useEffect } from "react";

import MobileMenu from "./mobile-menu";
import ToneCarrierLogo from "../icons/ToneCarrierLogo";
import EtsyLogo from "../icons/EtsyLogo";
import clsx from "clsx";

export default function Header() {
  const [top, setTop] = useState<boolean>(true);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top ? "bg-white backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4 h-11">
            <ToneCarrierLogo
              className={clsx(top ? "fill-white" : "fill-black")}
            />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow justify-end">
            {/* Desktop sign in links */}
            <a
              className="btn-sm text-white bg-orange-500 hover:bg-orange-600 w-fit mb-4 whitespace-nowrap sm:mb-0 flex items-center justify-center gap-1 justify-self-end"
              href="https://theprintedphotolab.etsy.com"
            >
              <span>Buy on</span>
              <EtsyLogo className="fill-white h-6 pt-1" />
            </a>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
