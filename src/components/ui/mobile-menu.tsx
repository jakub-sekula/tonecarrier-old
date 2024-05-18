"use client";

import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import EtsyLogo from "../icons/EtsyLogo";

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="flex md:hidden">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger ${mobileNavOpen && "active"}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="w-6 h-6 fill-current text-gray-500 opacity-100"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="2" />
          <rect y="11" width="24" height="2" />
          <rect y="18" width="24" height="2" />
        </svg>
      </button>

      {/*Mobile navigation */}
      <div ref={mobileNav}>
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white"
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="p-6">
            <nav>
              <ul className="flex flex-col gap-4">
                <li>
                  <a
                    onClick={() => setMobileNavOpen(false)}
                    className="text-lg  w-full sm:w-auto mb-4 whitespace-nowrap sm:mb-0 flex items-center justify-center gap-1"
                    href="#features"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setMobileNavOpen(false)}
                    className="text-lg  w-full sm:w-auto mb-4 whitespace-nowrap sm:mb-0 flex items-center justify-center gap-1"
                    href="#samples"
                  >
                    Sample scans
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setMobileNavOpen(false)}
                    className="text-lg  w-full sm:w-auto mb-4 whitespace-nowrap sm:mb-0 flex items-center justify-center gap-1"
                    href="#reviews"
                  >
                    Reviews
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setMobileNavOpen(false)}
                    className="text-lg  w-full sm:w-auto mb-4 whitespace-nowrap sm:mb-0 flex items-center justify-center gap-1"
                    href="#faq"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    className="btn text-white bg-orange-500 hover:bg-orange-600 w-full sm:w-auto mb-4 whitespace-nowrap sm:mb-0 flex items-center justify-center gap-1"
                    href="https://theprintedphotolab.etsy.com"
                  >
                    Buy on <EtsyLogo className="fill-white h-6 pt-1" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </Transition>
      </div>
    </div>
  );
}
