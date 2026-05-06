// Google Analytics 4 configuration
export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-XXXXXXXXXX'

// Initialize Google Analytics
export const initGoogleAnalytics = () => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return

  // Load Google Analytics script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true
  })
}

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    page_title: title || document.title,
    page_location: window.location.href
  })
}

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', eventName, {
    event_category: 'engagement',
    ...parameters
  })
}

// Track booking events
export const trackBookingEvent = (step: string, data?: Record<string, any>) => {
  trackEvent('booking_step', {
    event_category: 'booking',
    step,
    ...data
  })
}

// Track service interactions
export const trackServiceInteraction = (serviceName: string, action: string) => {
  trackEvent('service_interaction', {
    event_category: 'services',
    service_name: serviceName,
    action
  })
}

// Track hall selection
export const trackHallSelection = (hallType: string) => {
  trackEvent('hall_selection', {
    event_category: 'booking',
    hall_type: hallType
  })
}

// Track package selection
export const trackPackageSelection = (packageName: string, price?: number) => {
  trackEvent('package_selection', {
    event_category: 'booking',
    package_name: packageName,
    value: price,
    currency: 'RUB'
  })
}

// Track WhatsApp redirect
export const trackWhatsAppRedirect = (bookingData: Record<string, any>) => {
  trackEvent('whatsapp_redirect', {
    event_category: 'conversion',
    hall_type: bookingData.hallType,
    package_type: bookingData.packageType,
    guest_count: bookingData.guestCount
  })
}

// Track virtual tour
export const trackVirtualTour = () => {
  trackEvent('virtual_tour_start', {
    event_category: 'engagement'
  })
}

// Track review interactions
export const trackReviewInteraction = (action: string) => {
  trackEvent('review_interaction', {
    event_category: 'engagement',
    action
  })
}

// Track contact form submissions
export const trackContactForm = (formType: string) => {
  trackEvent('contact_form_submit', {
    event_category: 'lead_generation',
    form_type: formType
  })
}

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    scroll_depth: depth
  })
}

// Track time on page
export const trackTimeOnPage = (timeInSeconds: number) => {
  trackEvent('time_on_page', {
    event_category: 'engagement',
    time_on_page: timeInSeconds
  })
}

// Declare global gtag function
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}
