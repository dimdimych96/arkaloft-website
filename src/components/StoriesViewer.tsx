import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Story {
  image?: string;
  video?: string;
  title: string;
  type: 'image' | 'video';
}

interface StoriesViewerProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  categoryName: string;
  categoryColor: string;
}

export const StoriesViewer = ({ isOpen, onClose, stories, categoryName, categoryColor }: StoriesViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentStory = stories[currentIndex];
  const isVideo = currentStory?.type === 'video';

  // Фиксация viewport и скрытие адресной строки на мобильных
  useEffect(() => {
    if (!isOpen) return;

    // Сохраняем текущее состояние
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalHeight = document.body.style.height;

    // Блокируем скролл и фиксируем высоту
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.height = '100%';
    document.body.style.width = '100%';
    document.body.style.top = '0';
    document.body.style.left = '0';

    // Устанавливаем высоту viewport для мобильных браузеров
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);

    // Скрываем адресную строку на iOS
    if (containerRef.current) {
      setTimeout(() => {
        window.scrollTo(0, 1);
      }, 100);
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.height = originalHeight;
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.left = '';
      window.removeEventListener('resize', setViewportHeight);
    };
  }, [isOpen]);

  // Показываем подсказку о звуке при первом видео
  useEffect(() => {
    if (isOpen && isVideo && isMuted) {
      setShowSoundHint(true);
      const timer = setTimeout(() => setShowSoundHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVideo, currentIndex]);

  // Переключение звука
  const toggleMute = () => {
    setIsMuted(prev => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setShowSoundHint(false);
  };

  // Очистка при размонтировании или закрытии
  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(0);
      setProgress(0);
      setShowSoundHint(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
  }, [isOpen]);

  // Таймер для текущего story
  useEffect(() => {
    if (!isOpen) return;

    // Очищаем предыдущий таймер
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setProgress(0);

    // Для видео используем события видео, для изображений - таймер
    if (isVideo && videoRef.current) {
      const video = videoRef.current;

      // Запускаем видео
      video.play().catch(err => console.error('Video play error:', err));

      const updateProgress = () => {
        if (video.duration && video.duration > 0) {
          const newProgress = Math.min((video.currentTime / video.duration) * 100, 100);
          setProgress(newProgress);
        }
      };

      const handleVideoEnd = () => {
        setProgress(100);
        setTimeout(() => {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(prev => prev + 1);
          } else {
            onClose();
          }
        }, 100);
      };

      video.addEventListener('timeupdate', updateProgress);
      video.addEventListener('ended', handleVideoEnd);

      return () => {
        video.removeEventListener('timeupdate', updateProgress);
        video.removeEventListener('ended', handleVideoEnd);
        video.pause();
      };
    } else {
      // Для изображений используем таймер
      let elapsed = 0;
      const duration = 5000;
      const interval = 50;

      timerRef.current = setInterval(() => {
        elapsed += interval;
        const newProgress = (elapsed / duration) * 100;

        if (newProgress >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(prev => prev + 1);
          } else {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            onClose();
          }
        } else {
          setProgress(newProgress);
        }
      }, interval);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    }
  }, [isOpen, currentIndex, stories.length, onClose, isVideo]);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-black"
          style={{
            height: 'calc(var(--vh, 1vh) * 100)',
            touchAction: 'none',
            overscrollBehavior: 'none'
          }}
        >
          {/* Progress bars */}
          <div className="absolute top-0 left-0 right-0 z-10 flex gap-1.5 px-2 pt-2 pb-2">
            {stories.map((_, idx) => (
              <div key={idx} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={false}
                  animate={{
                    width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? '100%' : '0%'
                  }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-5 left-0 right-0 z-10 flex items-center justify-between px-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${categoryColor} flex items-center justify-center`}>
                <span className="text-white font-black text-sm">{categoryName[0]}</span>
              </div>
              <span className="text-white font-bold text-sm">{categoryName}</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Кнопка звука (только для видео) */}
              {isVideo && (
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors touch-target"
                  aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
                >
                  <span className="material-symbols-outlined">
                    {isMuted ? 'volume_off' : 'volume_up'}
                  </span>
                </button>
              )}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors touch-target"
                aria-label="Закрыть"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>

          {/* Sound hint for video */}
          <AnimatePresence>
            {isVideo && showSoundHint && isMuted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-black/80 backdrop-blur-md px-6 py-4 rounded-2xl flex flex-col items-center gap-3 shadow-2xl"
              >
                <span className="material-symbols-outlined text-white text-4xl animate-pulse">volume_off</span>
                <span className="text-white text-sm font-bold text-center">Нажмите на иконку<br />для включения звука</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Story content */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Blurred background for images */}
            {!isVideo && (
              <div className="absolute inset-0 overflow-hidden -z-10">
                <img
                  src={currentStory?.image}
                  alt=""
                  className="w-full h-full object-cover blur-3xl scale-110 opacity-50"
                  aria-hidden="true"
                />
              </div>
            )}

            <AnimatePresence mode="wait">
              {isVideo ? (
                <motion.video
                  key={currentIndex}
                  ref={videoRef}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={currentStory?.video}
                  className="max-w-full max-h-full object-contain"
                  playsInline
                  muted={isMuted}
                  autoPlay
                  preload="auto"
                />
              ) : (
                <motion.img
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={currentStory?.image}
                  alt={currentStory?.title}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </AnimatePresence>

            {/* Story title and CTA */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-safe bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20 pointer-events-none">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-4 mb-4"
              >
                <h3 className="text-white font-black text-xl sm:text-2xl drop-shadow-2xl">
                  {currentStory?.title}
                </h3>

                <Link
                  to={`/contact?format=${encodeURIComponent(categoryName)}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-black text-sm sm:text-base rounded-2xl hover:bg-primary-hover transition-all active:scale-95 shadow-lg pointer-events-auto touch-target"
                >
                  <span className="material-symbols-outlined text-lg">event_available</span>
                  Забронировать
                </Link>
              </motion.div>
            </div>

            {/* Navigation areas */}
            <div className="absolute inset-0 flex pointer-events-none">
              <div className="flex-1 cursor-pointer pointer-events-auto" onClick={handlePrevious} />
              <div className="flex-1" />
              <div className="flex-1 cursor-pointer pointer-events-auto" onClick={handleNext} />
            </div>
          </div>

          {/* Navigation arrows (desktop) */}
          <div className="hidden sm:block">
            {currentIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
                aria-label="Предыдущее"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
            )}
            {currentIndex < stories.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
                aria-label="Следующее"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
