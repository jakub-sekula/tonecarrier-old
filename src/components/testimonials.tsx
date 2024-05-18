"use client";
import Image from "next/image";
import TestimonialImage from "@public/images/testimonial.jpg";
import { ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    date: "Feb 15, 2024",
    author: "Ryan T.",
    stars: 5,
    content:
      "Great quality and well designed item! Definitely exceeded my expectations. Communication was excellent, and item arrived quickly and well packaged. Would purchase again",
    productImage: "/images/135-ready-to-use.jpg",
    productName: "toneCarrier 35 mm",
    productLink: "https://www.etsy.com/uk/listing/1592266480/tonecarrier-35-mm-film-holder-for-dslr",
  },
  {
    date: "Apr 5, 2024",
    author: "Vincent H.",
    stars: 5,
    content:
      "I loved the 35mm version and had a really great customer experience so I also decided to get the 120mm version of the carrier and later on also got the film catch trays! All the parts were easy to print and came out flawless!",
    productImage: "/images/135-diy.jpg",
    reviewImage: "/images/reviews/vincent.jpg",
    productName: "toneCarrier 35 mm (DIY version)",
    productLink: "https://www.etsy.com/uk/listing/1155028597/tonecarrier-35-mm-film-holder-for-dslr",
  },
  {
    date: "Mar 31, 2024",
    author: "Andrew",
    stars: 5,
    content:
      "These carriers are heavy, dense, and incredibly stiff. A deep s-curve helps keep the film very flat. At f/11 a whole 6x6cm frame was in focus. This combined with a throughtful design makes this a 10/10 product.",
    productImage: "/images/135-ready-to-use.jpg",
    reviewImage: "/images/reviews/andrew.jpg",
    productName: "toneCarrier 35 mm",
    productLink: "https://www.etsy.com/uk/listing/1592266480/tonecarrier-35-mm-film-holder-for-dslr",
  },
  {
    date: "Feb 15, 2024",
    author: "Roman R.",
    stars: 5,
    content:
      "Beautifully constructed and thought out. Seller was kind, helpful and threw in extra accessories for me to use! Sellers like this are why I am grateful etsy exists.",
    productImage: "/images/135-ready-to-use.jpg",
    productName: "toneCarrier 35 mm",
    productLink: "https://www.etsy.com/uk/listing/1592266480/tonecarrier-35-mm-film-holder-for-dslr",
  },
  {
    date: "Mar 17, 2024",
    author: "Mike D.",
    stars: 5,
    content: "Great design and easily printed/ assembled.",
    productImage: "/images/120-diy.jpg",
    reviewImage: "/images/reviews/mike.jpg",
    productName: "toneCarrier 120 (DIY version)",
    productLink: "https://www.etsy.com/uk/listing/1595409438/tonecarrier-120-film-holder-for-dslr",
  },
];

export default function Testimonials() {
  return (
    <section className="relative" id="reviews">
      {/* Illustration behind content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -mb-32"
        aria-hidden="true"
      >
        <svg
          width="1760"
          height="518"
          viewBox="0 0 1760 518"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-02"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g
            transform="translate(0 -3)"
            fill="url(#illustration-02)"
            fillRule="evenodd"
          >
            <circle cx="1630" cy="128" r="128" />
            <circle cx="178" cy="481" r="40" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 mb-4">Customer stories</h2>
            <p className="text-lg md:text-xl text-gray-600" data-aos="zoom-y-out">
              All reviews are from verified buyers in our Etsy store.
            </p>
          </div>

          <Carousel
            plugins={[
              Autoplay({
                delay: 7500,
              }),
            ]}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto flex items-center h-fit"
            data-aos="zoom-y-out"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.author}>
                  <div
                    className="max-w-4xl mx-auto flex flex-col md:flex-row-reverse border border-gray-200 rounded bg-white shadow-sm overflow-hidden"
                   
                  >
                    {/* Testimonial */}
                    <div className="px-6 md:px-12 py-6 md:py-8 md:mx-0 flex flex-col items-start w-full">
                      <div className="flex items-center mb-4 md:mb-6 w-full">
                        {Array(testimonial.stars)
                          .fill(1)
                          .map((_, index) => (
                            <Star
                              key={index}
                              className="fill-amber-500 stroke-none size-6 md:size-8"
                            />
                          ))}
                        <span className="text-sm md:text-base ml-auto text-gray-400">
                          {testimonial.date}
                        </span>
                      </div>

                      <blockquote className="md:text-lg mb-auto">
                        {testimonial.content}
                        <span className="md:block text-sm text-gray-500 mt-2 hidden font-light">
                          Product:{" "}
                          <Link
                            href={testimonial.productLink}
                            className="hover:underline"
                          >
                            {testimonial.productName}
                          </Link>
                        </span>
                      </blockquote>
                      <div className="flex gap-2 md:items-center mt-6 justify-between w-full md:flex-row flex-col">
                        <cite className="block md:text-lg not-italic">
                          Reviewed by{" "}
                          <span className="font-bold ">
                            {testimonial.author}
                          </span>
                        </cite>
                        <div className="text-gray-600 flex gap-1 items-center text-sm">
                          <ShieldCheck className="size-4" /> Verified Etsy
                          purchase
                        </div>
                      </div>
                    </div>
                    <div className="bg-red- w-full md:w-auto md:grow-0 flex gap-4 size-24 border-t md:h-auto md:max-h-80 md:aspect-square md:shrink-0 p-6 h-full items-center md:p-0">
                      <Link
                        href={testimonial.productLink}
                        className="aspect-square overflow-hidden shrink-0 rounded shadow-sm md:shadow-none md:rounded-none size-16 md:size-fit"
                      >
                        <Image
                          className="object-cover w-full h-full"
                          src={
                            testimonial?.reviewImage || testimonial.productImage
                          }
                          alt={testimonial.productName}
                          width={500}
                          height={500}
                        />
                      </Link>
                      <Link
                        href={testimonial.productLink}
                        className="flex flex-col md:hidden w-full"
                      >
                        <span className="text-xs text-gray-600">PRODUCT</span>
                        <span className="font-semibold text-lg">
                          {testimonial.productName}
                        </span>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

        </div>
      </div>
    </section>
  );
}
