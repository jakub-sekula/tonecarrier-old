import React from "react";
import EtsyLogo from "./icons/EtsyLogo";
import BuyOnEtsyButton from "./BuyOnEtsyButton";
import ProductCard from "./ProductCard";
import Image from "next/image";

const products = [
  {
    name: "toneCarrier 35 mm",
    image: "images/products/35.jpg",
    price: 109.99,
    link: "#",
    features: [
      "Sprocket hole scanning",
      "Supports all 35 mm formats",
      "Smooth film motion",
    ],
  },
  {
    name: "toneCarrier 120",
    image: "images/products/120.jpg",
    price: 119.99,
    link: "#",
    features: [
      "Frame mask included",
      "Supports up to 6x7 frames",
      "Rigid, durable construction",
    ],
  },
];

export default function StartScanning() {
  return (
    <section
      className="relative flex flex-col items-center w-full bg-neutral-50 py-12 md:py-24"
      id="start-scanning"
    >
      {/* <Image
          src="images/features/family-wide.jpg"
          className="w-3/5"
          width={500}
          height={500}
          alt=""
        /> */}
      <div className="max-w-6xl w-full mx-auto flex flex-col px-6 md:px-0 gap-10 md:gap-16">
        <div className="flex flex-col gap-6 text-center">
          <h3 className="h2">Are you ready to start scanning?</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6 w-full md:w-fit mx-auto">
          {products.map((product, index) => (
            <ProductCard
              key={product.link}
              product={product}
              data-aos="zoom-y-out"
              data-aos-delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
