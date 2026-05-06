import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ReviewsImport } from '../../components/admin/ReviewsImport';
import { getAllReviews, approveReview, rejectReview, deleteReview } from '../../lib/services/reviewsService';
import { Star, Check, X, Trash2, Upload, MessageSquare } from 'lucide-react';
import type { Review } from '../../types';

export function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showImport, setShowImport] = useState(false);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

  const loadReviews = async () => {
    try {
      setIsLoading(true);
      const data = await getAllReviews();
      setReviews(data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await approveReview(id);
      await loadReviews();
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectReview(id);
      await loadReviews();
    } catch (error) {
      console.error('Error rejecting review:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот отзыв?')) return;
    
    try {
      await deleteReview(id);
      await loadReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'approved') return review.isApproved;
    if (filter === 'pending') return !review.isApproved;
    return true;
  });

  const stats = {
    total: reviews.length,
    approved: reviews.filter(r => r.isApproved).length,
    pending: reviews.filter(r => !r.isApproved).length,
    averageRating: reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0'
  };

  if (showImport) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Импорт отзывов</h1>
            <p className="text-gray-600">Массовый импорт отзывов из 2GIS</p>
          </div>
          <Button
            onClick={() => setShowImport(false)}
            variant="outline"
          >
            Назад к отзывам
          </Button>
        </div>
        
        <ReviewsImport />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Управление отзывами</h1>
          <p className="text-gray-600">Модерация и импорт отзывов</p>
        </div>
        <Button
          onClick={() => setShowImport(true)}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Импорт отзывов
        </Button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего отзывов</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Одобрено</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <Check className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">На модерации</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <X className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Средняя оценка</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.averageRating}</p>
              </div>
              <Star className="w-8 h-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Фильтры */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          size="sm"
        >
          Все ({stats.total})
        </Button>
        <Button
          variant={filter === 'approved' ? 'default' : 'outline'}
          onClick={() => setFilter('approved')}
          size="sm"
        >
          Одобренные ({stats.approved})
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          onClick={() => setFilter('pending')}
          size="sm"
        >
          На модерации ({stats.pending})
        </Button>
      </div>

      {/* Список отзывов */}
      <div className="space-y-4">
        {isLoading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Загрузка отзывов...</p>
            </CardContent>
          </Card>
        ) : filteredReviews.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {filter === 'all' ? 'Нет отзывов' : 
                 filter === 'approved' ? 'Нет одобренных отзывов' : 
                 'Нет отзывов на модерации'}
              </h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? 'Импортируйте отзывы из 2GIS или дождитесь новых отзывов от клиентов'
                  : 'Отзывы с выбранным статусом отсутствуют'
                }
              </p>
              {filter === 'all' && (
                <Button onClick={() => setShowImport(true)}>
                  Импортировать отзывы
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredReviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.authorAvatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'}
                      alt={review.authorName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{review.authorName}</CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          review.isApproved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {review.isApproved ? 'Одобрен' : 'На модерации'}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Зал {review.hallType === 'both' ? 'Оба' : review.hallType}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!review.isApproved && (
                      <Button
                        size="sm"
                        onClick={() => handleApprove(review.id)}
                        className="flex items-center gap-1"
                      >
                        <Check className="w-4 h-4" />
                        Одобрить
                      </Button>
                    )}
                    {review.isApproved && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(review.id)}
                        className="flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        Отклонить
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(review.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Удалить
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{review.content}</p>
                <div className="text-sm text-gray-500">
                  Создан: {new Date(review.createdAt).toLocaleString('ru-RU')}
                  {review.updatedAt && new Date(review.updatedAt).getTime() !== new Date(review.createdAt).getTime() && (
                    <span className="ml-4">
                      Обновлен: {new Date(review.updatedAt).toLocaleString('ru-RU')}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
