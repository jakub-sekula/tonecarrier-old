"use client";
import VideoThumb from "@public/images/thumb.jpg";
import ModalVideo from "@/components/modal-video";
import EtsyLogo from "./icons/EtsyLogo";
import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import BuyOnEtsyButton from "./BuyOnEtsyButton";

export default function Hero() {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.play().catch((error) => {
        console.error("Failed to autoplay video:", error);
      });
    }
  }, []);
  return (
    <section className="relative">
      {/* Illustration behind hero content */}
      <video
        ref={ref}
        src="/leaks_trim.mp4"
        className="absolute w-full h-full object-cover opacity-25 -z-10 "
        autoPlay
        loop
        muted
        playsInline
      ></video>
      <div className="absolute w-full h-full bg-black -z-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-white">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-[1.875rem] md:text-[5rem] font-extrabold leading-[1em] tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              The easy way to digitize
              <br />
              <span className="bg-clip-text px-2 text-transparent bg-gradient-to-r from-amber-500 to-red-400">
                your film memories
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-sm md:text-xl text-gray-200 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                The toneCarrier is a complete system for digitizing negatives
                and slides. <br className="hidden md:block" />
                All you need to scan 35 mm and 120 is a camera, tripod and a macro lens.
              </p>
              <div
                className="mx-auto sm:max-w-none sm:flex sm:justify-center flex flex-col md:flex-row gap-4"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <BuyOnEtsyButton href="https://theprintedphotolab.etsy.com" />
                <a
                  className="btn text-white  hover:bg-white/20 border border-white w-full sm:w-auto  whitespace-nowrap sm:mb-0 flex items-center justify-center gap-1"
                  href="#feature-blocks"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <ModalVideo
            thumb={VideoThumb}
            thumbWidth={768}
            thumbHeight={432}
            thumbAlt="toneCarrier demo video"
            video="/videos/toneCarrier-compressed.mp4"
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>
    </section>
  );
}
