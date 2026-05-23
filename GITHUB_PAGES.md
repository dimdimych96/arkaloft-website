# Деплой на GitHub Pages

## Автоматический деплой через GitHub Actions

Workflow уже создан: `.github/workflows/deploy.yml`

### Настройка в GitHub:

1. Откройте репозиторий на GitHub: `https://github.com/dimdimych96/arkaloft-website`
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**
3. Перейдите в Actions → выберите "Deploy to GitHub Pages"
4. Нажмите "Run workflow" → **Run workflow**

### Деплой при changes:

После настройки — при каждом push в `main` деплой будет происходить автоматически.

---

## Кастомный домен arkaloft.ru

1. В настройках Pages → Custom domain → введите `arkaloft.ru`
2. GitHub создаст DNS записи (CNAME или A)
3. Добавьте эти записи в DNS вашего домена (у регистратора)
4. Подождите 5-10 минут для propagations

---

## Важно про base path

Сейчас в `vite.config.ts` указан `base: '/arkaloft-website/'`

Это значит сайт будет доступен по:
- `https://dimdimych96.github.io/arkaloft-website/`

Если хотите `https://dimdimych96.github.io/` — уберите base из config.
