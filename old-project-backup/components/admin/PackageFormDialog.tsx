import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { X, Loader2, Plus, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { ImageUpload } from './ImageUpload'
import { useCreatePackage, useUpdatePackage } from '../../hooks/usePackages'
import type { Package } from '../../types'

interface PackageFormDialogProps {
  isOpen: boolean
  onClose: () => void
  package?: Package | null
}

interface PackageFormData {
  name: string
  description: string
  price: number
  priceWeekend: number | null
  duration: number
  includedItems: string[]
  HallType: '0+' | '7+' | 'both'
  isActive: boolean
  imageUrl?: string
  icon?: string
  popular?: boolean
  note?: string
}

export function PackageFormDialog({ isOpen, onClose, package: pkg }: PackageFormDialogProps) {
  const [includedItems, setIncludedItems] = useState<string[]>([])
  const [newItem, setNewItem] = useState('')
  const [imageUrl, setImageUrl] = useState<string>('')

  const createPackage = useCreatePackage()
  const updatePackage = useUpdatePackage()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PackageFormData>({
    defaultValues: pkg || {
      name: '',
      description: '',
      price: 0,
      priceWeekend: null,
      duration: 3,
      includedItems: [],
      HallType: 'both',
      isActive: true,
      imageUrl: '',
      icon: 'Gift',
      popular: false,
      note: '',
    }
  })

  useEffect(() => {
    if (pkg) {
      setIncludedItems(pkg.includedItems || [])
      setImageUrl(pkg.imageUrl || '')
      reset(pkg)
    } else {
      setIncludedItems([])
      setImageUrl('')
      reset({
        name: '',
        description: '',
        price: 0,
        priceWeekend: null,
        duration: 3,
        includedItems: [],
        HallType: 'both',
        isActive: true,
        imageUrl: '',
        icon: 'Gift',
        popular: false,
        note: '',
      })
    }
  }, [pkg, reset])

  const addItem = () => {
    if (newItem.trim()) {
      setIncludedItems([...includedItems, newItem.trim()])
      setNewItem('')
    }
  }

  const removeItem = (index: number) => {
    setIncludedItems(includedItems.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: PackageFormData) => {
    try {
      const packageData = {
        ...data,
        includedItems,
        imageUrl,
        price: Number(data.price),
        priceWeekend: data.priceWeekend ? Number(data.priceWeekend) : null,
        duration: Number(data.duration),
      }

      if (pkg?.id) {
        await updatePackage.mutateAsync({ id: pkg.id, data: packageData })
      } else {
        await createPackage.mutateAsync(packageData)
      }

      onClose()
    } catch (error) {
      console.error('Error saving package:', error)
    }
  }

  if (!isOpen) return null

  const isLoading = createPackage.isPending || updatePackage.isPending

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {pkg ? 'Редактировать пакет' : 'Добавить пакет'}
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
              placeholder="Например: Стандарт"
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
              rows={2}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Краткое описание пакета..."
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Цена будни (₽) *
              </label>
              <input
                type="number"
                {...register('price', { required: 'Обязательное поле', min: 0 })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="15000"
              />
              {errors.price && (
                <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Цена выходные (₽)
              </label>
              <input
                type="number"
                {...register('priceWeekend', { min: 0 })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="18000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Длительность (ч) *
              </label>
              <input
                type="number"
                {...register('duration', { required: 'Обязательное поле', min: 1 })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="3"
              />
              {errors.duration && (
                <p className="text-red-600 text-sm mt-1">{errors.duration.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Что входит в пакет *
            </label>
            <div className="flex gap-2 mb-2">
              <input
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Добавить услугу..."
              />
              <Button type="button" onClick={addItem} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {includedItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="flex-1 text-sm">{item}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Для какого зала
              </label>
              <select
                {...register('HallType')}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="both">Оба зала</option>
                <option value="0+">Только 0+</option>
                <option value="7+">Только 7+</option>
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
                <option value="Gift">Gift</option>
                <option value="Crown">Crown</option>
                <option value="Star">Star</option>
                <option value="Sparkles">Sparkles</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Изображение
            </label>
            <ImageUpload
              folder="packages"
              currentImage={imageUrl}
              onUploadComplete={setImageUrl}
              onRemove={() => setImageUrl('')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Примечание
            </label>
            <input
              {...register('note')}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Будни / Пятница с 18:00 и выходные"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('isActive')}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Активен
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('popular')}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Популярный
              </label>
            </div>
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
