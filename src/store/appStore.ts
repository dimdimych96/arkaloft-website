import { create } from 'zustand';
import { Project } from '../types';

interface AppState {
  projects: Project[];
  currentProject: Project | null;
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useAppStore = create<AppState>((set) => ({
  projects: [],
  currentProject: null,
  isSidebarOpen: false,
  theme: 'light',
  setProjects: (projects) => set({ projects }),
  setCurrentProject: (project) => set({ currentProject: project }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setTheme: (theme) => set({ theme }),
}));
