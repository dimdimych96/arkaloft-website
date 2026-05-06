import { Helmet } from 'react-helmet-async'

interface SocialMediaMetaProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
}

export function SocialMediaMeta({
  title = "Эко-лофт АРКА - Детские праздники в Новосибирске",
  description = "Современное экологичное пространство для незабываемых детских праздников. Два зала для разных возрастов, профессиональная анимация, шоу-программы.",
  image = "https://arka-loft.web.app/og-image.jpg",
  url = "https://arka-loft.web.app",
  type = "website"
}: SocialMediaMetaProps) {
  return (
    <Helmet>
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Эко-лофт АРКА - Детские праздники в Новосибирске" />
      <meta property="og:site_name" content="Эко-лофт АРКА" />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Facebook App ID (if you have one) */}
      {/* <meta property="fb:app_id" content="your-app-id" /> */}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Эко-лофт АРКА - Детские праздники в Новосибирске" />
      {/* <meta name="twitter:site" content="@your-twitter-handle" /> */}
      {/* <meta name="twitter:creator" content="@your-twitter-handle" /> */}
      
      {/* LinkedIn */}
      <meta property="linkedin:title" content={title} />
      <meta property="linkedin:description" content={description} />
      <meta property="linkedin:image" content={image} />
      
      {/* VKontakte */}
      <meta property="vk:title" content={title} />
      <meta property="vk:description" content={description} />
      <meta property="vk:image" content={image} />
      
      {/* WhatsApp */}
      <meta property="whatsapp:title" content={title} />
      <meta property="whatsapp:description" content={description} />
      <meta property="whatsapp:image" content={image} />
      
      {/* Telegram */}
      <meta property="telegram:title" content={title} />
      <meta property="telegram:description" content={description} />
      <meta property="telegram:image" content={image} />
      
      {/* Pinterest */}
      <meta property="pinterest:title" content={title} />
      <meta property="pinterest:description" content={description} />
      <meta property="pinterest:image" content={image} />
      
      {/* Additional social media meta tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#10b981" />
      <meta name="msapplication-TileColor" content="#10b981" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect to external domains for better performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://mc.yandex.ru" />
      
      {/* DNS prefetch for better performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//mc.yandex.ru" />
    </Helmet>
  )
}
