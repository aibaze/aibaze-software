"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Vapi from "@vapi-ai/web";
import toast, { Toaster } from 'react-hot-toast';
import mixpanel from "mixpanel-browser";
import { EmailModal } from "@/components/email-modal";
// AI application data with male and female options
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
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pendingAgentId, setPendingAgentId] = useState<number | null>(null);
  const [pendingAssistantId, setPendingAssistantId] = useState<string | null>(null);

  const handleError = (errorMessage: string) => {
    toast.error(errorMessage, { duration: 5000 });
    setCallStatus(callStatuses.ERROR);
    setIsSpeaking(false);
    setSelectedAgent(null);
    console.error(errorMessage,"error handler");
      return
  }


  vapi.on("call-start", () => {
    console.log("Call has started.");
    setCallStatus(callStatuses.CONNECTED);
  
  });

  vapi.on("call-end", () => {
    console.log("Call has ended.");
    setCallStatus("");
    setTimeout(() => {
      setIsSpeaking(false);
      setSelectedAgent(null);
    }, 100);
  });

  // Various assistant messages can come back (like function calls, transcripts, etc)
  vapi.on("message", (message) => {
    console.log(message,"message handler");
   
  });

  vapi.on("speech-start", () => {
    console.log("Assistant speech has started.");
    setIsSpeaking(true);
  });

  vapi.on("speech-end", () => {
    setIsSpeaking(false);
    console.log("Assistant speech has ended.");
  });

  
  
  vapi.on("error", (e) => {
   return handleError(e.message);
  });


  
  
  const handleEmailSubmit = async (email: string) => {
    if (pendingAgentId && pendingAssistantId) {
      try {
        // Send feedback data
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/feedback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: "web-call",
            description: pendingAssistantId,
            email: email
          }),
        });

        // Start the call
        setSelectedAgent(pendingAgentId);
        setCallStatus(callStatuses.CONNECTING);
        
        try {
          let hasCallCredits = false;
          await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/auth/verify-ip-request").then(res => res.json()).then(data => {
            hasCallCredits = data.maxQuotaReached ? false : true;
            if (data.status === "fail") {
              handleError(data.message);
              hasCallCredits = false;
              return;
            }
          }).catch(error => {
            hasCallCredits = false;
            return handleError(error?.message || "An error occurred.");
          });

          if (!hasCallCredits) {
            return handleError("You have no call credits left.");
          }
          const call = await vapi.start(pendingAssistantId);
          console.log(call);
        } catch (error: any) {
          return handleError(error?.message || "An error occurred.");
        }
      } catch (error) {
        console.error('Error sending feedback:', error);
        // Still proceed with the call even if feedback fails
        setSelectedAgent(pendingAgentId);
        setCallStatus(callStatuses.CONNECTING);
        
        try {
          let hasCallCredits = false;
          await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/auth/verify-ip-request").then(res => res.json()).then(data => {
            hasCallCredits = data.maxQuotaReached ? false : true;
            if (data.status === "fail") {
              handleError(data.message);
              hasCallCredits = false;
              return;
            }
          }).catch(error => {
            hasCallCredits = false;
            return handleError(error?.message || "An error occurred.");
          });

          if (!hasCallCredits) {
            return handleError("You have no call credits left.");
          }
          const call = await vapi.start(pendingAssistantId);
          console.log(call);
        } catch (error: any) {
          return handleError(error?.message || "An error occurred.");
        }
      }
    }
  };

  const handleAgentClick = async (agentId: number, assistantId: string) => {
    if (callStatus === callStatuses.CONNECTED) {
      return await vapi.stop();
    }

    // Always show modal and store pending agent info
    setPendingAgentId(agentId);
    setPendingAssistantId(assistantId);
    setShowEmailModal(true);
  };

  return (
    <div className="py-4">
      <Toaster position="top-center" />
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onEmailSubmit={handleEmailSubmit}
      />
    
      <div className="container mx-auto px-2">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Revolutionize Your Sales Pipeline</h2>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Our AI SaaS platforms automate workflows and accelerate startup growth 24/7.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row mx-auto">
          {/* Left-aligned stacked agents display (full width on mobile, 50% on desktop) */}
          <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center mt-10 md:gap-10 gap-16">
            {agentData.map((agent) => (
              <div 
                key={agent.id}
                className={`relative cursor-pointer transition-transform duration-300 w-full md:w-auto ${selectedAgent === agent.id ? 'scale-105' : ''}`}
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
                        id="selected-agent-button"
                        disabled={callStatus === callStatuses.CONNECTING || agent.id !== selectedAgent && callStatus === callStatuses.CONNECTED}
                        onClick={() => handleAgentClick(agent.id,agent.assistantId)}
                        className={cn(
                        buttonVariants({ variant: "default" }),
                        " text-black flex text-bold text-black justify-center items-center absolute bottom-[35px] w-[80%] md:w-[90%]"
                        )}
                        style={callStatus === callStatuses.CONNECTED ? {backgroundColor: "hsl(7, 92.90%, 50.60%, 0.5)"}:{}}
                        animate={isSpeaking && callStatus === callStatuses.CONNECTED ? {
                          scale: [1, 1.08, 0.98, 1.05, 1],
                          boxShadow: [
                            "0 0 0px 0px hsl(7, 92.90%, 50.60%, 0.2)",
                            "0 0 22.5px 7.2px hsl(7, 92.90%, 50.60%, 0.8)",
                            "0 0 9px 2.7px hsl(7, 92.90%, 50.60%, 0.4)",
                            "0 0 18px 5.4px hsl(7, 92.90%, 50.60%, 0.6)",
                            "0 0 0px 0px hsl(7, 92.90%, 50.60%, 0.2)"
                          ],
                          backgroundColor: [
                            "hsl(7, 92.90%, 50.60%,.5)",
                            "hsl(7, 92.90%, 50.60%,.5)",
                            "hsl(7, 92.90%, 50.60%,.5)",
                            "hsl(7, 92.90%, 50.60%,.5)",
                            "hsl(7, 92.90%, 60%,.5)",
                                                      ]
                        } : {}}
                        transition={isSpeaking && callStatus === callStatuses.CONNECTED ? {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          times: [0, 0.2, 0.4, 0.7, 1]
                        } : {}}
                        whileHover={{
                        boxShadow: callStatus !== callStatuses.CONNECTED  ? "0 0 50px 5px hsl(154, 89%, 74%)" : "0 0 50px 5px hsl(7, 92.90%, 50.60%)"
                        }}
                        >
                        <strong>
                            {callStatus === callStatuses.CONNECTING && "Connecting..."}
                            {callStatus === callStatuses.CONNECTED && "Hang Up"}
                            {(!callStatus  || callStatus === callStatuses.ERROR) && `Talk with ${agent.name?.substring(0, 6)}`}
                        </strong>
                      </motion.button>):
                      (
                      <motion.button
                        id="agent-button"
                        disabled={callStatus === callStatuses.CONNECTING || callStatus === callStatuses.CONNECTED}
                        onClick={() => handleAgentClick(agent.id,agent.assistantId)}
                        className={cn(
                        buttonVariants({ variant: "default" }),
                        " text-black flex text-bold text-black justify-center items-center absolute bottom-[35px] w-[80%] md:w-[90%]"
                        )}
                        animate={!callStatus ? {
                          scale: [1, 1.05, 1],
                        } : {}}
                        transition={!callStatus ?{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        } : {}}
                        style={{ backgroundColor: "hsl(var(--primary))" }}
                        whileHover={{
                        boxShadow: "0 0 50px 5px hsl(154, 89%, 74%)",
                        scale: 1.1 // Slightly larger scale on hover to emphasize interaction
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

          {/* Right side with spinning image - hidden on mobile */}
          <div className="hidden md:flex w-full md:w-1/2 items-center justify-center flex-col gap-10">
            <motion.div 
              className="relative w-100 h-100"
              animate={callStatus === callStatuses.CONNECTED ? { 
                rotate: 360 ,
                scale: [1, 1.05, 1],
               } : {}}
              transition={callStatus === callStatuses.CONNECTED ? { 
                duration: 20,
                repeat:Infinity ,
                ease: "linear"
              } :{}}
              style={{
                willChange: "transform"
              }}
            >
              <Image
                src="https://i.ibb.co/S4FDTFH9/freepik-background-1678.png"
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