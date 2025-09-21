import Features from '@/components/features-vertical';
import Section from '@/components/section';
import { Search, Zap, Code, Shield, Rocket } from 'lucide-react';
import { HeroCTA } from './hero';

const data = [
  {
    id: 1,
    title: 'First Contact and Product Discovery',
    content:
      'Your idea meets technical reality. We collaborate to formulate product requirements, envision user journeys, and define the optimal tech stack to maximize efficiency and minimize costs.',
    image: 'https://i.ibb.co/Kc2kJhxB/110211.jpg',
    icon: <Search className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: 'Rapid UI Prototyping to define the product',
    content:
      'Validate assumptions with real users through low-fidelity wireframes, high-fidelity designs, and interactive prototypes. Test cheaply and quickly before costly development begins.',
    image: 'https://i.ibb.co/cS8yhQ8d/2149416723.jpg',
    icon: <Zap className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: 'Development & Project Management',
    content:
      'Code your Minimum Delightful Product using Agile principles in two-week sprints. Scalable code with compliance for HIPAA, PCI, and bank-level encryption.',
    image: 'https://i.ibb.co/zVR8tkLP/24170.jpg',
    icon: <Code className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: 'Quality Assurance and Launch',
    content:
      'Comprehensive testing throughout development. We catch problems early with usability testing, cross-device testing, and regression testing to ensure flawless launch.',
    image: 'https://i.ibb.co/Kc2kJhxB/110211.jpg',
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    id: 5,
    title: 'Support and Maintenance (Optional)',
    content:
      'Launch your app to app stores and the web. Most clients retain us as long-term development partners for ongoing support and continuous improvements.',
    image: 'https://i.ibb.co/cS8yhQ8d/2149416723.jpg',
    icon: <Rocket className="h-6 w-6 text-primary" />,
  },
];

export default function Component({
  onContactClick,
}: {
  onContactClick?: () => void;
}) {
  return (
    <Section
      title="Our Proven 5-Step Development Process"
      subtitle="HOW WE BUILD YOUR SUCCESS"
    >
      <Features data={data} />
      <HeroCTA hideText={true} onContactClick={onContactClick} />
    </Section>
  );
}
