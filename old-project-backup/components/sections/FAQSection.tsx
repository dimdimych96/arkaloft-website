import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Можно ли принести свою еду и напитки?',
      answer: 'Да, вы можете принести свою еду и напитки. У нас есть холодильник, микроволновка и вся необходимая посуда на 12 взрослых и 12 детей. Мы также можем порекомендовать проверенные кейтеринговые компании.'
    },
    {
      question: 'Есть ли парковка?',
      answer: 'Да, рядом с лофтом есть бесплатная парковка. Также удобный подъезд на общественном транспорте - остановка в 5 минутах ходьбы.'
    },
    {
      question: 'Сколько человек вмещает каждый зал?',
      answer: 'Зал "Малыш" (0+) площадью 135 кв.м вмещает до 30 человек (взрослые + дети). Зал "Исследователь" (7+) площадью 75 кв.м вмещает до 25 человек. При аренде обоих залов одновременно - до 50 человек.'
    },
    {
      question: 'Можно ли отменить или перенести бронирование?',
      answer: 'Да, вы можете отменить или перенести бронирование не позднее чем за 3 дня до мероприятия без штрафных санкций. При отмене менее чем за 3 дня - возвращается 50% предоплаты.'
    },
    {
      question: 'Нужно ли вносить залог?',
      answer: 'Для подтверждения бронирования требуется предоплата 30% от стоимости аренды. Остальная сумма оплачивается в день мероприятия. Залог за сохранность имущества не требуется.'
    },
    {
      question: 'Какое минимальное время аренды?',
      answer: 'Минимальное время аренды - 2 часа. Рекомендуем бронировать 3-4 часа для комфортного проведения праздника. В будние дни с 10:00 до 13:00 минимум 3 часа.'
    },
    {
      question: 'Можно ли пригласить своих аниматоров?',
      answer: 'Да, вы можете пригласить своих артистов и ведущих. Также мы сотрудничаем с проверенными агентствами и можем порекомендовать профессиональных аниматоров.'
    },
    {
      question: 'Что входит в стоимость аренды?',
      answer: 'В стоимость входит: посуда на 12 взрослых и 12 детей, сервировка стола, музыкальное сопровождение, чай/сахар, тележка для сладкого стола, кулер, микроволновка, батут (в зале 0+), электронные пригласительные, монитор для фото/видео, уборка после мероприятия.'
    },
    {
      question: 'Можно ли приехать заранее для оформления?',
      answer: 'Да, вы можете приехать за 30 минут до начала аренды для украшения зала. Это время не оплачивается дополнительно. Также рекомендуем записаться на экскурсию заранее, чтобы посмотреть залы.'
    },
    {
      question: 'Есть ли Wi-Fi и как подключить музыку?',
      answer: 'Да, в лофте есть бесплатный Wi-Fi. Для музыки есть колонки с Bluetooth - вы можете подключить свой телефон. Также есть возможность подключить ноутбук через HDMI к монитору.'
    }
  ]

  return (
    <section id="faq" className="py-12 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Ответы на популярные вопросы о бронировании и проведении праздников
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden transition-all hover:border-emerald-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 sm:px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4 text-sm sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-emerald-600 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`transition-all duration-200 ease-in-out ${
                  openIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="px-4 sm:px-6 pb-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-gray-600 mb-4">Не нашли ответ на свой вопрос?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+79830012520"
              className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Позвонить нам
            </a>
            <a
              href="https://wa.me/79830012520"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
