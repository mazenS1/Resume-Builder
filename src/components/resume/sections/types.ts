import type { ResumeEntry, ResumeSection } from "@resume/shared";

export interface SectionFormProps {
  section: ResumeSection;
  entry: ResumeEntry;
  isRTL: boolean;
  onUpdateField: (
    field: "title" | "subtitle" | "companyOrOrg" | "location" | "description",
    value: string
  ) => void;
  onUpdateDate: (field: "startDate" | "endDate", value: string) => void;
  onUpdateEntry: (updater: (entry: ResumeEntry) => ResumeEntry) => void;
  onAddBullet: () => void;
  onUpdateBullet: (bulletId: string, text: string) => void;
  onRemoveBullet: (bulletId: string) => void;
  onDelete: () => void;
  t: Record<string, string>;
}

export interface BulletListProps {
  bullets: ResumeEntry["bullets"];
  onAdd: () => void;
  onUpdate: (bulletId: string, text: string) => void;
  onRemove: (bulletId: string) => void;
  label: string;
  hint?: string;
  placeholder: string;
  t: Record<string, string>;
}
