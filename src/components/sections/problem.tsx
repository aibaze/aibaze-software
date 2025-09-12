import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Shield, Zap } from "lucide-react";

const problems = [
  {
    title: "Complex Technical Development",
    description:
      "Building a successful AI SaaS requires deep technical expertise, market understanding, and rapid iteration capabilities that most startups lack.",
    icon: Brain,
  },
  {
    title: "Slow Time-to-Market",
    description:
      "Startups that launch faster capture market share. Traditional development cycles take 6-12 months, while AI-powered SaaS can launch in 2-3 months with proper strategy.",
    icon: Zap,
  },
  {
    title: "Unreliable Solutions",
    description:
      "Most startups lack the technical expertise to build scalable AI SaaS platforms. Without proper architecture and AI integration, they struggle to compete and scale effectively.",
    icon: Shield,
  }
];

export default function Component() {
  return (
    <Section
      title="Problem"
      subtitle="Stop Letting Technical Challenges Hold Your SaaS Back"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {problems.map((problem, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="bg-background border-none shadow-none">
              <CardContent className="p-6 space-y-4 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-primary" />
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
