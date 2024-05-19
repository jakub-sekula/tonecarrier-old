"use client";

import {
  useState,
  useRef,
  useEffect,
  ReactNode,
  ButtonHTMLAttributes,
} from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import FeaturesBg from "@public/images/features-bg.png";
import FeaturesElement from "@public/images/features-element.png";
import { twMerge } from "tailwind-merge";

export default function Features() {
  const [tab, setTab] = useState<number>(1);

  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <section className="relative pb-12 md:pb-20" id="features">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none mb-16"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 mb-4">Scanning made easy</h2>
            <p className="text-lg md:text-xl text-gray-600">
              Digitizing your photos does not have to be a chore.{" "}
              <br className="hidden md:block" />
              The toneCarrier makes it painless, so you can focus on your
              photography.
            </p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6"
              data-aos="fade-right"
            >
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <TabButton
                  title="Push-pull film transport system"
                  description="Film is grabbed from both sides for a more precise motion. It also
                  means you can scan strips as short as 4 frames long."
                  active={tab === 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                />
                <TabButton
                  title="Large, easy to grip knobs"
                  description="No need to touch the film and risk leaving fingerprints on
                  your images. Simply feed it from one end and use the knobs
                  to advance frames."
                  active={tab === 2}
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                />
                <TabButton
                  title="Use with any light source - even your phone"
                  description="If you're just starting, you can use your phone as a backlight. There is also an adapter available for the Cinestill CS-Lite."
                  active={tab === 4}
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(4);
                  }}
                />
                <TabButton
                  title="Film-safe by default"
                  description="Your images never touch any part of the carrier, making scratching the film impossible. The only point of contact is at the edge with soft silicone rollers."
                  active={tab === 5}
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(5);
                  }}
                />
              </div>
            </div>

            {/* Tabs items */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
              <div className="transition-all">
                <div
                  className="relative flex flex-col text-center lg:text-right"
                  data-aos="zoom-y-out"
                  ref={tabs}
                >
                  {/* Item 1 */}
                  <Transition
                    show={tab === 1}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={true}
                  >
                    <div className="relative inline-flex flex-col aspect-square md:aspect-[5/4] rounded shadow-sm overflow-hidden">
                      <video
                        // ref={firstVideoRef}
                        className="md:max-w-none w-full h-full mx-auto object-cover"
                        src={"/videos/push-pull.mp4#t=0.5"}
                        preload="metadata"
                        autoPlay
                        playsInline
                        muted
                        loop
                      />
                    </div>
                  </Transition>
                  {/* Item 2 */}
                  <Transition
                    show={tab === 2}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={true}
                  >
                    <div className="relative inline-flex flex-col aspect-square md:aspect-[5/4] rounded shadow-sm overflow-hidden">
                      <video
                        className="md:max-w-none w-full h-full mx-auto object-cover"
                        src={"/videos/knob-turn.mp4#t=0.5"}
                        preload="metadata"
                        autoPlay
                        muted
                        playsInline
                        loop
                      />
                    </div>
                  </Transition>
                  {/* Item 4 */}
                  <Transition
                    show={tab === 4}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={true}
                  >
                    <div className="relative inline-flex flex-col aspect-square md:aspect-[5/4] rounded shadow-sm overflow-hidden">
                      <video
                        className="md:max-w-none w-full h-full mx-auto object-cover"
                        src={"/videos/phone-adapter-2.mp4#t=0.5"}
                        preload="metadata"
                        autoPlay
                        playsInline
                        muted
                        loop
                      />
                    </div>
                  </Transition>
                  {/* Item 5 */}
                  <Transition
                    show={tab === 5}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col aspect-square md:aspect-[5/4] rounded shadow-sm overflow-hidden">
                      <Image
                        priority
                        className="md:max-w-none w-full h-full mx-auto object-cover"
                        src={"/images/roller-section.png"}
                        width={500}
                        height="462"
                        alt="Features bg"
                      />
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TabContent({ tab, ...props }: { tab: number }) {
  return (
    <Transition
      {...props}
      show={tab === 5}
      appear={true}
      className="w-full"
      enter="transition ease-in-out duration-700 transform order-first"
      enterFrom="opacity-0 translate-y-16"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in-out duration-300 transform absolute"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-16"
      unmount={false}
    >
      <div className="relative inline-flex flex-col aspect-square md:aspect-[5/4] rounded shadow-sm overflow-hidden">
        <Image
          priority
          className="md:max-w-none w-full h-full mx-auto object-cover"
          src={"/images/roller-section.png"}
          width={500}
          height="462"
          alt="Features bg"
        />
      </div>
    </Transition>
  );
}

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  title?: string;
  description?: string;
  icon?: ReactNode;
  active: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({
  title,
  description,
  icon,
  className,
  active,
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(
        `gtm-feature-button w-full justify-between flex text-left items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3`,
        !active
          ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
          : "bg-gray-200 border-transparent",
        className
      )}
    >
      <div>
        <div className="text-sm md:text-base font-bold leading-snug tracking-tight mb-1">
          {title}
        </div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
      {icon ? (
        <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
          {icon}
        </div>
      ) : null}
    </button>
  );
};
