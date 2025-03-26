import Features from "@/components/features-horizontal";
import Section from "@/components/section";
import { BarChart3, Brain, FileText, LineChart } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Mike",
    subtitle: "Customer Support Expert",
    content: "Handles customer inquiries 24/7, resolving up to 80% of support tickets without human intervention. Reduces support costs while improving customer satisfaction scores by an average of 35%.",
    image: "https://i.ibb.co/MDD6jnJk/Mike.png",
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: "Bella",
    subtitle: "Appointment Setter",
    content: "Converts inquiries into booked appointments with a 40% higher success rate than traditional methods. Eliminates scheduling conflicts and reduces no-shows by 35% through automated reminders and confirmations.",
    image: "https://i.ibb.co/Zzd27CsG/Bella.png",
    icon: <Brain className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "Liam",
    subtitle: "Cold Outreach Agent",
    content: "Conducts personalized outreach at scale, qualifying prospects with 24/7 availability. Generates 3x more qualified leads than traditional methods at a fraction of the cost, with consistent messaging across all interactions.",
    image: "https://i.ibb.co/wHxW0NV/Liam.png",
    icon: <LineChart className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: "Jessie",
    subtitle: "Lead Qualification Agent",
    content: "Qualifies leads in real-time using your exact criteria, ensuring your sales team only speaks with prospects ready to buy. Increases conversion rates by up to 50% while reducing sales cycle length by an average of 30%.",
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
