"use client";

import { motion } from "framer-motion";

import { Icons } from "@/components/icons";
import HeroVideoDialog from "@/components/magicui/hero-video";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1];
import mixpanel from "mixpanel-browser";
import { siteConfig } from "@/lib/config";

// Near entry of your product, init Mixpanel

if (typeof window !== "undefined") {
  mixpanel.init(siteConfig.keys.mixpanel, {
    debug: false,
    track_pageview: true,
    persistence: "localStorage",
  });
}

function HeroPill() {
  return (
    <motion.a
      href="/contact"
      className="flex w-auto items-center space-x-2 rounded-full bg-primary/20 px-2 py-1 pt-1 ring-1 ring-accent whitespace-pre"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="w-fit rounded-full bg-accent px-2 py-0.5 text-center font-medium text-primary sm:text-sm">
        🔥 Limited Time Offer:
      </div>
      <p className="font-medium text-primary text-sm">
      Book a strategy session for 50% OFF
      </p>
      <svg
        width="12"
        height="12"
        className="ml-1"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.78141 5.33312L5.20541 1.75712L6.14808 0.814453L11.3334 5.99979L6.14808 11.1851L5.20541 10.2425L8.78141 6.66645H0.666748V5.33312H8.78141Z"
          fill="hsl(var(--primary))"
        />
      </svg>
    </motion.a>
  );
}

function HeroTitles() {
  return (
    <div className="flex w-full max-w-2xl flex-col space-y-4 overflow-hidden pt-8">
      <motion.h1
        className="text-center text-4xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl"
        initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
          staggerChildren: 0.2,
        }}
      >
        {["Your Tech Partner for", "AI-Powered", "Solutions"].map(
          (text, index) => (
            <motion.span
              key={index}
              className={`inline-block px-1 md:px-2 text-balance font-semibold ${index === 1 ? "text-primary" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease,
              }}
            >
              {text}
            </motion.span>
          )
        )}
      </motion.h1>
      <motion.p
        className="mx-auto max-w-xl text-center text-lg leading-7 text-muted-foreground sm:text-xl sm:leading-9 text-balance"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease,
        }}
      >
     We help businesses build, launch, and grow next-gen AI software businesses.
      </motion.p>
    </div>
  );
}

export function HeroCTA({ hideText = false }) {
  return (
    <>
      <motion.div
        className="mx-auto mt-6 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease }}
      >
        <Link
          href={siteConfig.ctaLink}
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full sm:w-auto text-black flex text-bold text-black "
          )}
          style={{
            boxShadow: "0 0 80px 10px hsl(154, 89%, 74%)",
            fontWeight: "bold",
          }}
        >
            <strong>
                  Book Your Discovery Call
                </strong>
        </Link>
      </motion.div>
      {!hideText && (
        <motion.p
          className="mt-5 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          Includes strategy session & custom SaaS demo
        </motion.p>
      )}
    </>
  );
}

function HeroImage() {
  return (
    <motion.div
      className="relative mx-auto flex w-full items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 1, ease }}
    >
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="/dashboard.png"
        thumbnailAlt="Hero Video"
        className="border rounded-lg shadow-lg max-w-screen-md mt-16"
      />
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative">
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.3,
            zIndex: -1,
          }}
        >
          <source src="/hero-vid.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Content */}
        <div className="relative z-10 flex w-full flex-col items-center justify-start px-4  sm:px-6 sm:pt-8 md:pt-16 ">
          <HeroPill />
          <HeroTitles />
          <HeroCTA hideText={true} />
        
           <HeroImage /> 
        </div>
      </div>
    </section>
  );
}
