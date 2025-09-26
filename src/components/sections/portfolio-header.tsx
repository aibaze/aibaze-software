'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

interface SectionHeaderProps {
  className?: string;
  portfolioLabel?: string;
  clientsVision?: string[];
}

export default function SectionHeader({
  className,
  portfolioLabel = 'PORTFOLIO',
  clientsVision = ['Our clients vision.', 'Engineered. Elevated.'],
}: SectionHeaderProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <motion.div
      className={`mx-auto max-w-7xl ${!isMobile ? 'pl-0 pr-0' : 'pl-8 pr-12'} ${className || ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:mb-12 md:mb-16 md:flex-row md:items-start md:gap-8">
        {/* Text Content */}
        <div className="flex-1">
          <motion.div
            className="mb-3 text-xs font-medium uppercase tracking-wider sm:mb-4 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {portfolioLabel}
          </motion.div>

          <motion.h2
            className="font-proxima-nova text-bold text-4xl leading-tight text-white sm:text-8xl md:text-5xl lg:text-6xl"
            style={{
              fontFamily: 'proxima-nova, sans-serif',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {clientsVision.map((line, index) => (
              <>
                <span key={index}>{line}</span>
                <br key={index} />
              </>
            ))}
          </motion.h2>
        </div>

        {/* Decorative Arrow - Hidden on mobile */}
        <motion.div
          className="relative hidden flex-shrink-0 sm:flex"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Image width={120} height={120} src={`/arrow.svg`} alt={`arrow`} />
        </motion.div>
      </div>
    </motion.div>
  );
}
