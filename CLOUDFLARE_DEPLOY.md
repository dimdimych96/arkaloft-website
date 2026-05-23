# Миграция на Cloudflare Pages

## Шаг 1: Установка Wrangler

```bash
npm install -g wrangler
```

## Шаг 2: Авторизация в Cloudflare

```bash
wrangler login
```

## Шаг 3: Создание проекта (однократно)

```bash
wrangler pages create arkaloft
```

## Шаг 4: Деплой

```bash
# Через npm скрипт
npm run cloudflare:deploy

# Или напрямую
wrangler pages deploy dist --project-name=arkaloft
```

---

## Подключение домена arkaloft.ru

### Вариант 1: Перенос домена в Cloudflare

1. В Cloudflare Dashboard → Pages → ваш проект
2. Customize domain → Add custom domain
3. Ввести `arkaloft.ru`
4. Cloudflare предложит проверить владение доменом (через TXT запись)
5. После проверки — обновите nameservers у регистратора на Cloudflare

### Вариант 2: Оставить регистратор, добавить DNS записи

Если домен у Reg.ru, Timeweb или другом регистраторе:

1. В Cloudflare Dashboard → DNS → Add record:
   - **A запись** (для root домена):
     - Name: `@`
     - Content: `203.0.113.1` (Cloudflare предоставит реальные IP)
   - **CNAME запись** (для www):
     - Name: `www`
     - Content: `arkaloft.pages.dev`

2. В Pages → Customize domain → добавить `arkaloft.ru`

---

## После миграции

Удалите/закомментируйте старые скрипты из `package.json`:
- `deploy`, `deploy:hosting` — если больше не используете Firebase
- `vercel:dev`, `vercel:deploy` — если больше не используете Vercel
