import { cn } from '@/lib/utils';
interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  blackTitle?: boolean;
}

export default function Section({
  id,
  title,
  subtitle,
  description,
  children,
  className,
  blackTitle,
}: SectionProps) {
  const sectionId = title ? title.toLowerCase().replace(/\s+/g, '-') : id;
  return (
    <section id={id || sectionId}>
      <div className={className}>
        <div className="container relative mx-auto max-w-7xl px-4 py-16">
          <div className="mx-auto space-y-4 pb-6 text-center">
            {title && (
              <h2
                className={cn(
                  'font-mono text-sm font-medium uppercase tracking-wider text-primary',
                  blackTitle && 'text-black'
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <h3
                style={{ fontFamily: 'proxima-nova, sans-serif' }}
                className="mx-auto mt-4 max-w-xs text-4xl sm:max-w-none sm:text-4xl md:text-5xl"
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
