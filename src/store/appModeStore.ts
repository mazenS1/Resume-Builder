import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Resume } from "@resume/shared";

interface AppModeState {
  // Core settings
  darkMode: boolean;
  language: "en" | "ar";
  
  // Onboarding
  hasCompletedOnboarding: boolean;
  
  // Local resume storage
  savedResumes: Resume[];
  activeResumeId: string | null;
  
  // Actions
  setDarkMode: (value: boolean) => void;
  setLanguage: (value: "en" | "ar") => void;
  setHasCompletedOnboarding: (value: boolean) => void;
  
  // Resume management
  saveResume: (resume: Resume) => void;
  deleteResume: (resumeId: string) => void;
  setActiveResumeId: (resumeId: string | null) => void;
  getActiveResume: () => Resume | null;
}

export const useAppModeStore = create<AppModeState>()(
  persist(
    (set, get) => ({
      // Core settings - defaults
      darkMode: false,
      language: "en",
      
      // Onboarding
      hasCompletedOnboarding: false,
      
      // Local resume storage
      savedResumes: [],
      activeResumeId: null,
      
      // Actions
      setDarkMode: (value) => set({ darkMode: value }),
      setLanguage: (value) => set({ language: value }),
      setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value }),
      
      // Resume management
      saveResume: (resume) => set((state) => {
        const existingIndex = state.savedResumes.findIndex(r => r.id === resume.id);
        const updatedResume = { ...resume, updatedAt: new Date().toISOString() };
        
        if (existingIndex >= 0) {
          const updatedResumes = [...state.savedResumes];
          updatedResumes[existingIndex] = updatedResume;
          return { savedResumes: updatedResumes };
        }
        
        return { savedResumes: [...state.savedResumes, updatedResume] };
      }),
      
      deleteResume: (resumeId) => set((state) => ({
        savedResumes: state.savedResumes.filter(r => r.id !== resumeId),
        activeResumeId: state.activeResumeId === resumeId ? null : state.activeResumeId
      })),
      
      setActiveResumeId: (resumeId) => set({ activeResumeId: resumeId }),
      
      getActiveResume: () => {
        const state = get();
        if (!state.activeResumeId) return null;
        return state.savedResumes.find(r => r.id === state.activeResumeId) || null;
      },
    }),
    {
      name: "resume-app-storage",
      version: 2,
    }
  )
);
