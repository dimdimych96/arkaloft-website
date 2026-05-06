// Расширенные схемы разметки для SEO

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Эко-лофт АРКА",
  "alternateName": ["АРКА", "Эко-лофт АРКА Новосибирск", "Детский центр АРКА"],
  "description": "Современное экологичное пространство для детских праздников и семейных мероприятий в Дзержинском районе Новосибирска. Два специализированных зала для разных возрастных групп, профессиональная анимация, шоу-программы.",
  "url": "https://arka-loft.web.app",
  "telephone": "+7-983-001-25-20",
  "email": "arkaloft@mail.ru",
  "priceRange": "₽₽",
  "currenciesAccepted": "RUB",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
  "openingHours": [
    "Mo-Su 10:00-22:00"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Дзержинский район",
    "addressLocality": "Новосибирск",
    "addressRegion": "Новосибирская область",
    "postalCode": "630000",
    "addressCountry": "RU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 55.0415,
    "longitude": 82.9346
  },
  "areaServed": {
    "@type": "Place",
    "name": "Новосибирск",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Новосибирск",
      "addressRegion": "Новосибирская область",
      "addressCountry": "RU"
    }
  },
  "serviceType": [
    "Детские праздники",
    "Дни рождения",
    "Семейные мероприятия",
    "Аренда зала",
    "Анимационные программы",
    "Шоу-программы",
    "Крио шоу",
    "Мыльные пузыри",
    "Квесты для детей"
  ],
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Экологичные материалы",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Профессиональная анимация",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Шоу-программы",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Два зала для разных возрастов",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Парковка",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Wi-Fi",
      "value": true
    }
  ],
  "sameAs": [
    "https://vk.com/arkaloft",
    "https://www.instagram.com/arka_loft/"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Услуги детского центра",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Аренда зала Малыш (0-6 лет)",
          "description": "135 кв.м для самых маленьких гостей"
        },
        "price": "15000",
        "priceCurrency": "RUB",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Аренда зала Исследователь (7+ лет)",
          "description": "75 кв.м для детей старше 7 лет"
        },
        "price": "12000",
        "priceCurrency": "RUB",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Анимационные программы",
          "description": "Профессиональные аниматоры для детских праздников"
        },
        "price": "5000",
        "priceCurrency": "RUB",
        "availability": "https://schema.org/InStock"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
})

export const getServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Организация детских праздников в Новосибирске",
  "description": "Полный комплекс услуг по организации незабываемых детских праздников в экологичном пространстве АРКА",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Эко-лофт АРКА"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Новосибирск"
  },
  "serviceType": "Детские праздники",
  "category": "Развлекательные услуги",
  "offers": {
    "@type": "Offer",
    "price": "15000",
    "priceCurrency": "RUB",
    "availability": "https://schema.org/InStock"
  }
})

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Эко-лофт АРКА",
  "url": "https://arka-loft.web.app",
  "logo": "https://arka-loft.web.app/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-983-001-25-20",
    "contactType": "customer service",
    "availableLanguage": "Russian"
  },
  "sameAs": [
    "https://vk.com/arkaloft",
    "https://www.instagram.com/arka_loft/"
  ]
})

export const getBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Главная",
      "item": "https://arka-loft.web.app"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Залы",
      "item": "https://arka-loft.web.app/#halls"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Пакеты",
      "item": "https://arka-loft.web.app/#packages"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Услуги",
      "item": "https://arka-loft.web.app/#services"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Отзывы",
      "item": "https://arka-loft.web.app/#reviews"
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Контакты",
      "item": "https://arka-loft.web.app/#contact"
    }
  ]
})

export const getFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Сколько стоит аренда зала?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Аренда зала 'Малыш' (0-6 лет) стоит от 15 000 рублей, зал 'Исследователь' (7+ лет) - от 12 000 рублей за 2 часа."
      }
    },
    {
      "@type": "Question",
      "name": "Какие услуги включены в стоимость?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "В стоимость аренды включены: использование зала, базовое оформление, уборка после мероприятия, парковка."
      }
    },
    {
      "@type": "Question",
      "name": "Можно ли принести свою еду?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, вы можете принести свою еду и напитки. У нас есть кухонная зона для подготовки."
      }
    },
    {
      "@type": "Question",
      "name": "Есть ли парковка?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, у нас есть бесплатная парковка для гостей."
      }
    },
    {
      "@type": "Question",
      "name": "Можно ли заказать аниматора?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Конечно! У нас есть команда профессиональных аниматоров. Стоимость от 5 000 рублей за 2 часа."
      }
    }
  ]
})

export const getEventSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Детский день рождения в АРКА",
  "description": "Организация незабываемого детского дня рождения в экологичном пространстве АРКА",
  "startDate": "2024-01-01T10:00:00+07:00",
  "endDate": "2024-01-01T12:00:00+07:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Эко-лофт АРКА",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Дзержинский район",
      "addressLocality": "Новосибирск",
      "addressRegion": "Новосибирская область",
      "postalCode": "630000",
      "addressCountry": "RU"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Эко-лофт АРКА",
    "url": "https://arka-loft.web.app"
  },
  "offers": {
    "@type": "Offer",
    "price": "15000",
    "priceCurrency": "RUB",
    "availability": "https://schema.org/InStock"
  }
})
