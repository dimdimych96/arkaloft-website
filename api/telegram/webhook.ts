import { VercelRequest, VercelResponse } from '@vercel/node';
import TelegramBot from 'node-telegram-bot-api';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

// Handle Telegram webhook updates
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const update = req.body;

    // Handle message
    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      console.log(`Received message from ${chatId}: ${text}`);

      // Auto-response
      await bot.sendMessage(chatId, 'Thank you for contacting Arkaloft! We will get back to you soon.');
    }

    // Handle callback query (inline buttons)
    if (update.callback_query) {
      const callbackQuery = update.callback_query;
      const chatId = callbackQuery.message?.chat.id;

      if (chatId) {
        await bot.answerCallbackQuery(callbackQuery.id, {
          text: 'Thank you for your selection!',
        });
      }
    }

    return res.status(200).send('OK');
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return res.status(500).send('Error processing webhook');
  }
}
