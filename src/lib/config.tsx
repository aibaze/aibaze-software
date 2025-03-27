import { Icons } from "@/components/icons";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Agenticaller",
  description: "Enterprise AI Voice Agent Solutions",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["AI Voice Agents", "Automated Sales", "Lead Qualification", "ROI-Driven Automation"],
  ctaLink:"https://calendar.app.google/SdCB8dsnamqTVUbCA",
  saasLink:"https://site.agenticaller.com?from=agency-website",
  keys: {
    mixpanel: process.env.NEXT_PUBLIC_MIXPALNEL_TOKEN || "",
  },
  links: {
    email: "info.agenticaller@gmail.com",
    twitter: "https://x.com/agenticaller_agency",
    discord: "#",
    github: "#",
    instagram:
      "https://www.instagram.com/aibaze_agency?igsh=MTJmd2hiNnU4Z2pieg==",
    linkedin: "https://www.linkedin.com/company/aibaze-agency",
  },
  header: [
    {trigger: "Contact", href: "/contact"},
    {
      trigger: "Solutions",
      content: {
        items: [
          {
            title: "Custom Phone AI Agents",
            href: "#",
            description: "Tailored automation solutions for growing companies.",
          },
          {
            title: "Phone AI Agents Training",
            href: "#",
            description: "Scalable AI automation for large organizations.",
          },
          {
            title: "White Labeled Platform",
            href: "#",
            description: "API access and integration tools for developers.",
          },
         
        ],
      },
    },
  ],
  pricingMain: [
    {
      name: "STARTER",
      href: "#",
      price: "$0",
      period: "call",
      yearlyPrice: "$0",
      features: [
        {
          title: "Comprehensive Business Analysis",
          text: "We analyze your current processes to identify key automation opportunities with highest ROI potential.",
        },
        {
          title: "Custom ROI Projection",
          text: "Receive a detailed cost-benefit analysis and projected ROI timeline for your AI voice agents.",
        },
        {
          title: "Technical Implementation Roadmap",
          text: "Get a clear implementation plan with timeline, resource requirements, and integration specifications.",
        },
        {
          title: "AI Voice Agent Demo",
          text: "Experience a live demonstration of an AI voice agent customized for your specific industry needs.",
        },
      ],
      description: "No cost, no obligation ROI assessment",
      buttonText: "Book Your Discovery Call",
      isPopular: true,
    },
  ],
  pricing: [
    {
      name: "BASIC",
      href: "#",
      price: "$19",
      period: "month",
      yearlyPrice: "$16",
      features: [
        "1 User",
        "5GB Storage",
        "Basic Support",
        "Limited API Access",
        "Standard Analytics",
      ],
      description: "Perfect for individuals and small projects",
      buttonText: "Subscribe",
      isPopular: false,
    },
    {
      name: "PRO",
      href: "#",
      price: "$49",
      period: "month",
      yearlyPrice: "$40",
      features: [
        "5 Users",
        "50GB Storage",
        "Priority Support",
        "Full API Access",
        "Advanced Analytics",
      ],
      description: "Ideal for growing businesses and teams",
      buttonText: "Subscribe",
      isPopular: true,
    },
    {
      name: "ENTERPRISE",
      href: "#",
      price: "$99",
      period: "month",
      yearlyPrice: "$82",
      features: [
        "Unlimited Users",
        "500GB Storage",
        "24/7 Premium Support",
        "Custom Integrations",
        "AI-Powered Insights",
      ],
      description: "For large-scale operations and high-volume users",
      buttonText: "Subscribe",
      isPopular: false,
    },
  ],
  faqs: [
  
    {
      question: "How do your AI voice agents integrate with our existing systems?",
      answer: (
        <span>
          Our AI voice agents seamlessly integrate with your existing phone systems, CRM platforms, scheduling tools, and other business software. We handle all technical aspects of integration, requiring minimal IT resources from your team. This ensures a smooth transition with no disruption to your current operations.
        </span>
      ),
    },
    {
      question: "What types of businesses benefit most from your AI voice agents?",
      answer: (
        <span>
          Our solution delivers exceptional results for businesses with high call volumes, recurring appointment scheduling, lead qualification needs, or customer support requirements. This includes industries like real estate, healthcare, financial services, SaaS, and professional services. If your business relies on phone communication for sales or operations, our AI voice agents can drive significant improvements.
        </span>
      ),
    },
    {
      question: "How do you ensure voice quality and natural conversation flow?",
      answer: (
        <span>
          Our AI voice agents use state-of-the-art natural language processing and voice synthesis technology that&apos;s virtually indistinguishable from human conversation. We customize each agent with your specific brand voice, terminology, and conversation flows. Regular optimization ensures the system continuously improves based on real conversation data.
        </span>
      ),
    },
    {
      question: "What kind of support do you provide after implementation?",
      answer: (
        <span>
          We provide comprehensive post-implementation support including 24/7 monitoring, regular performance reporting, ongoing optimization, and dedicated account management. Our team continuously analyzes conversation data to identify opportunities for improvement, ensuring your AI voice agents deliver maximum ROI month after month.
        </span>
      ),
    },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { href: "#", text: "Features", icon: null },
        { href: "#", text: "Pricing", icon: null },
        { href: "#", text: "Documentation", icon: null },
        { href: "#", text: "API", icon: null },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "#", text: "About Us", icon: null },
        { href: "#", text: "Careers", icon: null },
        { href: "#", text: "Blog", icon: null },
        { href: "#", text: "Press", icon: null },
        { href: "#", text: "Partners", icon: null },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "#", text: "Community", icon: null },
        { href: "#", text: "Contact", icon: null },
        { href: "#", text: "Support", icon: null },
        { href: "#", text: "Status", icon: null },
      ],
    },
    {
      title: "Social",
      links: [
        {
          href: "#",
          text: "Twitter",
          icon: <FaTwitter />,
        },
        {
          href: "#",
          text: "Instagram",
          icon: <RiInstagramFill />,
        },
        {
          href: "#",
          text: "Youtube",
          icon: <FaYoutube />,
        },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
