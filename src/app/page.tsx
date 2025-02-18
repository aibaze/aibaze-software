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

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      {/* <Testimonials /> temporary comment */}
      <Pricing />
      {/*  <FAQ /> */}
      <CTA />
      <CalendlyWidget/>
      <iframe className="airtable-embed" src="https://airtable.com/embed/appnliIniznmrUiU3/pagspRYRZnNNaAhvJ/form" frameBorder="0" width="100%" height="533" style={{ background: "transparent", border: "1px solid #ccc" }}></iframe>
      <Footer />
    </main>
  );
}
