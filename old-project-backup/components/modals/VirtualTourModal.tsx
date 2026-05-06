import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { Button } from '../ui/button'
import { useAnalytics } from '../../hooks/useAnalytics'

interface VirtualTourModalProps {
  isOpen: boolean
  onClose: () => void
}

const tourImages = [
  {
    url: '/images/halls/0/1.jpg',
    title: 'Главный зал',
    description: 'Просторное пространство для праздника'
  },
  {
    url: '/images/halls/0/2.jpg',
    title: 'Зал "Малыш" 0+',
    description: 'Уютная зона для самых маленьких'
  },
  {
    url: '/images/halls/0/3.jpeg',
    title: 'Зал "Малыш" 0+',
    description: 'Уютная зона для самых маленьких'
  },
  {
    url: '/images/halls/0/4.jpg',
    title: 'Зал "Малыш" 0+',
    description: 'Уютная зона для самых маленьких'
  },
  {
    url: '/images/halls/0/5.jpg',
    title: 'Зал "Малыш" 0+',
    description: 'Уютная зона для самых маленьких'
  },
  {
    url: '/images/halls/7/1.jpg',
    title: 'Зал "Исследователь" 7+',
    description: 'Стильное пространство для активных детей'
  },
  {
    url: '/images/halls/7/2.jpg',
    title: 'Фотозона',
    description: 'Красивое оформление для фотосессий'
  },
  {
    url: '/images/halls/7/3.jpg',
    title: 'Зал "Исследователь" 7+',
    description: 'Стильное пространство для активных детей'
  }
]

export function VirtualTourModal({ isOpen, onClose }: VirtualTourModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const imageRef = useRef<HTMLImageElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const analytics = useAnalytics()

  // Preload images
  useEffect(() => {
    if (!isOpen) return

    const preloadImages = async () => {
      const promises = tourImages.map((image, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, index]))
            resolve()
          }
          img.onerror = () => resolve()
          img.src = image.url
        })
      })
      
      await Promise.all(promises)
      setIsLoading(false)
    }

    preloadImages()
  }, [isOpen])

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0)
      setZoom(1)
      setIsFullscreen(false)
      setIsLoading(true)
      setLoadedImages(new Set())
      
      // Track virtual tour start (avoid unstable dependency loop)
      analytics.trackVirtualTour()
    }
  }, [isOpen])

  if (!isOpen) return null

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? tourImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === tourImages.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
    if (e.key === 'Escape') onClose()
    if (e.key === 'f' || e.key === 'F') toggleFullscreen()
    if (e.key === '+') setZoom(prev => Math.min(prev + 0.2, 3))
    if (e.key === '-') setZoom(prev => Math.max(prev - 0.2, 0.5))
    if (e.key === '0') setZoom(1)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5))
  }

  const resetZoom = () => {
    setZoom(1)
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      if (e.deltaY < 0) {
        handleZoomIn()
      } else {
        handleZoomOut()
      }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      if (touchStartRef.current) {
        const deltaX = touch.clientX - touchStartRef.current.x
        const deltaY = touch.clientY - touchStartRef.current.y
        
        // Horizontal swipe
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            handlePrevious()
          } else {
            handleNext()
          }
          touchStartRef.current = null
        }
      }
    }
  }

  const handleTouchEnd = () => {
    touchStartRef.current = null
  }

  return (
    <div 
      ref={modalRef}
      className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-4'}`}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div 
        className={`relative ${isFullscreen ? 'w-full h-full' : 'max-w-6xl w-full'}`}
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onTouchStart={(e) => {
          if (e.touches.length === 1) {
            touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
          }
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Control buttons */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 flex gap-1 sm:gap-2">
          {/* Fullscreen button - only on desktop */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full items-center justify-center text-white transition-all"
            aria-label={isFullscreen ? "Выйти из полноэкранного режима" : "Полноэкранный режим"}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
          {/* Close button - always visible */}
          <button
            onClick={onClose}
            className="w-12 h-12 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all touch-manipulation"
            aria-label="Закрыть"
          >
            <X className="w-6 h-6 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Image */}
        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
          {isLoading && !loadedImages.has(currentIndex) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
          )}
          <img
            ref={imageRef}
            src={tourImages[currentIndex].url}
            alt={tourImages[currentIndex].title}
            className={`w-full h-full object-cover transition-transform duration-200 ${
              loadedImages.has(currentIndex) ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: `scale(${zoom})` }}
          />
          
          {/* Navigation arrows - only on desktop */}
          <button
            onClick={handlePrevious}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full items-center justify-center text-white transition-all"
            aria-label="Предыдущее фото"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full items-center justify-center text-white transition-all"
            aria-label="Следующее фото"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Zoom controls - only on desktop */}
          <div className="hidden sm:flex absolute top-4 left-4 gap-2">
            <button
              onClick={handleZoomOut}
              className="w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
              aria-label="Уменьшить"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetZoom}
              className="w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
              aria-label="Сбросить масштаб"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomIn}
              className="w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
              aria-label="Увеличить"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-6">
            <h3 className="text-white text-lg sm:text-2xl font-bold mb-1 sm:mb-2">
              {tourImages[currentIndex].title}
            </h3>
            <p className="text-white/80 text-sm sm:text-base">
              {tourImages[currentIndex].description}
            </p>
          </div>
        </div>

        {/* Thumbnails */}
        {!isFullscreen && (
          <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-4 justify-center overflow-x-auto px-2 sm:px-0">
            {tourImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 touch-manipulation ${
                  index === currentIndex
                    ? 'border-emerald-500 scale-110'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Counter and Zoom info */}
        <div className="text-center mt-2 sm:mt-4 text-white px-4">
          <span className="text-xs sm:text-sm">
            {currentIndex + 1} / {tourImages.length}
          </span>
          {zoom !== 1 && (
            <span className="text-xs sm:text-sm ml-2 sm:ml-4 text-emerald-400">
              Масштаб: {Math.round(zoom * 100)}%
            </span>
          )}
        </div>

        {/* WhatsApp button */}
        {!isFullscreen && (
          <div className="text-center mt-3 sm:mt-6 px-4">
            <Button
              onClick={() => window.open('https://wa.me/79830012520', '_blank')}
              className="bg-green-500 hover:bg-green-600 w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6"
            >
              Запросить полный каталог в WhatsApp
            </Button>
          </div>
        )}

        {/* Mobile swipe hint */}
        {!isFullscreen && (
          <div className="text-center mt-2 text-white/60 text-xs px-4 sm:hidden">
            <p>Свайпните влево/вправо для навигации</p>
          </div>
        )}

        {/* Keyboard shortcuts info - desktop only */}
        {!isFullscreen && (
          <div className="text-center mt-2 sm:mt-4 text-white/60 text-xs px-4 hidden sm:block">
            <p>Горячие клавиши: ← → (навигация), +/- (масштаб), F (полный экран), Esc (закрыть)</p>
          </div>
        )}
      </div>
    </div>
  )
}
