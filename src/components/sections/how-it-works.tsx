import Features from "@/components/features-vertical";
import Section from "@/components/section";
import { Sparkles, Upload, Zap } from "lucide-react";
import { HeroCTA } from "./hero";

const data = [
  {
    id: 1,
    title: "1. Free Strategy Session",
    content:
      "Identify specific revenue opportunities and cost-saving potential for your business within a 30-minute consultation. Our experts map your current processes and create a custom implementation roadmap with projected ROI.",
    image: "/dashboard.png",
    icon: <Upload className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "2. Custom AI Voice Agent Development",
    content:
      "We build your tailored solution that integrates seamlessly with your existing systems—no technical expertise required from your team. Your AI agents are trained on your specific business logic, brand voice, and customer engagement protocols.",
    image: "/dashboard.png",
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Continuous Revenue Optimization",
    content:
      "Your AI agents continuously improve, adapting to customer feedback and delivering measurable ROI month after month. We provide regular performance reports highlighting cost savings, revenue generated, and opportunities for further optimization.",
    image: "/dashboard.png",
    icon: <Sparkles className="w-6 h-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section
      title="How it works"
      subtitle="From Implementation to ROI in 3 Simple Steps"
    >
      <Features data={data} />
      <HeroCTA hideText={true} />
    </Section>
  );
}
