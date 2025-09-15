"use client";

import Section from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

const products = [
  {
    id: 1,
    image: "https://i.ibb.co/d4bbbKpr/Screenshot-2025-03-27-at-4-16-48-PM.png",
    alt: "White label dashboard platform",
    title: "AI Voice Agents Admin Dashboard",
    description: "A comprehensive solution to track and analyze how your AI voice agents performs. Set up your own AI voice agents to qualify leads, book appointments, and more.",
    titleSize: "text-xl"
  },
  {
    id: 2,
    image: "/profile-header.png",
    alt: "All in one AI SaaS platform for online entrepreneurs",
    title: "AI SaaS app for online entrepreneurs",
    description: "A complete All-in-one AI SaaS platform for online entrepreneurs to manage sales booking requests, services and insights to manage their operations to focus on what really matters - growing their business.",
    titleSize: "text-xl"
  },
  {
    id: 3,
    image: "/profile-cv.png",
    alt: "All in one AI SaaS platform for online entrepreneurs",
    title: "Personality based AI resume builder for job seekers",
    description: "An AI resume builder for job seekers that helps them build a resume that is tailored to their personality type [Big Five Personality Traits] and skills to land the job they are really making a full fit for.",
    titleSize: "text-xl"
  },
  {
    id: 4,
    image: "/ai-engine.png",
    alt: "All in one AI SaaS platform for online entrepreneurs",
    title: "AI Vision test for injury prevention in sports",
    description: "We turn any phone into a clinical sensor, unlocking preventive and post-traumatic care for everyone.",
    titleSize: "text-xl"
  },
  {
    id: 5,
    image: "/ai-engine.png",
    alt: "All in one AI SaaS platform for online entrepreneurs",
    title: "AI Vision test for injury prevention in sports",
    description: "We turn any phone into a clinical sensor, unlocking preventive and post-traumatic care for everyone.",
    titleSize: "text-xl"
  },
  {
    id: 6,
    image: "/ai-engine.png",
    alt: "All in one AI SaaS platform for online entrepreneurs",
    title: "AI Vision test for injury prevention in sports",
    description: "We turn any phone into a clinical sensor, unlocking preventive and post-traumatic care for everyone.",
    titleSize: "text-xl"
  }
];

const OurProducts = () => {
  return (
    <Section
      id="our-products"
      title="Our Products"
      subtitle="Innovative Solutions for Your SaaS Business"
      description="Explore our suite of powerful tools designed to accelerate your AI SaaS development and growth."
    >
      <div className="flex flex-wrap justify-start gap-8 mt-10 px-4">
        {products.map((product) => (
          <div key={product.id} className="w-full max-w-sm overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl hover:shadow-2xl hover:scale-105 hover:bg-white/20 hover:border-white/40 transition-all duration-300 ease-in-out p-4 group cursor-pointer">
            <div className="relative w-full h-64 mb-4 overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.alt}
                fill
                className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-300 ease-in-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
            </div>
            <div className="p-4">
              <h4 className={`mb-3 ${product.titleSize} font-bold text-white group-hover:text-white/90 transition-colors duration-300`}>
                {product.title}
              </h4>
              <p className="text-white/80 mb-6 group-hover:text-white/90 transition-colors duration-300">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default OurProducts; 