// Динамическая загрузка всех фото залов
export const getHallImages = (hallId: number): string[] => {
  const images: string[] = [];

  if (hallId === 0) {
    // Зал 0+ - все halls фото
    for (let i = 1; i <= 36; i++) {
      const ext = i >= 27 && i <= 34 ? 'JPG' : 'jpg';
      images.push(`/images/halls/0/halls (${i}).${ext}`);
    }
  } else if (hallId === 1) {
    // Зал 7+ - все halls7 фото
    for (let i = 1; i <= 20; i++) {
      const ext = (i >= 1 && i <= 16) || i === 19 ? 'JPG' : 'jpg';
      images.push(`/images/halls/7/halls7 (${i}).${ext}`);
    }
  }

  return images;
};

// Получить превью изображения (первое фото)
export const getHallPreview = (hallId: number): string => {
  const images = getHallImages(hallId);
  return images[0] || '';
};

// Получить первые N изображений для предпросмотра
export const getHallPreviewImages = (hallId: number, count: number = 3): string[] => {
  const images = getHallImages(hallId);
  return images.slice(0, count);
};
