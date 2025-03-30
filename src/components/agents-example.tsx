"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [callStatus, setCallStatus] = useState<string>("");

  const handleAgentClick = (agentId: number) => {
    setSelectedAgent(agentId === selectedAgent ? null : agentId);
  };

  return (
    <div className="py-4">
      <div className="container mx-auto px-2">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Revolutionize Your Sales Pipeline</h2>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Our AI voice agents book meetings and qualify leads 24/7.
          </p>
        </div>
        
        <div className="flex mx-auto">
          {/* Left-aligned stacked agents display (50% of screen width) */}
          <div className="w-1/2 flex flex-row items-center mt-10 gap-10">
            {agentData.map((agent) => (
            <>
              <div 
                key={agent.id}
                className={`relative cursor-pointer transition-transform duration-300 ${selectedAgent === agent.id ? 'scale-105' : ''}`}
              >
              
                <div className="flex flex-col items-center justify-center">
                  <motion.img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full object-contain relative border rounded-lg shadow-lg"
                    initial={{ opacity: 0.9 }}
                    whileHover={{ opacity: 1 }}
                  />
                  {selectedAgent === agent.id && (
                    <BorderBeam
                      size={450}
                      duration={5}
                      delay={5}
                      borderWidth={10.5}
                      colorFrom="hsl(var(--primary))"
                      colorTo="hsl(var(--primary)/0)"
                    />
                  )}
 <button
            onClick={() => handleAgentClick(agent.id)}
            className={cn(
            buttonVariants({ variant: "default" }),
            " text-black flex text-bold text-black justify-center items-center absolute bottom-[35px] w-[90%]"
            )}
            style={{
            boxShadow: "0 0 50px 5px hsl(154, 89%, 74%)",
            }}
            >
            <strong>
                Talk with {agent.name?.substring(0, 5)}
                </strong>
                </button>

           
         
                </div>
              </div>

            </>
            ))}
          </div>
          
          {/* Right side with spinning image */}
          <div className="w-1/2 flex items-center justify-center flex-col gap-10">
            <motion.div 
              className="relative w-100 h-100"
              animate={{ 
                rotate: selectedAgent !== null ? 360 : 0,
              }}
              transition={{ 
                duration: 20,
                repeat: selectedAgent !== null ? Infinity : 0,
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