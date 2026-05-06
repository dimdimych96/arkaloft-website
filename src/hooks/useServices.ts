import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllServices,
  getActiveServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  toggleServiceActive
} from '../lib/services/servicesService';
import type { Service } from '../types';
import { mockServices } from '../data/mockData';

// Query keys
export const servicesKeys = {
  all: ['services'] as const,
  active: ['services', 'active'] as const,
  detail: (id: string) => ['services', id] as const,
};

// Получить все услуги
export const useServices = () => {
  return useQuery({
    queryKey: servicesKeys.all,
    queryFn: async () => {
      try {
        return await getAllServices();
      } catch (error) {
        console.warn('Failed to fetch services from Firestore, using mock data');
        return mockServices;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Получить активные услуги
export const useActiveServices = () => {
  return useQuery({
    queryKey: servicesKeys.active,
    queryFn: async () => {
      try {
        return await getActiveServices();
      } catch (error) {
        console.warn('Failed to fetch active services from Firestore, using mock data');
        return mockServices.filter(s => s.isActive);
      }
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Получить услугу по ID
export const useService = (id: string) => {
  return useQuery({
    queryKey: servicesKeys.detail(id),
    queryFn: () => getServiceById(id),
    enabled: !!id,
  });
};

// Создать услугу
export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: servicesKeys.all });
      queryClient.invalidateQueries({ queryKey: servicesKeys.active });
    },
  });
};

// Обновить услугу
export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Service> }) =>
      updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: servicesKeys.all });
      queryClient.invalidateQueries({ queryKey: servicesKeys.active });
    },
  });
};

// Удалить услугу
export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: servicesKeys.all });
      queryClient.invalidateQueries({ queryKey: servicesKeys.active });
    },
  });
};

// Переключить активность услуги
export const useToggleServiceActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      toggleServiceActive(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: servicesKeys.all });
      queryClient.invalidateQueries({ queryKey: servicesKeys.active });
    },
  });
};
