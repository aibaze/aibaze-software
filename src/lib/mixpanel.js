import mixpanel from 'mixpanel-browser';
import { siteConfig } from './config';

export const initMixpanel = () => {
  if (!siteConfig.keys.mixpanel) {
    console.warn('Mixpanel token is missing! Check your .env file.');
    return;
  }

  mixpanel.init(siteConfig.keys.mixpanel, {
    autocapture: true,
    track_pageview: true,
    persistence: 'localStorage',
    record_heatmap_data: true,
  });
};
