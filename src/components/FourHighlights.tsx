import { Film, Handshake, Package, ShieldCheck } from "lucide-react";
import React from "react";

const highlights = [
  {
    title: "Quick and secure delivery",
    desciription:
      "All in stock items are shipped the next working day with fully insured Royal Mail services",
    icon: <Package className="size-6 stroke-orange-500" />,
  },
  {
    title: "30 day returns",
    desciription:
      "If you aren't fully satisfied, we accept returns up to 30 days after receipt.",
    icon: <ShieldCheck className="size-6 stroke-orange-500" />,
  },
  {
    title: "Sprocket hole scanning",
    desciription:
      "The 35 mm carrier exposes the sprocket holes by default, allowing nearly full width scans.",
    icon: <Film className="size-6 stroke-orange-500" />,
  },
  {
    title: "Excellent customer service",
    desciription:
      "We are always happy to answer questions and even help customize the toneCarrier to your specific workflow needs.",
    icon: <Handshake className="size-6 stroke-orange-500" />,
  },
];

export default function FourHighlights() {
  return (
    <section className="relative flex justify-center bg-neutral-50">
      <div className="w-full max-w-6xl grid md:grid-cols-2 lg:grid-cols-4 my-6 md:my-0 lg:py-12">
        {highlights.map((highlight, index) => (
          <div
            data-aos="zoom-y-out"
            data-aos-delay={index * 200}
            key={highlight.title}
            className="w-full h-full flex flex-col gap-4 px-6 border-b last:border-b-0 md:border-none p-6"
          >
            <i className="size-10 flex items-center justify-center bg-orange-100 rounded">
              {highlight.icon}
            </i>
            <h3 className="text-lg font-semibold relative before:absolute before:left-0 before:h-1/2 flex items-center before:w-0.5 before:bg-orange-500 pl-3">
              {highlight.title}
            </h3>
            <p className="ml-3 font-light">{highlight.desciription}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
