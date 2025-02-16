import Features from "@/components/features-vertical";
import Section from "@/components/section";
import { Sparkles, Upload, Zap } from "lucide-react";
import { HeroCTA } from "./hero";

const data = [
  {
    id: 1,
    title: "1. Free Discovery Call",
    content:
      "Begin with a complimentary discovery call where we assess your current call-handling processes and pinpoint opportunities for an AI-powered voice assistant to enhance customer engagement.",
    image: "/dashboard.png",
    icon: <Upload className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "2. Custom AI Phone Agent Development",
    content:
      "Our specialists craft a custom AI voice assistant that integrates effortlessly with your telephony system, leveraging advanced natural language processing to deliver efficient, personalized interactions that transform your customer engagement.",
    image: "/dashboard.png",
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Continuous Optimization",
    content:
      "We continuously refine your AI phone assistant by monitoring performance, gathering insights, and updating its algorithms to ensure it evolves with your business and consistently exceeds customer expectations.",
    image: "/dashboard.png",
    icon: <Sparkles className="w-6 h-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section
      title="How it works"
      subtitle="Archive AI-Efficiency in 3 Simple Steps"
    >
      <Features data={data} />
      <HeroCTA hideText={true} />
    </Section>
  );
}
