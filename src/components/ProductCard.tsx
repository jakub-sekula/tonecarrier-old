import Image from "next/image";
import React from "react";
import BuyOnEtsyButton from "./BuyOnEtsyButton";
import { CheckCircle2 } from "lucide-react";

interface ProductProps {
  name: string;
  images: string | string[];
  price: number;
  link: string;
  tag?: string;
  features?: string[];
}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function ProductCard({
  product,
  ...props
}: {
  product: ProductProps;
}) {
  return (
    <article
      {...props}
      className="flex flex-col bg-white text-neutral-900 p-3 rounded overflow-hidden group w-full md:w-fit shadow-lg md:hover:shadow-xl  transition-all duration-300 cursor-pointer md:hover:bg-neutral-50"
    >
      <div className="w-full md:w-64 aspect-square mb-3 rounded border border-neutral-100 relative overflow-hidden">
        {typeof product.images === "string" ? (
          <Image
            src={product.images}
            width={400}
            height={400}
            alt={product.name}
            className="absolute inset-0 md:group-hover:scale-110 transition-all duration-200 ease-in-out md:group-hover:opacity-80"
          />
        ) : (
          <Carousel
            opts={{
              loop: true,
            }}
            className="absolute inset-0 md:group-hover:scale-110 transition-all duration-200 ease-in-out md:group-hover:opacity-80"
          >
            <CarouselNext className="bg-red-500 z-50" />
            <CarouselPrevious className="bg-red-500 z-50" />

            <CarouselContent className="-ml-4">
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={image}
                    width={400}
                    height={400}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
      <div className="px-2 pb-2">
        <h4 className="h4">{product.name}</h4>
        <span className="mb-4 inline-flex items-baseline gap-1">
          £ {product.price}{" "}
          <span className="text-xs text-neutral-500">+ local taxes</span>
        </span>

        {product.features?.length ? (
          <ul className="mb-6 flex flex-col gap-2">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="inline-flex gap-2 text-sm text-neutral-600 items-center"
              >
                <CheckCircle2 className="size-5 stroke-orange-500" />
                {feature}
              </li>
            ))}
          </ul>
        ) : null}

        <BuyOnEtsyButton href={product.link} className="w-full md:w-auto" />
      </div>
    </article>
  );
}
