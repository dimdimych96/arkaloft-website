import { useState, useRef, useEffect, useCallback } from 'react'
import { Skeleton } from './skeleton'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: string
  placeholder?: string
  threshold?: number
  rootMargin?: string
}

export function LazyImage({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-video',
  placeholder,
  threshold = 0.1,
  rootMargin = '50px'
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  
  const imgRef = useRef<HTMLDivElement>(null)

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleError = useCallback(() => {
    setIsLoading(false)
    setHasError(true)
  }, [])

  // Intersection Observer для lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            setShouldLoad(true)
            observer.disconnect()
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

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
    <div 
      ref={imgRef}
      className={`relative ${aspectRatio} ${className}`}
    >
      {/* Плейсхолдер или скелетон */}
      {!shouldLoad && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          {placeholder ? (
            <img
              src={placeholder}
              alt=""
              className="w-full h-full object-cover blur-sm"
            />
          ) : (
            <Skeleton className="w-full h-full" />
          )}
        </div>
      )}

      {/* Основное изображение */}
      {shouldLoad && (
        <>
          {isLoading && (
            <Skeleton className="absolute inset-0 w-full h-full" />
          )}
          
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
          />
        </>
      )}
    </div>
  )
}
