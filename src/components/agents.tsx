"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

type AgentDataProps = {
  id: number;
  name: string;
  image?: string;
  video?: string;
};

export type AgentsProps = {
  collapseDelay?: number;
  ltr?: boolean;
  data: AgentDataProps[];
};

export default function Agents({
  collapseDelay = 5000,
  ltr = false,
  data = [],
}: AgentsProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isInView) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(-1);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isInView]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex !== undefined ? (prevIndex + 1) % data.length : 0
      );
    }, collapseDelay);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section ref={ref} id="agents">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-8 flex-col ">
            {data.map((agent, index) => (
              <div
                key={agent.id}
                className={`w-auto overflow-hidden relative rounded-lg ${
                  index === currentIndex ? "scale-105 transition-transform duration-500" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                {agent.image ? (
                  <motion.img
                    key={`${agent.id}-${index === currentIndex}`}
                    src={agent.image}
                    alt={agent.name}
                    className="aspect-auto h-full w-full object-cover relative border rounded-lg shadow-lg"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                ) : agent.video ? (
                  <video
                    preload="auto"
                    src={agent.video}
                    className="aspect-auto h-full w-full rounded-lg object-cover border shadow-lg"
                    autoPlay
                    loop
                    muted
                  />
                ) : (
                  <div className="aspect-auto h-full w-full rounded-xl border border-neutral-300/50 bg-gray-200 p-1 min-h-[300px]"></div>
                )}
                <BorderBeam
                  size={400}
                  duration={12}
                  delay={9}
                  borderWidth={1.5}
                  colorFrom="hsl(var(--primary))"
                  colorTo="hsl(var(--primary)/0)"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 p-2 rounded-md backdrop-blur-sm">
                  <h3 className="text-white font-medium text-center">{agent.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 