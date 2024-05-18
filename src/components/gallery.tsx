"use client";
import clsx from "clsx";
import { Camera, Download, Film, SunMedium } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type Photo = {
  name: string;
  image: string;
  camera?: string;
  film?: string;
  light?: string;
};

const initialPhotos: Photo[] = [
  {
    name: "Photo 1",
    image: "/images/samples/1.jpg",
    camera: "Canon 70D",
    // film: "Kodak Gold 200",
    light: "iPad Air 2",
  },
  {
    name: "Photo 2",
    image: "/images/samples/2.jpg",
    camera: "Canon 70D",
    // film: "Kodak Gold 200",
    light: "iPad Air 2",
  },
  {
    name: "Photo 3",
    image: "/images/samples/3.jpg",
    camera: "Canon 70D",
    // film: "Kodak Gold 200",
    light: "iPad Air 2",
  },
  {
    name: "Photo 4",
    image: "/images/samples/4.jpg",
    camera: "Canon 70D",
    // film: "Kodak Gold 200",
    light: "iPad Air 2",
  },
  {
    name: "Photo 5",
    image: "/images/samples/5.jpg",
    camera: "Canon 70D",
    // film: "Kodak Gold 200",
    light: "iPad Air 2",
  },
  {
    name: "Photo 5",
    image: "/images/samples/6.jpg",
    camera: "Canon 70D",
    // film: "Kodak Gold 200",
    light: "iPad Air 2",
  },
  {
    name: "Photo 5",
    image: "/images/samples/7.jpg",
    camera: "Canon 70D",
    // film: "Kodak Gold 200",
    light: "iPad Air 2",
  },
  {
    name: "Photo 5",
    image: "/images/samples/8.jpg",
    camera: "Canon 70D",
    // film: "Kodak Gold 200",
    light: "iPad Air 2",
  },
];

function PhotoComponent({ photo }: { photo: Photo }) {
  return (
    <div
      className={clsx(
        "md:hover:scale-[102.5%] md:hover:shadow-xl transition-all duration-200",
        " w-full shrink-0 md:h-full md:rounded overflow-hidden group relative  md:aspect-[3/2] border md:border-none"
      )}
    >
      <div className="md:group-hover:opacity-100 bg-black/50 backdrop-blur-sm transition-all duration-200 absolute inset-0 opacity-0 text-white p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Camera className="size-5 text-white/75" />
          <span>{photo.camera}</span>
        </div>
        {photo.film ? (
          <div className="flex items-center gap-2">
            <Film className="size-5 text-white/75" />
            <span>{photo.film}</span>
          </div>
        ) : null}

        <div className="flex items-center gap-2">
          <SunMedium className="size-5 text-white/75" />
          <span>{photo.light}</span>
        </div>
        {/* <button className="w-full mt-auto py-2 rounded border-white border bg-white/10 hover:bg-white/70 hover:border-transparent text-white flex justify-center items-center gap-2">
          <Download className="size-4" />
          Download RAW
        </button> */}
      </div>
      <Image
        width={400}
        height={267}
        src={photo.image}
        alt={photo.name}
        className="w-full md:h-full object-cover"
      />
      <div className="p-6 flex flex-col gap-2 md:hidden">
        <div className="flex items-center gap-2">
          <Camera className="size-5" />
          <span>{photo.camera}</span>
        </div>
        {photo.film ? (
          <div className="flex items-center gap-2">
            <Film className="size-5" />
            <span>{photo.film}</span>
          </div>
        ) : null}

        <div className="flex items-center gap-2">
          <SunMedium className="size-5" />
          <span>{photo.light}</span>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section className="relative pb-12" id="samples">
      {/* <div className="bg-gray-900 absolute left-0 right-0 top-0 h-[30rem]" /> */}
      <div
        className="relative max-w-6xl mx-auto px-4 sm:px-6  pt-24"
        data-aos="zoom-y-out"
      >
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16 flex flex-col gap-4">
          <h2 className="h2">Sample scans</h2>
          <p className="text-lg md:text-xl text-gray-600" >
            Download a few of our example files in RAW (DNG) format.
          </p>
          <div
            className="mx-auto sm:max-w-none sm:flex sm:justify-center"
            data-aos="zoom-y-out"
            data-aos-delay="300"
          >
            <a
              href="https://mega.nz/file/6XoH3QBD#c8nWI30F2vgC28vI4fEsG7vpXjj8RMaz6NFHLLFYd6U"
              target="_blank"
              className="w-full px-4 py-2 rounded border-gray-900 border hover:bg-gray-900/20 text-gray-900 flex justify-center items-center gap-2 mt-8"
            >
              <Download className="size-4" />
              Download ZIP (145 MB)
            </a>
          </div>
        </div>
      </div>
      <div className="w-full px-4 md:p-0">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3500,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full mx-auto flex items-center justify-center -px-8"
          data-aos="zoom-y-out"
        >
          <CarouselContent className="-ml-4">
            {initialPhotos.map((photo, index) => (
              <CarouselItem
                className="md:basis-1/2 lg:basis-1/4 2xl:basis-1/5 pl-4 "
                key={index}
              >
                <PhotoComponent photo={photo} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          display: flex;
          white-space: nowrap;
          animation: scroll 60s linear infinite;
        }
        .paused .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
