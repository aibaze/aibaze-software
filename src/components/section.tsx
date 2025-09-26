import { cn } from '@/lib/utils';
import { useMediaQuery } from 'react-responsive';
interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  bigFont?: boolean;
  blackTitle?: boolean;
}

export default function Section({
  id,
  title,
  subtitle,
  description,
  children,
  className,
  bigFont,
  blackTitle,
}: SectionProps) {
  const sectionId = title ? title.toLowerCase().replace(/\s+/g, '-') : id;
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <section id={id || sectionId}>
      <div className={className}>
        <div className="container relative mx-auto max-w-7xl px-4 py-16">
          <div
            className={`mx-auto space-y-4 pb-6 text-${isMobile ? 'left' : 'center'}`}
          >
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
                style={{ fontFamily: 'proxima-nova, sans-serif' }}
                className={cn(
                  'mx-auto mt-4 max-w-xs text-4xl sm:max-w-none sm:text-4xl md:text-5xl',
                  bigFont && 'text-6xl'
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
