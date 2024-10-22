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


export default function Home() {
  useEffect(()=>{
    window.location.replace("https://tonephotographic.com")
  }, [])


  return (
    <>
    </>
  );
}
