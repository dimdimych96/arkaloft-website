import { callFunction } from '../firebase/config';
import apiClient from '../axios';

export interface LeadData {
  name?: string;
  phone: string;
  message?: string;
  date?: string;
  guests?: string;
  hall?: string;
  package?: string;
  source?: string;
}

/**
 * Service to handle lead submissions
 * Prefers Firebase Functions if available, falls back to API endpoint
 */
const leadService = {
  createLead: async (data: LeadData) => {
    try {
      console.log('Отправка данных в amoCRM...', data);
      
      // Определяем базовый URL для API
      // Если мы на 5173 (Vite), перенаправляем на 3000 (Vercel Dev)
      let apiUrl = '/api/amocrm';
      if (typeof window !== 'undefined' && window.location.port === '5173') {
        apiUrl = 'http://localhost:3000/api/amocrm';
        console.warn('Обнаружен Vite (5173). Перенаправляем запрос на Vercel Dev (3000):', apiUrl);
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      console.log('Ответ от API:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Ошибка при отправке в amoCRM');
      }
      return result;
    } catch (error) {
      console.error('Критическая ошибка leadService:', error);
      throw error;
    }
  }
};

export default leadService;
