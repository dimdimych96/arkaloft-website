import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { useActiveHalls, useDeleteHall } from '../../hooks/useHalls'
import { HallFormDialog } from '../../components/admin/HallFormDialog'
import { Loader2, Plus, Edit, Trash2 } from 'lucide-react'
import type { Hall } from '../../types'

export function HallsPage() {
  const { data: halls, isLoading, error } = useActiveHalls()
  const deleteHall = useDeleteHall()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedHall, setSelectedHall] = useState<Hall | null>(null)

  const handleEdit = (hall: Hall) => {
    setSelectedHall(hall)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setSelectedHall(null)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот зал?')) {
      try {
        await deleteHall.mutateAsync(id)
      } catch (error) {
        console.error('Error deleting hall:', error)
        alert('Ошибка при удалении зала')
      }
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedHall(null)
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
          <h1 className="text-3xl font-bold text-gray-900">Залы</h1>
          <p className="text-gray-600 mt-2">Управление залами и их параметрами</p>
        </div>
        <Button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Добавить зал
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {halls?.map((hall) => (
          <Card key={hall.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{hall.name}</CardTitle>
                  <CardDescription>{hall.ageGroup}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(hall)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(hall.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{hall.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-medium">Площадь:</span>
                  <span className="text-gray-600">{hall.area}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-medium">Цена:</span>
                  <span className="text-gray-600">{hall.price}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {hall.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {hall.features.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{hall.features.length - 3} еще
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <HallFormDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        hall={selectedHall}
      />
    </div>
  )
}
