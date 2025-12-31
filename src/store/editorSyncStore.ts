import { create } from "zustand";

interface EditorSyncState {
  activeSectionId: string | null;
  activeEntryId: string | null;
  setActiveSection: (sectionId: string | null) => void;
  setActiveEntry: (entryId: string | null) => void;
  clearActive: () => void;
}

export const useEditorSyncStore = create<EditorSyncState>((set) => ({
  activeSectionId: null,
  activeEntryId: null,
  setActiveSection: (sectionId) => set({ activeSectionId: sectionId }),
  setActiveEntry: (entryId) => set({ activeEntryId: entryId }),
  clearActive: () => set({ activeSectionId: null, activeEntryId: null }),
}));
