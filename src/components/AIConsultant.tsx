import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, RotateCw, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import leadService from '../lib/services/leadService';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const QUICK_SUGGESTIONS = [
  '🎈 Подобрать праздник под возраст',
  '🏢 Цены на аренду залов',
  '📦 Пакеты «всё включено»',
  '📞 Как забронировать?'
];

export const AIConsultant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadCreated, setLeadCreated] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Инициализация чата
  useEffect(() => {
    const savedMessages = localStorage.getItem('arkasha_chat_history');
    const savedLeadFlag = localStorage.getItem('arkasha_lead_created');
    
    if (savedLeadFlag === 'true') {
      setLeadCreated(true);
    }

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Приветственное сообщение по умолчанию
      const welcomeMessage: Message = {
        role: 'assistant',
        text: 'Привет! 🎉 Я **Аркаша**, ваш виртуальный помощник в лофте Arkaloft. \n\nПомогу узнать цены, выбрать квест, шоу-программу или готовый праздничный пакет. \n\nЗадайте любой вопрос или выберите подсказку ниже! 👇',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Сохранение сообщений в localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('arkasha_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Автоматическая прокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Отправка сообщений
  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Проверка на наличие номера телефона для автоматического создания лида
    checkForLead(textToSend, [...messages, userMessage]);

    try {
      let chatUrl = '/api/chat';
      if (typeof window !== 'undefined' && window.location.port === '5173') {
        chatUrl = 'http://localhost:3000/api/chat';
      }

      const response = await fetch(chatUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            text: msg.text
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка связи с сервером');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        text: data.reply || 'Извините, не удалось сформировать ответ.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Ошибка чата:', error);
      const errorMessage: Message = {
        role: 'assistant',
        text: 'Ой, что-то пошло не так при связи с сервером. 😢 Пожалуйста, попробуйте отправить сообщение еще раз или свяжитесь с нами напрямую по телефону **+7 (983) 001-25-20**!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Проверка сообщений на телефон и создание лида
  const checkForLead = async (text: string, currentMessages: Message[]) => {
    if (leadCreated) return;

    // Регулярное выражение для поиска российских мобильных номеров
    const phoneRegex = /(?:\+?7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}/g;
    const match = text.match(phoneRegex);

    if (match && match.length > 0) {
      const phone = match[0];
      setLeadCreated(true);
      localStorage.setItem('arkasha_lead_created', 'true');

      // Собираем историю диалога для примечания к лиду
      const historyText = currentMessages
        .map(msg => `${msg.role === 'user' ? 'Клиент' : 'Аркаша'}: ${msg.text}`)
        .join('\n');

      // Пытаемся найти имя в истории (простой поиск по фразам "Меня зовут X" или "Я X")
      let name = 'Клиент из чата';
      const nameRegex = /(?:меня зовут|я)\s+([А-Яа-яA-Za-z]+)/i;
      const nameMatch = historyText.match(nameRegex);
      if (nameMatch && nameMatch[1]) {
        name = nameMatch[1];
      }

      try {
        await leadService.createLead({
          name,
          phone,
          message: `Авто-заявка от AI-помощника Аркаши.\n\nИстория переписки:\n${historyText}`,
          source: 'ИИ-консультант'
        });
        console.log('Лид успешно создан из AI чата');
      } catch (err) {
        console.error('Не удалось автоматически создать лид:', err);
      }
    }
  };

  // Сбросить диалог
  const handleReset = () => {
    if (window.confirm('Вы действительно хотите начать диалог заново? История переписки сотрется.')) {
      const welcomeMessage: Message = {
        role: 'assistant',
        text: 'Привет! 🎉 Я **Аркаша**, ваш виртуальный помощник в лофте Arkaloft. \n\nПомогу узнать цены, выбрать квест, шоу-программу или готовый праздничный пакет. \n\nЗадайте любой вопрос или выберите подсказку ниже! 👇',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcomeMessage]);
      setLeadCreated(false);
      localStorage.removeItem('arkasha_chat_history');
      localStorage.removeItem('arkasha_lead_created');
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-40 font-sans">
      {/* Кнопка открытия виджета */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-primary hover:bg-primary-hover text-white shadow-2xl flex items-center justify-center relative cursor-pointer group"
            style={{ boxShadow: '0 8px 30px rgba(76, 175, 80, 0.4)' }}
            aria-label="Открыть чат с AI-консультантом"
          >
            <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-yellow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary-yellow text-[10px] text-orange-900 font-black items-center justify-center">AI</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Окно чата */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-[350px] sm:w-[380px] h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
            style={{ boxShadow: '0 12px 50px rgba(0, 0, 0, 0.15)' }}
          >
            {/* Шапка чата */}
            <div className="bg-gradient-to-r from-primary to-primary-hover p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xl font-bold relative">
                  🦖
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-primary"></span>
                </div>
                <div>
                  <h4 className="font-heading font-black text-base flex items-center gap-1.5 leading-tight">
                    Аркаша
                    <Sparkles className="w-3.5 h-3.5 text-secondary-yellow fill-secondary-yellow" />
                  </h4>
                  <p className="text-[10px] text-white/80 font-bold uppercase tracking-wider">AI-гид по праздникам</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReset}
                  title="Начать заново"
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-white/80 hover:text-white"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background-off-white">
              {messages.map((msg, index) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <div
                    key={index}
                    className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} items-end gap-2`}
                  >
                    {isAssistant && (
                      <div className="w-8 h-8 rounded-full bg-secondary-mint text-base flex items-center justify-center shrink-0 border border-teal-200">
                        🦖
                      </div>
                    )}
                    <div className="max-w-[75%] space-y-1">
                      <div
                        className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                          isAssistant
                            ? 'bg-white text-gray-800 rounded-bl-none border border-gray-100/50'
                            : 'bg-primary text-white rounded-br-none'
                        }`}
                      >
                        {/* Рендеринг Markdown для ИИ и обычный текст для пользователя */}
                        {isAssistant ? (
                          <div className="prose prose-sm prose-green max-w-none text-gray-800 break-words font-medium">
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="whitespace-pre-line font-medium break-words">{msg.text}</p>
                        )}
                      </div>
                      <p className={`text-[9px] text-gray-400 font-bold px-1 ${!isAssistant && 'text-right'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Индикатор набора ответа */}
              {isLoading && (
                <div className="flex justify-start items-end gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary-mint text-base flex items-center justify-center shrink-0 border border-teal-200">
                    🦖
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-100/50 shadow-sm">
                    <div className="flex items-center gap-1.5 py-1 px-2">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Подсказки (быстрые вопросы) */}
            {messages.length < 5 && !isLoading && (
              <div className="px-4 py-2 bg-background-off-white border-t border-gray-100 overflow-x-auto flex gap-2 no-scrollbar">
                {QUICK_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion.replace(/^[^\s]+\s+/, ''))}
                    className="shrink-0 text-xs font-bold text-gray-600 bg-white hover:bg-primary/5 hover:text-primary hover:border-primary border border-gray-200 px-3 py-1.5 rounded-full transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Ввод сообщения */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 border-t border-gray-100 bg-white flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Спросите меня о чем угодно..."
                disabled={isLoading}
                className="flex-1 bg-gray-50 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm outline-none transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-primary hover:bg-primary-hover disabled:bg-gray-100 text-white disabled:text-gray-400 flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
