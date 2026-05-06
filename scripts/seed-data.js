/**
 * Скрипт для добавления начальных данных в Firestore
 * Запуск: node scripts/seed-data.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Читаем .env файл
const envPath = join(__dirname, '..', '.env');
const envContent = readFileSync(envPath, 'utf-8');

// Парсим переменные окружения
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.trim();
  }
});

// Firebase конфигурация
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Данные для залов
const hallsData = [
  {
    id: '0-plus',
    name: 'Big Loft',
    ageGroup: '0+',
    area: '135 м²',
    description: 'Идеальное пространство для малышей и шумных компаний. Огромная игровая зона, где можно бегать, прыгать и веселиться без ограничений!',
    features: [
      'Большая горка',
      'Сухой бассейн',
      'Зона на 30 мест',
      'Музыка и свет',
      'Проектор',
      'Бесплатный Wi-Fi'
    ],
    images: [
      '/images/halls/0/1.jpg',
      '/images/halls/0/2.jpg',
      '/images/halls/0/3.jpeg',
      '/images/halls/0/4.jpg',
      '/images/halls/0/5.jpg',
      '/images/halls/0/6.jpg'
    ],
    icon: 'child_friendly',
    color: 'emerald',
    price: '3500 ₽/час',
    link: '/about',
    isActive: true,
  },
  {
    id: '7-plus',
    name: 'Teen Loft',
    ageGroup: '7+',
    area: '75 м²',
    description: 'Стильное пространство для подростков. Игровые консоли, караоке, кинотеатр и атмосфера настоящего взрослого лофта!',
    features: [
      'PlayStation 5',
      '75" экран',
      'Караоке',
      'Кухня',
      'Мягкая мебель',
      'Неоновая подсветка'
    ],
    images: [
      '/images/halls/7/1.jpg',
      '/images/halls/7/2.jpg',
      '/images/halls/7/3.jpg',
      '/images/halls/7/4.jpg',
      '/images/halls/7/5.jpg',
      '/images/halls/7/6.jpg',
      '/images/halls/7/7.jpg'
    ],
    icon: 'videogame_asset',
    color: 'rose',
    price: '2500 ₽/час',
    link: '/about',
    isActive: true,
  },
];

// Данные для пакетов
const packagesData = [
  {
    id: 'light',
    name: 'Лайт',
    description: 'Базовый старт',
    price: 9900,
    priceWeekend: 11900,
    duration: 3,
    includedItems: [
      'Аренда 3 часа',
      'Аниматор (1 час)',
      'Шары для настроения'
    ],
    hallType: 'both',
    isActive: true,
    imageUrl: '/images/packages/min.webp',
    icon: 'celebration',
    popular: false,
  },
  {
    id: 'standard',
    name: 'Стандарт',
    description: 'Золотая середина',
    price: 18500,
    priceWeekend: 21000,
    duration: 4,
    includedItems: [
      'Аренда 4 часа',
      'Аниматор + Шоу',
      'Фотозона',
      'Красивая сервировка'
    ],
    hallType: 'both',
    isActive: true,
    imageUrl: '/images/packages/optimal.webp',
    icon: 'auto_awesome',
    popular: true,
  },
  {
    id: 'maxi',
    name: 'Макси',
    description: 'Полный отрыв',
    price: 29900,
    priceWeekend: 33000,
    duration: 5,
    includedItems: [
      'Аренда 5 часов',
      'Фотограф (2 часа)',
      'Кейтеринг + Декор'
    ],
    hallType: 'both',
    isActive: true,
    imageUrl: '/images/packages/premium.webp',
    icon: 'diamond',
    popular: false,
  },
];

// Данные для услуг
const servicesData = [
  // Аниматоры
  {
    id: 'animator-fixiki',
    name: 'Фиксики',
    description: 'Любимые герои мультфильма',
    price: 3500,
    icon: 'face',
    color: 'orange',
    category: 'animator',
    order: 1,
    isActive: true,
    imageUrl: '/images/halls/0/4.jpg',
  },
  {
    id: 'animator-puppy',
    name: 'Щенячий патруль',
    description: 'Герои мультсериала',
    price: 3500,
    icon: 'face',
    color: 'orange',
    category: 'animator',
    order: 2,
    isActive: true,
    imageUrl: '/images/halls/0/5.jpg',
  },
  {
    id: 'animator-elsa',
    name: 'Холодное сердце',
    description: 'Эльза и Анна',
    price: 4000,
    icon: 'face',
    color: 'orange',
    category: 'animator',
    order: 3,
    isActive: true,
    imageUrl: '/images/halls/0/6.jpg',
  },
  {
    id: 'animator-spiderman',
    name: 'Человек паук',
    description: 'Супергерой',
    price: 4000,
    icon: 'face',
    color: 'orange',
    category: 'animator',
    order: 4,
    isActive: true,
    imageUrl: '/images/halls/7/1.jpg',
  },
  {
    id: 'animator-unicorn',
    name: 'Единорог',
    description: 'Волшебный персонаж',
    price: 4500,
    icon: 'face',
    color: 'orange',
    category: 'animator',
    order: 5,
    isActive: true,
    imageUrl: '/images/halls/7/2.jpg',
  },
  // Шоу-программы
  {
    id: 'show-silver',
    name: 'Серебряное шоу',
    description: 'Килограммы блестящей фольги',
    price: 5000,
    icon: 'celebration',
    color: 'purple',
    category: 'show',
    order: 1,
    isActive: true,
    imageUrl: '/images/halls/7/4.jpg',
  },
  {
    id: 'show-bubble',
    name: 'Мыльное шоу',
    description: 'Гигантские мыльные пузыри',
    price: 4500,
    icon: 'celebration',
    color: 'purple',
    category: 'show',
    order: 2,
    isActive: true,
    imageUrl: '/images/halls/7/5.jpg',
  },
  {
    id: 'show-paper',
    name: 'Бумажная дискотека',
    description: 'Танцы с конфетти',
    price: 3500,
    icon: 'celebration',
    color: 'purple',
    category: 'show',
    order: 3,
    isActive: true,
    imageUrl: '/images/halls/7/6.jpg',
  },
  {
    id: 'show-science',
    name: 'Научное шоу',
    description: 'Увлекательные эксперименты',
    price: 6000,
    icon: 'science',
    color: 'purple',
    category: 'show',
    order: 4,
    isActive: true,
    imageUrl: '/images/halls/7/7.jpg',
  },
  // Основные услуги
  {
    id: 'service-photo',
    name: 'Фотограф',
    description: 'Профессиональная фотосъемка праздника',
    price: 5000,
    icon: 'camera_alt',
    color: 'blue',
    category: 'main',
    order: 1,
    isActive: true,
  },
  {
    id: 'service-video',
    name: 'Видеограф',
    description: 'Видеосъемка и монтаж',
    price: 7000,
    icon: 'videocam',
    color: 'blue',
    category: 'main',
    order: 2,
    isActive: true,
  },
  // Дополнительные услуги
  {
    id: 'service-aquagrime',
    name: 'Аквагрим',
    description: 'Рисунки на лице для детей',
    price: 2000,
    icon: 'brush',
    color: 'pink',
    category: 'additional',
    order: 1,
    isActive: true,
  },
  {
    id: 'service-candy',
    name: 'Кенди бар',
    description: 'Сладкий стол с десертами',
    price: 5000,
    icon: 'cake',
    color: 'pink',
    category: 'additional',
    order: 2,
    isActive: true,
  },
];

async function seedData() {
  try {
    console.log('🌱 Начинаем добавление данных в Firestore...\n');

    // Добавляем залы
    console.log('🏠 Добавляем залы...');
    const hallsRef = collection(db, 'halls');
    for (const hall of hallsData) {
      const docRef = await addDoc(hallsRef, {
        ...hall,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log(`   ✓ Зал "${hall.name}" добавлен с ID: ${docRef.id}`);
    }

    // Добавляем пакеты
    console.log('\n📦 Добавляем пакеты услуг...');
    const packagesRef = collection(db, 'packages');
    for (const pkg of packagesData) {
      const docRef = await addDoc(packagesRef, {
        ...pkg,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log(`   ✓ Пакет "${pkg.name}" добавлен с ID: ${docRef.id}`);
    }

    // Добавляем услуги
    console.log('\n🎯 Добавляем услуги...');
    const servicesRef = collection(db, 'services');
    for (const service of servicesData) {
      const docRef = await addDoc(servicesRef, {
        ...service,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log(`   ✓ Услуга "${service.name}" добавлена с ID: ${docRef.id}`);
    }

    console.log('\n✅ Данные успешно добавлены в Firestore!');
    console.log('\n📊 Итого:');
    console.log(`   - Залов: ${hallsData.length}`);
    console.log(`   - Пакетов: ${packagesData.length}`);
    console.log(`   - Услуг: ${servicesData.length}`);

  } catch (error) {
    console.error('❌ Ошибка при добавлении данных:', error);
    process.exit(1);
  }
}

// Запускаем скрипт
seedData();
