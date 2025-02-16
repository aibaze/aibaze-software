import Features from "@/components/features-horizontal";
import Section from "@/components/section";
import { BarChart3, Brain, FileText, LineChart } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Mike",
    subtitle: "Customer Support Expert",
    image: "https://i.ibb.co/MDD6jnJk/Mike.png",
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: "Bella",
    subtitle: "Appointment setter",
    content: "",
    image: "https://i.ibb.co/Zzd27CsG/Bella.png",
    icon: <Brain className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "Liam",
    subtitle: "Cold Outreach Agent",
    content: "",
    image: "https://i.ibb.co/wHxW0NV/Liam.png",
    icon: <LineChart className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: "Jessie",
    subtitle: "Lead Qualification Agent",
    content: "",
    image: "https://i.ibb.co/RTRqsMnt/Jessie.png",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="Features" subtitle="Popular use cases">
      <Features collapseDelay={10000} linePosition="bottom" data={data} />
    </Section>
  );
}
