import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

export interface Feature {
  title: string;
  image?: string;
  video?: string;
  description: string | React.ReactNode;
}

export default function FeatureBlocks({ features }: { features: Feature[] }) {
  return (
    <section id="feature-blocks" className="relative flex flex-col items-center justify-center py-12 gap-12 md:py-24 md:gap-24">
      {/* <h2 className="h1 mb-4">Key features</h2> */}
      <div className="flex flex-col gap-16 md:gap-24 lg:gap-36">
        {features.map((feature, index) => (
          <FeatureBlock
            key={feature.title}
            feature={feature}
            reverse={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
}

function FeatureBlock({
  feature,
  reverse,
}: {
  feature: Feature;
  reverse?: boolean;
}) {
  return (
    <div
      data-aos="zoom-y-out"
      className={twMerge(
        "flex w-full md:flex-row flex-col-reverse max-w-7xl justify-between md:gap-12 gap-6",
        reverse ? "md:flex-row-reverse" : null
      )}
    >
      <div
        className={twMerge(
          "w-full flex flex-col gap-6 px-6 xl:px-0 md:pt-12",
          // reverse ? "md:pl-6" : "md:pr-6"
        )}
      >
        <h3 className="h3 lg:text-4xl font-bold capitalize">
          {feature.title}
        </h3>
        <div className="w-24 h-[2px] bg-neutral-200 rounded-full hidden md:block" />
        {typeof feature.description === "string" ? (
          <p className="text-lg whitespace-pre-line leading-relaxed">{feature.description}</p>
        ) : (
          feature.description
        )}
      </div>
      {feature.image && !feature.video ? (
        <Image
          width={1500}
          height={1500}
          src={feature.image}
          className="md:aspect-[1.75] md:w-1/2 lg:w-3/5 aspect-[5/4] w-full h-full grow-0 object-cover md:rounded md:shadow-2xl"
          alt={feature.title}
        />
      ) : null}
    </div>
  );
}
