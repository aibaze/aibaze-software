'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface CalendlyWidgetProps {
  url?: string;
  height?: string | number;
}

export default function CalendlyWidget({ 
  url = 'https://calendly.com/soytomasgoldenberg/agenticaller',
  height = '700px'
}: CalendlyWidgetProps) {
  const isInitialized = useRef(false);

  const initCalendly = () => {
    if ((window as any).Calendly && !isInitialized.current) {
      console.log('Calendly is initializing');
      (window as any).Calendly.initInlineWidget({
        url,
        parentElement: document.getElementsByClassName('calendly-inline-widget')[0],
      });
      isInitialized.current = true;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isInitialized.current = false;
    };
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div 
        className="calendly-inline-widget" 
        data-url={url}
        style={{ 
          minWidth: '320px',
          height: typeof height === 'number' ? `${height}px` : height,
        }}
      />
      
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={initCalendly}
      />
    </div>
  );
}