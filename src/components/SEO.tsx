import { useEffect } from 'react';

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  structuredData?: object;
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean; // Запретить индексацию страницы
}

export const SEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  canonical,
  structuredData,
  twitterCard = 'summary_large_image',
  noindex = false,
}: MetaProps) => {
  useEffect(() => {
    // Title
    const baseTitle = 'Arkaloft';
    const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
    document.title = fullTitle;

    // Meta tags helper
    const updateMeta = (name: string, content: string, attr: string = 'name') => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    if (description) updateMeta('description', description);
    if (keywords) updateMeta('keywords', keywords);

    // Robots meta
    if (noindex) {
      updateMeta('robots', 'noindex, nofollow');
    } else {
      updateMeta('robots', 'index, follow');
    }

    // OG Tags
    updateMeta('og:title', ogTitle || title || baseTitle, 'property');
    updateMeta('og:description', ogDescription || description || '', 'property');
    updateMeta('og:type', ogType, 'property');
    if (ogImage) {
      const fullImageUrl = ogImage.startsWith('http') ? ogImage : `https://arkaloft.ru${ogImage}`;
      updateMeta('og:image', fullImageUrl, 'property');
    }
    updateMeta('og:url', window.location.href, 'property');
    updateMeta('og:site_name', 'Arkaloft', 'property');
    updateMeta('og:locale', 'ru_RU', 'property');

    // Twitter Tags
    updateMeta('twitter:card', twitterCard);
    updateMeta('twitter:title', ogTitle || title || baseTitle);
    updateMeta('twitter:description', ogDescription || description || '');
    if (ogImage) {
      const fullImageUrl = ogImage.startsWith('http') ? ogImage : `https://arkaloft.ru${ogImage}`;
      updateMeta('twitter:image', fullImageUrl);
    }

    // Yandex verification (добавь свой код верификации)
    // updateMeta('yandex-verification', 'YOUR_YANDEX_VERIFICATION_CODE');

    // Canonical
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonical || window.location.href);

    // Structured Data
    const scriptId = 'structured-data-script';
    let scriptElement = document.getElementById(scriptId);

    if (structuredData) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        scriptElement.setAttribute('id', scriptId);
        document.head.appendChild(scriptElement);
      }
      scriptElement.innerHTML = JSON.stringify(structuredData);
    } else if (scriptElement) {
      scriptElement.remove();
    }

    return () => {
      // We keep the title and meta tags as they are likely replaced by the next page's SEO component
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogType, canonical, structuredData, twitterCard, noindex]);

  return null;
};
