// Simple SEO Meta component without react-helmet-async
import { useEffect } from 'react'

interface SEOMetaSimpleProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

export function SEOMetaSimple({
  title = "Эко-лофт АРКА - Детские праздники в Новосибирске",
  description = "Современное экологичное пространство для незабываемых детских праздников. Два зала для разных возрастов, профессиональная анимация, шоу-программы.",
  keywords = "детские праздники Новосибирск, эко-лофт, семейные мероприятия, день рождения ребенка, аренда зала, АРКА, Дзержинский район, аниматоры, крио шоу, квесты, детский центр Новосибирск, организация праздников, шоу мыльных пузырей, тематические вечеринки, детский клуб, игровая зона, празднование дня рождения, детские развлечения Новосибирск, семейный отдых, детские шоу-программы, анимация для детей, детский досуг, праздничные услуги, детские мастер-классы",
  image = "https://arka-loft.web.app/og-image.jpg",
  url = "https://arka-loft.web.app",
  type = "website"
}: SEOMetaSimpleProps) {
  
  useEffect(() => {
    // Update document title
    document.title = title

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = description
      document.head.appendChild(meta)
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'keywords'
      meta.content = keywords
      document.head.appendChild(meta)
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', title)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:title')
      meta.content = title
      document.head.appendChild(meta)
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', description)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:description')
      meta.content = description
      document.head.appendChild(meta)
    }

    const ogImage = document.querySelector('meta[property="og:image"]')
    if (ogImage) {
      ogImage.setAttribute('content', image)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:image')
      meta.content = image
      document.head.appendChild(meta)
    }

    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.setAttribute('content', url)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:url')
      meta.content = url
      document.head.appendChild(meta)
    }

    const ogType = document.querySelector('meta[property="og:type"]')
    if (ogType) {
      ogType.setAttribute('content', type)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:type')
      meta.content = type
      document.head.appendChild(meta)
    }

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'twitter:title'
      meta.content = title
      document.head.appendChild(meta)
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'twitter:description'
      meta.content = description
      document.head.appendChild(meta)
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]')
    if (twitterImage) {
      twitterImage.setAttribute('content', image)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'twitter:image'
      meta.content = image
      document.head.appendChild(meta)
    }

  }, [title, description, keywords, image, url, type])

  return null
}
