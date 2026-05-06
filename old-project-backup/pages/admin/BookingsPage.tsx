import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Calendar } from 'lucide-react'

export function BookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Бронирования</h1>
        <p className="text-gray-600 mt-2">Управление бронированиями и календарем</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Календарь бронирований</CardTitle>
          <CardDescription>Здесь будет отображаться календарь с бронированиями</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Calendar className="w-16 h-16 mb-4" />
            <p className="text-lg font-medium">Функционал в разработке</p>
            <p className="text-sm">Скоро здесь появится календарь бронирований</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
