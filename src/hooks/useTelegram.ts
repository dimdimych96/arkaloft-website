import { useState, useCallback } from 'react';
import { useTelegramStore } from '../store/telegramStore';
import apiClient from '../lib/axios';

export const useTelegram = () => {
  const { isConnected, chatId, setConnected, setChatId } = useTelegramStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.get('/telegram/connect');
      if (response.data.success) {
        setConnected(true);
        setChatId(response.data.chatId);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect';
      setError(errorMessage);
      setConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [setConnected, setChatId]);

  const sendMessage = useCallback(async (text: string) => {
    if (!chatId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await apiClient.post('/telegram/send', { chatId, text });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [chatId]);

  const disconnect = useCallback(() => {
    setConnected(false);
    setChatId(null);
  }, [setConnected, setChatId]);

  return {
    isConnected,
    chatId,
    isLoading,
    error,
    connect,
    sendMessage,
    disconnect,
  };
};
