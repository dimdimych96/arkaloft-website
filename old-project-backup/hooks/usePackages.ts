import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getAllPackages, 
  getActivePackages, 
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
  togglePackageActive
} from '../lib/services/packagesService'
import type { Package } from '../types'

export const usePackages = () => {
  return useQuery({
    queryKey: ['packages'],
    queryFn: getAllPackages,
  })
}

export const useActivePackages = () => {
  return useQuery({
    queryKey: ['packages', 'active'],
    queryFn: getActivePackages,
  })
}

export const usePackage = (id: string) => {
  return useQuery({
    queryKey: ['packages', id],
    queryFn: () => getPackageById(id),
    enabled: !!id,
  })
}

export const useCreatePackage = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })
}

export const useUpdatePackage = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Package> }) => 
      updatePackage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })
}

export const useDeletePackage = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deletePackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })
}

export const useTogglePackageActive = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => 
      togglePackageActive(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })
}
