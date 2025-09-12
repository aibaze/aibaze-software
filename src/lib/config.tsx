import { Icons } from "@/components/icons";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Aibaze",
  description: "AI SaaS Development Agency - Build Your Next AI SaaS Business",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["AI SaaS Development", "SaaS Business", "Startup Development", "AI Software", "SaaS Agency"],
  ctaLink:"https://calendar.app.google/SdCB8dsnamqTVUbCA",
  saasLink:"https://site.aibaze.com?from=agency-website",
  keys: {
    mixpanel: process.env.NEXT_PUBLIC_MIXPALNEL_TOKEN || "",
  },
  links: {
    email: "info.aibaze@gmail.com",
    twitter: "https://x.com/aibaze_agency",
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
            title: "AI SaaS Development",
            href: "#",
            description: "Custom AI-powered SaaS solutions for startups and growing businesses.",
          },
          {
            title: "SaaS Business Strategy",
            href: "#",
            description: "Complete SaaS business development from concept to launch.",
          },
          {
            title: "AI Integration Services",
            href: "#",
            description: "Seamless AI integration into your existing SaaS platform.",
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
          title: "SaaS Business Analysis",
          text: "We analyze your SaaS concept to identify key AI integration opportunities and market positioning for maximum success potential.",
        },
        {
          title: "Custom SaaS Development Roadmap",
          text: "Receive a detailed development plan and launch timeline for your AI-powered SaaS platform.",
        },
        {
          title: "Technical Implementation",
          text: "We deliver a quality product you can test with a live url to release new iterations weekly with your feedback.",
        },
        {
          title: "Launch & Growth",
          text: "We launch your SaaS and provide ongoing support to ensure it scales and achieves your goals.",
        },
      ],
      description: "No cost, no obligation SaaS strategy assessment",
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
      question: "How do you help build AI SaaS businesses from scratch?",
      answer: (
        <span>
          We provide end-to-end AI SaaS development services, from concept validation to market launch. Our team handles technical architecture, AI integration, user interface design, and growth optimization, requiring minimal technical expertise from your startup team.
        </span>
      ),
    },
    {
      question: "What types of startups benefit most from AI SaaS development?",
      answer: (
        <span>
          Our AI SaaS development services deliver exceptional results for startups in B2B and B2C software, data analytics, customer service, and automation platforms. If your startup aims to build a business that can scale rapidly with AI-powered features, our development approach can accelerate your time-to-market and competitive advantage.
        </span>
      ),
    },
    {
      question: "How do you ensure SaaS platform performance and scalability?",
      answer: (
        <span>
          Our AI SaaS platforms use state-of-the-art technology that delivers exceptional performance and user experience at scale. We design each platform with scalable architecture, intelligent AI features, and optimized user interfaces. Regular monitoring and optimization ensure the platform continuously improves based on user data and growth metrics.
        </span>
      ),
    },
    {
      question: "What kind of support do you provide after implementation?",
      answer: (
        <span>
          We provide comprehensive post-launch support, treating our customers as true partners in success. This includes 24/7 platform monitoring, regular performance reporting, growth optimization, and dedicated account management. Our team continuously analyzes  metrics to identify opportunities for feature enhancement and market expansion, working closely with you to ensure your AI SaaS delivers maximum growth potential and achieves your business goals.
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
