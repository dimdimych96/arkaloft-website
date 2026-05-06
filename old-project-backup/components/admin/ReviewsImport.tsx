import { useState } from 'react'
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, Download } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { importFromJson, importFromCsv, importFromDgisApi } from '../../lib/services/dgisImportService'

interface ImportResult {
  success: number
  failed: number
  errors: string[]
}

export function ReviewsImport() {
  const [isImporting, setIsImporting] = useState(false)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const [autoApprove, setAutoApprove] = useState(false)
  const [fileType, setFileType] = useState<'json' | 'csv' | 'api'>('api')

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    setImportResult(null)

    try {
      const text = await file.text()
      
      let result: ImportResult
      if (fileType === 'api') {
        result = await importFromDgisApi(text, autoApprove)
      } else if (fileType === 'json') {
        result = await importFromJson(text, autoApprove)
      } else {
        result = await importFromCsv(text, autoApprove)
      }
      
      setImportResult(result)
    } catch (error) {
      setImportResult({
        success: 0,
        failed: 0,
        errors: [error instanceof Error ? error.message : 'Неизвестная ошибка'],
      })
    } finally {
      setIsImporting(false)
      // Очищаем input для возможности повторной загрузки
      event.target.value = ''
    }
  }

  const downloadApiTemplate = () => {
    const template = {
      meta: {
        branch_rating: 4.9,
        branch_reviews_count: 2,
        total_count: 2
      },
      reviews: [
        {
          id: "23396528",
          text: "Отличное место для детского праздника! Дети были в восторге.",
          rating: 5,
          date_created: "2024-01-15T10:00:00.000000+07:00",
          is_hidden: false,
          user: {
            name: "Анна Иванова",
            photo_preview_urls: {
              "320x": "https://example.com/avatar_320x.jpg",
              "640x": "https://example.com/avatar_640x.jpg",
              "url": "https://example.com/avatar.jpg"
            }
          }
        }
      ]
    }

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '2gis-api-template.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadJsonTemplate = () => {
    const template = {
      reviews: [
        {
          id: "1",
          text: "Отличное место для детского праздника! Дети были в восторге.",
          rating: 5,
          date: "2024-01-15",
          user: {
            name: "Анна Иванова",
            avatar: "https://example.com/avatar.jpg"
          }
        },
        {
          id: "2",
          text: "Хорошая организация, но хотелось бы больше аниматоров.",
          rating: 4,
          date: "2024-01-20",
          user: {
            name: "Петр Сидоров"
          }
        }
      ]
    }

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'reviews-template.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadCsvTemplate = () => {
    const template = `name,rating,text,date,avatar
"Анна Иванова",5,"Отличное место для детского праздника! Дети были в восторге.","2024-01-15","https://example.com/avatar.jpg"
"Петр Сидоров",4,"Хорошая организация, но хотелось бы больше аниматоров.","2024-01-20",""
"Мария Петрова",5,"Все понравилось! Обязательно вернемся еще.","2024-01-25",""`

    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'reviews-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Импорт отзывов из 2GIS</CardTitle>
          <CardDescription>
            Загрузите файл с отзывами в формате JSON или CSV для массового импорта
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Выбор формата */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Формат файла</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="api"
                  checked={fileType === 'api'}
                  onChange={(e) => setFileType(e.target.value as 'json' | 'csv' | 'api')}
                  className="w-4 h-4 text-emerald-600"
                />
                <span>2GIS API (рекомендуется)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="json"
                  checked={fileType === 'json'}
                  onChange={(e) => setFileType(e.target.value as 'json' | 'csv' | 'api')}
                  className="w-4 h-4 text-emerald-600"
                />
                <span>JSON</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="csv"
                  checked={fileType === 'csv'}
                  onChange={(e) => setFileType(e.target.value as 'json' | 'csv' | 'api')}
                  className="w-4 h-4 text-emerald-600"
                />
                <span>CSV</span>
              </label>
            </div>
          </div>

          {/* Автоматическое одобрение */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="autoApprove"
              checked={autoApprove}
              onChange={(e) => setAutoApprove(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
            <label htmlFor="autoApprove" className="text-sm font-medium cursor-pointer">
              Автоматически одобрять импортированные отзывы
            </label>
          </div>

          {/* Скачать шаблон */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={
                fileType === 'api' ? downloadApiTemplate :
                fileType === 'json' ? downloadJsonTemplate : 
                downloadCsvTemplate
              }
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Скачать шаблон {fileType === 'api' ? '2GIS API' : fileType.toUpperCase()}
            </Button>
          </div>

          {/* Загрузка файла */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors">
            <input
              type="file"
              id="file-upload"
              accept={fileType === 'csv' ? '.csv' : '.json'}
              onChange={handleFileUpload}
              disabled={isImporting}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center space-y-3"
            >
              {isImporting ? (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
                  <p className="text-sm text-gray-600">Импортируем отзывы...</p>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Нажмите для выбора файла
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Поддерживается {fileType.toUpperCase()}
                    </p>
                  </div>
                </>
              )}
            </label>
          </div>

          {/* Результаты импорта */}
          {importResult && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Успешно импортировано:</span>
                </div>
                <span className="text-lg font-bold text-green-600">
                  {importResult.success}
                </span>
              </div>

              {importResult.failed > 0 && (
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="font-medium">Ошибок:</span>
                  </div>
                  <span className="text-lg font-bold text-red-600">
                    {importResult.failed}
                  </span>
                </div>
              )}

              {importResult.errors.length > 0 && (
                <div className="p-4 bg-yellow-50 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-yellow-800 font-medium">
                    <AlertCircle className="w-5 h-5" />
                    <span>Детали ошибок:</span>
                  </div>
                  <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                    {importResult.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Инструкция */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Как экспортировать отзывы из 2GIS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm max-w-none">
            <h4 className="font-semibold text-gray-900">Способ 1: Ручной экспорт</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Откройте страницу вашей организации на <a href="https://2gis.ru" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">2gis.ru</a></li>
              <li>Перейдите на вкладку "Отзывы"</li>
              <li>Скопируйте отзывы вручную в шаблон JSON или CSV</li>
              <li>Загрузите файл через форму выше</li>
            </ol>

            <h4 className="font-semibold text-gray-900 mt-6">Способ 2: Использование расширения браузера</h4>
            <p className="text-gray-700">
              Используйте расширения для браузера типа "Web Scraper" или "Data Miner" для автоматического извлечения отзывов.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6">Формат JSON:</h4>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`{
  "reviews": [
    {
      "id": "1",
      "text": "Текст отзыва",
      "rating": 5,
      "date": "2024-01-15",
      "user": {
        "name": "Имя автора",
        "avatar": "URL аватара (опционально)"
      }
    }
  ]
}`}
            </pre>

            <h4 className="font-semibold text-gray-900 mt-6">Формат CSV:</h4>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`name,rating,text,date,avatar
"Имя",5,"Текст отзыва","2024-01-15","URL"`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
