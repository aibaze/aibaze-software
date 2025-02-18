'use client';

import Script from 'next/script';

export default function CalendlyWidget() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div 
        className="calendly-inline-widget" 
        data-url="https://calendly.com/soytomasgoldenberg/agenticaller?hide_gdpr_banner=1" 
        style={{ minWidth: '320px', height: '700px' }}
      />
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </div>
  );
}