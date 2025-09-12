import Features from "@/components/features-vertical";
import Section from "@/components/section";
import { Sparkles, Upload, Zap } from "lucide-react";
import { HeroCTA } from "./hero";

const data = [
  {
    id: 1,
    title: "1. Free Strategy Session",
    content:
      "Identify your SaaS opportunity, target market, and AI integration potential within a 30-minute consultation. Our experts map your business model and create a custom development roadmap with launch timeline.",
    image: "/discovery-call.jpg",
    icon: <Upload className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "2. AI SaaS Development & Launch",
    content:
      "We build your complete AI-powered SaaS platform with innovative features, scalable architecture, and user-friendly interface. Your SaaS is designed for rapid growth with automated onboarding and AI-driven user experiences.",
    image: "/build.jpg",
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Launch, Growth & Support",
    content:
      "We deploy your SaaS and provide ongoing support to ensure it scales and achieves your goals.",
    image: "/maintainance.jpg",
    icon: <Sparkles className="w-6 h-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section
      title="How it works"
      subtitle="From Concept to SaaS Success in 3 Simple Steps"
    >
      <Features data={data} />
      <HeroCTA hideText={true} />
    </Section>
  );
}
