import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/SEO';
import { HeroSection } from '../components/sections/HeroSection';
import { PartyFormatsSection } from '../components/sections/PartyFormatsSection';
import { WhyUsSection } from '../components/sections/WhyUsSection';
import { HallsSectionStatic } from '../components/sections/HallsSectionStatic';
import { PackagesSectionStatic } from '../components/sections/PackagesSectionStatic';
import { ServicesTeaserSection } from '../components/sections/ServicesTeaserSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { AmenitiesSection } from '../components/sections/AmenitiesSection';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 500);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          aria-label="Прокрутить наверх"
          className="fixed bottom-24 right-4 sm:bottom-40 sm:right-6 z-40 p-3 sm:p-4 rounded-2xl bg-primary text-white shadow-2xl hover:bg-primary-hover active:scale-95 transition-all flex items-center justify-center group"
        >
          <span className="material-symbols-outlined text-2xl group-hover:-translate-y-1 transition-transform">arrow_upward</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export const Home = () => {

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Arkaloft (Арка Лофт)",
    "image": "https://arkaloft.ru/images/hero/main.jpg",
    "@id": "https://arkaloft.ru",
    "url": "https://arkaloft.ru",
    "telephone": "+79830012520",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "пр. Дзержинского, 18",
      "addressLocality": "Новосибирск",
      "postalCode": "630000",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 55.0456,
      "longitude": 82.9523
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "10:00",
      "closes": "22:00"
    },
    "sameAs": [
      "https://vk.com/arka_loft",
      "https://t.me/+79830012520"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "362"
    }
  };

  return (
    <main className="min-h-screen bg-background-off-white font-body text-text-main overflow-x-hidden">
      <SEO
        title="Arkaloft - Лофт для ярких праздников в Новосибирске"
        description="Аренда лофта для детских дней рождения, вечеринок и мероприятий в Новосибирске. Залы 0+ и 7+, организация под ключ, свои еда и напитки."
        keywords="лофт новосибирск, аренда лофта, детский день рождения, площадка для праздника, лофт для вечеринки"
        ogImage="/images/hero/main.jpg"
        structuredData={structuredData}
      />

      <HeroSection />
      <PartyFormatsSection />
      <WhyUsSection />
      <HallsSectionStatic />
      <PackagesSectionStatic />
      <ServicesTeaserSection />
      <ReviewsSection />
      <AmenitiesSection />
      <ScrollToTop />
    </main>
  );
};
