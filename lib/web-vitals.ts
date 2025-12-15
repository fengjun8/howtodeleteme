import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'

function sendToAnalytics(metric: any) {
  // In production, you would send this to your analytics service
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric)
  }
  
  // Send to Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      custom_parameter_1: metric.rating, // 添加性能评级
    })
  }
}

export function reportWebVitals() {
  onCLS(sendToAnalytics)
  onINP(sendToAnalytics)
  onFCP(sendToAnalytics)
  onLCP(sendToAnalytics)
  onTTFB(sendToAnalytics)
}

export function initWebVitals() {
  if (typeof window !== 'undefined') {
    // Report web vitals on page load
    reportWebVitals()
    
    // Report web vitals on page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        reportWebVitals()
      }
    })
    
    // Send custom events to Google Analytics
    if ((window as any).gtag) {
      // Track page views
      (window as any).gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }
}
