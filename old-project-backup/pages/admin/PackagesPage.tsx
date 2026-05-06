import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { useActivePackages, useDeletePackage } from '../../hooks/usePackages'
import { PackageFormDialog } from '../../components/admin/PackageFormDialog'
import { Loader2, Plus, Edit, Trash2 } from 'lucide-react'
import type { Package } from '../../types'

export function PackagesPage() {
  const { data: packages, isLoading, error } = useActivePackages()
  const deletePackage = useDeletePackage()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)

  const handleEdit = (pkg: Package) => {
    setSelectedPackage(pkg)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setSelectedPackage(null)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот пакет?')) {
      try {
        await deletePackage.mutateAsync(id)
      } catch (error) {
        console.error('Error deleting package:', error)
        alert('Ошибка при удалении пакета')
      }
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedPackage(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Ошибка загрузки данных. Пожалуйста, обновите страницу.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Пакеты услуг</h1>
          <p className="text-gray-600 mt-2">Управление пакетами и их содержимым</p>
        </div>
        <Button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Добавить пакет
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages?.map((pkg) => (
          <Card key={pkg.id} className={pkg.popular ? 'ring-2 ring-emerald-500' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {pkg.name}
                    {pkg.popular && (
                      <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full">
                        Популярный
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-emerald-600">
                    ₽{pkg.price.toLocaleString()}
                  </div>
                  {pkg.priceWeekend && (
                    <div className="text-sm text-gray-600">
                      Выходные: ₽{pkg.priceWeekend.toLocaleString()}
                    </div>
                  )}
                  <div className="text-sm text-gray-500 mt-1">
                    {pkg.duration} часа
                  </div>
                </div>

                <div className="space-y-1">
                  {pkg.includedItems.slice(0, 3).map((item, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                  {pkg.includedItems.length > 3 && (
                    <div className="text-sm text-gray-500">
                      +{pkg.includedItems.length - 3} услуг
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(pkg)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Изменить
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(pkg.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <PackageFormDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        package={selectedPackage}
      />
    </div>
  )
}
