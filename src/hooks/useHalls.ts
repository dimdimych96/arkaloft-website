import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllHalls,
  getActiveHalls,
  getHallById,
  createHall,
  updateHall,
  deleteHall,
  toggleHallActive
} from '../lib/services/hallsService';
import type { Hall } from '../types';
import { mockHalls } from '../data/mockData';

// Query keys
export const hallsKeys = {
  all: ['halls'] as const,
  active: ['halls', 'active'] as const,
  detail: (id: string) => ['halls', id] as const,
};

// Получить все залы
export const useHalls = () => {
  return useQuery({
    queryKey: hallsKeys.all,
    queryFn: async () => {
      try {
        return await getAllHalls();
      } catch (error) {
        console.warn('Failed to fetch halls from Firestore, using mock data');
        return mockHalls;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 минут
  });
};

// Получить активные залы (для основного сайта)
export const useActiveHalls = () => {
  return useQuery({
    queryKey: hallsKeys.active,
    queryFn: async () => {
      try {
        return await getActiveHalls();
      } catch (error) {
        console.warn('Failed to fetch active halls from Firestore, using mock data');
        return mockHalls.filter(h => h.isActive);
      }
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Получить зал по ID
export const useHall = (id: string) => {
  return useQuery({
    queryKey: hallsKeys.detail(id),
    queryFn: async () => {
      try {
        const hall = await getHallById(id);
        return hall || mockHalls.find(h => h.id === id) || null;
      } catch (error) {
        console.warn('Failed to fetch hall from Firestore, using mock data');
        return mockHalls.find(h => h.id === id) || null;
      }
    },
    enabled: !!id,
  });
};

// Создать зал
export const useCreateHall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHall,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hallsKeys.all });
      queryClient.invalidateQueries({ queryKey: hallsKeys.active });
    },
  });
};

// Обновить зал
export const useUpdateHall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Hall> }) =>
      updateHall(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: hallsKeys.all });
      queryClient.invalidateQueries({ queryKey: hallsKeys.active });
      queryClient.invalidateQueries({ queryKey: hallsKeys.detail(variables.id) });
    },
  });
};

// Удалить зал
export const useDeleteHall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHall,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hallsKeys.all });
      queryClient.invalidateQueries({ queryKey: hallsKeys.active });
    },
  });
};

// Переключить активность зала
export const useToggleHallActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      toggleHallActive(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hallsKeys.all });
      queryClient.invalidateQueries({ queryKey: hallsKeys.active });
    },
  });
};
