// Conversion funnel tracking and optimization

interface FunnelStep {
  step: string
  timestamp: number
  data?: any
}

interface ConversionFunnel {
  sessionId: string
  startTime: number
  steps: FunnelStep[]
  completed: boolean
  conversionValue?: number
}

class ConversionFunnelTracker {
  private funnels: Map<string, ConversionFunnel> = new Map()
  private currentSessionId: string = ''

  constructor() {
    this.currentSessionId = this.generateSessionId()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  startFunnel(funnelType: string = 'booking'): string {
    const funnelId = `${funnelType}_${this.currentSessionId}`
    const funnel: ConversionFunnel = {
      sessionId: this.currentSessionId,
      startTime: Date.now(),
      steps: [],
      completed: false
    }

    this.funnels.set(funnelId, funnel)
    this.trackFunnelStep(funnelId, 'funnel_start', { funnelType })
    
    return funnelId
  }

  trackFunnelStep(funnelId: string, step: string, data?: any) {
    const funnel = this.funnels.get(funnelId)
    if (!funnel) return

    const funnelStep: FunnelStep = {
      step,
      timestamp: Date.now(),
      data
    }

    funnel.steps.push(funnelStep)
    this.funnels.set(funnelId, funnel)

    // Send to analytics
    this.sendFunnelEvent(funnelId, step, data)
  }

  completeFunnel(funnelId: string, conversionValue?: number) {
    const funnel = this.funnels.get(funnelId)
    if (!funnel) return

    funnel.completed = true
    funnel.conversionValue = conversionValue
    this.funnels.set(funnelId, funnel)

    this.trackFunnelStep(funnelId, 'funnel_complete', { conversionValue })
    this.sendConversionEvent(funnelId, conversionValue)
  }

  abandonFunnel(funnelId: string, reason?: string) {
    const funnel = this.funnels.get(funnelId)
    if (!funnel) return

    this.trackFunnelStep(funnelId, 'funnel_abandon', { reason })
    this.sendAbandonmentEvent(funnelId, reason)
  }

  private sendFunnelEvent(funnelId: string, step: string, data?: any) {
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'funnel_step', {
        event_category: 'conversion',
        event_label: step,
        funnel_id: funnelId,
        step_number: this.getStepNumber(funnelId),
        custom_map: {
          funnel_id: funnelId,
          step: step,
          step_data: JSON.stringify(data)
        }
      })
    }

    // Yandex Metrika
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(import.meta.env.VITE_YANDEX_METRIKA_ID, 'reachGoal', 'funnel_step', {
        funnelId,
        step,
        data
      })
    }
  }

  private sendConversionEvent(funnelId: string, conversionValue?: number) {
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        event_category: 'conversion',
        event_label: 'funnel_complete',
        value: conversionValue || 0,
        currency: 'RUB',
        funnel_id: funnelId,
        custom_map: {
          funnel_id: funnelId,
          conversion_value: conversionValue || 0
        }
      })
    }

    // Yandex Metrika
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(import.meta.env.VITE_YANDEX_METRIKA_ID, 'reachGoal', 'conversion', {
        funnelId,
        value: conversionValue || 0
      })
    }
  }

  private sendAbandonmentEvent(funnelId: string, reason?: string) {
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'funnel_abandon', {
        event_category: 'conversion',
        event_label: 'funnel_abandon',
        funnel_id: funnelId,
        abandon_reason: reason,
        custom_map: {
          funnel_id: funnelId,
          abandon_reason: reason
        }
      })
    }

    // Yandex Metrika
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(import.meta.env.VITE_YANDEX_METRIKA_ID, 'reachGoal', 'funnel_abandon', {
        funnelId,
        reason
      })
    }
  }

  private getStepNumber(funnelId: string): number {
    const funnel = this.funnels.get(funnelId)
    return funnel ? funnel.steps.length : 0
  }

  getFunnel(funnelId: string): ConversionFunnel | undefined {
    return this.funnels.get(funnelId)
  }

  getAllFunnels(): ConversionFunnel[] {
    return Array.from(this.funnels.values())
  }

  getFunnelAnalytics() {
    const funnels = this.getAllFunnels()
    const completed = funnels.filter(f => f.completed)
    const abandoned = funnels.filter(f => !f.completed)

    return {
      total: funnels.length,
      completed: completed.length,
      abandoned: abandoned.length,
      conversionRate: funnels.length > 0 ? (completed.length / funnels.length) * 100 : 0,
      averageSteps: funnels.reduce((acc, f) => acc + f.steps.length, 0) / funnels.length,
      totalValue: completed.reduce((acc, f) => acc + (f.conversionValue || 0), 0)
    }
  }
}

