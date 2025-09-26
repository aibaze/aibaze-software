import { Icons } from '@/components/icons';
import Section from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function CtaSection({
  onContactClick,
}: {
  onContactClick?: () => void;
}) {
  return (
    <div
      className="relative rounded-xl bg-cover bg-center bg-no-repeat py-16"
      style={{
        backgroundImage: 'url(/background-footer.svg)',
      }}
    >
      <div className="absolute inset-0 rounded-xl bg-black/80"></div>
      <div className="relative z-10">
        <Section
          id="cta"
          title="Ready? "
          bigFont={true}
          subtitle=" Let’s build 
your project together. "
          className="py-0"
        >
          <div className="flex w-full flex-col items-center justify-center space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <button
              onClick={onContactClick}
              className={cn(
                buttonVariants({ variant: 'default' }),
                'flex w-full gap-2 text-background sm:w-auto'
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
