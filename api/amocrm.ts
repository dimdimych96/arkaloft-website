import axios from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('--- AmoCRM API Request Received ---');
  
  // Разрешаем только POST-запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, date, guests, hall, package: pkg } = req.body;
  console.log('Payload:', { name, phone, date, pkg });

  if (!phone) {
    return res.status(400).json({ error: 'Телефон обязателен' });
  }

  const AMO_BASE_URL = process.env.AMO_BASE_URL;
  const AMO_TOKEN = process.env.AMO_LONG_LIVED_TOKEN;

  if (!AMO_BASE_URL || !AMO_TOKEN || AMO_BASE_URL.includes('ВАШ_САБДОМЕН')) {
    console.error('Missing AmoCRM config in ENV');
    return res.status(500).json({ error: 'Конфигурация AmoCRM не настроена в .env' });
  }

  try {
    let leadName = `Заявка с сайта: ${name || phone}`;
    if (pkg) leadName += ` | Пакет: ${pkg}`;
    if (date) leadName += ` | Дата: ${date}`;
    if (guests) leadName += ` | Гостей: ${guests}`;
    if (hall) leadName += ` | Зал: ${hall}`;

    leadName = leadName.substring(0, 250);

    console.log('Sending to AmoCRM:', `${AMO_BASE_URL}/api/v4/leads/complex`);

    const response = await axios.post(
      `${AMO_BASE_URL}/api/v4/leads/complex`,
      [
        {
          name: leadName,
          _embedded: {
            tags: [
              { name: "Сайт" },
              ...(pkg ? [{ name: pkg }] : []),
              ...(hall ? [{ name: hall }] : [])
            ],
            contacts: [
              {
                first_name: name || 'Без имени',
                custom_fields_values: [
                  {
                    field_code: 'PHONE',
                    values: [
                      {
                        value: phone,
                        enum_code: 'MOB'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      ],
      {
        headers: {
          'Authorization': `Bearer ${AMO_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('AmoCRM Success:', response.status, response.data);
    return res.status(200).json({ success: true, data: response.data });

  } catch (error: any) {
    console.error('Ошибка amoCRM API:', error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({ 
      error: 'Не удалось отправить заявку в amoCRM', 
      details: error.response?.data || error.message 
    });
  }
}
