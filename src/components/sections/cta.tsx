import { Icons } from '@/components/icons';
import Section from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMediaQuery } from 'react-responsive';
export default function CtaSection({
  onContactClick,
}: {
  onContactClick?: () => void;
}) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <div
      className={`} relative bg-cover bg-center bg-no-repeat`}
      style={{
        backgroundImage: 'url(/background-footer.svg)',
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="relative z-10">
        <Section
          showAvailability={true}
          id="cta"
          title=""
          bigFont={true}
          subtitle=" Ready?  Let’s build 
your project together. "
          className="py-0"
        >
          <div className="flex w-full flex-col items-center justify-center space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <button
              onClick={onContactClick}
              style={{
                maxWidth: '200px',
              }}
              className={cn(
                buttonVariants({ variant: 'default' }),
                'flex gap-2 text-background sm:w-auto'
              )}
            >
              <strong>Book a meeting</strong>
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
}
