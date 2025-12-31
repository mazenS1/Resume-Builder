import { useResumeStore } from "@/store/resumeStore";
import { useEditorSyncStore } from "@/store/editorSyncStore";
import { Card } from "@/components/common/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { sectionDisplayTitle, sortSections } from "@/lib/resume";
import { Plus, Edit2, ChevronDown, GripVertical } from "lucide-react";
import { type ResumeSectionType, DEFAULT_SECTION_BLUEPRINTS, type ResumeEntry, type ResumeSection } from "@resume/shared";
import { useState, useCallback, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAppModeStore } from "@/store/appModeStore";
import { translations } from "@/lib/i18n";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

// Section form components
import {
  BasicInfoForm,
  SummaryForm,
  EducationForm,
  ExperienceForm,
  SkillsForm,
  ProjectsForm,
  CertificationsForm,
  GenericSectionForm,
} from "./sections";

// Drag and drop
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Draggable Entry Component
const DraggableEntry = ({
  entry,
  isExpanded,
  onToggle,
  renderForm,
  language,
}: {
  entry: ResumeEntry;
  isExpanded: boolean;
  onToggle: () => void;
  renderForm: () => React.ReactNode;
  language: "en" | "ar";
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: entry.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-lg border bg-muted/30 overflow-hidden"
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 text-start hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div
            className="cursor-grab active:cursor-grabbing touch-none"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">
              {entry.title || (language === 'ar' ? 'عنصر جديد' : 'New Entry')}
            </p>
            {entry.subtitle && (
              <p className="text-xs text-muted-foreground truncate">
                {entry.subtitle}
              </p>
            )}
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isExpanded && renderForm()}
    </div>
  );
};

// Draggable Section Component
const DraggableSection = ({
  section,
  children,
}: {
  section: ResumeSection;
  children: React.ReactNode;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div
        className="absolute top-4 start-4 z-10 cursor-grab active:cursor-grabbing touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground/50" />
      </div>
      {children}
    </div>
  );
};

