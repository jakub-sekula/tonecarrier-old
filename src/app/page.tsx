'use client'


import AOS from 'aos'
import 'aos/dist/aos.css'

import Hero from "@/components/hero";
import Features from "@/components/features";
import FeaturesBlocks from "@/components/features-blocks";
import Testimonials from "@/components/testimonials";
import Newsletter from "@/components/newsletter";
import Faq from "@/components/faq";
import Gallery from "@/components/gallery";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
  })
  
  return (
    <>
      <main className="grow">
        <Hero />
        {/* <FeaturesBlocks /> */}
        <Gallery />
        {/* <Features /> */}
        <Testimonials />
        {/* <Newsletter /> */}
        {/* <Faq /> */}
      </main>
    </>
  );
}
