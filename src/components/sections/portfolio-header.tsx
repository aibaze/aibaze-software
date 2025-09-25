'use client';

import { motion } from 'framer-motion';

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
  return (
    <motion.div
      className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className || ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:mb-12 md:mb-16 md:flex-row md:items-start md:gap-8">
        {/* Text Content */}
        <div className="flex-1">
          <motion.div
            className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400 sm:mb-4 sm:text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {portfolioLabel}
          </motion.div>

          <motion.h2
            className="font-proxima-nova text-3xl leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
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
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white sm:h-[150px] sm:w-[150px] md:h-[180px] md:w-[180px] lg:h-[200px] lg:w-[200px]"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
