'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Vapi from '@vapi-ai/web';
import toast, { Toaster } from 'react-hot-toast';
import mixpanel from 'mixpanel-browser';
import { EmailModal } from '@/components/email-modal';
import { api } from '@/api';
import SectionHeader from '@/components/sections/portfolio-header';
// AI application data with male and female options
const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '');

const agentData = [
  {
    id: 1,
    name: 'Liam - Cold Outreach Expert',
    image: 'https://i.ibb.co/ynTxSR8m/Liam.png',
    assistantId: '1b2bdc8c-5e54-4453-9d42-06b90b1297e0',
  },
];

const callStatuses = {
  CONNECTING: 'CONNECTING',
  CONNECTED: 'CONNECTED',
  ERROR: 'ERROR',
};

export default function AgentsExample() {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [callStatus, setCallStatus] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pendingAgentId, setPendingAgentId] = useState<number | null>(null);
  const [pendingAssistantId, setPendingAssistantId] = useState<string | null>(
    null
  );

  const handleError = (errorMessage: string) => {
    toast.error(errorMessage, { duration: 5000 });
    setCallStatus(callStatuses.ERROR);
    setIsSpeaking(false);
    setSelectedAgent(null);
    console.error(errorMessage, 'error handler');
    return;
  };

  vapi.on('call-start', () => {
    console.log('Call has started.');
    setCallStatus(callStatuses.CONNECTED);
  });

  vapi.on('call-end', () => {
    console.log('Call has ended.');
    setCallStatus('');
    setTimeout(() => {
      setIsSpeaking(false);
      setSelectedAgent(null);
    }, 100);
  });

  // Various assistant messages can come back (like function calls, transcripts, etc)
  vapi.on('message', message => {
    console.log(message, 'message handler');
  });

  vapi.on('speech-start', () => {
    console.log('Assistant speech has started.');
    setIsSpeaking(true);
  });

  vapi.on('speech-end', () => {
    setIsSpeaking(false);
    console.log('Assistant speech has ended.');
  });

  vapi.on('error', e => {
    return handleError(e.message);
  });

  const handleEmailSubmit = async (email: string, name: string) => {
    if (pendingAgentId && pendingAssistantId) {
      try {
        // Send feedback data

        await api.post(
          '/contact-us',
          {
            name: name,
            email: email,
            reason: 'web-call',
            whereDidYouHearFromUs: 'web-call',
            phone: 'web-call',
            website: 'web-call',
            whatYouWillUseAiFor: 'web-call',
            businessName: 'web-call',
            requestedService: 'web-call',
            targetDate: 'web-call',
            phoneOptIn: false,
            internalCompany: 'aibaze',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        // Start the call
        setSelectedAgent(pendingAgentId);
        setCallStatus(callStatuses.CONNECTING);

        try {
          let hasCallCredits = false;
          await fetch(
            process.env.NEXT_PUBLIC_API_URL + '/api/auth/verify-ip-request'
          )
            .then(res => res.json())
            .then(data => {
              hasCallCredits = data.maxQuotaReached ? false : true;
              if (data.status === 'fail') {
                handleError(data.message);
                hasCallCredits = false;
                return;
              }
            })
            .catch(error => {
              hasCallCredits = false;
              return handleError(error?.message || 'An error occurred.');
            });

          if (!hasCallCredits) {
            return handleError('You have no call credits left.');
          }
          const call = await vapi.start(pendingAssistantId, {
            variableValues: {
              user_name: name,
            },
          });
          console.log(call);
        } catch (error: any) {
          return handleError(error?.message || 'An error occurred.');
        }
      } catch (error) {
        console.error('Error sending feedback:', error);
        // Still proceed with the call even if feedback fails
        setSelectedAgent(pendingAgentId);
        setCallStatus(callStatuses.CONNECTING);

        try {
          let hasCallCredits = false;
          await fetch(
            process.env.NEXT_PUBLIC_API_URL + '/api/auth/verify-ip-request'
          )
            .then(res => res.json())
            .then(data => {
              hasCallCredits = data.maxQuotaReached ? false : true;
              if (data.status === 'fail') {
                handleError(data.message);
                hasCallCredits = false;
                return;
              }
            })
            .catch(error => {
              hasCallCredits = false;
              return handleError(error?.message || 'An error occurred.');
            });

          if (!hasCallCredits) {
            return handleError('You have no call credits left.');
          }
          const call = await vapi.start(pendingAssistantId);
          console.log(call);
        } catch (error: any) {
          return handleError(error?.message || 'An error occurred.');
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
    <>
      <SectionHeader
        portfolioLabel="CALL US NOW"
        clientsVision={['Talk to Liam now.', "let's work together."]}
        className="mb-16 py-24 pb-0"
      />
      <div className="relative flex min-h-screen items-center justify-center py-4">
        {/* Background Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="https://i.ibb.co/S4FDTFH9/freepik-background-1678.png"
            alt="Background gradient ring"
            width={1200}
            height={800}
            className="h-full w-full object-contain opacity-50"
            priority
          />
        </div>

        <Toaster position="top-center" />
        <EmailModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          onEmailSubmit={handleEmailSubmit}
        />

        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="mx-auto flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
            {/* Glassmorphic Card containing agent */}
            <div className="relative w-full rounded-2xl border border-white/20 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl md:w-auto">
              {/* Centered agents display */}
              <div className="flex w-full flex-col items-center gap-16 md:w-auto md:flex-row md:gap-10">
                {agentData.map(agent => (
                  <div
                    key={agent.id}
                    className={`relative w-full cursor-pointer transition-transform duration-300 md:w-auto ${selectedAgent === agent.id ? 'scale-105' : ''}`}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <motion.img
                        src={agent.image}
                        alt={agent.name}
                        className="relative h-[400px] w-full rounded-lg border object-contain shadow-lg"
                        initial={{ opacity: 0.9 }}
                        whileHover={{ opacity: 1 }}
                      />

                      {/* Glassmorphic overlay for selected card */}
                      {selectedAgent === agent.id && (
                        <motion.div
                          className="absolute inset-0 rounded-lg border border-white/20 bg-white/5 shadow-2xl backdrop-blur-2xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}

                      {/* Live Vibing Button */}
                      <motion.div
                        className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-lg"
                        animate={{
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            '0 0 0px 0px rgba(34, 197, 94, 0.4)',
                            '0 0 20px 5px rgba(34, 197, 94, 0.6)',
                            '0 0 0px 0px rgba(34, 197, 94, 0.4)',
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <motion.div
                          className="h-2 w-2 rounded-full bg-white"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                        LIVE
                      </motion.div>
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
                          disabled={
                            callStatus === callStatuses.CONNECTING ||
                            (agent.id !== selectedAgent &&
                              callStatus === callStatuses.CONNECTED)
                          }
                          onClick={() =>
                            handleAgentClick(agent.id, agent.assistantId)
                          }
                          className={cn(
                            buttonVariants({ variant: 'default' }),
                            'text-bold absolute bottom-[35px] flex w-[80%] items-center justify-center text-black md:w-[90%]'
                          )}
                          style={
                            callStatus === callStatuses.CONNECTED
                              ? {
                                  backgroundColor:
                                    'hsl(7, 92.90%, 50.60%, 0.5)',
                                }
                              : {}
                          }
                          animate={
                            isSpeaking && callStatus === callStatuses.CONNECTED
                              ? {
                                  scale: [1, 1.08, 0.98, 1.05, 1],
                                  boxShadow: [
                                    '0 0 0px 0px hsl(7, 92.90%, 50.60%, 0.2)',
                                    '0 0 22.5px 7.2px hsl(7, 92.90%, 50.60%, 0.8)',
                                    '0 0 9px 2.7px hsl(7, 92.90%, 50.60%, 0.4)',
                                    '0 0 18px 5.4px hsl(7, 92.90%, 50.60%, 0.6)',
                                    '0 0 0px 0px hsl(7, 92.90%, 50.60%, 0.2)',
                                  ],
                                  backgroundColor: [
                                    'hsl(7, 92.90%, 50.60%,.5)',
                                    'hsl(7, 92.90%, 50.60%,.5)',
                                    'hsl(7, 92.90%, 50.60%,.5)',
                                    'hsl(7, 92.90%, 50.60%,.5)',
                                    'hsl(7, 92.90%, 60%,.5)',
                                  ],
                                }
                              : {}
                          }
                          transition={
                            isSpeaking && callStatus === callStatuses.CONNECTED
                              ? {
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  times: [0, 0.2, 0.4, 0.7, 1],
                                }
                              : {}
                          }
                          whileHover={{
                            boxShadow:
                              callStatus !== callStatuses.CONNECTED
                                ? '0 0 50px 5px hsl(154, 89%, 74%)'
                                : '0 0 50px 5px hsl(7, 92.90%, 50.60%)',
                          }}
                        >
                          <strong>
                            {callStatus === callStatuses.CONNECTING &&
                              'Connecting...'}
                            {callStatus === callStatuses.CONNECTED && 'Hang Up'}
                            {(!callStatus ||
                              callStatus === callStatuses.ERROR) &&
                              `Talk with ${agent.name?.substring(0, 6)}`}
                          </strong>
                        </motion.button>
                      ) : (
                        <motion.button
                          id="agent-button"
                          disabled={
                            callStatus === callStatuses.CONNECTING ||
                            callStatus === callStatuses.CONNECTED
                          }
                          onClick={() =>
                            handleAgentClick(agent.id, agent.assistantId)
                          }
                          className={cn(
                            buttonVariants({ variant: 'default' }),
                            'text-bold absolute bottom-[35px] flex w-[80%] items-center justify-center text-black md:w-[90%]'
                          )}
                          animate={
                            !callStatus
                              ? {
                                  scale: [1, 1.05, 1],
                                }
                              : {}
                          }
                          transition={
                            !callStatus
                              ? {
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                }
                              : {}
                          }
                          style={{ backgroundColor: 'hsl(var(--primary))' }}
                          whileHover={{
                            boxShadow: '0 0 50px 5px hsl(154, 89%, 74%)',
                            scale: 1.1, // Slightly larger scale on hover to emphasize interaction
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

                {/* Spinning circle inside the card */}
                <div className="hidden w-full flex-col items-center justify-center gap-10 md:flex md:w-1/2">
                  {/* Live Call Pill */}
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    Live Call
                  </div>
                  <motion.div
                    className="w-100 h-100 relative"
                    animate={
                      callStatus === callStatuses.CONNECTED
                        ? {
                            rotate: 360,
                            scale: [1, 1.05, 1],
                          }
                        : {}
                    }
                    transition={
                      callStatus === callStatuses.CONNECTED
                        ? {
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear',
                          }
                        : {}
                    }
                    style={{
                      willChange: 'transform',
                    }}
                  >
                    <Image
                      src="https://i.ibb.co/S4FDTFH9/freepik-background-1678.png"
                      alt="Spinning gradient ring"
                      width={300}
                      height={300}
                      className="h-full w-full"
                      priority
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
