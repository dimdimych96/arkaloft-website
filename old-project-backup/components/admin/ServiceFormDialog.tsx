import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { X, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useCreateService, useUpdateService } from '../../hooks/useServices'
import type { Service } from '../../types'

interface ServiceFormDialogProps {
  isOpen: boolean
  onClose: () => void
  service?: Service | null
}

interface ServiceFormData {
  name: string
  description: string
  price: number | null
  icon: string
  color: string
  category: 'main' | 'additional'
  order: number
  isActive: boolean
}

export function ServiceFormDialog({ isOpen, onClose, service }: ServiceFormDialogProps) {
  const createService = useCreateService()
  const updateService = useUpdateService()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceFormData>({
    defaultValues: service || {
      name: '',
      description: '',
      price: null,
      icon: 'Users',
      color: 'emerald',
      category: 'additional',
      order: 1,
      isActive: true,
    }
  })

  useEffect(() => {
    if (service) {
      reset(service)
    } else {
      reset({
        name: '',
        description: '',
        price: null,
        icon: 'Users',
        color: 'emerald',
        category: 'additional',
        order: 1,
        isActive: true,
      })
    }
  }, [service, reset])

  const onSubmit = async (data: ServiceFormData) => {
    try {
      const serviceData = {
        ...data,
        price: data.price ? Number(data.price) : null,
        order: Number(data.order),
      }

      if (service?.id) {
        await updateService.mutateAsync({ id: service.id, data: serviceData })
      } else {
        await createService.mutateAsync(serviceData)
      }

      onClose()
    } catch (error) {
      console.error('Error saving service:', error)
    }
  }

  if (!isOpen) return null

  const isLoading = createService.isPending || updateService.isPending

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {service ? 'Редактировать услугу' : 'Добавить услугу'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Название *
            </label>
            <input
              {...register('name', { required: 'Обязательное поле' })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Например: Аниматоры"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание *
            </label>
            <textarea
              {...register('description', { required: 'Обязательное поле' })}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Описание услуги..."
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Цена (₽)
              </label>
              <input
                type="number"
                {...register('price', { min: 0 })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Оставьте пустым если цена договорная"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Порядок отображения *
              </label>
              <input
                type="number"
                {...register('order', { required: 'Обязательное поле', min: 1 })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="1"
              />
              {errors.order && (
                <p className="text-red-600 text-sm mt-1">{errors.order.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Категория *
              </label>
              <select
                {...register('category')}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="main">Основная</option>
                <option value="additional">Дополнительная</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Иконка
              </label>
              <select
                {...register('icon')}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Users">Users</option>
                <option value="Camera">Camera</option>
                <option value="Palette">Palette</option>
                <option value="Snowflake">Snowflake</option>
                <option value="Sparkles">Sparkles</option>
                <option value="PartyPopper">PartyPopper</option>
                <option value="Zap">Zap</option>
                <option value="Cake">Cake</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Цвет
            </label>
            <select
              {...register('color')}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="emerald">Emerald</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="cyan">Cyan</option>
              <option value="gray">Gray</option>
              <option value="orange">Orange</option>
              <option value="pink">Pink</option>
              <option value="rose">Rose</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('isActive')}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label className="text-sm font-medium text-gray-700">
              Активна (отображается на сайте)
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Сохранение...
                </>
              ) : (
                'Сохранить'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
