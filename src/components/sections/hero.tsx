'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { Icons } from '@/components/icons';
import HeroVideoDialog from '@/components/magicui/hero-video';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1];

function HeroPill() {
  return (
    <motion.a
      href="/contact"
      className="flex w-auto items-center space-x-2 whitespace-pre rounded-full bg-primary/20 px-2 py-2 pt-2 ring-1 ring-accent"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
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
    <div className="flex w-full max-w-4xl flex-col items-center justify-center pt-8">
      {/* Glassmorphic Container */}
      <motion.div
        className="relative w-[100%] rounded-2xl border border-white/20 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
        }}
      >
        <motion.h1
          className="text-center text-4xl font-medium leading-tight text-white sm:text-5xl md:text-6xl"
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease,
            staggerChildren: 0.2,
          }}
        >
          {['Software & AI solutions for', ' Industry Leaders.'].map(
            (text, index) => (
              <motion.span
                key={index}
                className={`block text-balance font-semibold ${
                  index === 1
                    ? 'font-bold italic'
                    : index === 0
                      ? 'text-2xl font-bold italic sm:text-3xl md:text-4xl'
                      : 'text-4xl sm:text-5xl md:text-6xl'
                }`}
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
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-7 text-white/90 sm:text-xl sm:leading-9"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            ease,
          }}
        >
          From vision to execution, we design, build and deliver world-class
          products, because of the trust of global brands.
        </motion.p>
        <HeroCTA
          hideText={true}
          onContactClick={() => {
            alert('test');
          }}
        />
      </motion.div>
    </div>
  );
}

export function HeroCTA({
  hideText = false,
  onContactClick,
}: {
  hideText?: boolean;
  onContactClick?: () => void;
}) {
  return (
    <>
      <motion.div
        className="mx-auto mt-6 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease }}
      >
        <button
          onClick={onContactClick}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'flex w-full items-center justify-center gap-2 border-white bg-white text-black hover:bg-white/90 sm:w-auto'
          )}
          style={{
            fontWeight: 'bold',
          }}
        >
          <strong>See our portfolio</strong>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.78141 5.33312L5.20541 1.75712L6.14808 0.814453L11.3334 5.99979L6.14808 11.1851L5.20541 10.2425L8.78141 6.66645H0.666748V5.33312H8.78141Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </motion.div>
      {!hideText && (
        <motion.p
          className="mt-5 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          Includes strategy session & custom AI solution demo
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
        className="mt-16 max-w-screen-md rounded-lg border shadow-lg"
      />
    </motion.div>
  );
}

export default function Hero({
  onContactClick,
}: {
  onContactClick?: () => void;
}) {
  const backgroundVideo =
    'https://videocdn.cdnpk.net/videos/bd0d1c7e-db2a-574b-af2c-6607d3dd8a37/horizontal/previews/watermarked/large.mp4';

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero" className="relative">
      <motion.div
        ref={containerRef}
        style={{
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.video
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
            zIndex: -1,
            y,
            opacity,
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>

        {/* Content */}
        <motion.div
          className="relative z-10 flex w-full flex-col items-center justify-start px-4 sm:px-6 sm:pt-8 md:pt-16"
          style={{ y, opacity }}
        >
          <HeroPill />
          <HeroTitles />

          {/*   <HeroImage /> */}
        </motion.div>
      </motion.div>
    </section>
  );
}
