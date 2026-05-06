import { create } from 'zustand';

interface TelegramState {
  isConnected: boolean;
  chatId: string | null;
  webhookUrl: string | null;
  setConnected: (connected: boolean) => void;
  setChatId: (chatId: string | null) => void;
  setWebhookUrl: (url: string | null) => void;
}

export const useTelegramStore = create<TelegramState>((set) => ({
  isConnected: false,
  chatId: null,
  webhookUrl: null,
  setConnected: (connected) => set({ isConnected: connected }),
  setChatId: (chatId) => set({ chatId }),
  setWebhookUrl: (webhookUrl) => set({ webhookUrl }),
}));