export const ResumeEditor = () => {
  const resume = useResumeStore((state) => state.resume);
  const updateBasicInfo = useResumeStore((state) => state.updateBasicInfo);
  const updateEntry = useResumeStore((state) => state.updateEntry);
  const addEntry = useResumeStore((state) => state.addEntry);
  const addSection = useResumeStore((state) => state.addSection);
  const updateSection = useResumeStore((state) => state.updateSection);
  const removeSection = useResumeStore((state) => state.removeSection);
  const removeEntry = useResumeStore((state) => state.removeEntry);
  const addBullet = useResumeStore((state) => state.addBullet);
  const updateBullet = useResumeStore((state) => state.updateBullet);
  const removeBullet = useResumeStore((state) => state.removeBullet);
  const reorderSections = useResumeStore((state) => state.reorderSections);
  const reorderEntries = useResumeStore((state) => state.reorderEntries);

  // Editor sync for preview highlighting
  const setActiveSection = useEditorSyncStore((state) => state.setActiveSection);
  const setActiveEntry = useEditorSyncStore((state) => state.setActiveEntry);

  const language = useAppModeStore((state) => state.language);
  const t = translations[language] as Record<string, string>;
  const isRTL = language === "ar";

  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [sectionTitleEdit, setSectionTitleEdit] = useState("");
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [selectedSectionType, setSelectedSectionType] = useState<ResumeSectionType>("CUSTOM");
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Sync expanded entries to preview highlighting
  useEffect(() => {
    const expandedArray = Array.from(expandedEntries);
    if (expandedArray.length > 0) {
      const lastExpanded = expandedArray[expandedArray.length - 1];
      setActiveEntry(lastExpanded);
      // Find section for this entry
      const section = resume?.sections.find(s => s.entries.some(e => e.id === lastExpanded));
      if (section) {
        setActiveSection(section.id);
      }
    } else {
      setActiveEntry(null);
    }
  }, [expandedEntries, resume?.sections, setActiveEntry, setActiveSection]);

  // Sync expanded sections to preview highlighting
  useEffect(() => {
    if (expandedSections.length > 0 && expandedEntries.size === 0) {
      setActiveSection(expandedSections[expandedSections.length - 1]);
    } else if (expandedSections.length === 0) {
      setActiveSection(null);
    }
  }, [expandedSections, expandedEntries.size, setActiveSection]);

  if (!resume) return null;

  const summarySection = resume.sections.find((section) => section.type === "SUMMARY");
  const summaryEntry = summarySection?.entries[0];

  const updateBasicField = (field: keyof typeof resume.basicInfo) => (value: string) => {
    updateBasicInfo((basic) => ({
      ...basic,
      [field]: value,
    }));
  };

  const updateEntryField = (
    sectionId: string,
    entryId: string,
    field: "title" | "subtitle" | "companyOrOrg" | "location" | "description",
    value: string
  ) => {
    updateEntry(sectionId, entryId, (entry) => ({
      ...entry,
      [field]: value.length ? value : field === "title" ? "" : null,
    }));
  };

  const updateEntryDate = (sectionId: string, entryId: string, field: "startDate" | "endDate", value: string) => {
    updateEntry(sectionId, entryId, (entry) => ({
      ...entry,
      [field]: value ? `${value}-01` : null,
    }));
  };

  // Link management helpers
  const addLink = () => {
    updateBasicInfo((basic) => ({
      ...basic,
      links: [...basic.links, { label: "", url: "" }],
    }));
  };

  const updateLink = (index: number, field: "label" | "url", value: string) => {
    updateBasicInfo((basic) => ({
      ...basic,
      links: basic.links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  const removeLink = (index: number) => {
    updateBasicInfo((basic) => ({
      ...basic,
      links: basic.links.filter((_, i) => i !== index),
    }));
  };

  const toggleEntryExpanded = (entryId: string) => {
    setExpandedEntries((prev) => {
      const next = new Set(prev);
      if (next.has(entryId)) {
        next.delete(entryId);
      } else {
        next.add(entryId);
      }
      return next;
    });
  };

  const orderedSections = sortSections(resume.sections).filter((section) => section.type !== "SUMMARY");

  // Helper to get localized section type name
  const getSectionTypeName = (type: ResumeSectionType): string => {
    const typeMap: Record<string, { en: string; ar: string }> = {
      WORK_EXPERIENCE: { en: "Experience", ar: "الخبرات" },
      EDUCATION: { en: "Education", ar: "التعليم" },
      SKILL: { en: "Skills", ar: "المهارات" },
      PROJECT: { en: "Projects", ar: "المشاريع" },
      CERTIFICATION: { en: "Certifications", ar: "الشهادات" },
      EXTRACURRICULAR: { en: "Extracurricular", ar: "الأنشطة" },
      CUSTOM: { en: "Custom", ar: "مخصص" },
    };
    return typeMap[type]?.[language] || type;
  };

  // Handle section drag end
  const handleSectionDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = orderedSections.findIndex((s) => s.id === active.id);
        const newIndex = orderedSections.findIndex((s) => s.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          const newOrder = arrayMove(orderedSections, oldIndex, newIndex);
          reorderSections?.(newOrder.map((s) => s.id));
        }
      }
    },
    [orderedSections, reorderSections]
  );

  // Handle entry drag end
  const handleEntryDragEnd = useCallback(
    (sectionId: string) => (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const section = resume.sections.find((s) => s.id === sectionId);
        if (section) {
          const oldIndex = section.entries.findIndex((e) => e.id === active.id);
          const newIndex = section.entries.findIndex((e) => e.id === over.id);
          if (oldIndex !== -1 && newIndex !== -1) {
            const newOrder = arrayMove(section.entries, oldIndex, newIndex);
            reorderEntries?.(sectionId, newOrder.map((e) => e.id));
          }
        }
      }
    },
    [resume.sections, reorderEntries]
  );

  // Render the appropriate form for each section type
  const renderEntryForm = (section: ResumeSection, entry: ResumeEntry) => {
    const commonProps = {
      section,
      entry,
      isRTL,
      t,
      onUpdateField: (field: "title" | "subtitle" | "companyOrOrg" | "location" | "description", value: string) =>
        updateEntryField(section.id, entry.id, field, value),
      onUpdateDate: (field: "startDate" | "endDate", value: string) =>
        updateEntryDate(section.id, entry.id, field, value),
      onUpdateEntry: (updater: (e: ResumeEntry) => ResumeEntry) =>
        updateEntry(section.id, entry.id, updater),
      onAddBullet: () => addBullet(section.id, entry.id),
      onUpdateBullet: (bulletId: string, text: string) =>
        updateBullet(section.id, entry.id, bulletId, text),
      onRemoveBullet: (bulletId: string) =>
        removeBullet(section.id, entry.id, bulletId),
      onDelete: () => {
        const msg = language === 'ar' ? 'حذف هذا العنصر؟' : 'Delete this entry?';
        if (confirm(msg)) {
          removeEntry(section.id, entry.id);
        }
      },
    };

    switch (section.type) {
      case "EDUCATION":
        return <EducationForm {...commonProps} />;
      case "WORK_EXPERIENCE":
        return <ExperienceForm {...commonProps} />;
      case "SKILL":
        return <SkillsForm {...commonProps} />;
      case "PROJECT":
        return <ProjectsForm {...commonProps} />;
      case "CERTIFICATION":
        return <CertificationsForm {...commonProps} />;
      default:
        return <GenericSectionForm {...commonProps} />;
    }
  };

  return (
    <div className="space-y-4 pb-24 lg:pb-6" dir={isRTL ? "rtl" : "ltr"}>
      {/* Basic Information Card */}
      <BasicInfoForm
        basicInfo={resume.basicInfo}
        onUpdateField={updateBasicField}
        onAddLink={addLink}
        onUpdateLink={updateLink}
        onRemoveLink={removeLink}
        isRTL={isRTL}
        t={t}
      />

      {/* Summary Card */}
      {summaryEntry && summarySection && (
        <SummaryForm
          section={summarySection}
          entry={summaryEntry}
          onUpdate={(value) =>
            updateEntry(summarySection.id, summaryEntry.id, (entry) => ({
              ...entry,
              description: value,
            }))
          }
          isRTL={isRTL}
          t={t}
        />
      )}

      {/* Sections Card */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-semibold">{t.sections}</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">{t.sectionsHint}</p>
          </div>
          <Dialog open={showAddSection} onOpenChange={setShowAddSection}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline" size="sm" className="gap-1.5 h-10 sm:h-9">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">{t.addSection}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[92vw] sm:max-w-md mx-auto">
              <DialogHeader>
                <DialogTitle className="text-lg">{t.addSection}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label className="text-sm">{t.sectionType}</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {DEFAULT_SECTION_BLUEPRINTS.filter((bp) => bp.type !== "SUMMARY").map((blueprint) => (
                      <Button
                        key={blueprint.type}
                        type="button"
                        variant={selectedSectionType === blueprint.type ? "default" : "outline"}
                        className="justify-start text-sm h-11"
                        onClick={() => {
                          setSelectedSectionType(blueprint.type);
                          setNewSectionTitle(getSectionTypeName(blueprint.type));
                        }}
                      >
                        {getSectionTypeName(blueprint.type)}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section-title" className="text-sm">
                    {t.sectionTitle}
                  </Label>
                  <Input
                    id="section-title"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    placeholder={t.sectionTitlePlaceholder}
                    className="h-11 text-base"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddSection(false)}
                    className="flex-1 h-11"
                  >
                    {t.cancel}
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 h-11"
                    onClick={() => {
                      addSection(selectedSectionType);
                      if (newSectionTitle && newSectionTitle !== getSectionTypeName(selectedSectionType)) {
                        setTimeout(() => {
                          const sections = resume.sections;
                          const newSection = sections[sections.length - 1];
                          if (newSection) {
                            updateSection(newSection.id, (s) => ({
                              ...s,
                              titleOverride: newSectionTitle,
                            }));
                          }
                        }, 0);
                      }
                      setShowAddSection(false);
                      setNewSectionTitle("");
                      setSelectedSectionType("CUSTOM");
                    }}
                  >
                    {t.add}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sections Accordion with Drag and Drop */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleSectionDragEnd}>
          <SortableContext items={orderedSections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <Accordion 
              type="multiple" 
              className="space-y-3"
              value={expandedSections}
              onValueChange={setExpandedSections}
            >
              {orderedSections.map((section) => (
                <DraggableSection key={section.id} section={section}>
                  <AccordionItem
                    value={section.id}
                    className="rounded-xl border bg-background overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 ps-10 py-4 hover:no-underline hover:bg-muted/50">
                      <div className="flex w-full items-center justify-between pe-2">
                        <div className="text-start flex-1 min-w-0">
                          {editingSectionId === section.id ? (
                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <Input
                                value={sectionTitleEdit}
                                onChange={(e) => setSectionTitleEdit(e.target.value)}
                                className="h-9 flex-1 text-sm"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    updateSection(section.id, (s) => ({
                                      ...s,
                                      titleOverride: sectionTitleEdit,
                                    }));
                                    setEditingSectionId(null);
                                  } else if (e.key === "Escape") {
                                    setEditingSectionId(null);
                                  }
                                }}
                              />
                              <Button
                                size="sm"
                                className="h-9"
                                onClick={() => {
                                  updateSection(section.id, (s) => ({
                                    ...s,
                                    titleOverride: sectionTitleEdit,
                                  }));
                                  setEditingSectionId(null);
                                }}
                              >
                                {t.save}
                              </Button>
                            </div>
                          ) : (
                            <>
                              <p className="text-sm font-semibold text-foreground truncate">
                                {sectionDisplayTitle(section)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {section.entries.length} {t.entries}
                              </p>
                            </>
                          )}
                        </div>
                        <div
                          className="flex items-center gap-1 flex-shrink-0 ms-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingSectionId(section.id);
                              setSectionTitleEdit(section.titleOverride || sectionDisplayTitle(section));
                            }}
                            className="h-9 w-9 p-0"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const msg =
                                language === "ar"
                                  ? `حذف قسم "${sectionDisplayTitle(section)}"؟`
                                  : `Delete "${sectionDisplayTitle(section)}" section?`;
                              if (confirm(msg)) {
                                removeSection(section.id);
                              }
                            }}
                            className="h-9 w-9 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4">
                        {section.entries.length === 0 ? (
                          <p className="text-sm text-muted-foreground text-center py-6">{t.noEntries}</p>
                        ) : (
                          <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleEntryDragEnd(section.id)}
                          >
                            <SortableContext
                              items={section.entries.map((e) => e.id)}
                              strategy={verticalListSortingStrategy}
                            >
                              {section.entries.map((entry) => (
                                <DraggableEntry
                                  key={entry.id}
                                  entry={entry}
                                  isExpanded={expandedEntries.has(entry.id)}
                                  onToggle={() => toggleEntryExpanded(entry.id)}
                                  renderForm={() => renderEntryForm(section, entry)}
                                  language={language}
                                />
                              ))}
                            </SortableContext>
                          </DndContext>
                        )}

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            addEntry(section.id);
                            // Auto-expand the new entry
                            setTimeout(() => {
                              const sections = resume.sections;
                              const updatedSection = sections.find((s) => s.id === section.id);
                              if (updatedSection) {
                                const newEntry = updatedSection.entries[updatedSection.entries.length - 1];
                                if (newEntry) {
                                  setExpandedEntries((prev) => new Set([...prev, newEntry.id]));
                                }
                              }
                            }, 0);
                          }}
                          className="w-full h-11"
                        >
                          <Plus className="h-4 w-4 me-2" />
                          {t.addEntry}
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </DraggableSection>
              ))}
            </Accordion>
          </SortableContext>
        </DndContext>
      </Card>
    </div>
  );
};
