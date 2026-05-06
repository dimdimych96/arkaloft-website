import { useEffect, useCallback } from 'react'
import {
  initAnalytics,
  trackPageViewAll,
  trackEventAll,
  trackBookingEventAll,
  trackServiceInteractionAll,
  trackHallSelectionAll,
  trackPackageSelectionAll,
  trackWhatsAppRedirectAll,
  trackVirtualTourAll,
  trackReviewInteractionAll,
  trackContactFormAll,
  trackScrollDepthAll,
  trackTimeOnPageAll
} from '../lib/analytics'

export const useAnalytics = () => {
  // Initialize analytics on mount
  useEffect(() => {
    initAnalytics()
  }, [])

  // Track page view
  const trackPageView = useCallback((url: string, title?: string) => {
    trackPageViewAll(url, title)
  }, [])

  // Track custom events
  const trackEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    trackEventAll(eventName, parameters)
  }, [])

  // Track booking events
  const trackBooking = useCallback((step: string, data?: Record<string, any>) => {
    trackBookingEventAll(step, data)
  }, [])

  // Track service interactions
  const trackService = useCallback((serviceName: string, action: string) => {
    trackServiceInteractionAll(serviceName, action)
  }, [])

  // Track hall selection
  const trackHall = useCallback((hallType: string) => {
    trackHallSelectionAll(hallType)
  }, [])

  // Track package selection
  const trackPackage = useCallback((packageName: string, price?: number) => {
    trackPackageSelectionAll(packageName, price)
  }, [])

  // Track WhatsApp redirect
  const trackWhatsApp = useCallback((bookingData: Record<string, any>) => {
    trackWhatsAppRedirectAll(bookingData)
  }, [])

  // Track virtual tour
  const trackVirtualTour = useCallback(() => {
    trackVirtualTourAll()
  }, [])

  // Track review interactions
  const trackReview = useCallback((action: string) => {
    trackReviewInteractionAll(action)
  }, [])

  // Track contact form
  const trackContact = useCallback((formType: string) => {
    trackContactFormAll(formType)
  }, [])

  // Track scroll depth
  const trackScroll = useCallback((depth: number) => {
    trackScrollDepthAll(depth)
  }, [])

  // Track time on page
  const trackTime = useCallback((timeInSeconds: number) => {
    trackTimeOnPageAll(timeInSeconds)
  }, [])

  return {
    trackPageView,
    trackEvent,
    trackBooking,
    trackService,
    trackHall,
    trackPackage,
    trackWhatsApp,
    trackVirtualTour,
    trackReview,
    trackContact,
    trackScroll,
    trackTime
  }
}

// Hook for tracking scroll depth
export const useScrollTracking = () => {
  const { trackScroll } = useAnalytics()

  useEffect(() => {
    let maxScrollDepth = 0
    let scrollCheckpoints = [25, 50, 75, 90, 100]
    let triggeredCheckpoints = new Set<number>()

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / documentHeight) * 100)

      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent
      }

      // Track scroll checkpoints
      scrollCheckpoints.forEach(checkpoint => {
        if (scrollPercent >= checkpoint && !triggeredCheckpoints.has(checkpoint)) {
          triggeredCheckpoints.add(checkpoint)
          trackScroll(checkpoint)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [trackScroll])
}

// Hook for tracking time on page
export const useTimeTracking = () => {
  const { trackTime } = useAnalytics()

  useEffect(() => {
    const startTime = Date.now()
    let timeCheckpoints = [30, 60, 120, 300, 600] // 30s, 1m, 2m, 5m, 10m
    let triggeredCheckpoints = new Set<number>()

    const checkTime = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000)
      
      timeCheckpoints.forEach(checkpoint => {
        if (timeOnPage >= checkpoint && !triggeredCheckpoints.has(checkpoint)) {
          triggeredCheckpoints.add(checkpoint)
          trackTime(checkpoint)
        }
      })
    }

    const interval = setInterval(checkTime, 10000) // Check every 10 seconds
    return () => clearInterval(interval)
  }, [trackTime])
}
