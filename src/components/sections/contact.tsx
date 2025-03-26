import CalendlyWidget from '@/components/CalendlyWidget';
import { siteConfig } from '@/lib/config';

export default function Contact({showForm=false}:{showForm?:boolean}) {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center ">
            <h1 className="h1 mb-4">Contact Us</h1>
            <h1 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400">
              Schedule a <a target='_blank' href={siteConfig.ctaLink} className="text-blue-500 hover:text-blue-700">call</a> or fill out <a target='_blank' href="https://airtable.com/appnliIniznmrUiU3/pagspRYRZnNNaAhvJ/form" className="text-blue-500 hover:text-blue-700">this form</a> 
            </h1>
          </div>
          {/* Airtable Form */}
          {showForm && (
            <div className="mt-12">
                <iframe 
                className="airtable-embed" 
                src="https://airtable.com/embed/appnliIniznmrUiU3/pagspRYRZnNNaAhvJ/form" 
                frameBorder="0" 
                width="100%" 
                height="533" 
                style={{ background: "transparent", border: "1px solid #ccc" }}
                />
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
