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
import {agenticallerApi} from "@/api";

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "");

const agentData = [
    {
      id: 1,
      name: "Sarah - Therapy Coach",
      image: "https://i.ibb.co/ynTxSR8m/Liam.png", // You can replace this with an appropriate image
      assistantId: "75d8b5db-7fbf-4cb7-beb1-42a7fa4ad9ec", // Replace with your therapy assistant ID
    },
    {
      id: 2,
      name: "Michael - Mental Health Expert",
      image: "https://i.ibb.co/DDwkgL0q/Jessie.png", // You can replace this with an appropriate image
      assistantId: "07f1d354-902f-4c73-a57b-77b15f04a0dd", // Replace with your therapy assistant ID
    },
];

const callStatuses = {
    CONNECTING: "CONNECTING",
    CONNECTED: "CONNECTED",
    ERROR: "ERROR"
}

export default function TherapyAgent() {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [callStatus, setCallStatus] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [callId, setCallId] = useState<string>("");
  const [callHasEnded, setCallHasEnded] = useState<boolean>(false);
  const [callSummary, setCallSummary] = useState<string>("");
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(false);

  useEffect(() => {
   console.log(callId,"call id from use effect");
  }, [callId])
  useEffect(() => {
    console.log(callId,"call id from use effect 2");
   })

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



  const getCallResponse = async () => {
    console.log(callId,"call id from func");

    try {
      setIsLoadingSummary(true);
      const url = `/vapi/calls/${callId}`;
      console.log(url);
    
      const callResponse = await agenticallerApi.get(url);
      console.log(callResponse,"call response");
      
      // Extract and set the summary from the response
      if (callResponse?.data?.data?.call?.analysis?.summary) {
        setCallSummary(callResponse.data.data.call.analysis.summary);
      } else {
        setCallSummary("No summary is available for this call.");
      }
    } catch (error) {
      console.error("Error fetching call summary:", error);
      setCallSummary("Failed to retrieve call summary. Please try again.");
    } finally {
      setIsLoadingSummary(false);
    }
  }

  vapi.on("call-end", () => {
    setCallHasEnded(true)
    console.log("Call has ended.");
    setCallStatus("");
    setTimeout(() => {
      setIsSpeaking(false);
      setSelectedAgent(null);
    }, 100);
  });

  // Various assistant messages can come back (like function calls, transcripts, etc)
  vapi.on("message", (message) => {
   
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
  
  const handleAgentClick = async (agentId: number, assistantId: string) => {
 
    if(callStatus === callStatuses.CONNECTED){
        return await vapi.stop();
    }
    setSelectedAgent(agentId === selectedAgent ? null : agentId);
    setCallStatus(callStatuses.CONNECTING);
    setCallHasEnded(false);
    
    try {
     let hasCallCredits = false;
     await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/auth/verify-ip-request").then(res => res.json()).then(data => {
        hasCallCredits = data.maxQuotaReached ? false : true;
        if(data.status === "fail"){
            handleError(data.message);
            hasCallCredits=false
            return
        }
     }).catch(error => {
      hasCallCredits=false
      return handleError(error?.message || "An error occurred.");
     });

     if(!hasCallCredits ){
      return  handleError("You have no call credits left.");
     }
     const call = await vapi.start(assistantId);
     if(call){
        console.log(call,"call");
      setCallId(call.id);
     }
    } catch (error: any) {
      return handleError(error?.message || "An error occurred.");
    }

  };

  const handleGetSummary = async () => {
    try {
      toast.success("Retrieving call summary...");
      // Reset summary to force a refresh when trying again
      setCallSummary("");
      await getCallResponse();
    } catch (error: any) {
      handleError(error?.message || "Failed to get call summary");
    }
  };

  const handleTryAgain = async () => {
    try {
      toast.success("Trying again...");
      // Reset summary state to show loading spinner
      setCallSummary("");
      await getCallResponse();
    } catch (error: any) {
      handleError(error?.message || "Failed to get call summary");
    }
  };

  return (
    <div className="py-4 relative">
      {/* Add the Toaster component to render toast notifications */}
      <Toaster position="top-center" />
    
      <div className="container mx-auto px-2">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent
          "
          style={{ color: "hsl(var(--chart-5))" }}
          
          >Talk to a Therapy Expert</h2>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Our AI therapy agents can provide guidance and support 24/7.
          </p>
        </div>
        
     

        <div className="flex flex-col md:flex-row mx-auto justify-center">
 

        
            <motion.div 
              className="relative w-100 h-100"
              animate={isSpeaking ? { 
                rotate: 360 ,
                scale: [1, 1.05, 1],
               } : {}}
              transition={isSpeaking ? { 
                duration: 20,
                repeat:Infinity ,
                ease: "linear"
              } :{}}
              style={{
                willChange: "transform"
              }}
            >
              <Image
                src="https://i.ibb.co/yFFWLH58/cosmic-sphere-swirling-purple-galaxy-captured-glass-orb.png"
                alt="Spinning gradient ring"
                width={500}
                height={500}
                className="w-full h-full"
                priority
              />
            </motion.div>
         

                    {callStatus === callStatuses.CONNECTED ? (     
                    <motion.button
                        id="selected-agent-button"
                        onClick={() => handleAgentClick(1,"34b5ba34-49dd-4428-9810-02349a9ba8d8")}
                        className={cn(
                        buttonVariants({ variant: "ghost" }),
                        " text-black flex text-bold text-black justify-center items-center absolute  w-[20%] md:w-[20%]"
                        )}
                        style={ {backgroundColor: "hsl(7, 92.90%, 50.60%, 0.5)",marginTop:"500px"}}
                        animate={isSpeaking  ? {
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
                        transition={isSpeaking ? {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          times: [0, 0.2, 0.4, 0.7, 1]
                        } : {}}
                        whileHover={{
                        boxShadow: "0 0 50px 5px hsl(7, 92.90%, 50.60%)"
                        }}
                        >
                        <strong>
                            {callStatus === callStatuses.CONNECTING && "Connecting..."}
                            {callStatus === callStatuses.CONNECTED && "Hang Up"}
                            {(!callStatus  || callStatus === callStatuses.ERROR) && `Talk with Lisa`}
                        </strong>
                      </motion.button>):
                      (
                      <motion.button
                        id="agent-button"
                        disabled={callStatus === callStatuses.CONNECTING || callStatus === callStatuses.CONNECTED}
                        onClick={() => handleAgentClick(1,"34b5ba34-49dd-4428-9810-02349a9ba8d8")}
                        className={cn(
                        buttonVariants({ variant: "default" }),
                        "mt-20 text-white flex text-bold text-black justify-center items-center absolute w-[20%] md:w-[20%] bg-secondary"
                        )}
                        animate={!callStatus ? {
                          scale: [1, 1.05, 1],
                        } : {}}
                        transition={!callStatus ?{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        } : {}}
                        style={{ backgroundColor: "hsl(var(--chart-5))" ,marginTop:"500px",color:"white"}}
                        whileHover={{
                        scale: 1.1 // Slightly larger scale on hover to emphasize interaction
                        }}
                        >
                        <strong>
                            Talk with Lisa
                        </strong>
                      </motion.button>
                    )}


        
        </div>

        {/* Summary Sidebar that appears when call has ended */}
        {callHasEnded && (
          <motion.div 
            className="fixed right-0 top-0 h-full bg-black/10 backdrop-blur-md w-96 p-6 shadow-lg z-50 overflow-y-auto"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-bold mb-4 text-primary"
              style={{ color: "hsl(var(--chart-5))" }}
              >Call Summary</h3>
              
              {isLoadingSummary ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">Loading summary...</p>
                </div>
              ) : callSummary ? (
                <div className="mb-6">
                  <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4 text-sm">
                    <h4 className="font-medium mb-2 text-primary/80">Session Summary:</h4>
                    <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">
                      {callSummary}
                    </p>
                  </div>
                  
                  {callSummary === "No summary is available for this call." && (
                    <motion.button
                      onClick={handleTryAgain}
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "mt-4 w-full border-primary text-primary hover:bg-primary/5"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <strong>Try Again</strong>
                    </motion.button>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  Your call with Lisa has ended. Would you like to see a summary of your conversation?
                </p>
              )}
              
              {!callSummary && !isLoadingSummary && (
                <motion.button
                  onClick={handleGetSummary}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "bg-primary hover:bg-primary/90 text-white"
                  )}
                  style={{ backgroundColor: "hsl(var(--chart-5))" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <strong>Get Summary</strong>
                </motion.button>
              )}

              <div className="mt-auto">
                <motion.button
                  onClick={() => {
                    setCallHasEnded(false);
                    // Don't clear the summary right away so it can be viewed again if needed
                  }}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full mt-4"
                  )}
                  whileHover={{ scale: 1.02 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
} 