"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";



// Voice agent data with male and female options
const agentData = [
    {
      id: 1,
      name: "Liam - Cold Outreach Expert",
      image: "https://i.ibb.co/ynTxSR8m/Liam.png",
    },
    {
      id: 2,
      name: "Bella - Lead Qualification Specialist",
      image: "https://i.ibb.co/DDwkgL0q/Jessie.png",
    },
];

export default function AgentsExample() {
  return (
    <div className="py-4">
      <div className="container mx-auto px-2">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Revolutionize Your Sales Pipeline</h2>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Our AI voice agents book meetings and qualify leads 24/7.
          </p>
        </div>
        
        <div className="flex  mx-auto ">
          {/* Left-aligned stacked agents display (50% of screen width) */}
          <div className="w-1/2 flex flex-row items-center mt-10 gap-10">
            {agentData.map((agent) => (
              <div 
                key={agent.id}
                className="relative cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <div>
                  <motion.img
                    src={agent.image}
                    alt={agent.name}
                    className=" w-full object-contain relative border rounded-lg shadow-lg"
                    initial={{ opacity: 0.9 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <BorderBeam
                    size={250}
                    duration={10}
                    delay={5}
                    borderWidth={5.5}
                    colorFrom="hsl(var(--primary))"
                    colorTo="hsl(var(--primary)/0)"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/60 p-1.5 rounded-md backdrop-blur-sm">
                    <h3 className="text-white text-xs md:text-sm font-medium text-center">{agent.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right side with spinning image */}
          <div className="w-1/2 flex items-center justify-center">
            <motion.div 
              className="relative w-100 h-100"
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                willChange: "transform"
              }}
            >
              <Image
                src="/herocircle.webp"
                alt="Spinning gradient ring"
                width={500}
                height={500}
                className="w-full h-full"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 