'use client';

import Section from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { siteConfig } from '@/lib/config';
import useWindowSize from '@/lib/hooks/use-window-size';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function PricingSection({
  onContactClick,
}: {
  onContactClick?: () => void;
}) {
  const [isMonthly] = useState(true);
  const { isDesktop } = useWindowSize();

  return (
    <Section
      title="Pricing"
      subtitle="Solutions Tailored to Your AI Launch Goals"
    >
      <img
        src="/3D-obj1.png"
        width={250}
        className="absolute left-[88%] top-[0px] z-10 rotate-[80deg] transform"
      />
      <div className="">
        {siteConfig.pricingMain.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={{}}
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: 'spring',
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `hover:shadow-3xl relative rounded-2xl border-[1px] bg-white/10 p-6 text-center shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out hover:scale-105 hover:border-white/40 hover:bg-white/20 lg:flex lg:flex-col lg:justify-center`,
              plan.isPopular
                ? 'border-[2px] border-white/30 hover:border-white/50'
                : 'border-white/20',
              index === 0 || index === siteConfig.pricing.length - 1
                ? '-translate-z-[50px] rotate-y-[10deg] z-0 translate-x-0 translate-y-0 transform'
                : 'z-10',
              index === 0 && 'origin-right',
              index === siteConfig.pricing.length - 1 && 'origin-left'
            )}
          >
            {plan.isPopular && (
              <div className="absolute right-0 top-0 flex items-center rounded-bl-xl rounded-tr-xl bg-primary px-2 py-0.5">
                <FaStar className="text-black" />
                <span className="ml-1 font-sans font-semibold text-black">
                  ROI Focused
                </span>
              </div>
            )}
            <div>
              <p className="text-base font-semibold text-muted-foreground">
                {plan.name}
              </p>
              <p className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-foreground">
                  {isMonthly ? plan.price : plan.yearlyPrice}
                </span>
                {plan.period !== 'Next 3 months' && (
                  <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                    / {plan.period}
                  </span>
                )}
              </p>

              <p className="text-xs leading-5 text-muted-foreground">
                Typical ROI: 30-90 days
              </p>

              <ul className="mt-5 flex flex-col gap-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <div className="flex flex-col text-left">
                      <span>{feature.title}</span>
                      <span>{feature.text}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <hr className="my-4 w-full" />

              <button
                onClick={onContactClick}
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                  }),
                  'group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter',
                  'transform-gpu ring-offset-current transition-all duration-300 ease-out hover:bg-primary hover:text-black hover:ring-2 hover:ring-primary hover:ring-offset-1',
                  plan.isPopular
                    ? 'bg-primary text-black'
                    : 'bg-white text-black'
                )}
              >
                {plan.buttonText}
              </button>
              <p className="mt-6 text-xs leading-5 text-muted-foreground">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
