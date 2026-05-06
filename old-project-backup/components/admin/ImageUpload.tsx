import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { uploadImage, validateImageFile, optimizeImage } from '../../lib/services/storageService'

interface ImageUploadProps {
  folder: 'halls' | 'packages' | 'services'
  onUploadComplete: (url: string) => void
  currentImage?: string
  onRemove?: () => void
}

export function ImageUpload({ folder, onUploadComplete, currentImage, onRemove }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(currentImage || null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setError(null)
    setUploading(true)

    try {
      // Валидация
      validateImageFile(file, 5)

      // Создаем превью
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // Оптимизация изображения
      const optimizedFile = await optimizeImage(file, 1920, 0.85)

      // Загрузка в Firebase Storage
      const downloadURL = await uploadImage(optimizedFile, folder)
      
      onUploadComplete(downloadURL)
      
      // Очищаем временный URL
      URL.revokeObjectURL(previewUrl)
    } catch (err: any) {
      console.error('Upload error:', err)
      setError(err.message || 'Ошибка загрузки изображения')
      setPreview(currentImage || null)
    } finally {
      setUploading(false)
    }
  }, [folder, onUploadComplete, currentImage])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    maxFiles: 1,
    disabled: uploading
  })

  const handleRemove = () => {
    setPreview(null)
    setError(null)
    if (onRemove) {
      onRemove()
    }
  }

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
          {!uploading && (
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'
          } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            {uploading ? (
              <>
                <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
                <p className="text-sm text-gray-600">Загрузка...</p>
              </>
            ) : isDragActive ? (
              <>
                <Upload className="w-12 h-12 text-emerald-600" />
                <p className="text-sm text-gray-600">Отпустите файл здесь</p>
              </>
            ) : (
              <>
                <ImageIcon className="w-12 h-12 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Перетащите изображение сюда или нажмите для выбора
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG, WEBP или GIF (макс. 5 МБ)
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

      {preview && !uploading && (
        <p className="text-xs text-gray-500 text-center">
          Изображение загружено успешно
        </p>
      )}
    </div>
  )
}
