// Яндекс.Метрика configuration
export const YANDEX_METRIKA_ID = import.meta.env.VITE_YANDEX_METRIKA_ID || 'XXXXXXXX'

// Initialize Yandex Metrika
export const initYandexMetrika = () => {
  if (typeof window === 'undefined' || !YANDEX_METRIKA_ID) return

  // Load Yandex Metrika script
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.innerHTML = `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(${YANDEX_METRIKA_ID}, "init", {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true,
      webvisor:true,
      trackHash:true
    });
  `
  document.head.appendChild(script)

  // Add noscript fallback
  const noscript = document.createElement('noscript')
  noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}" style="position:absolute; left:-9999px;" alt="" /></div>`
  document.body.appendChild(noscript)
}

// Track custom events in Yandex Metrika
export const trackYandexEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.ym) return

  window.ym(YANDEX_METRIKA_ID, 'reachGoal', eventName, params)
}

// Track booking funnel
export const trackBookingFunnel = (step: string, data?: Record<string, any>) => {
  trackYandexEvent('booking_funnel', {
    step,
    ...data
  })
}

// Track service views
export const trackServiceView = (serviceName: string) => {
  trackYandexEvent('service_view', {
    service_name: serviceName
  })
}

// Track hall views
export const trackHallView = (hallType: string) => {
  trackYandexEvent('hall_view', {
    hall_type: hallType
  })
}

// Track package views
export const trackPackageView = (packageName: string) => {
  trackYandexEvent('package_view', {
    package_name: packageName
  })
}

// Track WhatsApp redirects
export const trackWhatsAppRedirectYandex = (bookingData: Record<string, any>) => {
  trackYandexEvent('whatsapp_redirect', {
    hall_type: bookingData.hallType,
    package_type: bookingData.packageType,
    guest_count: bookingData.guestCount
  })
}

// Track virtual tour
export const trackVirtualTourYandex = () => {
  trackYandexEvent('virtual_tour')
}

// Track review interactions
export const trackReviewInteractionYandex = (action: string) => {
  trackYandexEvent('review_interaction', {
    action
  })
}

// Track contact form
export const trackContactFormYandex = (formType: string) => {
  trackYandexEvent('contact_form', {
    form_type: formType
  })
}

// Track scroll depth
export const trackScrollDepthYandex = (depth: number) => {
  trackYandexEvent('scroll_depth', {
    depth
  })
}

// Declare global ym function
declare global {
  interface Window {
    ym: (id: string, method: string, target: string, params?: any) => void
  }
}
