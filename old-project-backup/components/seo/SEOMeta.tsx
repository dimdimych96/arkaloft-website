import { Helmet } from 'react-helmet-async'

interface SEOMetaProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  structuredData?: object
}

export function SEOMeta({
  title = "Эко-лофт АРКА - Детские праздники в Новосибирске",
  description = "Современное экологичное пространство для незабываемых детских праздников. Два зала для разных возрастов, профессиональная анимация, шоу-программы.",
  keywords = "детские праздники Новосибирск, эко-лофт, семейные мероприятия, день рождения ребенка, аренда зала, АРКА, Дзержинский район, аниматоры, крио шоу, квесты, детский центр Новосибирск, организация праздников, шоу мыльных пузырей, тематические вечеринки, детский клуб, игровая зона, празднование дня рождения, детские развлечения Новосибирск, семейный отдых, детские шоу-программы, анимация для детей, детский досуг, праздничные услуги, детские мастер-классы",
  image = "https://arka-loft.web.app/og-image.jpg",
  url = "https://arka-loft.web.app",
  type = "website",
  structuredData
}: SEOMetaProps) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Эко-лофт АРКА" />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="Эко-лофт АРКА" />
      <meta name="language" content="Russian" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Local SEO */}
      <meta name="geo.region" content="RU-54" />
      <meta name="geo.placename" content="Новосибирск" />
      <meta name="geo.position" content="55.0415;82.9346" />
      <meta name="ICBM" content="55.0415, 82.9346" />
      
      {/* Business Contact */}
      <meta name="business:contact_data:street_address" content="Дзержинский район" />
      <meta name="business:contact_data:locality" content="Новосибирск" />
      <meta name="business:contact_data:region" content="Новосибирская область" />
      <meta name="business:contact_data:postal_code" content="630000" />
      <meta name="business:contact_data:country_name" content="Россия" />
      <meta name="business:contact_data:phone_number" content="+7-983-001-25-20" />
      <meta name="business:contact_data:email" content="arkaloft@mail.ru" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}
