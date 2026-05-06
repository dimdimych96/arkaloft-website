import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Settings } from 'lucide-react'

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Настройки</h1>
        <p className="text-gray-600 mt-2">Общие настройки системы</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Настройки сайта</CardTitle>
          <CardDescription>Управление основными параметрами</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Settings className="w-16 h-16 mb-4" />
            <p className="text-lg font-medium">Функционал в разработке</p>
            <p className="text-sm">Скоро здесь появятся настройки</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
