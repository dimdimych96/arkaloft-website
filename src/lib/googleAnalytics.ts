// Google AnalyticsGA4 event tracking
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const sendGAEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }
};

// Event names
export const EventNames = {
  CLICK_BOOKING: 'click_booking',
  CLICK_PHONE: 'click_phone',
  FORM_SUBMIT: 'form_submit',
  VIEW_STORY: 'view_story',
};
