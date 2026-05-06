import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { getApprovedReviews } from '../../lib/services/reviewsService';
import type { Review } from '../../types';

interface ImportedReviewsProps {
  firmId?: string;
  className?: string;
}

export function ImportedReviews({ firmId, className = '' }: ImportedReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoading(true);
        const approvedReviews = await getApprovedReviews();
        setReviews(approvedReviews);
      } catch (err) {
        console.error('Error loading reviews:', err);
        setError('Не удалось загрузить отзывы');
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Ограничиваем количество показываемых отзывов
  const displayedReviews = showAll ? reviews : reviews.slice(0, 5);
  const hasMoreReviews = reviews.length > 5;

  // Функция для обрезки текста
  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Функция для переключения расширения отзыва
  const toggleReviewExpansion = (reviewId: string) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg p-8 shadow-lg ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 animate-pulse">Загрузка отзывов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg p-8 text-center ${className}`}>
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Отзывы временно недоступны</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        {firmId && (
          <a
            href={`https://2gis.ru/firm/${firmId}/tab/reviews`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Смотреть на 2GIS
          </a>
        )}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className={`bg-white rounded-lg p-8 text-center ${className}`}>
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Пока нет отзывов</h3>
        <p className="text-gray-600 mb-4">Станьте первым, кто оставит отзыв о нашем лофте!</p>
        {firmId && (
          <a
            href={`https://2gis.ru/firm/${firmId}/tab/reviews`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Оставить отзыв на 2GIS
          </a>
        )}
      </div>
    );
  }

  // Вычисляем статистику на основе всех отзывов
  const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
  const totalReviews = reviews.length;

  return (
    <div className={className}>
      {/* Заголовок с статистикой */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 rounded-xl shadow-lg border border-emerald-100 animate-fade-in-up">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600 animate-pulse">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center mb-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 transition-all duration-300 ${
                    i < Math.round(averageRating) 
                      ? 'fill-yellow-400 text-yellow-400 animate-bounce' 
                      : 'text-gray-300'
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">Средняя оценка</div>
          </div>
          <div className="h-10 w-px bg-emerald-200"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600 animate-pulse">
              {totalReviews}
            </div>
            <div className="text-sm text-gray-600">
              {totalReviews === 1 ? 'отзыв' : totalReviews < 5 ? 'отзыва' : 'отзывов'}
            </div>
          </div>
          {firmId && (
            <>
              <div className="h-10 w-px bg-emerald-200"></div>
              <div>
                <a
                  href={`https://2gis.ru/firm/${firmId}/tab/reviews`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  aria-label="Открыть все отзывы на 2GIS"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Все отзывы на 2GIS
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Сетка отзывов */}
      <div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Отзывы клиентов"
      >
        {displayedReviews.map((review, index) => {
          const isExpanded = expandedReviews.has(review.id);
          const shouldTruncate = review.content.length > 200;
          const displayText = isExpanded || !shouldTruncate ? review.content : truncateText(review.content, 200);

          return (
            <Card 
              key={review.id} 
              className="review-card relative overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
              role="listitem"
              aria-labelledby={`review-author-${review.id}`}
              tabIndex={0}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={review.authorAvatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'}
                    alt={`Аватар ${review.authorName}`}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-100 hover:ring-emerald-300 transition-all duration-300"
                  />
                  <div className="ml-4">
                    <h4 
                      id={`review-author-${review.id}`}
                      className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300"
                    >
                      {review.authorName}
                    </h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 fill-yellow-400 text-yellow-400 transition-all duration-300 hover:scale-110" 
                          aria-hidden="true"
                        />
                      ))}
                      <span className="sr-only">Оценка: {review.rating} из 5 звезд</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-emerald-200 group-hover:text-emerald-300 transition-colors duration-300" aria-hidden="true" />
                  <p className="text-gray-700 leading-relaxed pl-6">{displayText}</p>

                  {/* Кнопка "Показать полностью" для длинных отзывов */}
                  {shouldTruncate && (
                    <button
                      onClick={() => toggleReviewExpansion(review.id)}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mt-2 ml-6 transition-all duration-300 hover:underline"
                      aria-expanded={isExpanded}
                      aria-controls={`review-content-${review.id}`}
                    >
                      {isExpanded ? 'Скрыть' : 'Показать полностью'}
                    </button>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                    review.hallType === '0+'
                      ? 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                      : review.hallType === '7+'
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}>
                    Зал {review.hallType === 'both' ? 'Оба' : review.hallType}
                  </span>
                  <span className="text-sm">
                    {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Кнопка "Показать все" */}
      {hasMoreReviews && (
        <div className="text-center mt-8">
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            className="flex items-center gap-2 mx-auto transition-all duration-300 hover:scale-105 hover:shadow-lg"
            aria-expanded={showAll}
            aria-controls="reviews-list"
          >
            {showAll ? (
              <>
                <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Скрыть отзывы
              </>
            ) : (
              <>
                <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Показать все отзывы ({totalReviews})
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
