import axios from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('--- AmoCRM API Request Received ---');

  // CORS headers для локальной разработки
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Разрешаем только POST-запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, date, guests, hall, package: pkg, message, source } = req.body;
  console.log('Payload:', { name, phone, date, guests, hall, pkg, message, source });

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
    // Формируем название лида
    let leadName = `Заявка с сайта`;
    if (name) leadName += `: ${name}`;
    if (pkg) leadName += ` | ${pkg}`;

    leadName = leadName.substring(0, 250);

    // Формируем описание лида с полной информацией
    let leadDescription = `📋 Новая заявка с сайта\n\n`;
    if (name) leadDescription += `👤 Имя: ${name}\n`;
    leadDescription += `📞 Телефон: ${phone}\n`;
    if (date) leadDescription += `📅 Дата праздника: ${date}\n`;
    if (guests) leadDescription += `👥 Количество гостей: ${guests}\n`;
    if (hall) {
      const hallNames: Record<string, string> = {
        'big-loft': 'Зал 0+',
        'teen-loft': 'Зал 7+',
        'both': 'Оба пространства'
      };
      leadDescription += `🏢 Пространство: ${hallNames[hall] || hall}\n`;
    }
    if (pkg) leadDescription += `📦 Пакет: ${pkg}\n`;
    if (message) leadDescription += `💬 Пожелания: ${message}\n`;
    if (source) leadDescription += `\n🔗 Источник: ${source}`;

    console.log('Sending to AmoCRM:', `${AMO_BASE_URL}/api/v4/leads/complex`);

    // Шаг 1: Создаем лид с контактом
    const leadResponse = await axios.post(
      `${AMO_BASE_URL}/api/v4/leads/complex`,
      [
        {
          name: leadName,
          price: 0,
          _embedded: {
            tags: [
              { name: "Сайт" },
              ...(source ? [{ name: source }] : []),
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
        },
        timeout: 10000 // 10 секунд таймаут
      }
    );

    console.log('Lead created:', leadResponse.status, JSON.stringify(leadResponse.data, null, 2));

    // Шаг 2: Добавляем примечание к созданному лиду
    // AmoCRM возвращает массив с объектами, где id - это ID созданного лида
    const leadId = leadResponse.data?.[0]?.id;
    console.log('Extracted lead ID:', leadId);

    if (leadId && leadDescription) {
      try {
        const noteResponse = await axios.post(
          `${AMO_BASE_URL}/api/v4/leads/${leadId}/notes`,
          [
            {
              note_type: 'common',
              params: {
                text: leadDescription
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
        console.log('Note added:', noteResponse.status, noteResponse.data);
      } catch (noteError: any) {
        console.error('Failed to add note (non-critical):', noteError.response?.data || noteError.message);
        // Не прерываем выполнение, если примечание не добавилось
      }
    }

    console.log('AmoCRM Success: Lead created with ID', leadId);
    return res.status(200).json({ success: true, data: leadResponse.data, leadId });

  } catch (error: any) {
    console.error('=== AmoCRM API Error ===');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Response status:', error.response?.status);
    console.error('Response data:', JSON.stringify(error.response?.data, null, 2));
    console.error('Request config:', {
      url: error.config?.url,
      method: error.config?.method,
      headers: error.config?.headers
    });

    return res.status(error.response?.status || 500).json({
      error: 'Не удалось отправить заявку в amoCRM',
      details: error.response?.data || error.message,
      code: error.code
    });
  }
}
