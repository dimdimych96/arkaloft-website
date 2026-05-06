import React, { Suspense, lazy } from 'react'
import { Header } from './components/layout/Header'
import { BottomNavigation } from './components/layout/BottomNavigation'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/sections/HeroSection'
import { FeaturesSection } from './components/sections/FeaturesSection'
import { HallsSection } from './components/sections/HallsSection'
import { PackagesSection } from './components/sections/PackagesSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { ReviewsSection } from './components/sections/ReviewsSection'
import { FAQSection } from './components/sections/FAQSection'
import { ContactSection } from './components/sections/ContactSection'
import { LocalSEOSection } from './components/sections/LocalSEOSection'
import { Toaster } from './components/ui/toaster'
import { QuickActions } from './components/ui/quick-actions'
import { ScrollToTop } from './components/ui/scroll-to-top'
import { ScrollProgress } from './components/ui/scroll-progress'
import { useAnalytics, useScrollTracking, useTimeTracking } from './hooks/useAnalytics'
import { SEOMetaSimple } from './components/seo/SEOMetaSimple'
import { LoadingIndicator } from './components/ui/loading-indicator'

// Lazy load тяжелых компонентов (map named export to default)
const BookingFormModal = lazy(() => import('./components/forms/BookingFormModal').then(m => ({ default: m.BookingFormModal })))

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false)
  
  // Initialize analytics
  const analytics = useAnalytics()
  useScrollTracking()
  useTimeTracking()

  const handleBookingClick = () => {
    analytics.trackEvent('booking_modal_open', {
      event_category: 'engagement',
      source: 'header_button'
    })
    setIsBookingModalOpen(true)
  }

  const handleBookingModalClose = () => {
    analytics.trackEvent('booking_modal_close', {
      event_category: 'engagement'
    })
    setIsBookingModalOpen(false)
  }

  return (
    <div className="min-h-screen">
      <SEOMetaSimple />
      <ScrollProgress />
      <Header onBookingClick={handleBookingClick} />
      
      <main>
        <HeroSection onBookingClick={handleBookingClick} />
        <LocalSEOSection />
        <FeaturesSection />
        <HallsSection onBookingClick={handleBookingClick} />
        <PackagesSection onBookingClick={handleBookingClick} />
        <ServicesSection />
        <ReviewsSection />
        <FAQSection />
        <ContactSection />
      </main>
      
      <Footer />
      
      <BottomNavigation />
      <QuickActions />
      <ScrollToTop />
      
      <Suspense fallback={<LoadingIndicator />}>
        <BookingFormModal
          isOpen={isBookingModalOpen}
          onClose={handleBookingModalClose}
        />
      </Suspense>
      
      <Toaster />
    </div>
  )
}

export default App