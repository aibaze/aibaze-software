"use client";

import Section from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

const OurProducts = () => {
  return (
    <Section
      id="our-products"
      title="Our Products"
      subtitle="Innovative Solutions for Your Business"
      description="Explore our suite of powerful tools designed to enhance your AI-powered services."
    >
      <div className="flex flex-wrap justify-start gap-8 mt-10 px-4">
        <div className="w-full max-w-md overflow-hidden bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4">
          <div className="relative w-full h-64 mb-4">
            <img
              src="https://i.ibb.co/d4bbbKpr/Screenshot-2025-03-27-at-4-16-48-PM.png"
              alt="White label dashboard platform"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="p-4">
            <h4 className="mb-3 text-xl font-bold text-white">
              White Label Dashboard Platform
            </h4>
            <p className="text-primary mb-6">
              A comprehensive solution to track and analyze how your AI agents perform. Get detailed insights into user interactions, response quality, and overall performance metrics to continuously optimize your AI-powered services.
            </p>
            <Link
              href={siteConfig.saasLink}
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full text-center"
              )}
            >
              Visit Dashboard
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default OurProducts; 