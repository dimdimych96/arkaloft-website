import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { X, Loader2, Plus, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { MultiImageUpload } from './MultiImageUpload'
import { useCreateHall, useUpdateHall } from '../../hooks/useHalls'
import type { Hall } from '../../types'

interface HallFormDialogProps {
  isOpen: boolean
  onClose: () => void
  hall?: Hall | null
}

interface HallFormData {
  name: string
  ageGroup: string
  area: string
  description: string
  features: string[]
  images: string[]
  icon: string
  color: string
  price: string
  link: string
  isActive: boolean
}

export function HallFormDialog({ isOpen, onClose, hall }: HallFormDialogProps) {
  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState('')
  const [images, setImages] = useState<string[]>([])

  const createHall = useCreateHall()
  const updateHall = useUpdateHall()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<HallFormData>({
    defaultValues: hall || {
      name: '',
      ageGroup: '',
      area: '',
      description: '',
      features: [],
      images: [],
      icon: 'Baby',
      color: 'emerald',
      price: '',
      link: '',
      isActive: true,
    }
  })

  useEffect(() => {
    if (hall) {
      setFeatures(hall.features || [])
      setImages(hall.images || [])
      reset(hall)
    } else {
      setFeatures([])
      setImages([])
      reset({
        name: '',
        ageGroup: '',
        area: '',
        description: '',
        features: [],
        images: [],
        icon: 'Baby',
        color: 'emerald',
        price: '',
        link: '',
        isActive: true,
      })
    }
  }, [hall, reset])

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: HallFormData) => {
    try {
      const hallData = {
        ...data,
        features,
        images,
      }

      if (hall?.id) {
        await updateHall.mutateAsync({ id: hall.id, data: hallData })
      } else {
        await createHall.mutateAsync(hallData)
      }

      onClose()
    } catch (error) {
      console.error('Error saving hall:', error)
    }
  }

  if (!isOpen) return null

  const isLoading = createHall.isPending || updateHall.isPending

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {hall ? 'Редактировать зал' : 'Добавить зал'}
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
              placeholder="Например: Зал 0+"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Возрастная группа *
              </label>
              <input
                {...register('ageGroup', { required: 'Обязательное поле' })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="0+"
              />
              {errors.ageGroup && (
                <p className="text-red-600 text-sm mt-1">{errors.ageGroup.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Площадь *
              </label>
              <input
                {...register('area', { required: 'Обязательное поле' })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="50 м²"
              />
              {errors.area && (
                <p className="text-red-600 text-sm mt-1">{errors.area.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание *
            </label>
            <textarea
              {...register('description', { required: 'Обязательное поле' })}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Описание зала..."
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Особенности
            </label>
            <div className="flex gap-2 mb-2">
              <input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Добавить особенность..."
              />
              <Button type="button" onClick={addFeature} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="flex-1 text-sm">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Изображения
            </label>
            <MultiImageUpload
              folder="halls"
              images={images}
              onImagesChange={setImages}
              maxImages={10}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Цена *
              </label>
              <input
                {...register('price', { required: 'Обязательное поле' })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="от 15 000 ₽/час"
              />
              {errors.price && (
                <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ссылка
              </label>
              <input
                {...register('link')}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="/virtual-tour"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Иконка
              </label>
              <select
                {...register('icon')}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Baby">Baby</option>
                <option value="Rocket">Rocket</option>
                <option value="Sparkles">Sparkles</option>
              </select>
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
                <option value="orange">Orange</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('isActive')}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label className="text-sm font-medium text-gray-700">
              Активен (отображается на сайте)
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
