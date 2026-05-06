import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { useActiveServices, useDeleteService } from '../../hooks/useServices'
import { ServiceFormDialog } from '../../components/admin/ServiceFormDialog'
import { Loader2, Plus, Edit, Trash2 } from 'lucide-react'
import type { Service } from '../../types'

export function ServicesPage() {
  const { data: services, isLoading, error } = useActiveServices()
  const deleteService = useDeleteService()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const handleEdit = (service: Service) => {
    setSelectedService(service)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setSelectedService(null)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту услугу?')) {
      try {
        await deleteService.mutateAsync(id)
      } catch (error) {
        console.error('Error deleting service:', error)
        alert('Ошибка при удалении услуги')
      }
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedService(null)
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

  const mainServices = services?.filter(s => s.category === 'main') || []
  const additionalServices = services?.filter(s => s.category === 'additional') || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Услуги</h1>
          <p className="text-gray-600 mt-2">Управление дополнительными услугами</p>
        </div>
        <Button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Добавить услугу
        </Button>
      </div>

      {mainServices.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Основные услуги</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {mainServices.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(service.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {service.price && (
                  <CardContent>
                    <div className="text-lg font-semibold text-emerald-600">
                      ₽{service.price.toLocaleString()}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {additionalServices.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Дополнительные услуги</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {additionalServices.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(service.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {service.price && (
                  <CardContent>
                    <div className="text-lg font-semibold text-emerald-600">
                      ₽{service.price.toLocaleString()}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      <ServiceFormDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        service={selectedService}
      />
    </div>
  )
}
