"use client";

import Section from "@/components/section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "AI SaaS Platform Development",
    description:
      "Complete AI-powered SaaS platforms with intelligent features, automated workflows, and scalable architecture designed for rapid growth and market success.",
    image: "/service.png",
  },
  {
    title: "SaaS Business Strategy & Launch",
    description:
      "End-to-end SaaS business development from concept validation to market launch, including AI integration, user onboarding, and growth optimization.",
    image: "/profile-header.png",
  },
  {
    title: "AI-Powered SaaS Features",
    description:
      "Intelligent SaaS features that differentiate your product: AI automation, predictive analytics, smart recommendations, and automated user experiences.",
    image: "/profile.png",
  },
  {
    title: "Custom AI for your business",
    description:
      "Aibaze builds your next AI SaaS business from concept to launch. We empower startups to succeed faster with custom AI-powered software solutions.",
    image: "/ai-copilot.png",
  },
];

export default function Component() {
  return (
    <Section
      title="Solution"
      subtitle="Transform Your Vision Into Powerful AI Products"
      description="Launch your MVP in weeks, not months, with our proven development process."
      className="bg-neutral-100 text-black"
    >
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="group relative overflow-hidden bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-xl text-primary">
                {feature.title}
              </h3>
              <p className="text-foreground leading-relaxed">{feature.description}</p>
            </div>
            
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
