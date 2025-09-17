'use client';

import Section from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';

const caseStudies = [
  {
    id: 1,
    image: 'https://i.ibb.co/d4bbbKpr/Screenshot-2025-03-27-at-4-16-48-PM.png',
    description:
      'A tech company struggling with manual lead qualification saw 300% increase in qualified leads after implementing our AI voice agent dashboard. The platform now handles 2,000+ calls daily with 95% accuracy in lead scoring.',
    alt: 'AI Voice Agents Admin Dashboard showing analytics',
    title: 'AI Voice Agents Dashboard',
    titleSize: 'text-xl',
    result: '300% increase in qualified leads',
    industry: 'AI Lead Generation',
  },
  {
    id: 2,
    image: '/profile-header.png',
    alt: 'AI business platform dashboard for entrepreneurs',
    title: 'All-in-One AI Business Platform',
    description:
      'An online entrepreneur reduced operational overhead by 60% using our comprehensive platform. Automated booking requests, service management, and analytics helped them scale from $10K to $100K monthly revenue in 6 months.',
    titleSize: 'text-xl',
    result: '60% reduction in operational overhead',
    industry: 'Online Entrepreneurship',
  },
  {
    id: 3,
    image: '/profile-cv.png',
    alt: 'AI resume builder interface showing personality analysis',
    title: 'AI Resume Builder',
    description:
      'Job seekers using our personality-based AI resume builder saw 85% higher interview callback rates. The platform analyzes Big Five personality traits to create tailored resumes that match job requirements and company culture.',
    titleSize: 'text-xl',
    result: '85% higher interview callback rates',
    industry: 'Career Development',
  },
  {
    id: 4,
    image: '/ai-engine.png',
    alt: 'AI vision test interface for sports injury prevention',
    title: 'AI Vision Test for Sports',
    description:
      'A sports clinic reduced injury rates by 40% using our AI vision test. The mobile-first solution turns any smartphone into a clinical sensor, enabling preventive care and early injury detection for athletes at all levels.',
    titleSize: 'text-xl',
    result: '40% reduction in injury rates',
    industry: 'Sports Medicine',
  },
  {
    id: 5,
    image: '/ai-engine.png',
    alt: 'AI-powered customer service automation platform',
    title: 'AI Customer Service Automation',
    description:
      'An e-commerce company handling 50,000+ daily inquiries reduced response time from 24 hours to 2 minutes using our AI customer service platform. Customer satisfaction increased by 35% while cutting support costs by 70%.',
    titleSize: 'text-xl',
    result: '95% faster response time',
    industry: 'E-commerce Support',
  },
  {
    id: 6,
    image: '/ai-engine.png',
    alt: 'AI-powered content creation and marketing platform',
    title: 'AI Content Marketing Platform',
    description:
      'A digital marketing agency increased client content output by 500% while maintaining quality standards. Our AI platform generates, optimizes, and distributes content across multiple channels, freeing up 80% of creative team time.',
    titleSize: 'text-xl',
    result: '500% increase in content output',
    industry: 'Digital Marketing',
  },
];

const OurProducts = () => {
  return (
    <Section
      id="our-products"
      title="Success Stories"
      subtitle="Real Results from Real Clients"
      description="Discover how our AI solutions have transformed businesses across different industries with measurable outcomes."
    >
      <div className="mt-10 flex flex-wrap justify-start gap-8 px-4">
        {caseStudies.map(caseStudy => (
          <div
            key={caseStudy.id}
            className="group w-full max-w-sm cursor-pointer overflow-hidden rounded-xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-105 hover:border-white/40 hover:bg-white/20 hover:shadow-2xl"
          >
            <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg">
              <Image
                src={caseStudy.image}
                alt={caseStudy.alt}
                fill
                className="rounded-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 rounded-lg bg-white bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-10"></div>
              <div className="absolute left-3 top-3 rounded-full bg-green-500/90 px-2 py-1 text-xs font-semibold text-white">
                {caseStudy.industry}
              </div>
            </div>
            <div className="p-4">
              <h4
                className={`mb-2 ${caseStudy.titleSize} font-bold text-white transition-colors duration-300 group-hover:text-white/90`}
              >
                {caseStudy.title}
              </h4>
              <div className="mb-3">
                <span className="inline-block rounded-full bg-gradient-to-r from-green-400 to-blue-500 px-3 py-1 text-sm font-bold text-white">
                  {caseStudy.result}
                </span>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-white/80 transition-colors duration-300 group-hover:text-white/90">
                {caseStudy.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default OurProducts;
