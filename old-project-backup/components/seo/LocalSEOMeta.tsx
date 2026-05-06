import { Helmet } from 'react-helmet-async'

interface LocalSEOMetaProps {
  businessName?: string
  address?: string
  city?: string
  region?: string
  country?: string
  postalCode?: string
  phone?: string
  email?: string
  latitude?: number
  longitude?: number
  openingHours?: string[]
  priceRange?: string
  currenciesAccepted?: string
  paymentAccepted?: string
}

export function LocalSEOMeta({
  businessName = "Эко-лофт АРКА",
  address = "Дзержинский район",
  city = "Новосибирск",
  region = "Новосибирская область",
  country = "Россия",
  postalCode = "630000",
  phone = "+7-983-001-25-20",
  email = "arkaloft@mail.ru",
  latitude = 55.0415,
  longitude = 82.9346,
  openingHours = ["Mo-Su 10:00-22:00"],
  priceRange = "₽₽",
  currenciesAccepted = "RUB",
  paymentAccepted = "Cash, Credit Card, Bank Transfer"
}: LocalSEOMetaProps) {
  return (
    <Helmet>
      {/* Local Business Meta Tags */}
      <meta name="geo.region" content="RU-54" />
      <meta name="geo.placename" content={city} />
      <meta name="geo.position" content={`${latitude};${longitude}`} />
      <meta name="ICBM" content={`${latitude}, ${longitude}`} />
      
      {/* Business Contact Information */}
      <meta name="business:contact_data:street_address" content={address} />
      <meta name="business:contact_data:locality" content={city} />
      <meta name="business:contact_data:region" content={region} />
      <meta name="business:contact_data:postal_code" content={postalCode} />
      <meta name="business:contact_data:country_name" content={country} />
      <meta name="business:contact_data:phone_number" content={phone} />
      <meta name="business:contact_data:email" content={email} />
      
      {/* Business Hours */}
      <meta name="business:hours" content={openingHours.join(', ')} />
      
      {/* Business Details */}
      <meta name="business:price_range" content={priceRange} />
      <meta name="business:currencies_accepted" content={currenciesAccepted} />
      <meta name="business:payment_accepted" content={paymentAccepted} />
      
      {/* Local Keywords */}
      <meta name="keywords" content={`
        детские праздники ${city}, 
        день рождения ребенка ${city}, 
        аренда зала ${city}, 
        детский центр ${city}, 
        организация праздников ${city}, 
        аниматоры ${city}, 
        шоу программы ${city}, 
        детские развлечения ${city}, 
        семейные мероприятия ${city}, 
        детский клуб ${city}, 
        ${region} детские праздники, 
        ${city} день рождения, 
        ${city} детский центр, 
        ${city} аренда зала
      `.trim()} />
      
      {/* Local Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": businessName,
          "description": `Современное экологичное пространство для детских праздников и семейных мероприятий в ${city}`,
          "url": "https://arka-loft.web.app",
          "telephone": phone,
          "email": email,
          "priceRange": priceRange,
          "currenciesAccepted": currenciesAccepted,
          "paymentAccepted": paymentAccepted,
          "openingHours": openingHours,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": address,
            "addressLocality": city,
            "addressRegion": region,
            "postalCode": postalCode,
            "addressCountry": country
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": latitude,
            "longitude": longitude
          },
          "areaServed": {
            "@type": "Place",
            "name": city,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": city,
              "addressRegion": region,
              "addressCountry": country
            }
          },
          "serviceType": [
            "Детские праздники",
            "Дни рождения",
            "Семейные мероприятия",
            "Аренда зала",
            "Анимационные программы",
            "Шоу-программы"
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
          ]
        })}
      </script>
      
      {/* Additional Local SEO Meta Tags */}
      <meta name="locality" content={city} />
      <meta name="region" content={region} />
      <meta name="country" content={country} />
      <meta name="postal-code" content={postalCode} />
      
      {/* Local Business Categories */}
      <meta name="business:category" content="Детские развлечения" />
      <meta name="business:category" content="Организация праздников" />
      <meta name="business:category" content="Аренда помещений" />
      <meta name="business:category" content="Семейные услуги" />
      
      {/* Local Service Areas */}
      <meta name="service-area" content={city} />
      <meta name="service-area" content={region} />
      
      {/* Local Business Hours for Search Engines */}
      <meta name="business:hours:day" content="Monday" />
      <meta name="business:hours:start" content="10:00" />
      <meta name="business:hours:end" content="22:00" />
      
      <meta name="business:hours:day" content="Tuesday" />
      <meta name="business:hours:start" content="10:00" />
      <meta name="business:hours:end" content="22:00" />
      
      <meta name="business:hours:day" content="Wednesday" />
      <meta name="business:hours:start" content="10:00" />
      <meta name="business:hours:end" content="22:00" />
      
      <meta name="business:hours:day" content="Thursday" />
      <meta name="business:hours:start" content="10:00" />
      <meta name="business:hours:end" content="22:00" />
      
      <meta name="business:hours:day" content="Friday" />
      <meta name="business:hours:start" content="10:00" />
      <meta name="business:hours:end" content="22:00" />
      
      <meta name="business:hours:day" content="Saturday" />
      <meta name="business:hours:start" content="10:00" />
      <meta name="business:hours:end" content="22:00" />
      
      <meta name="business:hours:day" content="Sunday" />
      <meta name="business:hours:start" content="10:00" />
      <meta name="business:hours:end" content="22:00" />
    </Helmet>
  )
}
