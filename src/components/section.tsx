import { cn } from '@/lib/utils';
import { useMediaQuery } from 'react-responsive';
interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string | React.ReactNode[];
  description?: string;
  children?: React.ReactNode;
  className?: string;
  bigFont?: boolean;
  showAvailability?: boolean;
  blackTitle?: boolean;
  centeredTitle?: boolean;
}
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

export default function Section({
  id,
  title,
  showAvailability,
  subtitle,
  description,
  centeredTitle,
  children,
  className,
  bigFont,
  blackTitle,
}: SectionProps) {
  const sectionId = title ? title.toLowerCase().replace(/\s+/g, '-') : id;
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const textAlign = isMobile ? 'left' : 'center';
  return (
    <section
      id={id || sectionId}
      className={
        showAvailability
          ? 'flex flex-col items-center justify-center pt-10'
          : ''
      }
    >
      {showAvailability && (
        <motion.div
          className="flex items-center space-x-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0],
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
            y: {
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          whileHover={{
            scale: 1.05,
            y: -2,
          }}
        >
          <div className="relative">
            <div className="h-3 w-3 rounded-full bg-lime-400"></div>
            <div className="absolute inset-0 h-3 w-3 animate-ping rounded-full bg-lime-400/30"></div>
          </div>
          <span className="text-sm font-medium text-white">
            Available for projects
          </span>
        </motion.div>
      )}
      <div className={className}>
        <div
          className={`container relative mx-auto max-w-7xl px-4 ${isMobile ? 'py-16 pt-5' : 'py-16'}`}
        >
          <div className={`mx-auto space-y-4 pb-6 text-${textAlign} `}>
            {title && (
              <h2
                className={cn(
                  `font-mono text-sm font-medium uppercase tracking-wider text-primary ${isMobile ? 'pl-[7%] text-left' : 'text-center'}`,
                  blackTitle && 'text-black',
                  bigFont && 'text-2xl'
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <h3
                style={
                  !isMobile
                    ? {
                        fontFamily: 'proxima-nova, sans-serif',
                        fontSize: '62px',
                        fontWeight: '500',
                        textAlign: 'left',
                      }
                    : {
                        fontFamily: 'proxima-nova, sans-serif',
                        textAlign: 'center',
                        paddingLeft: '7%',
                        fontSize: '28px',

                        fontWeight: '500',
                      }
                }
                className={cn(
                  'font-400 mx-auto mt-4 text-4xl sm:text-4xl md:text-5xl'
                )}
              >
                {subtitle}
              </h3>
            )}
            {description && (
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
