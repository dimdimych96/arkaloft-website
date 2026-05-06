import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { uploadImage, validateImageFile, optimizeImage } from '../../lib/services/storageService'

interface MultiImageUploadProps {
  folder: 'halls' | 'packages' | 'services'
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

export function MultiImageUpload({ 
  folder, 
  images, 
  onImagesChange,
  maxImages = 10 
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (images.length >= maxImages) {
      setError(`Максимум ${maxImages} изображений`)
      return
    }

    setError(null)
    setUploading(true)

    try {
      const uploadPromises = acceptedFiles.slice(0, maxImages - images.length).map(async (file) => {
        // Валидация
        validateImageFile(file, 5)

        // Оптимизация
        const optimizedFile = await optimizeImage(file, 1920, 0.85)

        // Загрузка
        return uploadImage(optimizedFile, folder)
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      onImagesChange([...images, ...uploadedUrls])
    } catch (err: any) {
      console.error('Upload error:', err)
      setError(err.message || 'Ошибка загрузки изображений')
    } finally {
      setUploading(false)
    }
  }, [folder, images, maxImages, onImagesChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    multiple: true,
    disabled: uploading || images.length >= maxImages
  })

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  return (
    <div className="space-y-4">
      {/* Превью загруженных изображений */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <button
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Зона загрузки */}
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'
          } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            {uploading ? (
              <>
                <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                <p className="text-sm text-gray-600">Загрузка...</p>
              </>
            ) : isDragActive ? (
              <>
                <Upload className="w-10 h-10 text-emerald-600" />
                <p className="text-sm text-gray-600">Отпустите файлы здесь</p>
              </>
            ) : (
              <>
                <ImageIcon className="w-10 h-10 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Перетащите изображения или нажмите для выбора
                </p>
                <p className="text-xs text-gray-500">
                  {images.length} из {maxImages} • JPG, PNG, WEBP (макс. 5 МБ каждое)
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}
