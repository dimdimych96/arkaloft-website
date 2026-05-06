// Heatmap and advanced analytics tracking

interface HeatmapData {
  x: number
  y: number
  timestamp: number
  element: string
  action: string
}

interface ScrollHeatmapData {
  scrollDepth: number
  timestamp: number
  pageHeight: number
}

class HeatmapTracker {
  private clickData: HeatmapData[] = []
  private scrollData: ScrollHeatmapData[] = []
  private isTracking = false

  startTracking() {
    if (this.isTracking) return
    this.isTracking = true

    // Track clicks
    document.addEventListener('click', this.trackClick.bind(this))
    
    // Track scroll
    document.addEventListener('scroll', this.trackScroll.bind(this))
    
    // Track mouse movements (throttled)
    document.addEventListener('mousemove', this.throttle(this.trackMouseMove.bind(this), 100))
    
    // Track form interactions
    document.addEventListener('focus', this.trackFormInteraction.bind(this), true)
    document.addEventListener('blur', this.trackFormInteraction.bind(this), true)
  }

  stopTracking() {
    this.isTracking = false
    document.removeEventListener('click', this.trackClick.bind(this))
    document.removeEventListener('scroll', this.trackScroll.bind(this))
    document.removeEventListener('mousemove', this.trackMouseMove.bind(this))
    document.removeEventListener('focus', this.trackFormInteraction.bind(this), true)
    document.removeEventListener('blur', this.trackFormInteraction.bind(this), true)
  }

  private trackClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (!target) return

    const rect = target.getBoundingClientRect()
    const data: HeatmapData = {
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now(),
      element: this.getElementSelector(target),
      action: 'click'
    }

    this.clickData.push(data)
    this.sendHeatmapData('click', data)
  }

  private trackScroll(event: Event) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollDepth = Math.round((scrollTop / documentHeight) * 100)

    const data: ScrollHeatmapData = {
      scrollDepth,
      timestamp: Date.now(),
      pageHeight: document.documentElement.scrollHeight
    }

    this.scrollData.push(data)
    this.sendHeatmapData('scroll', data)
  }

  private trackMouseMove(event: MouseEvent) {
    // Track mouse movements for heatmap visualization
    const data = {
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now(),
      action: 'mousemove'
    }

    this.sendHeatmapData('mousemove', data)
  }

  private trackFormInteraction(event: FocusEvent) {
    const target = event.target as HTMLElement
    if (!target || !['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return

    const data = {
      element: this.getElementSelector(target),
      action: event.type,
      timestamp: Date.now(),
      value: (target as HTMLInputElement).value?.length || 0
    }

    this.sendHeatmapData('form_interaction', data)
  }

  private getElementSelector(element: HTMLElement): string {
    if (element.id) return `#${element.id}`
    if (element.className) return `.${element.className.split(' ')[0]}`
    return element.tagName.toLowerCase()
  }

  private sendHeatmapData(type: string, data: any) {
    // Send to analytics services
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'heatmap_data', {
        event_category: 'heatmap',
        event_label: type,
        custom_map: {
          heatmap_type: type,
          heatmap_data: JSON.stringify(data)
        }
      })
    }

    // Send to Yandex Metrika
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(import.meta.env.VITE_YANDEX_METRIKA_ID, 'reachGoal', 'heatmap_data', {
        type,
        data
      })
    }
  }

  private throttle(func: Function, limit: number) {
    let inThrottle: boolean
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  getClickHeatmap() {
    return this.clickData
  }

  getScrollHeatmap() {
    return this.scrollData
  }

  exportData() {
    return {
      clicks: this.clickData,
      scrolls: this.scrollData,
      timestamp: Date.now()
    }
  }
}

// Global heatmap tracker instance
export const heatmapTracker = new HeatmapTracker()

// Initialize heatmap tracking
export const initHeatmapTracking = () => {
  // Only start tracking in production or when explicitly enabled
  if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_HEATMAP === 'true') {
    heatmapTracker.startTracking()
  }
}

// Stop heatmap tracking
export const stopHeatmapTracking = () => {
  heatmapTracker.stopTracking()
}

// Get heatmap data
export const getHeatmapData = () => {
  return heatmapTracker.exportData()
}

// Track specific interactions
export const trackElementInteraction = (element: string, action: string, data?: any) => {
  const interactionData = {
    element,
    action,
    timestamp: Date.now(),
    ...data
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'element_interaction', {
      event_category: 'heatmap',
      event_label: `${element}_${action}`,
      custom_map: {
        element,
        action,
        data: JSON.stringify(interactionData)
      }
    })
  }
}

// Track booking funnel heatmap
export const trackBookingFunnelHeatmap = (step: string, data?: any) => {
  trackElementInteraction('booking_funnel', step, data)
}

// Track service interaction heatmap
export const trackServiceHeatmap = (serviceName: string, action: string) => {
  trackElementInteraction('service', action, { serviceName })
}

// Track hall interaction heatmap
export const trackHallHeatmap = (hallType: string, action: string) => {
  trackElementInteraction('hall', action, { hallType })
}

// Track package interaction heatmap
export const trackPackageHeatmap = (packageName: string, action: string) => {
  trackElementInteraction('package', action, { packageName })
}

// Track review interaction heatmap
export const trackReviewHeatmap = (action: string, reviewId?: string) => {
  trackElementInteraction('review', action, { reviewId })
}

// Track virtual tour heatmap
export const trackVirtualTourHeatmap = (action: string, imageIndex?: number) => {
  trackElementInteraction('virtual_tour', action, { imageIndex })
}

// Track contact form heatmap
export const trackContactFormHeatmap = (field: string, action: string) => {
  trackElementInteraction('contact_form', action, { field })
}

// Track navigation heatmap
export const trackNavigationHeatmap = (section: string, action: string) => {
  trackElementInteraction('navigation', action, { section })
}

// Track CTA heatmap
export const trackCTAHeatmap = (ctaText: string, action: string, location?: string) => {
  trackElementInteraction('cta', action, { ctaText, location })
}

// Declare global types
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    ym: (id: string, method: string, target: string, params?: any) => void
  }
}