// Global funnel tracker instance
export const funnelTracker = new ConversionFunnelTracker()

// Booking funnel specific functions
export const startBookingFunnel = (): string => {
  return funnelTracker.startFunnel('booking')
}

export const trackBookingStep = (funnelId: string, step: string, data?: any) => {
  funnelTracker.trackFunnelStep(funnelId, step, data)
}

export const completeBookingFunnel = (funnelId: string, value: number) => {
  funnelTracker.completeFunnel(funnelId, value)
}

export const abandonBookingFunnel = (funnelId: string, reason?: string) => {
  funnelTracker.abandonFunnel(funnelId, reason)
}

// Service inquiry funnel
export const startServiceInquiryFunnel = (): string => {
  return funnelTracker.startFunnel('service_inquiry')
}

export const trackServiceInquiryStep = (funnelId: string, step: string, data?: any) => {
  funnelTracker.trackFunnelStep(funnelId, step, data)
}

export const completeServiceInquiryFunnel = (funnelId: string, value: number) => {
  funnelTracker.completeFunnel(funnelId, value)
}

// Contact form funnel
export const startContactFunnel = (): string => {
  return funnelTracker.startFunnel('contact')
}

export const trackContactStep = (funnelId: string, step: string, data?: any) => {
  funnelTracker.trackFunnelStep(funnelId, step, data)
}

export const completeContactFunnel = (funnelId: string) => {
  funnelTracker.completeFunnel(funnelId, 0) // Contact form has no monetary value
}

// Virtual tour funnel
export const startVirtualTourFunnel = (): string => {
  return funnelTracker.startFunnel('virtual_tour')
}

export const trackVirtualTourStep = (funnelId: string, step: string, data?: any) => {
  funnelTracker.trackFunnelStep(funnelId, step, data)
}

export const completeVirtualTourFunnel = (funnelId: string) => {
  funnelTracker.completeFunnel(funnelId, 0)
}

// Get funnel analytics
export const getFunnelAnalytics = () => {
  return funnelTracker.getFunnelAnalytics()
}

// Track specific booking steps
export const trackBookingFunnelSteps = {
  // Step 1: Modal opened
  modalOpened: (funnelId: string, source: string) => {
    trackBookingStep(funnelId, 'modal_opened', { source })
  },

  // Step 2: Contact info filled
  contactInfoFilled: (funnelId: string, hasPhone: boolean, hasEmail: boolean) => {
    trackBookingStep(funnelId, 'contact_info_filled', { hasPhone, hasEmail })
  },

  // Step 3: Hall selected
  hallSelected: (funnelId: string, hallType: string) => {
    trackBookingStep(funnelId, 'hall_selected', { hallType })
  },

  // Step 4: Date and time selected
  dateTimeSelected: (funnelId: string, date: string, time: string) => {
    trackBookingStep(funnelId, 'date_time_selected', { date, time })
  },

  // Step 5: Package selected
  packageSelected: (funnelId: string, packageName: string, price: number) => {
    trackBookingStep(funnelId, 'package_selected', { packageName, price })
  },

  // Step 6: Additional info filled
  additionalInfoFilled: (funnelId: string, childAge?: number, favoriteHero?: string) => {
    trackBookingStep(funnelId, 'additional_info_filled', { childAge, favoriteHero })
  },

  // Step 7: Form submitted
  formSubmitted: (funnelId: string, totalValue: number) => {
    trackBookingStep(funnelId, 'form_submitted', { totalValue })
  },

  // Step 8: WhatsApp redirect
  whatsappRedirect: (funnelId: string) => {
    trackBookingStep(funnelId, 'whatsapp_redirect', {})
  }
}

// Track abandonment reasons
export const trackAbandonmentReasons = {
  // User closed modal
  modalClosed: (funnelId: string) => {
    abandonBookingFunnel(funnelId, 'modal_closed')
  },

  // User left page
  pageLeft: (funnelId: string) => {
    abandonBookingFunnel(funnelId, 'page_left')
  },

  // Form validation failed
  validationFailed: (funnelId: string, field: string) => {
    abandonBookingFunnel(funnelId, `validation_failed_${field}`)
  },

  // Network error
  networkError: (funnelId: string) => {
    abandonBookingFunnel(funnelId, 'network_error')
  },

  // User timeout
  timeout: (funnelId: string) => {
    abandonBookingFunnel(funnelId, 'timeout')
  }
}

// Declare global types
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    ym: (id: string, method: string, target: string, params?: any) => void
  }
}
