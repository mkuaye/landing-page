import { useCallback } from 'react';
import { track } from '@vercel/analytics';

interface TrackEventOptions {
  name: string;
  properties?: Record<string, any>;
  options?: {
    flags?: Record<string, boolean>;
  };
}

export const useAnalytics = () => {
  const trackEvent = useCallback(({ name, properties, options }: TrackEventOptions) => {
    try {
      track(name, {
        ...properties,
        timestamp: new Date().toISOString(),
      }, options);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }, []);

  const trackPageView = useCallback((pageName: string) => {
    trackEvent({
      name: 'page_view',
      properties: {
        page: pageName,
        referrer: document.referrer,
        url: window.location.href,
      },
    });
  }, [trackEvent]);

  const trackButtonClick = useCallback((buttonName: string, additionalProps?: Record<string, any>) => {
    trackEvent({
      name: 'button_click',
      properties: {
        button: buttonName,
        ...additionalProps,
      },
    });
  }, [trackEvent]);

  const trackFormSubmission = useCallback((formName: string, success: boolean, additionalProps?: Record<string, any>) => {
    trackEvent({
      name: 'form_submission',
      properties: {
        form: formName,
        success,
        ...additionalProps,
      },
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackButtonClick,
    trackFormSubmission,
  };
}; 