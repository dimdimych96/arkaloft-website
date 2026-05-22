import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { ShowDetail } from '../data/showsData';
import { useState, useEffect } from 'react';

interface ShowModalProps {
  show: ShowDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShowModal = ({ show, isOpen, onClose }: ShowModalProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Сбрасываем индекс при открытии нового шоу
  useEffect(() => {
    if (isOpen) {
      setCurrentMediaIndex(0);
    }
  }, [isOpen, show?.id]);

  if (!show) return null;

  // Объединяем фото и видео в один массив медиа
  const allMedia = [
    ...(show.media?.photos || []).map(url => ({ type: 'photo' as const, url })),
    ...(show.media?.videos || []).map(url => ({ type: 'video' as const, url }))
  ];

  const hasMedia = allMedia.length > 0;
  const currentMedia = allMedia[currentMediaIndex];

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden max-h-[95vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </button>

                {/* Scrollable content */}
                <div className="overflow-y-auto">
                  {/* Header Image or Media Gallery */}
                  {hasMedia ? (
                    <div className="relative h-64 sm:h-96 bg-black">
                      {/* Current Media */}
                      <div className="w-full h-full flex items-center justify-center">
                        {currentMedia.type === 'photo' ? (
                          <img
                            src={currentMedia.url}
                            alt={show.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <video
                            src={currentMedia.url}
                            controls
                            className="w-full h-full object-contain"
                            playsInline
                          />
                        )}
                      </div>

                      {/* Navigation arrows */}
                      {allMedia.length > 1 && (
                        <>
                          <button
                            onClick={prevMedia}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                          >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                          </button>
                          <button
                            onClick={nextMedia}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                          >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                          </button>
                        </>
                      )}

                      {/* Media counter */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
                        {currentMediaIndex + 1} / {allMedia.length}
                      </div>

                      {/* Title overlay */}
                      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-b from-black/60 to-transparent">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white font-heading">
                            {show.name}
                          </h2>
                          {show.badge && (
                            <span className="bg-secondary-yellow text-orange-900 text-[10px] sm:text-xs font-black px-2 sm:px-3 py-1 rounded-full uppercase">
                              {show.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Fallback to single image
                    <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
                      <img
                        src={show.image}
                        alt={show.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-heading">
                            {show.name}
                          </h2>
                          {show.badge && (
                            <span className="bg-secondary-yellow text-orange-900 text-xs font-black px-3 py-1 rounded-full uppercase">
                              {show.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Thumbnails */}
                  {hasMedia && allMedia.length > 1 && (
                    <div className="px-4 sm:px-6 py-3 bg-gray-50 border-b border-gray-100">
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {allMedia.map((media, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentMediaIndex(idx)}
                            className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                              idx === currentMediaIndex
                                ? 'border-primary scale-105'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {media.type === 'photo' ? (
                              <img
                                src={media.url}
                                alt={`${show.name} ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-black flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-2xl">play_circle</span>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                    {/* Description */}
                    <div>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {show.description}
                      </p>
                    </div>

                    {/* Program */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4 font-heading flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-xl sm:text-2xl">celebration</span>
                        В программе:
                      </h3>
                      <ul className="space-y-2">
                        {show.program.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 sm:gap-3">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing */}
                    <div className="bg-gradient-to-br from-primary/5 to-secondary-mint/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-primary/20">
                      <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4 font-heading flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-xl sm:text-2xl">payments</span>
                        Стоимость:
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        {show.pricing.map((price, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
                            <span className="text-sm sm:text-base font-bold text-gray-700">{price.label}</span>
                            <span className="text-xl sm:text-2xl font-black text-primary">{price.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {show.notes && show.notes.length > 0 && (
                      <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-blue-100">
                        <div className="space-y-2">
                          {show.notes.map((note, idx) => (
                            <p key={idx} className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                              {note}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="pt-2 sm:pt-4">
                      <a
                        href="/contact"
                        className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-primary text-white font-black text-base sm:text-lg hover:bg-primary-hover transition-all shadow-lg"
                      >
                        Забронировать это шоу
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
