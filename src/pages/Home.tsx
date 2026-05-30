import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/SEO';
import { HeroSection } from '../components/sections/HeroSection';
import { PartyFormatsSection } from '../components/sections/PartyFormatsSection';

const WhyUsSection = lazy(() => import('../components/sections/WhyUsSection').then(m => ({ default: m.WhyUsSection })));
const HallsSectionStatic = lazy(() => import('../components/sections/HallsSectionStatic').then(m => ({ default: m.HallsSectionStatic })));
const PackagesSectionStatic = lazy(() => import('../components/sections/PackagesSectionStatic').then(m => ({ default: m.PackagesSectionStatic })));
const ServicesTeaserSection = lazy(() => import('../components/sections/ServicesTeaserSection').then(m => ({ default: m.ServicesTeaserSection })));
const ReviewsSection = lazy(() => import('../components/ReviewsSection').then(m => ({ default: m.ReviewsSection })));
const AmenitiesSection = lazy(() => import('../components/sections/AmenitiesSection').then(m => ({ default: m.AmenitiesSection })));



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
      <Suspense fallback={<div className="min-h-[20vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
        <WhyUsSection />
        <HallsSectionStatic />
        <PackagesSectionStatic />
        <ServicesTeaserSection />
        <ReviewsSection />
        <AmenitiesSection />
      </Suspense>
    </main>
  );
};
