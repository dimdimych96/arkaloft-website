export interface PlayroomDetail {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricing: {
    label: string;
    price: string;
  }[];
  schedule: string;
  notes?: string[];
  image: string;
  media?: {
    photos?: string[];
  };
}

export const playroomData: PlayroomDetail = {
  id: 'igroteka',
  name: 'Игротека',
  description: 'Каждый день, когда зал свободен от праздников! Пока Ваш малыш играет, Вы можете отдохнуть или поработать за чашечкой чая в уютной обстановке.',
  features: [
    'Безопасная игровая зона для детей',
    'Горка и сухой бассейн',
    'Настольные игры и игрушки',
    'Уютная зона отдыха для родителей',
    'Бесплатный чай для взрослых',
    'Wi-Fi для работы',
    'Чистота и порядок'
  ],
  pricing: [
    { label: '2 взрослых + 1 ребенок', price: '450 ₽/час' },
    { label: 'За 2-го ребенка', price: '+300 ₽/час' }
  ],
  schedule: 'Ежедневно, когда зал свободен от мероприятий',
  notes: [
    '📞 Уточняйте наличие свободного времени по телефону',
    '⏰ Рекомендуем бронировать заранее',
    '☕ Чай и кофе для родителей включены'
  ],
  image: '/images/tour/igroteka/igroteka (1).jpg',
  media: {
    photos: [
      '/images/tour/igroteka/igroteka (1).jpg',
      '/images/tour/igroteka/igroteka (2).jpg',
      '/images/tour/igroteka/igroteka (3).jpg',
      '/images/tour/igroteka/igroteka (4).jpg',
      '/images/tour/igroteka/igroteka (5).jpg',
      '/images/tour/igroteka/igroteka (6).jpg'
    ]
  }
};
