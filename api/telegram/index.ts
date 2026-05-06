import { VercelRequest, VercelResponse } from '@vercel/node';
import TelegramBot from 'node-telegram-bot-api';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { chatId, text } = req.body;

      if (!chatId || !text) {
        return res.status(400).json({ error: 'chatId and text are required' });
      }

      await bot.sendMessage(chatId, text);

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Telegram send error:', error);
      return res.status(500).json({ error: 'Failed to send message' });
    }
  }

  if (req.method === 'GET') {
    // Webhook setup endpoint
    const webhookUrl = `${process.env.VERCEL_URL}/api/telegram`;
    
    try {
      await bot.setWebHook(webhookUrl);
      return res.status(200).json({ success: true, webhookUrl });
    } catch (error) {
      console.error('Webhook setup error:', error);
      return res.status(500).json({ error: 'Failed to set webhook' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
