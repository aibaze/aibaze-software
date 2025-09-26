'use client';

import Section from '@/components/section';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import SectionHeader from '@/components/sections/portfolio-header';

const images = [
  '/solution1.svg ', // app mobile startup
  '/solution2.svg', //e-commerce
  '/solution3.svg',
  '/solution4.svg', //software custom
  '/solution3.svg', // website industrial
  'https://i.ibb.co/fVV3RL0Y/food.webp',
];
const features = [
  {
    title: 'Web Admin',
    keywords: ['Web Admin', 'Fintech', 'AI'],
    description:
      'Transform property management with AI-driven market analysis, automated property valuations, intelligent lead scoring, and predictive analytics for real estate professionals.',
    image: images[0],
  },
  {
    title: 'Mobile iOS',
    keywords: ['Mobile iOS', 'Fintech', 'LLM'],
    description:
      'Revolutionize customer acquisition with AI-powered marketing automation, intelligent lead scoring, personalized campaigns, and predictive analytics that maximize ROI.',
    image: images[1],
  },
  {
    title: 'Web App',
    keywords: ['Web App', 'Restaurant Franchise', 'AI Admin Integration'],
    description:
      'Streamline recruitment and workforce management with AI-driven candidate screening, automated onboarding, performance analytics, and intelligent talent matching.',
    image: images[2],
  },
  {
    title: 'Fitness Tracking App',
    keywords: ['Fitness Tracking', 'Health Tech', 'AI Analytics'],
    description:
      'Build your unique AI-powered solution from concept to deployment. We create tailored software that transforms your business processes with cutting-edge artificial intelligence.',
    image: images[3],
  },
  {
    title: 'Medical Dashboard',
    keywords: ['Medical Dashboard', 'Healthcare', 'AI Integration'],
    description:
      'Advanced medical dashboard with AI-powered patient management, automated diagnostics, and intelligent healthcare analytics for medical professionals.',
    image: images[2],
  },
];

export default function Component() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const squared = true;
  return (
    <div className="relative bg-black py-24">
      {/* Header Section */}
      <SectionHeader
        portfolioLabel="PORTFOLIO"
        clientsVision={['Our clients vision.', 'Engineered. Elevated.']}
      />

      {/* 2x2 Grid Container with Border */}
      <div className={`mx-auto max-w-7xl px-${isMobile ? '0' : '6'}px`}>
        <div className={` ${isMobile ? 'p-0px' : 'p-8px'}`}>
          <div className="space-y-8">
            {/* First Row - 65% / 35% split */}
            <div
              className={`grid w-full grid-cols-1 gap-${isMobile ? '0' : '8'} md:grid-cols-[62.5%_35%]`}
              style={isMobile ? { marginTop: '0px' } : {}}
            >
              {/* First Card - 65% */}
              <div>
                <motion.div
                  className={`rounded-${squared ? 'md' : '2xl'} group relative overflow-hidden transition-all duration-300 ${isMobile ? 'h-[400px]' : 'h-[400px]'}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 100,
                    damping: 30,
                    delay: 0 * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  {/* Content */}
                  <div
                    className={`relative h-[400px] w-full overflow-hidden ${squared ? 'rounded-md' : 'rounded-2xl'}`}
                  >
                    <img
                      src={features[0].image}
                      alt={features[0].title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-0">
                      <div
                        className={`rounded-b-${squared ? '0px' : '2xl'} border-t border-white/20 bg-black/40 backdrop-blur-md`}
                      >
                        <div className="flex flex-col items-start justify-between gap-5 p-4">
                          <h3 className="text-xl font-semibold text-white drop-shadow-lg">
                            {features[0].title}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {features[0].keywords.map((keyword, keyIndex) => (
                              <span
                                key={keyIndex}
                                className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Glassmorphic Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute left-0 right-0 top-0 p-6">
                        <p className="text-sm leading-relaxed text-white">
                          {features[0].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Second Card - 35% */}
              <div>
                <motion.div
                  className={`rounded-${squared ? '0px' : '2xl'} group relative overflow-hidden transition-all duration-300`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 100,
                    damping: 30,
                    delay: 1 * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  {/* Content */}
                  <div
                    className={`relative h-[400px] w-full overflow-hidden ${squared ? 'rounded-0px' : 'rounded-2xl'}`}
                  >
                    <Image
                      src={features[1].image}
                      alt={features[1].title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-0">
                      <div
                        className={`rounded-b-${squared ? '0px' : '2xl'} border-t border-white/20 bg-black/40 backdrop-blur-md`}
                      >
                        <div className="flex flex-col items-start justify-between gap-5 p-4">
                          <h3 className="text-xl font-semibold text-white drop-shadow-lg">
                            {features[1].title}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {features[1].keywords.map((keyword, keyIndex) => (
                              <span
                                key={keyIndex}
                                className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Glassmorphic Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute left-0 right-0 top-0 p-6">
                        <p className="text-sm leading-relaxed text-white">
                          {features[1].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Second Row - Equal split */}
            <div
              className={`grid w-full grid-cols-1 gap-${isMobile ? '0' : '8'} md:grid-cols-2`}
              style={isMobile ? { marginTop: '0px' } : {}}
            >
              <div>
                <motion.div
                  className={`rounded-${squared ? '0px' : '2xl'} group relative overflow-hidden transition-all duration-300`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 100,
                    damping: 30,
                    delay: 2 * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  {/* Content */}
                  <div
                    className={`relative h-[400px] w-full overflow-hidden ${squared ? 'rounded-0px' : 'rounded-2xl'}`}
                  >
                    <Image
                      src={features[2].image}
                      alt={features[2].title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-0">
                      <div
                        className={`rounded-b-${squared ? '0px' : '2xl'} border-t border-white/20 bg-black/40 backdrop-blur-md`}
                      >
                        <div className="flex flex-col items-start justify-between gap-5 p-4">
                          <h3 className="text-xl font-semibold text-white drop-shadow-lg">
                            {features[2].title}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {features[2].keywords.map((keyword, keyIndex) => (
                              <span
                                key={keyIndex}
                                className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Glassmorphic Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute left-0 right-0 top-0 p-6">
                        <p className="text-sm leading-relaxed text-white">
                          {features[2].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div>
                <motion.div
                  className={`rounded-${squared ? '0px' : '2xl'} group relative overflow-hidden transition-all duration-300`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 100,
                    damping: 30,
                    delay: 3 * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  {/* Content */}
                  <div
                    className={`relative h-[400px] w-full overflow-hidden ${squared ? 'rounded-0px' : 'rounded-2xl'}`}
                  >
                    <Image
                      src={features[3].image}
                      alt={features[3].title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-0">
                      <div
                        className={`rounded-b-${squared ? '0px' : '2xl'} border-t border-white/20 bg-black/40 backdrop-blur-md`}
                      >
                        <div className="flex flex-col items-start justify-between gap-5 p-4">
                          <h3 className="text-xl font-semibold text-white drop-shadow-lg">
                            {features[3].title}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {features[3].keywords.map((keyword, keyIndex) => (
                              <span
                                key={keyIndex}
                                className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Glassmorphic Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute left-0 right-0 top-0 p-6">
                        <p className="text-sm leading-relaxed text-white">
                          {features[3].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
