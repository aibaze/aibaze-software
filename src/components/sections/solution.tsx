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
    title: 'AI-Powered Real Estate Intelligence',
    description:
      'Transform property management with AI-driven market analysis, automated property valuations, intelligent lead scoring, and predictive analytics for real estate professionals.',
    image: images[0],
  },
  {
    title: 'AI Marketing & Lead Generation Engine',
    description:
      'Revolutionize customer acquisition with AI-powered marketing automation, intelligent lead scoring, personalized campaigns, and predictive analytics that maximize ROI.',
    image: images[4],
  },
  {
    title: 'AI HR & Talent Management Suite',
    description:
      'Streamline recruitment and workforce management with AI-driven candidate screening, automated onboarding, performance analytics, and intelligent talent matching.',
    image: images[1],
  },

  {
    title: 'Custom AI Software Development',
    description:
      'Build your unique AI-powered solution from concept to deployment. We create tailored software that transforms your business processes with cutting-edge artificial intelligence.',
    image: images[3],
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
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
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
