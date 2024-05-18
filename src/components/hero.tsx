"use client";
import VideoThumb from "@public/images/thumb.jpg";
import ModalVideo from "@/components/modal-video";
import EtsyLogo from "./icons/EtsyLogo";
import { useEffect, useRef } from "react";

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
        className="absolute w-full h-full object-cover mix-blend-multiply -z-10 "
        autoPlay
        loop
        muted
        playsInline
      ></video>
      <div className="absolute w-full h-full bg-gray-500 -z-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-white">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-[5rem] font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              The best way to preserve
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-400">
                your film memories
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-200 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                The toneCarrier is a complete system for digitizing negatives
                and slides.
                <br />
                All you need is a camera, tripod and a macro lens.
              </p>
              <div
                className="mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <a
                  className="btn text-white bg-orange-500 hover:bg-orange-600 w-full sm:w-auto mb-4 whitespace-nowrap sm:mb-0 flex items-center justify-center gap-1"
                  href="https://theprintedphotolab.etsy.com"
                >
                  Buy on <EtsyLogo className="fill-white h-6 pt-1" />
                </a>
                {/* <a
                  className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
                  href="#0"
                >
                  Learn more
                </a> */}
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
