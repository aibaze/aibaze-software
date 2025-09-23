'use client';

import Section from '@/components/section';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
  'https://i.ibb.co/7x2g1QjZ/1957.jpg', // app mobile startup
  'https://i.ibb.co/gFtS81NG/e-commerce.png', //e-commerce
  'https://i.ibb.co/YBsBvBCP/FIN.webp',
  'https://i.ibb.co/d4z78FfM/43.jpg', //software custom
  'https://i.ibb.co/4ZBpYTFh/72250354-9690814.jpg', // website industrial
  'https://i.ibb.co/fVV3RL0Y/food.webp',
];
const features = [
  {
    title: 'Webb Admin',
    keywords: ['Webb Admin', 'Fintech', 'AI'],
    description:
      'Transform property management with AI-driven market analysis, automated property valuations, intelligent lead scoring, and predictive analytics for real estate professionals.',
    image: images[0],
  },
  {
    title: 'Mobile iOS',
    keywords: ['Mobile iOS', 'Fintech', 'LLM'],
    description:
      'Revolutionize customer acquisition with AI-powered marketing automation, intelligent lead scoring, personalized campaigns, and predictive analytics that maximize ROI.',
    image: images[4],
  },
  {
    title: 'Web App',
    keywords: ['Web App', 'Restaurant Franchise', 'AI Admin Integration'],
    description:
      'Streamline recruitment and workforce management with AI-driven candidate screening, automated onboarding, performance analytics, and intelligent talent matching.',
    image: images[1],
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
  return (
    <Section
      blackTitle={false}
      title="Leading solutions 2025"
      subtitle="Transform Your Vision Into leading products"
      description="Software product development services for leading companies worldwide."
      className="relative"
    >
      <div className="mx-auto mt-16">
        {/* Top Row - 2 sections */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {features.slice(0, 2).map((feature, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                type: 'spring',
                stiffness: 100,
                damping: 30,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              {/* Content */}
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-0">
                  <div className="rounded-b-2xl border-t border-white/20 bg-black/40 backdrop-blur-md">
                    <div className="flex items-center justify-between p-4">
                      <h3 className="text-xl font-semibold text-white drop-shadow-lg">
                        {feature.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {feature.keywords.map((keyword, keyIndex) => (
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
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Row - 3 sections */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.slice(2, 5).map((feature, index) => (
            <motion.div
              key={index + 2}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                type: 'spring',
                stiffness: 100,
                damping: 30,
                delay: (index + 2) * 0.1,
              }}
              viewport={{ once: true }}
            >
              {/* Content */}
              <div className="relative h-[350px] w-full overflow-hidden rounded-2xl">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="rounded-b-2xl border-t border-white/20 bg-black/40 backdrop-blur-md">
                    <div className="flex items-center justify-between p-3">
                      <h3 className="text-lg font-semibold text-white drop-shadow-lg">
                        {feature.title}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {feature.keywords.map((keyword, keyIndex) => (
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
                  <div className="absolute left-0 right-0 top-0 p-4">
                    <p className="text-xs leading-relaxed text-white">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
