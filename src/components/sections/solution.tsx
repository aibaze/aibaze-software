'use client';

import Section from '@/components/section';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
  'https://i.ibb.co/gb7wYc7j/Realestate.webp',
  'https://i.ibb.co/DfH668V9/hr.webp',
  'https://i.ibb.co/YBsBvBCP/FIN.webp',
  'https://i.ibb.co/Q7jFw25n/soft.webp',
  'https://i.ibb.co/fL44NpP/mkt.webp',
  'https://i.ibb.co/fVV3RL0Y/food.webp',
];
const features = [
  {
    title: 'AI SaaS Platform Development',
    description:
      'Complete AI-powered SaaS platforms with intelligent features, automated workflows, and scalable architecture designed for rapid growth and market success.',
    image: images[0],
  },
  {
    title: 'SaaS Business Strategy & Launch',
    description:
      'End-to-end SaaS business development from concept validation to market launch, including AI integration, user onboarding, and growth optimization.',
    image: images[4],
  },
  {
    title: 'AI-Powered SaaS Features',
    description:
      'Intelligent SaaS features that differentiate your product: AI automation, predictive analytics, smart recommendations, and automated user experiences.',
    image: images[1],
  },
  {
    title: 'Custom AI for your business',
    description:
      'Aibaze builds your next AI SaaS business from concept to launch. We empower startups to succeed faster with custom AI-powered software solutions.',
    image: images[3],
  },
  {
    title: 'Custom AI for your business',
    description:
      'Aibaze builds your next AI SaaS business from concept to launch. We empower startups to succeed faster with custom AI-powered software solutions.',
    image: images[2],
  },
  {
    title: 'Custom AI for your business',
    description:
      'Aibaze builds your next AI SaaS business from concept to launch. We empower startups to succeed faster with custom AI-powered software solutions.',
    image: images[5],
  },
];

export default function Component() {
  return (
    <Section
      title="Solution"
      subtitle="Transform Your Vision Into Powerful AI Products"
      description="Launch your MVP in weeks, not months, with our proven development process."
      className="bg-neutral-100 text-black"
    >
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-neutral-800"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              type: 'spring',
              stiffness: 100,
              damping: 30,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold text-primary">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-foreground">
                {feature.description}
              </p>
            </div>

            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
