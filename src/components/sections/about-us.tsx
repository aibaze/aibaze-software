'use client';

import { motion } from 'framer-motion';

const stats = [
  {
    number: '8+',
    description: 'Years in the industry',
  },
  {
    number: '9.6',
    description: 'Customer rate experience',
  },
  {
    number: '10/10',
    description: 'On-time rate schedule',
  },
];

const techStack = [
  { name: 'AWS' },
  { name: 'React' },
  { name: 'Next.js' },
  { name: 'Node.js' },
  { name: 'JavaScript' },
  { name: 'TypeScript' },
  { name: 'Prisma' },
  { name: 'Figma' },
];

export default function AboutUs() {
  return (
    <section id="about-us" className="bg-black py-20 text-white">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Statistics Section */}
        <div className="mb-20 text-center">
          <motion.h2
            className="mb-4 text-sm font-medium uppercase tracking-wider text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            ABOUT US
          </motion.h2>

          <motion.p
            className="mb-12 text-xl text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Tangible results, right on schedule.
          </motion.p>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="rounded-xl bg-gray-900 p-10 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-3 text-5xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-sm font-medium uppercase tracking-wide text-gray-400">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="relative">
          {/* Tech logos positioned around the title */}
          <div className="relative mx-auto max-w-4xl py-20">
            {/* Left side logos */}
            <div className="absolute left-0 top-1/2 grid -translate-y-1/2 grid-cols-2 gap-6">
              {techStack.slice(0, 4).map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                    <div className="text-lg font-bold text-gray-600">
                      {tech.name.charAt(0)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-300">{tech.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Right side logos */}
            <div className="absolute right-0 top-1/2 grid -translate-y-1/2 grid-cols-2 gap-6">
              {techStack.slice(4, 8).map((tech, index) => (
                <motion.div
                  key={index + 4}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + (index + 4) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                    <div className="text-lg font-bold text-gray-600">
                      {tech.name.charAt(0)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-300">{tech.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Center content */}
            <div className="flex justify-center">
              <div className="text-center">
                <motion.h3
                  className="text-3xl font-semibold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Tech Stack
                </motion.h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
