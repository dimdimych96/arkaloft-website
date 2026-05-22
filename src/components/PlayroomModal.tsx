import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { PlayroomDetail } from '../data/playroomData';
import { useState, useEffect } from 'react';

interface PlayroomModalProps {
  playroom: PlayroomDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PlayroomModal = ({ playroom, isOpen, onClose }: PlayroomModalProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Сбрасываем индекс при открытии
  useEffect(() => {
    if (isOpen) {
      setCurrentPhotoIndex(0);
    }
  }, [isOpen]);

  if (!playroom) return null;

  const photos = playroom.media?.photos || [];
  const hasPhotos = photos.length > 0;

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
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
                  {/* Photo Gallery */}
                  {hasPhotos ? (
                    <div className="relative h-64 sm:h-96 bg-gray-100">
                      {/* Current Photo */}
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          src={photos[currentPhotoIndex]}
                          alt={`${playroom.name} ${currentPhotoIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Navigation arrows */}
                      {photos.length > 1 && (
                        <>
                          <button
                            onClick={prevPhoto}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                          >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                          </button>
                          <button
                            onClick={nextPhoto}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                          >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                          </button>
                        </>
                      )}

                      {/* Photo counter */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
                        {currentPhotoIndex + 1} / {photos.length}
                      </div>

                      {/* Title overlay */}
                      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-b from-black/60 to-transparent">
                        <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white font-heading">
                          {playroom.name}
                        </h2>
                      </div>
                    </div>
                  ) : (
                    // Fallback to single image
                    <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
                      <img
                        src={playroom.image}
                        alt={playroom.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-heading">
                          {playroom.name}
                        </h2>
                      </div>
                    </div>
                  )}

                  {/* Thumbnails */}
                  {hasPhotos && photos.length > 1 && (
                    <div className="px-4 sm:px-6 py-3 bg-gray-50 border-b border-gray-100">
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {photos.map((photo, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentPhotoIndex(idx)}
                            className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                              idx === currentPhotoIndex
                                ? 'border-primary scale-105'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <img
                              src={photo}
                              alt={`${playroom.name} ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
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
                        {playroom.description}
                      </p>
                    </div>

                    {/* Schedule */}
                    <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-blue-600">schedule</span>
                        <h3 className="text-base sm:text-lg font-black text-gray-900 font-heading">
                          Режим работы
                        </h3>
                      </div>
                      <p className="text-sm text-gray-700">{playroom.schedule}</p>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4 font-heading flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-xl sm:text-2xl">star</span>
                        Что включено:
                      </h3>
                      <ul className="space-y-2">
                        {playroom.features.map((item, idx) => (
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
                        {playroom.pricing.map((price, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
                            <span className="text-sm sm:text-base font-bold text-gray-700">{price.label}</span>
                            <span className="text-xl sm:text-2xl font-black text-primary">{price.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {playroom.notes && playroom.notes.length > 0 && (
                      <div className="bg-yellow-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-yellow-100">
                        <div className="space-y-2">
                          {playroom.notes.map((note, idx) => (
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
                        Забронировать время
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
