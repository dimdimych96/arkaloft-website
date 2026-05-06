// Performance monitoring and optimization
// Simple throttle helper
const throttle = <T extends (...args: any[]) => void>(fn: T, wait: number) => {
  let last = 0
  let timer: any
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - last >= wait) {
      last = now
      fn(...args)
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now()
        timer = null
        fn(...args)
      }, wait - (now - last))
    }
  }
}

export const trackPerformance = () => {
  if (typeof window === 'undefined') return

  // Track Core Web Vitals
  const trackWebVitals = () => {
    // Largest Contentful Paint (LCP)
    const logLcp = throttle((value: number) => console.log('LCP:', value), 2000)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      const lcp = Math.max(0, lastEntry.startTime)
      logLcp(lcp)
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay (FID)
    const logFid = throttle((value: number) => console.log('FID:', value), 2000)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      entries.forEach((entry) => {
        const fid = Math.max(0, entry.processingStart - entry.startTime)
        logFid(fid)
      })
    }).observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift (CLS)
    let clsValue = 0
    const logCls = throttle((value: number) => console.log('CLS:', value), 2000)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
      logCls(Math.max(0, clsValue))
    }).observe({ entryTypes: ['layout-shift'] })
  }

  // Track page load performance
  const trackPageLoad = () => {
    const logMetrics = throttle((m: any) => console.log('Performance Metrics:', m), 2000)
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      const metrics = {
        domContentLoaded: Math.max(0, navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
        loadComplete: Math.max(0, navigation.loadEventEnd - navigation.loadEventStart),
        totalTime: Math.max(0, navigation.loadEventEnd - navigation.fetchStart),
        firstByte: Math.max(0, navigation.responseStart - navigation.fetchStart),
        domInteractive: Math.max(0, navigation.domInteractive - navigation.fetchStart)
      }
      logMetrics(metrics)
    })
  }

  // Track resource loading
  const trackResourceLoading = () => {
    const logSlow = throttle((payload: any) => console.log('Slow resource:', payload), 2000)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      entries.forEach((entry) => {
        if (entry.duration > 1000) { // Track resources taking more than 1 second
          logSlow({
            name: entry.name,
            duration: entry.duration,
            size: (entry as any).transferSize || 0
          })
        }
      })
    }).observe({ entryTypes: ['resource'] })
  }

  // Initialize all performance tracking
  trackWebVitals()
  trackPageLoad()
  trackResourceLoading()
}

// Image optimization helper
export const optimizeImage = (src: string, width?: number, quality: number = 80): string => {
  // For now, return original src
  // In production, you might want to use a CDN or image optimization service
  return src
}

// Lazy loading helper
export const createLazyImageObserver = (callback: (entry: IntersectionObserverEntry) => void) => {
  if (typeof window === 'undefined') return null

  return new IntersectionObserver((entries) => {
    entries.forEach(callback)
  }, {
    rootMargin: '50px 0px',
    threshold: 0.1
  })
}

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return

  const criticalImages = [
    '/images/hero/main.jpg',
    '/images/halls/0/1.jpg',
    '/images/halls/7/1.jpg'
  ]

  criticalImages.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
}

// Initialize performance tracking
export const initPerformanceTracking = () => {
  trackPerformance()
  preloadCriticalResources()
}
