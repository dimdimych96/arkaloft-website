import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

// Initialize Firebase Admin
admin.initializeApp();

const db = admin.firestore();

// Telegram Bot Token
const TELEGRAM_BOT_TOKEN = functions.config().telegram?.bot_token || process.env.TELEGRAM_BOT_TOKEN;

/**
 * HTTP function to handle Telegram webhook
 */
export const telegramWebhook = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const body = req.body;
  
  // Handle different update types
  if (body.message) {
    const chatId = body.message.chat.id;
    const text = body.message.text;

    // Store message in Firestore
    await db.collection('messages').add({
      chatId: chatId.toString(),
      text,
      type: 'text',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Auto-response
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: 'Thank you for contacting Arkaloft! We will get back to you soon.',
      }),
    });
  }

  res.status(200).send('OK');
});

/**
 * HTTP function to connect Telegram user
 */
export const connectTelegram = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { chatId } = data;

  // Store user Telegram connection
  await db.collection('users').doc(context.auth.uid).set({
    telegramChatId: chatId,
    telegramConnected: true,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  }, { merge: true });

  return { success: true, chatId };
});

/**
 * HTTP function to send Telegram message
 */
export const sendTelegramMessage = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { chatId, text } = data;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      throw new Error(result.description || 'Failed to send message');
    }

    return { success: true };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Failed to send message');
  }
});

/**
 * Create a new project
 */
export const createProject = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { title, description } = data;

  const projectRef = await db.collection('projects').add({
    title,
    description,
    userId: context.auth.uid,
    status: 'draft',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { id: projectRef.id };
});

/**
 * Get user projects
 */
export const getUserProjects = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const snapshot = await db.collection('projects')
    .where('userId', '==', context.auth.uid)
    .orderBy('updatedAt', 'desc')
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
});
/**
 * HTTP function to handle lead creation
 */
export const createLead = functions.https.onCall(async (data, context) => {
  const { name, phone, message, date, guests, hall, package: pkg, source } = data;

  if (!phone) {
    throw new functions.https.HttpsError('invalid-argument', 'Phone number is required');
  }

  // 1. Store in Firestore
  const leadRef = await db.collection('leads').add({
    name: name || null,
    phone,
    message: message || null,
    date: date || null,
    guests: guests || null,
    hall: hall || null,
    package: pkg || null,
    source: source || 'unknown',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    status: 'new',
  });

  // 2. Send to Telegram
  const TELEGRAM_CHAT_ID = functions.config().telegram?.chat_id || process.env.TELEGRAM_CHAT_ID;
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
📍 Источник: ${source || 'Сайт'}
      `.trim();

      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
      });
    } catch (error) {
      console.error('Telegram error:', error);
    }
  }

  // 3. Send to AmoCRM
  const AMOCRM_DOMAIN = functions.config().amocrm?.domain || process.env.AMOCRM_DOMAIN;
  const AMOCRM_ACCESS_TOKEN = functions.config().amocrm?.access_token || process.env.AMOCRM_ACCESS_TOKEN;

  if (AMOCRM_DOMAIN && AMOCRM_ACCESS_TOKEN) {
    try {
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
                    values: [{ value: phone, enum_code: 'WORK' }],
                  },
                ],
              },
            ],
          },
        },
      ];

      await axios.post(amocrmUrl, leadData, {
        headers: {
          Authorization: `Bearer ${AMOCRM_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('AmoCRM error:', error);
    }
  }

  return { success: true, leadId: leadRef.id };
});
