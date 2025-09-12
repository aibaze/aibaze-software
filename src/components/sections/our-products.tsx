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
      subtitle="Innovative Solutions for Your SaaS Business"
      description="Explore our suite of powerful tools designed to accelerate your AI SaaS development and growth."
    >
      <div className="flex flex-wrap justify-start gap-8 mt-10 px-4">
        <div className="w-full max-w-sm overflow-hidden bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4">
          <div className="relative w-full h-64 mb-4">
            <img
              src="https://i.ibb.co/d4bbbKpr/Screenshot-2025-03-27-at-4-16-48-PM.png"
              alt="White label dashboard platform"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="p-4">
            <h4 className="mb-3 text-xl font-bold text-white">
              AI Voice Agents Platform
            </h4>
            <p className="text-primary mb-6">
              A comprehensive solution to track and analyze how your AI voice agents  performs. Set up your own AI voice agents to qualify leads, book appointments, and more.
            </p>
          
          </div>
        </div>


        <div className="w-full max-w-sm overflow-hidden bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4">
          <div className="relative w-full h-64 mb-4">
            <img
              src="/profile-header.png"
              alt="All in one AI SaaS platform for online entrepreneurs"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="p-4">
            <h4 className="mb-3 text-xl font-bold text-white">
          AI SaaS app for online entrepreneurs
            </h4>
            <p className="text-primary mb-6">
            A complete All-in-one AI SaaS platform for online entrepreneurs to manage sales booking requests, services and insights to manage their operations to focus on what really matters - growing their business.
            </p>
           
          </div>
        </div>


        <div className="w-full max-w-sm overflow-hidden bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4">
          <div className="relative w-full h-64 mb-4">
            <img
              src="/profile-cv.png"
              alt="All in one AI SaaS platform for online entrepreneurs"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="p-4">
            <h4 className="mb-3 text-xl font-bold text-white">
          Personality based AI resume builder for job seekers 
            </h4>
            <p className="text-primary mb-6">
            An AI resume builder for job seekers that helps them build a resume that is tailored to their personality type [Big Five Personality Traits] and skills to land the job they are really making a full fit for.
            </p>
         
          </div>
        </div>

        <div className="w-full max-w-sm overflow-hidden bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4">
          <div className="relative w-full h-64 mb-4">
            <img
              src="/ai-engine.png"
              alt="All in one AI SaaS platform for online entrepreneurs"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="p-4">
            <h4 className="mb-3 text-xl font-bold text-white">
        AI Vision test for injury prevention in sports
            </h4>
            <p className="text-primary mb-6">
            We turn any phone into a clinical sensor, unlocking preventive and post-traumatic care for everyone.
                        </p>
           
          </div>
        </div>
      </div>
    </Section>
  );
};

export default OurProducts; 