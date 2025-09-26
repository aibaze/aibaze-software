'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { useMediaQuery } from 'react-responsive';
import { Icons } from '@/components/icons';
import HeroVideoDialog from '@/components/magicui/hero-video';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1];

function HeroTitles({ onContactClick }: { onContactClick?: () => void }) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const fonts = !isMobile
    ? [
        {
          fontFamily: 'proxima-nova, sans-serif',
          fontSize: 'clamp(2rem, 8vw, 4.5rem)', // Responsive: 32px to 72px
        },
        {
          fontFamily: 'pacifico, cursive',
          fontSize: 'clamp(3rem, 12vw, 7.5rem)', // Responsive: 47px to 120px
        },
      ]
    : [
        {
          fontFamily: 'proxima-nova, sans-serif',
          fontSize: 'clamp(47px, 8vw, 100px)', // Responsive: 42% to 100px
        },
        {
          fontFamily: 'proxima-nova, sans-serif',
          fontSize: 'clamp(47px, 8vw, 100px)', // Responsive: 47% to 100px
        },

        {
          fontFamily: 'pacifico, cursive',
          lineHeight: '0.9',
          fontSize: 'clamp(100px, 12vw, 150px)', // Responsive: 150px to 250px
        },
      ];
  return (
    <div
      className={`flex w-full max-w-6xl flex-col items-center justify-center gap-8 sm:gap-12 md:gap-20 ${
        isMobile ? 'pt-[5%]' : 'pt-[0%]'
      }`}
    >
      {/* Availability Pill */}
      <motion.div
        className="flex items-center space-x-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="relative">
          <div className="h-3 w-3 rounded-full bg-lime-400"></div>
          <div className="absolute inset-0 h-3 w-3 animate-ping rounded-full bg-lime-400/30"></div>
        </div>
        <span className="text-sm font-medium text-white">
          Available for projects
        </span>
      </motion.div>

      {/* Glassmorphic Container */}
      <motion.div
        className="relative w-[100%] rounded-2xl border border-white/20 bg-white/5 p-4 shadow-2xl backdrop-blur-2xl sm:p-8 md:p-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
        }}
      >
        <motion.h1
          className={`text-${isMobile ? 'left' : 'center'} text-2xl font-medium leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl`}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease,
            staggerChildren: 0.2,
          }}
        >
          {!isMobile
            ? ['Software & AI solutions for', 'Industry Leaders.'].map(
                (text, index) => (
                  <motion.span
                    key={index}
                    className={`block text-balance font-semibold`}
                    style={{
                      ...fonts[index],
                    }}
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
              )
            : ['Software ', ' AI solutions for', ' Industry Leaders.'].map(
                (text, index) => (
                  <motion.span
                    key={index}
                    className={`block text-balance font-semibold`}
                    style={{
                      ...fonts[index],
                    }}
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
          className={`mx-auto mt-6 max-w-3xl text-base font-bold leading-6 text-white/90 sm:mt-8 sm:text-xl sm:leading-8 md:text-2xl md:leading-10 ${isMobile ? 'text-left' : 'text-center'}`}
          initial={{ opacity: 0, y: 20 }}
          style={
            isMobile
              ? {
                  fontSize: 'clamp(12px, 8vw, 24px)',
                }
              : {
                  fontSize: 'clamp(16px, 8vw, 24px)',
                }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            ease,
          }}
        >
          {!isMobile
            ? 'From vision to execution, we design, build and deliver world-class products, because of the trust of global brands.'
            : 'We design, develop and deliver world-class products, because of the trust of global brands.'}
        </motion.p>
        <HeroCTA hideText={true} onContactClick={onContactClick} />
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
        className="mx-auto mt-6 flex w-full max-w-3xl flex-col items-center justify-center space-y-4 sm:mt-8 sm:flex-row sm:space-x-6 sm:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease }}
      >
        <button
          onClick={onContactClick}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'flex w-full min-w-48 items-center justify-center gap-2 border-white bg-white text-black hover:bg-white/90 sm:w-auto sm:min-w-56'
          )}
          style={{
            fontWeight: 'bold',
          }}
        >
          <strong>Let&apos;s talk</strong>
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

export default function Hero({
  onContactClick,
}: {
  onContactClick?: () => void;
}) {
  const backgroundVideo = '/hero-video.mp4';

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
          className="relative z-10 flex w-full flex-col items-center justify-center px-4 sm:px-6 sm:pt-8 md:pt-16"
          style={{ y, opacity }}
        >
          <HeroTitles onContactClick={onContactClick} />

          {/*   <HeroImage /> */}
        </motion.div>
      </motion.div>
    </section>
  );
}
