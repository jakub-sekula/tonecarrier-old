"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faq = [
  { question: "How is this different from other film carriers?", answer: "The toneCarrier uses a unique push-pull mechanism for transporting film, meaning you can scan even short strips of four 35 mm frames. It also features a film-safe path which ensures zero emulsion contact with any part of the holder at any point." },
  { question: "What is the shortest strip I can scan?", answer: "The shortest strip scannable with the toneCarrier is 4 standard 35 mm frames long." },
  { question: "Will this scratch my film?", answer: "Nope! The film channel and accessories are designed with film safety in mind and your images will never touch any part of the holder as they travel through it. The only part of the film that is in contact with the mechanism are sprocket holes and the edges." },
  { question: "What is the maximum frame size I can scan?", answer: "The 35 mm version supports up to X-Pan sized negatives, while the 120 version can scan up to 6x7 frames." },
  { question: "What film formats does it support?", answer: "Currently 35 mm and 120 film is supported. We are working on expanding the range to also include 110, 127, and APS film in the future." },
  { question: "What countries do you ship to?", answer: "We can ship to most countries of the world using the Royal Mail International service." },
  { question: "I see this is 3D printed, can I print it myself?", answer: "Yes! If you would like to 3D print and assemble the toneCarrier yourself, you can purchase STL and 3MF files in our Etsy store. The download contains a full list of required hardware, which is also available to purchase in our store as a kit if you'd like to avoid bulk buying components." },
  { question: "What light source should I use with this?", answer: "Any light source that has a high Color Reproduction Index (CRI) will work well for scanning. If you are just beginning, even your smartphone will do just fine! When you are ready to upgrade, we recommend lights such as the Cinestill CS-Lite or Kaiser Plano light table." },
  { question: "What else do I need to start camera scanning?", answer: "You will need a DSLR or mirrorless camera, a tripod, and a macro lens. If you plan to scan a lot, a copy stand is also a worthwhile investment as it will allow you to keep the entire scanning setup more self-contained and always ready to go." },
  {
    question: "Is the quality of camera scans better than a flatbed scanner?",
    answer: "Yes! Scanning film with a digital camera with a proper macro lens allows you to extract much more resolution from a negative than is possible with the typical flatbed scanner. You will also be able to enjoy much greater dynamic range and quicker scanning times.",
  },
];

export default function Faq() {
  return (
    <section className="relative" id="faq">
      <div className="max-w-6xl mx-auto px-6 py-12 md:mb-20 md:py-20">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center pb-8 md:pb-16">
          <h2 className="h2 mb-4">Frequently asked questions</h2>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-2xl mx-auto"
        >
          {faq.map((question) => (
            <AccordionItem key={question.question} value={question.question}>
              <AccordionTrigger className="text-left">
                {question.question}
              </AccordionTrigger>
              <AccordionContent>{question.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
