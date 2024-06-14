import React from "react";
import EtsyLogo from "./icons/EtsyLogo";
import { twMerge } from "tailwind-merge";

export default function BuyOnEtsyButton({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <a
      className={twMerge(
        "btn-sm text-white bg-orange-500 hover:bg-orange-600 w-fit whitespace-nowrap sm:mb-0 flex items-center justify-center gap-1 justify-self-end border border-transparent",
        className
      )}
      href={href}
    >
      <span>Buy now on</span>
      <EtsyLogo className="fill-white h-6 pt-1" />
    </a>
  );
}
