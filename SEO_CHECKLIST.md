# SEO Чеклист для Arkaloft

## ✅ Что уже сделано:

### 1. Базовая оптимизация
- ✅ `robots.txt` создан
- ✅ `sitemap.xml` создан
- ✅ SEO компонент с Open Graph и Twitter Cards
- ✅ Structured Data (Schema.org) для LocalBusiness
- ✅ Canonical URLs
- ✅ Meta description и keywords на всех страницах

### 2. Производительность
- ✅ Preload критичных изображений (hero, logo)
- ✅ Lazy loading для StoriesViewer
- ✅ Оптимизация загрузки hero изображений

## 📋 Что нужно сделать после деплоя:

### 1. Регистрация в поисковых системах

#### Google Search Console
1. Зарегистрируйся на https://search.google.com/search-console
2. Добавь сайт `https://arkaloft.ru`
3. Подтверди владение (через HTML-тег или DNS)
4. Отправь `sitemap.xml`: https://arkaloft.ru/sitemap.xml
5. Скопируй код верификации в `src/config/seo.ts` → `googleVerification`

#### Яндекс.Вебмастер
1. Зарегистрируйся на https://webmaster.yandex.ru
2. Добавь сайт `https://arkaloft.ru`
3. Подтверди владение (через HTML-тег или DNS)
4. Отправь `sitemap.xml`: https://arkaloft.ru/sitemap.xml
5. Скопируй код верификации в `src/config/seo.ts` → `yandexVerification`

### 2. Аналитика

#### Google Analytics 4
1. Создай аккаунт на https://analytics.google.com
2. Создай ресурс GA4
3. Получи Measurement ID (формат: G-XXXXXXXXXX)
4. Добавь в `src/config/seo.ts` → `googleAnalytics`
5. Добавь скрипт в `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Яндекс.Метрика
1. Создай счетчик на https://metrika.yandex.ru
2. Получи ID счетчика
3. Добавь в `src/config/seo.ts` → `yandexMetrika`
4. Добавь код счетчика в `index.html` перед `</head>`

### 3. Оптимизация изображений (рекомендуется)

```bash
# Установи инструменты для оптимизации
npm install -D imagemin imagemin-mozjpeg imagemin-pngquant

# Или используй онлайн-сервисы:
# - TinyPNG: https://tinypng.com
# - Squoosh: https://squoosh.app
```

**Приоритет оптимизации:**
1. Hero изображения (8 шт.) - сжать до 50-80KB каждое
2. Видео залов (20MB и 23MB) - сжать до 2-3MB
3. Изображения залов - сжать до 50-100KB

### 4. Проверка после деплоя

#### Lighthouse (производительность)
```bash
npx lighthouse https://arkaloft.ru --view
```
**Цель:** Performance > 90

#### Проверка SEO
- https://search.google.com/test/rich-results - проверка structured data
- https://validator.schema.org - валидация Schema.org
- https://cards-dev.twitter.com/validator - проверка Twitter Cards
- https://developers.facebook.com/tools/debug/ - проверка Open Graph

#### Проверка мобильной версии
- https://search.google.com/test/mobile-friendly

### 5. Локальное SEO (для Новосибирска)

#### Google Business Profile
1. Создай профиль на https://business.google.com
2. Укажи адрес: пр. Дзержинского, 18, Новосибирск
3. Добавь фото залов
4. Укажи часы работы: 10:00 - 22:00
5. Добавь категорию: "Площадка для мероприятий"

#### Яндекс.Справочник
1. Добавь организацию на https://yandex.ru/sprav
2. Заполни все данные
3. Добавь фото

#### 2ГИС
1. Добавь организацию на https://2gis.ru
2. Заполни контакты и описание

## 🎯 Ключевые метрики для отслеживания:

- **Органический трафик** (Google Analytics / Яндекс.Метрика)
- **Позиции в поиске** (Google Search Console / Яндекс.Вебмастер)
- **Конверсии** (звонки, заявки через форму)
- **Показатель отказов** (должен быть < 50%)
- **Время на сайте** (должно быть > 2 минут)

## 📱 Социальные сети

Убедись, что Open Graph работает:
1. Поделись ссылкой в VK - должна показаться превью
2. Поделись в Telegram - должна показаться превью
3. Проверь превью на https://developers.facebook.com/tools/debug/

## 🔍 Целевые запросы для продвижения:

**Высокочастотные:**
- лофт новосибирск
- аренда лофта новосибирск
- детский день рождения новосибирск

**Среднечастотные:**
- лофт для детского праздника
- зал для дня рождения новосибирск
- площадка для праздника новосибирск

**Низкочастотные:**
- лофт дзержинского новосибирск
- зал 0+ новосибирск
- лофт для подростков новосибирск
