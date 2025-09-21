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
    <Section
      id="cta"
      title="Turning ideas into leading products"
      subtitle="Let's bring your idea to life "
      className="rounded-xl bg-primary/10 py-16"
    >
      <div className="flex w-full flex-col items-center justify-center space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <button
          onClick={onContactClick}
          className={cn(
            buttonVariants({ variant: 'default' }),
            'flex w-full gap-2 text-background sm:w-auto'
          )}
        >
          <strong>Book Your Discovery Call</strong>
        </button>
      </div>
    </Section>
  );
}
