// Advanced performance monitoring

interface PerformanceMetrics {
  lcp: number | null
  fid: number | null
  cls: number | null
  fcp: number | null
  ttfb: number | null
  loadTime: number | null
  domContentLoaded: number | null
  firstByte: number | null
}

interface ResourceMetrics {
  name: string
  duration: number
  size: number
  type: string
  cached: boolean
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    loadTime: null,
    domContentLoaded: null,
    firstByte: null
  }

  private resourceMetrics: ResourceMetrics[] = []
  private isMonitoring = false

  startMonitoring() {
    if (this.isMonitoring) return
    this.isMonitoring = true

    // Monitor Core Web Vitals
    this.monitorLCP()
    this.monitorFID()
    this.monitorCLS()
    this.monitorFCP()
    this.monitorTTFB()
    this.monitorPageLoad()
    this.monitorResources()
    this.monitorMemoryUsage()
  }

  private monitorLCP() {
    const emit = this.throttledConsole()
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      const lcp = Math.max(0, lastEntry.startTime)
      this.metrics.lcp = lcp
      this.sendMetric('lcp', lcp)
      emit('lcp', lcp)
    }).observe({ entryTypes: ['largest-contentful-paint'] })
  }

  private monitorFID() {
    const emit = this.throttledConsole()
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      entries.forEach((entry) => {
        const fid = Math.max(0, entry.processingStart - entry.startTime)
        this.metrics.fid = fid
        this.sendMetric('fid', fid)
        emit('fid', fid)
      })
    }).observe({ entryTypes: ['first-input'] })
  }

  private monitorCLS() {
    let clsValue = 0
    const emit = this.throttledConsole()
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          this.metrics.cls = clsValue
          this.sendMetric('cls', clsValue)
          emit('cls', clsValue)
        }
      })
    }).observe({ entryTypes: ['layout-shift'] })
  }

  private monitorFCP() {
    const emit = this.throttledConsole()
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      entries.forEach((entry) => {
        const fcp = Math.max(0, entry.startTime)
        this.metrics.fcp = fcp
        this.sendMetric('fcp', fcp)
        emit('fcp', fcp)
      })
    }).observe({ entryTypes: ['paint'] })
  }

  private monitorTTFB() {
    const emit = this.throttledConsole()
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const ttfb = Math.max(0, navigation.responseStart - navigation.fetchStart)
      this.metrics.ttfb = ttfb
      this.sendMetric('ttfb', ttfb)
      emit('ttfb', ttfb)
    })
  }

  private monitorPageLoad() {
    const emit = this.throttledConsole()
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      this.metrics.loadTime = Math.max(0, navigation.loadEventEnd - navigation.fetchStart)
      this.metrics.domContentLoaded = Math.max(0, navigation.domContentLoadedEventEnd - navigation.fetchStart)
      this.metrics.firstByte = Math.max(0, navigation.responseStart - navigation.fetchStart)

      this.sendMetric('load_time', this.metrics.loadTime)
      this.sendMetric('dom_content_loaded', this.metrics.domContentLoaded)
      this.sendMetric('first_byte', this.metrics.firstByte)
      emit('load_time', this.metrics.loadTime)
      emit('dom_content_loaded', this.metrics.domContentLoaded)
      emit('first_byte', this.metrics.firstByte)
    })
  }

  private monitorResources() {
    const emit = this.throttledConsole()
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      entries.forEach((entry) => {
        const resourceEntry = entry as PerformanceResourceTiming
        const resource: ResourceMetrics = {
          name: resourceEntry.name,
          duration: resourceEntry.duration,
          size: resourceEntry.transferSize || 0,
          type: this.getResourceType(resourceEntry.name),
          cached: resourceEntry.transferSize === 0
        }

        this.resourceMetrics.push(resource)

        // Track slow resources
        if (resource.duration > 1000) {
          this.sendMetric('slow_resource', {
            name: resource.name,
            duration: resource.duration,
            size: resource.size,
            type: resource.type
          })
          emit('slow_resource', resource)
        }
      })
    }).observe({ entryTypes: ['resource'] })
  }

  private monitorMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      this.sendMetric('memory_usage', {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit
      })
    }
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'javascript'
    if (url.includes('.css')) return 'stylesheet'
    if (url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.webp')) return 'image'
    if (url.includes('.woff') || url.includes('.ttf')) return 'font'
    return 'other'
  }

  private sendMetric(name: string, value: any) {
    // Send to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance_metric', {
        event_category: 'performance',
        event_label: name,
        value: typeof value === 'number' ? Math.round(value) : 0,
        custom_map: {
          metric_name: name,
          metric_value: JSON.stringify(value)
        }
      })
    }

    // Send to Yandex Metrika
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(import.meta.env.VITE_YANDEX_METRIKA_ID, 'reachGoal', 'performance_metric', {
        name,
        value
      })
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      this.throttledConsole()(`${name}`, value)
    }
  }

  // Throttled console logger shared within instance
  private _logger?: (name: string, value: any) => void
  private throttledConsole() {
    if (!this._logger) {
      let last = 0
      let timer: any
      this._logger = (name: string, value: any) => {
        const now = Date.now()
        const log = () => console.log(`Performance Metric - ${name}:`, value)
        if (now - last >= 1500) {
          last = now
          log()
        } else if (!timer) {
          timer = setTimeout(() => {
            last = Date.now()
            timer = null
            log()
          }, 1500 - (now - last))
        }
      }
    }
    return this._logger!
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  getResourceMetrics(): ResourceMetrics[] {
    return [...this.resourceMetrics]
  }

  getPerformanceScore(): number {
    let score = 100

    // LCP scoring (good: <2.5s, needs improvement: 2.5-4s, poor: >4s)
    if (this.metrics.lcp) {
      if (this.metrics.lcp > 4000) score -= 30
      else if (this.metrics.lcp > 2500) score -= 15
    }

    // FID scoring (good: <100ms, needs improvement: 100-300ms, poor: >300ms)
    if (this.metrics.fid) {
      if (this.metrics.fid > 300) score -= 25
      else if (this.metrics.fid > 100) score -= 10
    }

    // CLS scoring (good: <0.1, needs improvement: 0.1-0.25, poor: >0.25)
    if (this.metrics.cls) {
      if (this.metrics.cls > 0.25) score -= 25
      else if (this.metrics.cls > 0.1) score -= 10
    }

    return Math.max(0, score)
  }

  exportReport() {
    return {
      metrics: this.getMetrics(),
      resources: this.getResourceMetrics(),
      score: this.getPerformanceScore(),
      timestamp: Date.now()
    }
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor()

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  performanceMonitor.startMonitoring()
}

// Get performance report
export const getPerformanceReport = () => {
  return performanceMonitor.exportReport()
}

// Track specific performance events
export const trackPerformanceEvent = (eventName: string, data?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'performance_event', {
      event_category: 'performance',
      event_label: eventName,
      custom_map: {
        event_name: eventName,
        event_data: JSON.stringify(data)
      }
    })
  }
}

// Track image loading performance
export const trackImageLoad = (src: string, loadTime: number, size: number) => {
  trackPerformanceEvent('image_load', {
    src,
    loadTime,
    size,
    cached: loadTime < 100
  })
}

// Track JavaScript bundle performance
export const trackBundleLoad = (bundleName: string, loadTime: number, size: number) => {
  trackPerformanceEvent('bundle_load', {
    bundleName,
    loadTime,
    size
  })
}

// Track API response times
export const trackAPIResponse = (endpoint: string, responseTime: number, status: number) => {
  trackPerformanceEvent('api_response', {
    endpoint,
    responseTime,
    status,
    success: status >= 200 && status < 300
  })
}

// Track user interaction performance
export const trackInteractionPerformance = (interaction: string, duration: number) => {
  trackPerformanceEvent('interaction_performance', {
    interaction,
    duration,
    slow: duration > 100
  })
}

// Declare global types
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    ym: (id: string, method: string, target: string, params?: any) => void
  }
}
