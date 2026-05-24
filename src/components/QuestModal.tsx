import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Clock, Milestone, Sparkles } from 'lucide-react';
import { QuestDetail } from '../data/questsData';

interface QuestModalProps {
  quest: QuestDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuestModal = ({ quest, isOpen, onClose }: QuestModalProps) => {
  if (!quest) return null;

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
                className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden max-h-[95vh] flex flex-col"
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
                  {/* Quest Header Image */}
                  <div className="relative h-56 sm:h-80 overflow-hidden">
                    <img
                      src={quest.image}
                      alt={quest.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <span className="text-3xl sm:text-4xl">{quest.emoji}</span>
                        <h2 className="text-xl sm:text-3xl font-black text-white font-heading">
                          {quest.name}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                    {/* Parameters Strip */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100">
                      <div className="text-center flex flex-col items-center justify-center border-r border-gray-200">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-1 shrink-0" />
                        <span className="text-[10px] sm:text-xs text-gray-500 font-medium">Время</span>
                        <span className="text-xs sm:text-sm font-black text-gray-800">{quest.duration}</span>
                      </div>
                      <div className="text-center flex flex-col items-center justify-center border-r border-gray-200">
                        <Milestone className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-1 shrink-0" />
                        <span className="text-[10px] sm:text-xs text-gray-500 font-medium">Возраст</span>
                        <span className="text-xs sm:text-sm font-black text-gray-800">7+ лет</span>
                      </div>
                      <div className="text-center flex flex-col items-center justify-center">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-1 shrink-0" />
                        <span className="text-[10px] sm:text-xs text-gray-500 font-medium">Стоимость</span>
                        <span className="text-xs sm:text-sm font-black text-primary">{quest.price}</span>
                      </div>
                    </div>

                    {/* Quest Description */}
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-gray-900 mb-2 font-heading">О сюжете:</h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                        {quest.detailDescription}
                      </p>
                    </div>

                    {/* Notes & Tips */}
                    {quest.notes && quest.notes.length > 0 && (
                      <div className="bg-orange-50/70 rounded-xl sm:rounded-2xl p-4 border border-orange-100">
                        <h4 className="text-xs sm:text-sm font-black text-orange-950 mb-2 flex items-center gap-1.5 font-heading">
                          <span className="material-symbols-outlined text-orange-600 text-lg">info</span>
                          Важная информация:
                        </h4>
                        <ul className="space-y-1.5">
                          {quest.notes.map((note, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Booking CTA Button */}
                    <div className="pt-2 sm:pt-4">
                      <a
                        href="/contact"
                        className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-primary text-white font-black text-sm sm:text-base hover:bg-primary-hover transition-all shadow-lg text-center"
                      >
                        Забронировать квест
                        <span className="material-symbols-outlined text-sm sm:text-base">arrow_forward</span>
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
