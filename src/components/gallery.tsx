"use client";
import clsx from "clsx";
import {
  Camera,
  Download,
  Film,
  MousePointerClick,
  SunMedium,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
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
  original?: string;
  camera?: string;
  film?: string;
  light?: string;
};

const initialPhotos: Photo[] = [
  {
    name: "Photo 9",
    image: "/images/samples/9.jpg",
    original: "/images/samples/9a.jpg",
    camera: "Fujifilm X-T5",
    film: "Kodak Colorplus 200",
    light: "Cinestill CS-Lite",
  },
  {
    name: "Photo 10",
    image: "/images/samples/10.jpg",
    original: "/images/samples/10a.jpg",
    camera: "Fujifilm X-T5",
    film: "Kodak Colorplus 200",
    light: "Cinestill CS-Lite",
  },
  {
    name: "Photo 11",
    image: "/images/samples/11.jpg",
    original: "/images/samples/11a.jpg",
    camera: "Fujifilm X-T5",
    film: "ORWO NC500",
    light: "Cinestill CS-Lite",
  },
  {
    name: "Photo 12",
    image: "/images/samples/12.jpg",
    original: "/images/samples/12a.jpg",
    camera: "Canon 70D",
    film: "Kodak Gold 200",
    light: "iPad Air 2",
  },
  {
    name: "Photo 13",
    image: "/images/samples/13.jpg",
    original: "/images/samples/13a.jpg",
    camera: "Canon 70D",
    film: "Kodak Gold 200",
    light: "iPad Air 2",
  },
  {
    name: "Photo 14",
    image: "/images/samples/14.jpg",
    original: "/images/samples/14a.jpg",
    camera: "Canon 70D",
    film: "Kodak Gold 200",
    light: "iPad Air 2",
  },
  {
    name: "Photo 15",
    image: "/images/samples/15.jpg",
    original: "/images/samples/15a.jpg",
    camera: "Canon 70D",
    film: "Kodak Gold 200",
    light: "iPad Air 2",
  },
  {
    name: "Photo 16",
    image: "/images/samples/16.jpg",
    original: "/images/samples/16a.jpg",
    camera: "Canon 70D",
    film: "Kodak Gold 200",
    light: "iPad Air 2",
  },
  {
    name: "Photo 17",
    image: "/images/samples/17.jpg",
    original: "/images/samples/17a.jpg",
    camera: "Canon 70D",
    film: "Kodak Gold 200",
    light: "iPad Air 2",
  },
];


function PhotoComponent({ photo }: { photo: Photo }) {
  const [invert, setInvert] = useState(false);
  return (
    <div
      onClick={() => setInvert((prev) => !prev)}
      className={clsx(
        "group md:hover:shadow-xl transition-all duration-200",
         "w-full shrink-0 md:h-full rounded overflow-hidden group relative  md:aspect-[3/2] border md:border-none",
         "gtm-sample-photo"
      )}
    >
      <div className="md:group-hover:opacity-100 bg-black/20 border border-white/20 shadow-xl backdrop-blur-md z-50 ransition-all duration-200 absolute  top-4 left-4 opacity-0 text-white px-3 py-2 rounded flex flex-col gap-0 text-sm">
        <div className="flex items-center gap-2">
          <Camera className="size-4" />
          <span>Camera: {photo.camera}</span>
        </div>
        {photo.film ? (
          <div className="flex items-center gap-2">
            <Film className="size-4" />
            <span>Film: {photo.film}</span>
          </div>
        ) : null}

        <div className="flex items-center gap-2">
          <SunMedium className="size-4" />
          <span>Light: {photo.light}</span>
        </div>
      </div>
      <Image
        width={400}
        height={267}
        src={!invert ? photo.image : photo?.original || photo.image}
        alt={photo.name}
        className="w-full md:h-full object-cover md:group-hover:scale-[102.5%] transition-all duration-300"
      />
      <div className="p-6 flex flex-col gap-2 md:hidden">
        <div className="flex items-center gap-2">
          <Camera className="size-5" />
          <span>Camera: {photo.camera}</span>
        </div>
        {photo.film ? (
          <div className="flex items-center gap-2">
            <Film className="size-5" />
            <span>Film: {photo.film}</span>
          </div>
        ) : null}

        <div className="flex items-center gap-2">
          <SunMedium className="size-5" />
          <span>Light: {photo.light}</span>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section className="relative mt-24" id="samples">
      {/* <div className="bg-gray-900 absolute left-0 right-0 top-0 h-[30rem]" /> */}
      <div
        className="relative max-w-6xl mx-auto px-4 sm:px-6 "
        data-aos="zoom-y-out"
      >
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center pb-8 md:pb-16 flex flex-col gap-4">
          <h2 className="h2">Sample scans</h2>
          <p className="text-lg md:text-xl text-gray-600">
            Download a few of our example files in RAW (DNG) format.
          </p>
          <div
            className="mx-auto sm:max-w-none sm:flex sm:justify-center"
            data-aos="zoom-y-out"
            data-aos-delay="600"
          >
            <a
              href="https://mega.nz/file/6XoH3QBD#c8nWI30F2vgC28vI4fEsG7vpXjj8RMaz6NFHLLFYd6U"
              target="_blank"
              className="gtm-sample-download w-full px-4 py-2 rounded border-gray-900 border hover:bg-gray-900/20 text-gray-900 flex justify-center items-center gap-2 mt-8"
            >
              <Download className="size-4" />
              Download ZIP (145 MB)
            </a>
          </div>
          <div data-aos="zoom-y-out"
            data-aos-delay="300" className=" mt-8 w-full md:w-auto flex flex-col md:flex-row bg-gray-100 border border-gray-200 p-4 rounded shadow-sm text-gray-600 mx-auto gap-1 items-center ">
            <span className="inline-flex gap-1 font-bold items-center">
            <MousePointerClick className="size-6" /><span className="hidden md:inline">Click</span><span className="md:hidden">Tap</span>
            </span>{" "}
            any image to view the original negative.
          </div>
        </div>
      </div>
      <div className="w-full px-4 md:p-0">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3500,
              stopOnInteraction: false
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
                className="md:basis-1/2 lg:basis-1/3 2xl:basis-1/5 pl-4 "
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
