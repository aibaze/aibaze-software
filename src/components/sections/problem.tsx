import BlurFade from '@/components/magicui/blur-fade';
import Section from '@/components/section';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Shield, Zap } from 'lucide-react';

const problems = [
  {
    title: 'Complex Technical Development',
    description:
      'Building a successful AI business requires deep technical expertise, market understanding, and rapid iteration capabilities that most startups lack.',
    icon: Brain,
  },
  {
    title: 'Slow Time-to-Market',
    description:
      'Startups that launch faster capture market share. Traditional development cycles take 6-12 months, while AI-powered solutions can launch in 2-3 months with proper strategy.',
    icon: Zap,
  },
  {
    title: 'Unreliable Solutions',
    description:
      'Most startups lack the technical expertise to build scalable AI platforms. Without proper architecture and AI integration, they struggle to compete and scale effectively.',
    icon: Shield,
  },
];

export default function Component() {
  return (
    <Section
      title="Problem"
      subtitle="Stop Letting Technical Challenges Hold Your AI Business Back"
    >
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {problems.map((problem, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="border-none bg-background shadow-none">
              <CardContent className="flex flex-col items-center justify-center space-y-4 p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <problem.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{problem.title}</h3>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
