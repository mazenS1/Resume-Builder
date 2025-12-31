import { create } from "zustand";
import {
  type Resume,
  type ResumeSectionType,
  DEFAULT_SECTION_BLUEPRINTS,
} from "@resume/shared";
import { nanoid } from "nanoid";

interface ResumeEditorState {
  resume: Resume | null;
  hasPendingChanges: boolean;
  lastSavedAt?: number;
  setResume: (resume: Resume) => void;
  reset: () => void;
  markSaved: (resume?: Resume) => void;
  updateBasicInfo: (updater: (basicInfo: Resume["basicInfo"]) => Resume["basicInfo"]) => void;
  updateMetadata: (updater: (metadata: Resume["metadata"]) => Resume["metadata"]) => void;
  addSection: (type?: ResumeSectionType) => void;
  updateSection: (
    sectionId: string,
    updater: (section: Resume["sections"][number]) => Resume["sections"][number]
  ) => void;
  removeSection: (sectionId: string) => void;
  reorderSections: (sectionIds: string[]) => void;
  addEntry: (sectionId: string) => void;
  updateEntry: (
    sectionId: string,
    entryId: string,
    updater: (entry: Resume["sections"][number]["entries"][number]) => Resume["sections"][number]["entries"][number]
  ) => void;
  removeEntry: (sectionId: string, entryId: string) => void;
  reorderEntries: (sectionId: string, entryIds: string[]) => void;
  addBullet: (sectionId: string, entryId: string) => void;
  updateBullet: (sectionId: string, entryId: string, bulletId: string, text: string) => void;
  removeBullet: (sectionId: string, entryId: string, bulletId: string) => void;
}

const generateId = () => nanoid();

