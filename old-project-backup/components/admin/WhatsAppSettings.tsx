import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { MessageCircle, Settings, TestTube } from 'lucide-react'
import { useToast } from '../../hooks/use-toast'
import { generateWhatsAppMessage, createWhatsAppLink, getPopularHeroes } from '../../lib/services/whatsappService'

export function WhatsAppSettings() {
  const [phoneNumber, setPhoneNumber] = useState('+7XXXXXXXXXX')
  const [testMessage, setTestMessage] = useState('')
  const { toast } = useToast()

  // Тестовые данные для демонстрации
  const testBookingData = {
    customerName: 'Анна Петрова',
    customerPhone: '+7 (999) 123-45-67',
    customerEmail: 'anna@example.com',
    hallType: '0+' as const,
    date: new Date('2024-12-25'),
    time: '15:00',
    duration: 2,
    guestCount: 15,
    packageType: 'Премиум',
    totalAmount: 48500,
    status: 'pending' as const,
    notes: 'Ребенок очень любит Человека-паука, хотелось бы аниматора в этом образе',
    childAge: 6,
    favoriteHero: 'Человек-паук'
  }

  const handleTestMessage = () => {
    if (!testMessage.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите тестовое сообщение",
        variant: "destructive"
      })
      return
    }

    const whatsappLink = createWhatsAppLink(testMessage, phoneNumber)
    window.open(whatsappLink, '_blank')
    
    toast({
      title: "Тестовое сообщение отправлено",
      description: "WhatsApp должен открыться с вашим сообщением"
    })
  }

  const handleTestBooking = () => {
    const message = generateWhatsAppMessage(testBookingData)
    const whatsappLink = createWhatsAppLink(message, phoneNumber)
    window.open(whatsappLink, '_blank')
    
    toast({
      title: "Тестовая заявка отправлена",
      description: "WhatsApp должен открыться с форматированной заявкой"
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageCircle className="h-8 w-8 text-green-600" />
        <div>
          <h1 className="text-2xl font-bold">Настройки WhatsApp</h1>
          <p className="text-gray-600">Настройте интеграцию с WhatsApp для автоматической отправки заявок</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Настройки */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Основные настройки
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="phone">Номер WhatsApp для получения заявок</Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+7 (999) 123-45-67"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                На этот номер будут отправляться все заявки на бронирование
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">📋 Что включается в сообщение:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Контактная информация клиента</li>
                <li>• Детали мероприятия (зал, дата, время)</li>
                <li>• Количество гостей и выбранный пакет</li>
                <li>• Возраст ребенка и любимый герой (для подбора аниматора)</li>
                <li>• Особые пожелания</li>
                <li>• Время создания заявки</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Тестирование */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5" />
              Тестирование
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="test-message">Тестовое сообщение</Label>
              <Textarea
                id="test-message"
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="Введите тестовое сообщение..."
                className="mt-1 min-h-[100px]"
              />
            </div>

            <Button 
              onClick={handleTestMessage}
              className="w-full"
              variant="outline"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Отправить тестовое сообщение
            </Button>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Тестовая заявка на бронирование</h4>
              <div className="bg-gray-50 p-3 rounded-lg mb-3 text-sm">
                <p><strong>Клиент:</strong> {testBookingData.customerName}</p>
                <p><strong>Дата:</strong> {testBookingData.date.toLocaleDateString('ru-RU')}</p>
                <p><strong>Возраст ребенка:</strong> {testBookingData.childAge} лет</p>
                <p><strong>Любимый герой:</strong> {testBookingData.favoriteHero}</p>
              </div>
              
              <Button 
                onClick={handleTestBooking}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Отправить тестовую заявку
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Список популярных героев */}
      <Card>
        <CardHeader>
          <CardTitle>Популярные герои и персонажи</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {getPopularHeroes().map((hero) => (
              <div key={hero} className="bg-gray-50 p-2 rounded text-sm text-center">
                {hero}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Этот список используется в форме бронирования для выбора любимого героя ребенка
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
