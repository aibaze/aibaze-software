"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Vapi from "@vapi-ai/web";
import toast, { Toaster } from 'react-hot-toast';

// Voice agent data with male and female options
const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "");

const agentData = [
    {
      id: 1,
      name: "Liam - Cold Outreach Expert",
      image: "https://i.ibb.co/ynTxSR8m/Liam.png",
      assistantId: "75d8b5db-7fbf-4cb7-beb1-42a7fa4ad9ec",
    },
    {
      id: 2,
      name: "Jessie - Lead Qualification Specialist",
      image: "https://i.ibb.co/DDwkgL0q/Jessie.png",
      assistantId: "07f1d354-902f-4c73-a57b-77b15f04a0dd",
    },
];

const callStatuses = {
    CONNECTING: "CONNECTING",
    CONNECTED: "CONNECTED",
    ERROR: "ERROR"
}

export default function AgentsExample() {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [callStatus, setCallStatus] = useState<string>("");

  vapi.on("call-start", () => {
    console.log("Call has started.");
    setCallStatus(callStatuses.CONNECTED);
  });

  vapi.on("call-end", () => {
    console.log("Call has ended.");
    setCallStatus("");
    setSelectedAgent(null);
  });

  // Various assistant messages can come back (like function calls, transcripts, etc)
vapi.on("message", (message) => {
    console.log(message,"message handler");
  });

  vapi.on("speech-start", () => {
    console.log("Assistant speech has started.");
  });

  vapi.on("speech-end", () => {
    console.log("Assistant speech has ended.");
  });

  
  vapi.on("error", (e) => {
    toast.error(e.message, { duration: 5000 });
    console.error(e.message,"error handler");
  });


  
  const handleAgentClick =async (agentId: number, assistantId: string) => {
    if(callStatus === callStatuses.CONNECTED){
        return await vapi.stop();
    }
    setSelectedAgent(agentId === selectedAgent ? null : agentId);
    setCallStatus(callStatuses.CONNECTING);
    
    try {
     let hasCallCredits = false;
     await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/auth/verify-ip-request").then(res => res.json()).then(data => {
        hasCallCredits = data.maxQuotaReached ? false : true;
        if(data.status === "fail"){
            toast.error(data.message, { duration: 5000 });
        }
     });

     if(!hasCallCredits){
        toast.error("You have no call credits left.", { duration: 5000 });
        return
     }
     const call = await vapi.start(assistantId);
     console.log(call);  
    } catch (error: any) {
        toast.error(error?.message || "An error occurred.", { duration: 5000 });
     setCallStatus(callStatuses.ERROR);
    }

  };

  return (
    <div className="py-4">
      {/* Add the Toaster component to render toast notifications */}
      <Toaster position="top-center" />
      
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
                  
                  {selectedAgent === agent.id ? (     
                    <motion.button
                        disabled={callStatus === callStatuses.CONNECTING || agent.id !== selectedAgent && callStatus === callStatuses.CONNECTED}
                        onClick={() => handleAgentClick(agent.id,agent.assistantId)}
                        className={cn(
                        buttonVariants({ variant: "default" }),
                        " text-black flex text-bold text-black justify-center items-center absolute bottom-[35px] w-[90%]"
                        )}
                        style={callStatus === callStatuses.CONNECTED ? {backgroundColor: "hsl(7, 92.90%, 50.60%, 0.5)"}:{}}
                        whileHover={{
                        boxShadow: callStatus !== callStatuses.CONNECTED  ? "0 0 50px 5px hsl(154, 89%, 74%)" : "0 0 50px 5px hsl(7, 92.90%, 50.60%)"
                        }}
                        >
                        <strong>
                            {callStatus === callStatuses.CONNECTING && "Connecting..."}
                            {callStatus === callStatuses.CONNECTED && "Hang Up"}
                            {(!callStatus  || callStatus === callStatuses.ERROR) && `Talk with ${agent.name?.substring(0, 6)}`}
                        </strong>
                      </motion.button>):(
                      <motion.button
                        disabled={callStatus === callStatuses.CONNECTING || callStatus === callStatuses.CONNECTED}
                        onClick={() => handleAgentClick(agent.id,agent.assistantId)}
                        className={cn(
                        buttonVariants({ variant: "default" }),
                        " text-black flex text-bold text-black justify-center items-center absolute bottom-[35px] w-[90%]"
                        )}
                        whileHover={{
                        boxShadow: "0 0 50px 5px hsl(154, 89%, 74%)"
                        }}
                        >
                        <strong>
                            Talk with {agent.name?.substring(0, 6)}
                        </strong>
                      </motion.button>
                    )}
                
                </div>
              </div>
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