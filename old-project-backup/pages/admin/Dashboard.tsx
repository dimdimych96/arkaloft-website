import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Users, Package, Calendar, DollarSign } from 'lucide-react'

export function Dashboard() {
  const stats = [
    {
      title: 'Всего бронирований',
      value: '0',
      description: 'За текущий месяц',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Активные залы',
      value: '2',
      description: 'Доступно для бронирования',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      title: 'Пакеты услуг',
      value: '4',
      description: 'Активных предложений',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Доход',
      value: '₽0',
      description: 'За текущий месяц',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Панель управления</h1>
        <p className="text-gray-600 mt-2">Добро пожаловать в админ-панель Эко-лофт АРКА</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Последние бронирования</CardTitle>
            <CardDescription>Недавние запросы на бронирование</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              Нет бронирований
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
            <CardDescription>Часто используемые функции</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              📅 Просмотреть календарь бронирований
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              ➕ Добавить новый зал
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              📦 Создать пакет услуг
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
