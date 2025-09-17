import Features from '@/components/features-vertical';
import Section from '@/components/section';
import { Sparkles, Upload, Zap } from 'lucide-react';
import { HeroCTA } from './hero';

const data = [
  {
    id: 1,
    title: '1. Free Strategy Session',
    content:
      'Identify your AI opportunity, target market, and integration potential within a 30-minute consultation. Our experts map your business model and create a custom development roadmap with launch timeline.',
    image: '/discovery-call.jpg',
    icon: <Upload className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: '2. AI Development & Launch',
    content:
      'We build your complete AI-powered business solution with innovative features, scalable architecture, and user-friendly interface. Your solution is designed for rapid growth with automated onboarding and AI-driven user experiences.',
    image: '/build.jpg',
    icon: <Zap className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: '3. Launch, Growth & Support',
    content:
      'We deploy your AI solution and provide ongoing support to ensure it scales and achieves your goals.',
    image: '/maintainance.jpg',
    icon: <Sparkles className="h-6 w-6 text-primary" />,
  },
];

export default function Component({
  onContactClick,
}: {
  onContactClick?: () => void;
}) {
  return (
    <Section
      title="How it works"
      subtitle="From Concept to AI Success in 3 Simple Steps"
    >
      <Features data={data} />
      <HeroCTA hideText={true} onContactClick={onContactClick} />
    </Section>
  );
}
