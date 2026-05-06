import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getAllServices, 
  getActiveServices, 
  getServiceById,
  createService,
  updateService,
  deleteService,
  toggleServiceActive
} from '../lib/services/servicesService'
import type { Service } from '../types'

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: getAllServices,
  })
}

export const useActiveServices = () => {
  return useQuery({
    queryKey: ['services', 'active'],
    queryFn: getActiveServices,
  })
}

export const useService = (id: string) => {
  return useQuery({
    queryKey: ['services', id],
    queryFn: () => getServiceById(id),
    enabled: !!id,
  })
}

export const useCreateService = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })
}

export const useUpdateService = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Service> }) => 
      updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })
}

export const useDeleteService = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })
}

export const useToggleServiceActive = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => 
      toggleServiceActive(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })
}
