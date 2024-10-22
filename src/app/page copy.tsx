"use client";

import AOS from "aos";
import "aos/dist/aos.css";

import Hero from "@/components/hero";
import Features from "@/components/features";
import FeaturesBlocks from "@/components/features-blocks";
import Testimonials from "@/components/testimonials";
import Newsletter from "@/components/newsletter";
import Faq from "@/components/faq";
import Gallery from "@/components/gallery";
import StartScanning from "@/components/startScanning";
import { useEffect } from "react";
import FeatureBlocks, { Feature } from "@/components/FeatureBlocks";
import FourHighlights from "@/components/FourHighlights";

const features: Feature[] = [
  {
    title: "Sprocket holes included",
    image: "images/features/35-frame.jpg",
    description: (
      <>
        <p className="leading-relaxed">
          The toneCarrier 35 mm exposes sprocket holes by default, so you can
          always get the full picture.
        </p>
        {/* <p className="leading-relaxed">
          The middle section allows <strong>full border scanning</strong>,
          letting you keep track of your film stocks and frame numbers
          effortlessly.
        </p> */}
        <p className="leading-relaxed">
          And if you want to hide the holes and remove backlight bleed, use one
          of the included frame masks in full frame, half frame and X-Pan
          formats.
        </p>
      </>
    ),
  },
  {
    title: "Works with popular 120 film formats",
    image: "images/features/120-frame.jpg",
    description: (
      <>
        <p className="leading-relaxed">
          The 120 version of the toneCarrier supports all common medium format
          frame sizes: <strong>6x4.5, 6x6 and 6x7</strong>.
        </p>
        <p className="leading-relaxed">Enoy the versatility and scan all formats with one device.</p>
      </>
    ),
  },
  {
    title: "Fast global shipping",
    image: "images/features/shipping.jpg",
    description: (
      <>
        <p className="leading-relaxed">
          All orders are shipped within 2 working days using fully insured Royal
          Mail tracked postage.
        </p>
        <p className="leading-relaxed">Global delivery to any country within 7 working days on average.</p>
      </>
    ),
  },
  // {
  //   title: "Keeps your film safe",
  //   image: "images/features/catch-tray.jpg",
  //   description: "hello world",
  // },
  // {
  //   title: "Effortless, perfectly flat scans",
  //   image: "images/features/catch-tray.jpg",
  //   description: "This is the shit for real FOR REAL",
  // },
 
  {
    title: "Dual roller drive mechanism",
    image: "images/features/rollers-wide.png",
    description: (
      <>
        <p className="leading-relaxed">
          Belt driven dual rollers grab the film securely on both sides in a
          push-pull configuration
        </p>
        <p className="leading-relaxed">
          Thanks to this, you can scan strips as short as 4 standard 35 mm
          frames long.
        </p>
        <p className="leading-relaxed">
          Your images always stay safe, because the soft rubber rollers only
          ever contact the edges of the film.
        </p>
      </>
    ),
  },
  {
    title: "3D print your own toneCarrier system",
    image: "images/features/print-volume-wide.jpg",
    description: (
      <>
        <p className="leading-relaxed">
          Up for a DIY project? 3D printing files for all toneCarrier
          holders and accessories are available for sale.
        </p>
        <p className="leading-relaxed">
          All parts thoroughly tested and easy to print even on small printers
          like <strong>Bambu Lab A1 mini and Prusa Mini</strong>.
        </p>
        <p className="leading-relaxed">Bill of materials and illustrated assembly manual included.</p>
        <a
          className="btn text-white bg-orange-500 hover:bg-orange-600 w-full md:w-fit whitespace-nowrap sm:mb-0 flex items-center justify-center gap-1"
          href="https://www.etsy.com/uk/listing/1155028597/tonecarrier-35-mm-film-holder-for-dslr"
        >
          Get 3D print files
        </a>
      </>
    ),
  },
  // {
  //   title: "Cut all stray reflections",
  //   image: "images/features/chimney.jpg",
  //   description: "hello world",
  // },
  // {
  //   title: "Use with any light source",
  //   image: "images/features/phone-adapter.jpg",
  //   description: "hello world",
  // },
  // {
  //   title: "Accessories for even better scans",
  //   image: "images/features/family-square.jpg",
  //   description: "hello world",
  // },
];

export default function Home() {
  useEffect(()=>{
    window.location.replace("https://tonephotographic.com")
  }, [])


  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  return (
    <>
      <main className="grow">
        <Hero />
        <FourHighlights />
        {/* <FeaturesBlocks /> */}
        <FeatureBlocks features={features} />
        <Features />
        <Gallery />
        <Testimonials />
        <StartScanning />
        <Faq />
        {/* <Newsletter /> */}
      </main>
    </>
  );
}
