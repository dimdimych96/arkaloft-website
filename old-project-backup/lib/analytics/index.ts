import { initGoogleAnalytics, trackPageView, trackEvent } from './googleAnalytics'
import { initYandexMetrika, trackYandexEvent } from './yandexMetrika'
import { initPerformanceTracking } from './performance'
import { initHeatmapTracking } from './heatmap'
import { initPerformanceMonitoring } from './performanceMonitor'

// Initialize all analytics
export const initAnalytics = () => {
  // Initialize Google Analytics
  initGoogleAnalytics()
  
  // Initialize Yandex Metrika
  initYandexMetrika()
  
  // Initialize performance tracking
  initPerformanceTracking()
  
  // Initialize heatmap tracking
  initHeatmapTracking()
  
  // Initialize performance monitoring
  initPerformanceMonitoring()
}

// Track page view in all analytics
export const trackPageViewAll = (url: string, title?: string) => {
  trackPageView(url, title)
  trackYandexEvent('page_view', { url, title })
}

// Track custom event in all analytics
export const trackEventAll = (eventName: string, parameters?: Record<string, any>) => {
  trackEvent(eventName, parameters)
  trackYandexEvent(eventName, parameters)
}

// Track booking events
export const trackBookingEventAll = (step: string, data?: Record<string, any>) => {
  trackEvent('booking_step', {
    event_category: 'booking',
    step,
    ...data
  })
  trackYandexEvent('booking_funnel', {
    step,
    ...data
  })
}

// Track service interactions
export const trackServiceInteractionAll = (serviceName: string, action: string) => {
  trackEvent('service_interaction', {
    event_category: 'services',
    service_name: serviceName,
    action
  })
  trackYandexEvent('service_interaction', {
    service_name: serviceName,
    action
  })
}

// Track hall selection
export const trackHallSelectionAll = (hallType: string) => {
  trackEvent('hall_selection', {
    event_category: 'booking',
    hall_type: hallType
  })
  trackYandexEvent('hall_selection', {
    hall_type: hallType
  })
}

// Track package selection
export const trackPackageSelectionAll = (packageName: string, price?: number) => {
  trackEvent('package_selection', {
    event_category: 'booking',
    package_name: packageName,
    value: price,
    currency: 'RUB'
  })
  trackYandexEvent('package_selection', {
    package_name: packageName,
    price
  })
}

// Track WhatsApp redirect
export const trackWhatsAppRedirectAll = (bookingData: Record<string, any>) => {
  trackEvent('whatsapp_redirect', {
    event_category: 'conversion',
    hall_type: bookingData.hallType,
    package_type: bookingData.packageType,
    guest_count: bookingData.guestCount
  })
  trackYandexEvent('whatsapp_redirect', {
    hall_type: bookingData.hallType,
    package_type: bookingData.packageType,
    guest_count: bookingData.guestCount
  })
}

// Track virtual tour
export const trackVirtualTourAll = () => {
  trackEvent('virtual_tour_start', {
    event_category: 'engagement'
  })
  trackYandexEvent('virtual_tour')
}

// Track review interactions
export const trackReviewInteractionAll = (action: string) => {
  trackEvent('review_interaction', {
    event_category: 'engagement',
    action
  })
  trackYandexEvent('review_interaction', {
    action
  })
}

// Track contact form
export const trackContactFormAll = (formType: string) => {
  trackEvent('contact_form_submit', {
    event_category: 'lead_generation',
    form_type: formType
  })
  trackYandexEvent('contact_form', {
    form_type: formType
  })
}

// Track scroll depth
export const trackScrollDepthAll = (depth: number) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    scroll_depth: depth
  })
  trackYandexEvent('scroll_depth', {
    depth
  })
}

// Track time on page
export const trackTimeOnPageAll = (timeInSeconds: number) => {
  trackEvent('time_on_page', {
    event_category: 'engagement',
    time_on_page: timeInSeconds
  })
  trackYandexEvent('time_on_page', {
    time: timeInSeconds
  })
}

// Export individual analytics for specific use cases
export * from './googleAnalytics'
export * from './yandexMetrika'
