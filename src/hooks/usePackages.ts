import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllPackages,
  getActivePackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
  togglePackageActive
} from '../lib/services/packagesService';
import type { Package } from '../types';
import { mockPackages } from '../data/mockData';

// Query keys
export const packagesKeys = {
  all: ['packages'] as const,
  active: ['packages', 'active'] as const,
  detail: (id: string) => ['packages', id] as const,
};

// Получить все пакеты
export const usePackages = () => {
  return useQuery({
    queryKey: packagesKeys.all,
    queryFn: async () => {
      try {
        return await getAllPackages();
      } catch (error) {
        console.warn('Failed to fetch packages from Firestore, using mock data');
        return mockPackages;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Получить активные пакеты
export const useActivePackages = () => {
  return useQuery({
    queryKey: packagesKeys.active,
    queryFn: async () => {
      try {
        return await getActivePackages();
      } catch (error) {
        console.warn('Failed to fetch active packages from Firestore, using mock data');
        return mockPackages.filter(p => p.isActive);
      }
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Получить пакет по ID
export const usePackage = (id: string) => {
  return useQuery({
    queryKey: packagesKeys.detail(id),
    queryFn: async () => {
      try {
        const pkg = await getPackageById(id);
        return pkg || mockPackages.find(p => p.id === id) || null;
      } catch (error) {
        console.warn('Failed to fetch package from Firestore, using mock data');
        return mockPackages.find(p => p.id === id) || null;
      }
    },
    enabled: !!id,
  });
};

// Создать пакет
export const useCreatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: packagesKeys.all });
      queryClient.invalidateQueries({ queryKey: packagesKeys.active });
    },
  });
};

// Обновить пакет
export const useUpdatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Package> }) =>
      updatePackage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: packagesKeys.all });
      queryClient.invalidateQueries({ queryKey: packagesKeys.active });
    },
  });
};

// Удалить пакет
export const useDeletePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: packagesKeys.all });
      queryClient.invalidateQueries({ queryKey: packagesKeys.active });
    },
  });
};

// Переключить активность пакета
export const useTogglePackageActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      togglePackageActive(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: packagesKeys.all });
      queryClient.invalidateQueries({ queryKey: packagesKeys.active });
    },
  });
};