export const useResumeStore = create<ResumeEditorState>((set) => ({
  resume: null,
  hasPendingChanges: false,
  lastSavedAt: undefined,
  setResume: (resume) => set({ resume, hasPendingChanges: false, lastSavedAt: Date.now() }),
  reset: () => set({ resume: null, hasPendingChanges: false, lastSavedAt: undefined }),
  markSaved: (resume) =>
    set((state) => ({
      resume: resume ?? state.resume,
      hasPendingChanges: false,
      lastSavedAt: Date.now(),
    })),
  updateBasicInfo: (updater) =>
    set((state) => {
      if (!state.resume) return state;
      return {
        resume: { ...state.resume, basicInfo: updater(structuredClone(state.resume.basicInfo)) },
        hasPendingChanges: true,
      };
    }),
  updateMetadata: (updater) =>
    set((state) => {
      if (!state.resume) return state;
      return {
        resume: { ...state.resume, metadata: updater(structuredClone(state.resume.metadata)) },
        hasPendingChanges: true,
      };
    }),
  addSection: (type) =>
    set((state) => {
      if (!state.resume) return state;
      const blueprint = DEFAULT_SECTION_BLUEPRINTS.find((section) => section.type === type) ??
        DEFAULT_SECTION_BLUEPRINTS[0];
      const newSection = {
        id: generateId(),
        resumeId: state.resume.id,
        type: type ?? blueprint.type,
        titleOverride: blueprint.title,
        position: state.resume.sections.length,
        collapsed: false,
        entries: [],
      } as Resume["sections"][number];
      return {
        resume: { ...state.resume, sections: [...state.resume.sections, newSection] },
        hasPendingChanges: true,
      };
    }),
  updateSection: (sectionId, updater) =>
    set((state) => {
      if (!state.resume) return state;
      return {
        resume: {
          ...state.resume,
          sections: state.resume.sections.map((section) =>
            section.id === sectionId ? updater(structuredClone(section)) : section
          ),
        },
        hasPendingChanges: true,
      };
    }),
  removeSection: (sectionId) =>
    set((state) => {
      if (!state.resume) return state;
      return {
        resume: {
          ...state.resume,
          sections: state.resume.sections.filter((section) => section.id !== sectionId),
        },
        hasPendingChanges: true,
      };
    }),
  reorderSections: (sectionIds) =>
    set((state) => {
      if (!state.resume) return state;
      const sectionMap = new Map(state.resume.sections.map((s) => [s.id, s]));
      const reorderedSections = sectionIds
        .map((id, index) => {
          const section = sectionMap.get(id);
          if (section) {
            return { ...section, position: index };
          }
          return null;
        })
        .filter((s): s is NonNullable<typeof s> => s !== null);
      // Add any sections not in the reorder list (like SUMMARY)
      const reorderedIds = new Set(sectionIds);
      const remainingSections = state.resume.sections.filter((s) => !reorderedIds.has(s.id));
      return {
        resume: {
          ...state.resume,
          sections: [...remainingSections, ...reorderedSections],
        },
        hasPendingChanges: true,
      };
    }),
  addEntry: (sectionId) =>
    set((state) => {
      if (!state.resume) return state;
      return {
        resume: {
          ...state.resume,
          sections: state.resume.sections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  entries: [
                    ...section.entries,
                    {
                      id: generateId(),
                      sectionId: section.id,
                      position: section.entries.length,
                      title: "",
                      subtitle: null,
                      companyOrOrg: null,
                      location: null,
                      startDate: null,
                      endDate: null,
                      isCurrent: false,
                      description: null,
                      projectUrl: null,
                      techStack: [],
                      bullets: [],
                    },
                  ],
                }
              : section
          ),
        },
        hasPendingChanges: true,
      };
    }),
  updateEntry: (sectionId, entryId, updater) =>
    set((state) => {
      if (!state.resume) return state;
      return {
        resume: {
          ...state.resume,
          sections: state.resume.sections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  entries: section.entries.map((entry) =>
                    entry.id === entryId ? updater(structuredClone(entry)) : entry
                  ),
                }
              : section
          ),
        },
        hasPendingChanges: true,
      };
    }),
  removeEntry: (sectionId, entryId) =>
    set((state) => {
      if (!state.resume) return state;
      return {
        resume: {
          ...state.resume,
          sections: state.resume.sections.map((section) =>
            section.id === sectionId
              ? { ...section, entries: section.entries.filter((entry) => entry.id !== entryId) }
              : section
          ),
        },
        hasPendingChanges: true,
      };
    }),
  reorderEntries: (sectionId, entryIds) =>
    set((state) => {
      if (!state.resume) return state;
      return {
        resume: {
          ...state.resume,
          sections: state.resume.sections.map((section) => {
            if (section.id !== sectionId) return section;
            const entryMap = new Map(section.entries.map((e) => [e.id, e]));
            const reorderedEntries = entryIds
              .map((id, index) => {
                const entry = entryMap.get(id);
                if (entry) {
                  return { ...entry, position: index };
                }
                return null;
              })
              .filter((e): e is NonNullable<typeof e> => e !== null);
            return { ...section, entries: reorderedEntries };
          }),
        },
        hasPendingChanges: true,
      };
    }),
  addBullet: (sectionId, entryId) =>
    set((state) => {
      if (!state.resume) return state;
      return {
        resume: {
          ...state.resume,
          sections: state.resume.sections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  entries: section.entries.map((entry) =>
                    entry.id === entryId
                      ? {
                          ...entry,
                          bullets: [
                            ...entry.bullets,
                            { id: generateId(), entryId: entry.id, position: entry.bullets.length, text: "" },
                          ],
                        }
                      : entry
                  ),
                }
              : section
          ),
        },
        hasPendingChanges: true,
      };
    }),
  updateBullet: (sectionId, entryId, bulletId, text) =>
    set((state) => {
      if (!state.resume) return state;
      return {
        resume: {
          ...state.resume,
          sections: state.resume.sections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  entries: section.entries.map((entry) =>
                    entry.id === entryId
                      ? {
                          ...entry,
                          bullets: entry.bullets.map((bullet) =>
                            bullet.id === bulletId ? { ...bullet, text } : bullet
                          ),
                        }
                      : entry
                  ),
                }
              : section
          ),
        },
        hasPendingChanges: true,
      };
    }),
  removeBullet: (sectionId, entryId, bulletId) =>
    set((state) => {
      if (!state.resume) return state;
      return {
        resume: {
          ...state.resume,
          sections: state.resume.sections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  entries: section.entries.map((entry) =>
                    entry.id === entryId
                      ? { ...entry, bullets: entry.bullets.filter((bullet) => bullet.id !== bulletId) }
                      : entry
                  ),
                }
              : section
          ),
        },
        hasPendingChanges: true,
      };
    }),
}));
