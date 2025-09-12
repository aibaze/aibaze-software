'use client'
import Blog from "@/components/sections/blog";
import CTA from "@/components/sections/cta";
import FAQ from "@/components/sections/faq";
import Features from "@/components/sections/features";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import Logos from "@/components/sections/logos";
/* import Pricing from "@/components/sections/pricing"; */
import Pricing from "@/components/sections/pricing-one";
import Problem from "@/components/sections/problem";
import Solution from "@/components/sections/solution";
import Testimonials from "@/components/sections/testimonials";
import TestimonialsCarousel from "@/components/sections/testimonials-carousel";
import CalendlyWidget from '@/components/CalendlyWidget';
import Contact from "@/components/sections/contact";
import VapiScript from "@/components/VapiScript";
import OurProducts from "@/components/sections/our-products";
import AgentsExample from "@/components/agents-example";
import VideoSection from "@/components/sections/video-section";

const getIsMobile = () => {
  if (typeof window !== 'undefined') {
  const isMobile = window.innerWidth < 768;
  return isMobile;

  }
  return false;
};

export default function Home() {
  const isMobile =getIsMobile()

  return (
    <main>
      <Header />
      <Hero />
      {!isMobile ? (
        <Logos/>
      ):<div style={{marginBottom:"100px"}}></div>}
      <Problem/>
      <Solution/>

      <HowItWorks />
      <OurProducts />
      <Pricing />
      <FAQ />
      <CTA />
      <VideoSection />
      <Footer />
    </main>
  );
}
