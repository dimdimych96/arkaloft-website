import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

// Environment variables
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
    amocrm: false,
    error: null as string | null,
  };

  // Send to AmoCRM
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
            {
              field_name: 'Гости',
              values: [{ value: guests || '' }],
            },
            {
              field_name: 'Зал',
              values: [{ value: hall || '' }],
            },
            {
              field_name: 'Пакет',
              values: [{ value: pkg || '' }],
            },
            {
              field_name: 'Источник',
              values: [{ value: source || 'Главная страница' }],
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
      results.error = err.response?.data?.detail || err.message || 'AmoCRM error';
    }
  }

  return res.status(200).json({
    success: results.amocrm,
    message: results.amocrm ? 'Lead sent to AmoCRM' : 'Failed to send lead',
    results,
  });
}
