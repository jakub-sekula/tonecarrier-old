"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faq = [
  { question: "How is this different from other film carriers?", answer: "" },
  { question: "What is the shortest strip I can scan?", answer: "" },
  { question: "Will this scratch my film?", answer: "" },
  { question: "What is the maximum frame size I can scan?", answer: "" },
  { question: "What film formats does it support?", answer: "" },
  { question: "What countries do you ship to?", answer: "" },
  { question: "How does camera scanning work?", answer: "" },
  { question: "I see this is 3D printed, can I print it myself?", answer: "" },
  { question: "What light source should I use with this?", answer: "" },
  { question: "What else do I need to start camera scanning?", answer: "" },
  {
    question: "Is the quality of camera scans better than a flatbed scanner?",
    answer: "",
  },
];

export default function Faq() {
  return (
    <section className="relative" id="faq">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:mb-20 md:py-20">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
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
