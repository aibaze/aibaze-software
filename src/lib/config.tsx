import { Icons } from "@/components/icons";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "AgentiCaller",
  description: "AI Phone Call Automation",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["AI AGENT", "AI Phone", "CUSTOMER SUPPORT", "AI Agency"],
  keys: {
    mixpanel: process.env.NEXT_PUBLIC_MIXPALNEL_TOKEN || "",
  },
  links: {
    email: "support@agenticaller.com",
    twitter: "https://x.com/agenticaller_agency",
    discord: "#",
    github: "#",
    instagram:
      "https://www.instagram.com/aibaze_agency?igsh=MTJmd2hiNnU4Z2pieg==",
    linkedin: "https://www.linkedin.com/company/aibaze-agency",
  },
  header: [
 {
      trigger: "Features",
      content: {
        main: {
          icon: <Icons.logo className="h-6 w-6" />,
          title: "AI-Powered Automation",
          description: "Streamline your workflow with intelligent automation.",
          href: "#",
        },
        items: [
          {
            href: "#",
            title: "Task Automation",
            description: "Automate repetitive tasks and save time.",
          },
          {
            href: "#",
            title: "Workflow Optimization",
            description: "Optimize your processes with AI-driven insights.",
          },
          {
            href: "#",
            title: "Intelligent Scheduling",
            description: "AI-powered scheduling for maximum efficiency.",
          },
        ],
      },
    },
    {
      trigger: "Solutions",
      content: {
        items: [
          {
            title: "For Small Businesses",
            href: "#",
            description: "Tailored automation solutions for growing companies.",
          },
          {
            title: "Enterprise",
            href: "#",
            description: "Scalable AI automation for large organizations.",
          },
          {
            title: "Developers",
            href: "#",
            description: "API access and integration tools for developers.",
          },
          {
            title: "Healthcare",
            href: "#",
            description: "Specialized automation for healthcare workflows.",
          },
          {
            title: "Finance",
            href: "#",
            description: "AI-driven process automation for financial services.",
          },
          {
            title: "Education",
            href: "#",
            description:
              "Streamline administrative tasks in educational institutions.",
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
          title: "Free Discovery Session.",
          text: "Explore your unique business needs and uncover new opportunities.",
        },
        {
          title: "Free Proposal & Consultation",
          text: "We provide a detailed proposal and consultation at no cost to you.",
        },

        {
          title: "No-Obligation Consultation",
          text: "Not sure if it’s the right fit? Let’s chat first—you decide what’s next.",
        },
        {
          title: "Phone Call Assistant Development",
          text: "We develop a custom AI phone assistant to match your business needs.",
        },
      ],
      description: "Free discovery consultation",
      buttonText: "Book Now",
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
      question: "What is our AI Automation Agency?",
      answer: (
        <span>
          We are a dedicated AI Automation agency that builds custom agents
          tailored to your business needs. Whether you need lead generation and
          nurturing, social media automation, or any other type of AI-driven
          solution, our team designs and implements systems that streamline
          operations and drive growth.
        </span>
      ),
    },
    {
      question: "How can I get started with your services?",
      answer: (
        <span>
          Getting started is simple! Contact us via our website or schedule a
          consultation to discuss your business requirements. We&apos;ll work
          with you to develop a custom AI solution that perfectly fits your
          operational goals.
        </span>
      ),
    },
    {
      question: "What types of AI automation services do you offer?",
      answer: (
        <span>
          Our expertise covers a wide range of AI automation services, including
          custom lead generation and nurturing agents, social media automation
          tools, customer service bots, and many other tailored solutions
          designed to optimize your business processes.
        </span>
      ),
    },
    {
      question: "Are your solutions suitable for businesses of all sizes?",
      answer: (
        <span>
          Absolutely. Our custom AI agents are designed to scale with your
          business—from startups to large enterprises. We ensure that each
          solution is tailored to address your specific needs, regardless of
          your company&apos;s size.
        </span>
      ),
    },
    {
      question: "What kind of support do you provide after implementation?",
      answer: (
        <span>
          We offer comprehensive post-implementation support, including
          maintenance, training, and ongoing updates. Our dedicated support team
          is always available to help ensure your custom AI agents continue to
          operate efficiently and effectively.
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
