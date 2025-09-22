'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';
import { BorderBeam } from '@/components/magicui/border-beam';

type AccordionItemProps = {
  children: React.ReactNode;
  className?: string;
} & Accordion.AccordionItemProps;

const AccordionItem = forwardRef<
  HTMLDivElement,
  AccordionItemProps & { isActive?: boolean }
>(({ children, className, isActive = false, ...props }, forwardedRef) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    <Accordion.Item
      className={cn(
        'group relative transition-all duration-300 focus-within:relative focus-within:z-10',
        isActive
          ? 'overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-2xl dark:border-gray-700/20'
          : 'border-none bg-transparent shadow-none',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  </motion.div>
));
AccordionItem.displayName = 'AccordionItem';

type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps & { isActive?: boolean }
>(({ children, className, isActive = false, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={cn(
        'group/trigger flex flex-1 cursor-pointer items-center justify-between text-[15px] leading-none outline-none transition-all duration-200',
        isActive
          ? 'rounded-xl px-6 py-4 focus:bg-white/5 focus:ring-2 focus:ring-primary/20'
          : 'px-4 py-3 focus:bg-transparent focus:ring-0',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Trigger>
  </Accordion.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';
type AccordionContentProps = {
  children: ReactNode;
  className?: string;
} & Accordion.AccordionContentProps;

const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps & { isActive?: boolean }
>(({ children, className, isActive = false, ...props }, forwardedRef) => (
  <Accordion.Content
    className={cn(
      'data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down overflow-hidden text-[15px] font-medium',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <motion.div
      className={cn(isActive ? 'px-6 py-4' : 'px-4 py-3')}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {children}
    </motion.div>
  </Accordion.Content>
));
AccordionContent.displayName = 'AccordionContent';

export type FeaturesDataProps = {
  id: number;
  title: string;
  content: string;
  image?: string;
  video?: string;
  icon?: React.ReactNode;
};

export type FeaturesProps = {
  collapseDelay?: number;
  ltr?: boolean;
  linePosition?: 'left' | 'right' | 'top' | 'bottom';
  data: FeaturesDataProps[];
};

export default function Features({
  collapseDelay = 5000,
  ltr = false,
  linePosition = 'left',
  data = [],
}: FeaturesProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const carouselRef = useRef<HTMLUListElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isInView) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(-1);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isInView]);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelectorAll('.card')[index];
      if (card) {
        const cardRect = card.getBoundingClientRect();
        const carouselRect = carouselRef.current.getBoundingClientRect();
        const offset =
          cardRect.left -
          carouselRect.left -
          (carouselRect.width - cardRect.width) / 2;

        carouselRef.current.scrollTo({
          left: carouselRef.current.scrollLeft + offset,
          behavior: 'smooth',
        });
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex !== undefined ? (prevIndex + 1) % data.length : 0
      );
    }, collapseDelay);

    return () => clearInterval(timer);
  }, [collapseDelay, currentIndex, data.length]);

  useEffect(() => {
    const handleAutoScroll = () => {
      const nextIndex =
        (currentIndex !== undefined ? currentIndex + 1 : 0) % data.length;
      scrollToIndex(nextIndex);
    };

    const autoScrollTimer = setInterval(handleAutoScroll, collapseDelay);

    return () => clearInterval(autoScrollTimer);
  }, [collapseDelay, currentIndex, data.length]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const handleScroll = () => {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = carousel.querySelector('.card')?.clientWidth || 0;
        const newIndex = Math.min(
          Math.floor(scrollLeft / cardWidth),
          data.length - 1
        );
        setCurrentIndex(newIndex);
      };

      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [data.length]);

  return (
    <section ref={ref} id="features" className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/10 opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-primary/10 opacity-20 blur-3xl" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto my-8 grid h-full items-center gap-8 lg:my-16 lg:grid-cols-2 lg:gap-16">
            <div
              className={`order-1 hidden lg:order-[0] lg:flex ${
                ltr ? 'lg:order-2 lg:justify-end' : 'justify-start'
              }`}
            >
              <Accordion.Root
                className="w-full space-y-3"
                type="single"
                defaultValue={`item-${currentIndex}`}
                value={`item-${currentIndex}`}
                onValueChange={value =>
                  setCurrentIndex(Number(value.split('-')[1]))
                }
              >
                {data.map((item, index) => (
                  <AccordionItem
                    key={item.id}
                    isActive={currentIndex === index}
                    className={cn(
                      'align-center relative mb-4 transition-all duration-300 last:mb-0',
                      currentIndex === index
                        ? 'scale-[1.02] border-primary/30 bg-primary/10'
                        : ''
                    )}
                    value={`item-${index}`}
                  >
                    {/* Enhanced Progress Line */}
                    {linePosition === 'left' || linePosition === 'right' ? (
                      <div
                        className={`absolute bottom-0 top-0 h-full w-1 overflow-hidden rounded-full bg-gradient-to-b from-neutral-200/60 to-neutral-300/40 dark:from-neutral-700/60 dark:to-neutral-600/40 ${
                          linePosition === 'right'
                            ? 'left-auto right-2'
                            : 'left-2 right-auto'
                        }`}
                      >
                        <motion.div
                          className={`absolute left-0 top-0 w-full origin-top rounded-full bg-gradient-to-b from-primary via-primary/80 to-primary/60 shadow-lg`}
                          initial={{ height: 0 }}
                          animate={{
                            height: currentIndex === index ? '100%' : '0%',
                            boxShadow:
                              currentIndex === index
                                ? '0 0 20px rgba(var(--primary), 0.5)'
                                : '0 0 0px rgba(var(--primary), 0)',
                          }}
                          transition={{
                            duration:
                              currentIndex === index
                                ? collapseDelay / 1000
                                : 0.3,
                            ease: 'easeInOut',
                          }}
                        />
                      </div>
                    ) : null}

                    {/* Enhanced Horizontal Progress Line */}
                    {linePosition === 'top' || linePosition === 'bottom' ? (
                      <div
                        className={`absolute left-0 right-0 h-1 w-full overflow-hidden rounded-full bg-gradient-to-r from-neutral-200/60 to-neutral-300/40 dark:from-neutral-700/60 dark:to-neutral-600/40 ${
                          linePosition === 'bottom' ? 'bottom-2' : 'top-2'
                        }`}
                      >
                        <motion.div
                          className={`absolute left-0 ${
                            linePosition === 'bottom' ? 'bottom-0' : 'top-0'
                          } h-full origin-left rounded-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 shadow-lg`}
                          initial={{ width: 0 }}
                          animate={{
                            width: currentIndex === index ? '100%' : '0%',
                            boxShadow:
                              currentIndex === index
                                ? '0 0 20px rgba(var(--primary), 0.5)'
                                : '0 0 0px rgba(var(--primary), 0)',
                          }}
                          transition={{
                            duration:
                              currentIndex === index
                                ? collapseDelay / 1000
                                : 0.3,
                            ease: 'easeInOut',
                          }}
                        />
                      </div>
                    ) : null}

                    <AccordionTrigger
                      isActive={currentIndex === index}
                      className="align-center relative flex w-full items-center"
                    >
                      {/* Enhanced Icon Container */}
                      <motion.div
                        className={cn(
                          'item-box mx-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border shadow-lg transition-all duration-300 sm:mx-4 lg:mx-5 lg:h-16 lg:w-16',
                          currentIndex === index
                            ? 'border-primary/40 bg-gradient-to-br from-primary/30 to-primary/20 shadow-primary/20'
                            : 'border-primary/20 bg-gradient-to-br from-primary/20 to-primary/10'
                        )}
                      >
                        <motion.div
                          animate={{
                            scale: currentIndex === index ? 1.1 : 1,
                            rotate: currentIndex === index ? 3 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.icon}
                        </motion.div>
                      </motion.div>

                      <div className="flex-1">
                        <div className="pl-0 text-left text-lg font-bold transition-colors duration-300 lg:text-xl">
                          <motion.span
                            animate={{
                              color:
                                currentIndex === index
                                  ? 'hsl(var(--primary))'
                                  : 'inherit',
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.title}
                          </motion.span>
                        </div>

                        <div className="mt-2 justify-start pl-0 text-left text-sm leading-relaxed text-muted-foreground transition-colors duration-300 lg:text-base">
                          <motion.span
                            animate={{
                              opacity: currentIndex === index ? 1 : 0,
                              height: currentIndex === index ? 'auto' : 0,
                              overflow: 'hidden',
                              display:
                                currentIndex === index ? 'block' : 'none',
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.content}
                          </motion.span>
                        </div>
                      </div>
                    </AccordionTrigger>
                  </AccordionItem>
                ))}
              </Accordion.Root>
            </div>
            <div
              className={`relative h-[300px] min-h-[250px] w-auto sm:h-[400px] lg:h-[500px] ${
                ltr && 'lg:order-1'
              }`}
            >
              <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  {data[currentIndex]?.image ? (
                    <motion.img
                      key={`image-${currentIndex}`}
                      src={data[currentIndex].image}
                      alt="feature"
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      initial={{ opacity: 0, scale: 1.1, rotateY: 15 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.4, 0, 0.2, 1],
                        type: 'spring',
                        stiffness: 100,
                      }}
                    />
                  ) : data[currentIndex]?.video ? (
                    <motion.video
                      key={`video-${currentIndex}`}
                      preload="auto"
                      src={data[currentIndex].video}
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      loop
                      muted
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  ) : (
                    <motion.div
                      key={`placeholder-${currentIndex}`}
                      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-6xl text-primary/50">✨</div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Enhanced Border Beam Effect */}
                <BorderBeam
                  size={250}
                  duration={8}
                  delay={2}
                  borderWidth={2}
                  colorFrom="hsl(var(--primary))"
                  colorTo="hsl(var(--primary)/0)"
                />

                {/* Floating Particles Effect */}
                <div className="pointer-events-none absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-2 w-2 rounded-full bg-primary/30"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Mobile Carousel */}
            <ul
              ref={carouselRef}
              className="flex h-full snap-x snap-mandatory flex-nowrap overflow-x-auto px-4 py-6 [-ms-overflow-style:none] [-webkit-mask-image:linear-gradient(90deg,transparent,black_10%,white_90%,transparent)] [mask-image:linear-gradient(90deg,transparent,black_10%,white_90%,transparent)] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
            >
              {data.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={cn(
                    'card relative mr-4 grid h-full w-80 shrink-0 items-start justify-center transition-all duration-300 last:mr-0',
                    currentIndex === index
                      ? 'scale-110 rounded-xl border border-white/20 bg-white/5 px-6 py-8 backdrop-blur-2xl'
                      : 'border-none bg-transparent px-4 py-4 shadow-none'
                  )}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    scrollSnapAlign: 'center',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Enhanced Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 w-full overflow-hidden rounded-full bg-gradient-to-r from-neutral-200/60 to-neutral-300/40">
                    <motion.div
                      className={`absolute left-0 top-0 h-full origin-left rounded-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 shadow-lg`}
                      initial={{ width: 0 }}
                      animate={{
                        width: currentIndex === index ? '100%' : '0%',
                        boxShadow:
                          currentIndex === index
                            ? '0 0 15px rgba(var(--primary), 0.4)'
                            : '0 0 0px rgba(var(--primary), 0)',
                      }}
                      transition={{
                        duration:
                          currentIndex === index ? collapseDelay / 1000 : 0.3,
                        ease: 'easeInOut',
                      }}
                    />
                  </div>

                  {/* Enhanced Icon */}
                  <motion.div
                    className={cn(
                      'mb-6 flex h-16 w-16 items-center justify-center rounded-xl border shadow-lg transition-all duration-300',
                      currentIndex === index
                        ? 'border-primary/40 bg-gradient-to-br from-primary/30 to-primary/20 shadow-primary/20'
                        : 'border-primary/20 bg-gradient-to-br from-primary/20 to-primary/10'
                    )}
                    animate={{
                      scale: currentIndex === index ? 1.5 : 0.5,
                      rotate: currentIndex === index ? 2 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{
                        scale: currentIndex === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Content */}
                  <motion.h2
                    className="mb-3 text-center text-xl font-bold"
                    animate={{
                      color:
                        currentIndex === index
                          ? 'hsl(var(--primary))'
                          : 'inherit',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.title}
                  </motion.h2>

                  <motion.p
                    className="max-w-sm text-center text-base leading-relaxed text-muted-foreground"
                    style={{
                      opacity: currentIndex === index ? 1 : 0,
                      height: currentIndex === index ? 'auto' : 0,
                      overflow: 'hidden',
                      display: currentIndex === index ? 'block' : 'none',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.content}
                  </motion.p>

                  {/* Floating indicator */}
                  <motion.div
                    className="absolute right-4 top-4 h-3 w-3 rounded-full bg-primary/60"
                    animate={{
                      scale: currentIndex === index ? [1, 1.2, 1] : 0.8,
                      opacity: currentIndex === index ? [0.6, 1, 0.6] : 0.3,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
