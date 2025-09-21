import Features from '@/components/features-horizontal';
import Section from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BarChart3, Brain, FileText, LineChart } from 'lucide-react';

const data = [
  {
    id: 1,
    title: 'Mike',
    subtitle: 'Customer Support Expert',
    content:
      'Handles customer inquiries 24/7, resolving 80% of support tickets automatically.',
    image: 'https://i.ibb.co/MDD6jnJk/Mike.png',
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: 'Bella',
    subtitle: 'Appointment Setter',
    content:
      'Converts inquiries into booked appointments with 40% higher success rate.',
    image: 'https://i.ibb.co/Zzd27CsG/Bella.png',
    icon: <Brain className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: 'Liam',
    subtitle: 'Cold Outreach Agent',
    content:
      'Conducts personalized outreach at scale, generating 3x more qualified leads.',
    image: 'https://i.ibb.co/wHxW0NV/Liam.png',
    icon: <LineChart className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: 'Jessie',
    subtitle: 'Lead Qualification Agent',
    content:
      'Qualifies leads in real-time, ensuring your sales team only speaks with ready-to-buy prospects.',
    image: 'https://i.ibb.co/RTRqsMnt/Jessie.png',
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section
      subtitle="CHECK OUT AGENTICALLER"
      title="Purpose-Built AI Agents for Every Business Need"
    >
      <Features collapseDelay={10000} linePosition="bottom" data={data} />

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => window.open('https://agenticaller.com', '_blank')}
          className={cn(
            buttonVariants({ variant: 'default' }),
            'flex w-full gap-2 text-background sm:w-auto'
          )}
        >
          <strong>Try Agenticaller Now</strong>
        </button>
      </div>
    </Section>
  );
}
