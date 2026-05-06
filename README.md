# Arkaloft Website

A modern, sustainable design studio website built with React, TypeScript, and Firebase.

## Tech Stack

### Frontend
- **React 18.2.0** - UI framework
- **TypeScript 5.9.3** - Type safety
- **Vite 7.3.1** - Build tool
- **React Router DOM 6.8.1** - Routing
- **Tailwind CSS 4.2.1** - Styling
- **React Hook Form 7.47.0** - Forms
- **Zustand 4.4.7** - State management
- **Axios 1.6.0** - HTTP client
- **Date-fns 2.30.0** - Date utilities

### Backend
- **Node.js 18** - Runtime
- **Firebase Functions 4.9.0** - Serverless
- **Firebase Admin 12.0.0** - Admin SDK
- **Firebase Firestore** - Database
- **Firebase Authentication** - Auth
- **Firebase Storage** - File storage

### Integrations
- **Telegram Bot API** - Messaging
- **Vercel Functions** - Serverless endpoints

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase CLI
- Vercel CLI (optional)

### Installation

1. Clone the repository:
```bash
cd arkaloft-website
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Fill in your Firebase configuration in `.env`

5. Start development server:
```bash
npm run dev
```

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)

2. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

3. Login to Firebase:
```bash
firebase login
```

4. Initialize Firebase:
```bash
firebase init
```

5. Deploy:
```bash
npm run deploy
```

### Telegram Bot Setup

1. Create a bot with [@BotFather](https://t.me/botfather)

2. Add your bot token to `.env`:
```
TELEGRAM_BOT_TOKEN=your_bot_token
```

3. Deploy Telegram functions:
```bash
npm run deploy:functions
```

## Project Structure

```
arkaloft-website/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── store/          # Zustand stores
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and configs
│   ├── config/         # Configuration files
│   ├── types/          # TypeScript types
│   └── router.tsx      # React Router config
├── functions/
│   └── src/            # Firebase Cloud Functions
├── api/                # Vercel serverless functions
└── public/             # Static assets
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to Firebase
- `npm run deploy:functions` - Deploy Cloud Functions

## License

MIT
