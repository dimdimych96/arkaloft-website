import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

// Environment variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // The ID where notifications will be sent
const AMOCRM_DOMAIN = process.env.AMOCRM_DOMAIN; // e.g. 'company.amocrm.ru'
const AMOCRM_ACCESS_TOKEN = process.env.AMOCRM_ACCESS_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, phone, message, date, guests, hall, package: pkg, source } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  const results = {
    telegram: false,
    amocrm: false,
    error: null as string | null,
  };

  // 1. Send to Telegram
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    try {
      const text = `
🚀 Новая заявка!
👤 Имя: ${name || 'Не указано'}
📞 Телефон: ${phone}
📅 Дата: ${date || 'Не указана'}
👥 Гостей: ${guests || 'Не указано'}
🏢 Зал: ${hall || 'Не указан'}
📦 Пакет: ${pkg || 'Не указан'}
💬 Сообщение: ${message || 'Нет'}
📍 Источник: ${source || 'Главная страница'}
      `.trim();

      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
      });
      results.telegram = true;
    } catch (err: any) {
      console.error('Telegram error:', err.response?.data || err.message);
    }
  }

  // 2. Send to AmoCRM
  if (AMOCRM_DOMAIN && AMOCRM_ACCESS_TOKEN) {
    try {
      // Simple lead creation logic for AmoCRM
      // First, create a contact or find existing one
      // Then create a lead
      const amocrmUrl = `https://${AMOCRM_DOMAIN}/api/v4/leads/complex`;
      
      const leadData = [
        {
          name: `Заявка от ${name || phone}`,
          _embedded: {
            contacts: [
              {
                first_name: name || 'Клиент',
                custom_fields_values: [
                  {
                    field_code: 'PHONE',
                    values: [
                      {
                        value: phone,
                        enum_code: 'WORK',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          custom_fields_values: [
            {
              field_name: 'Сообщение',
              values: [{ value: message || '' }],
            },
            {
              field_name: 'Дата',
              values: [{ value: date || '' }],
            },
          ],
        },
      ];

      await axios.post(amocrmUrl, leadData, {
        headers: {
          Authorization: `Bearer ${AMOCRM_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      results.amocrm = true;
    } catch (err: any) {
      console.error('AmoCRM error:', err.response?.data || err.message);
    }
  }

  return res.status(200).json({
    success: true,
    message: 'Lead received',
    results,
  });
}
