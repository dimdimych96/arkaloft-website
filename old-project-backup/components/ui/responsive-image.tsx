import { useState, useCallback } from 'react'
import { Skeleton } from './skeleton'

interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  aspectRatio?: string
  sizes?: string
  quality?: number
}

export function ResponsiveImage({
  src,
  alt,
  className = '',
  priority = false,
  aspectRatio = 'aspect-video',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 80
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleError = useCallback(() => {
    setIsLoading(false)
    setHasError(true)
  }, [])

  // Генерируем srcSet для WebP
  const generateSrcSet = (baseSrc: string) => {
    const baseName = baseSrc.replace(/\.[^/.]+$/, '')
    const extension = baseSrc.split('.').pop()
    
    return [
      `${baseName}-sm.webp 400w`,
      `${baseName}-md.webp 800w`,
      `${baseName}-lg.webp 1200w`,
      `${baseName}-xl.webp 1920w`
    ].join(', ')
  }

  // Генерируем fallback srcSet для JPEG
  const generateFallbackSrcSet = (baseSrc: string) => {
    const baseName = baseSrc.replace(/\.[^/.]+$/, '')
    
    return [
      `${baseName}-sm.jpg 400w`,
      `${baseName}-md.jpg 800w`,
      `${baseName}-lg.jpg 1200w`,
      `${baseName}-xl.jpg 1920w`
    ].join(', ')
  }

  if (hasError) {
    return (
      <div className={`${aspectRatio} bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-400">
          <svg
            className="w-12 h-12 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm">Не удалось загрузить изображение</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${aspectRatio} ${className}`}>
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      <picture>
        {/* WebP источники */}
        <source
          srcSet={generateSrcSet(src)}
          sizes={sizes}
          type="image/webp"
        />
        
        {/* Fallback JPEG */}
        <img
          src={src}
          srcSet={generateFallbackSrcSet(src)}
          sizes={sizes}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
        />
      </picture>
    </div>
  )
}
