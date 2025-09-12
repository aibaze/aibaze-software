import Features from "@/components/features-horizontal";
import Section from "@/components/section";
import { BarChart3, Brain, FileText, LineChart } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Mike",
    subtitle: "AI SaaS Platform",
    content: "Complete AI-powered SaaS platform with intelligent user management, automated workflows, and scalable architecture. Reduces development time by 70% while improving user engagement by 40%.",
    image: "https://i.ibb.co/MDD6jnJk/Mike.png",
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: "Bella",
    subtitle: "SaaS Growth Engine",
    content: "AI-powered growth automation that converts trials to paid users with 40% higher success rate than traditional methods. Eliminates manual onboarding and reduces churn by 35% through intelligent user journeys.",
    image: "https://i.ibb.co/Zzd27CsG/Bella.png",
    icon: <Brain className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "Liam",
    subtitle: "AI SaaS Analytics",
    content: "Intelligent analytics platform that provides real-time insights into user behavior, product performance, and growth metrics. Generates 3x more actionable insights than traditional analytics at a fraction of the cost.",
    image: "https://i.ibb.co/wHxW0NV/Liam.png",
    icon: <LineChart className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: "Jessie",
    subtitle: "SaaS Business Intelligence",
    content: "AI-powered business intelligence that analyzes SaaS metrics, user patterns, and market trends in real-time. Increases conversion rates by up to 50% while reducing decision-making time by an average of 30%.",
    image: "https://i.ibb.co/RTRqsMnt/Jessie.png",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="Your AI Voice Team" subtitle="Purpose-Built AI Agents for Every Business Need">
      <Features collapseDelay={10000} linePosition="bottom" data={data} />
    </Section>
  );
}
