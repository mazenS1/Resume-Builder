export type AuthProvider = "PASSWORD" | "MAGIC_LINK" | "GOOGLE" | "GITHUB";

export const RESUME_SECTION_TYPES = [
  "SUMMARY",
  "WORK_EXPERIENCE",
  "PROJECT",
  "SKILL",
  "EDUCATION",
  "CERTIFICATION",
  "EXTRACURRICULAR",
  "CUSTOM"
] as const;

export type ResumeSectionType = (typeof RESUME_SECTION_TYPES)[number];

export interface ResumeMetadata {
  locale: string;
  theme: "light" | "dark";
  fontFamily: string;
  lineHeight: number;
  accentColor: string;
  primaryColor: string;
}

export const DEFAULT_RESUME_METADATA: ResumeMetadata = {
  locale: "en-US",
  theme: "light",
  fontFamily: "Inter",
  lineHeight: 1.4,
  accentColor: "#2563eb",
  primaryColor: "#0f172a"
};

export const DEFAULT_SECTION_BLUEPRINTS: Array<{
  type: ResumeSectionType;
  title: string;
}> = [
  { type: "SUMMARY", title: "Summary" },
  { type: "WORK_EXPERIENCE", title: "Work Experience" },
  { type: "PROJECT", title: "Projects" },
  { type: "SKILL", title: "Skills" },
  { type: "EDUCATION", title: "Education" },
  { type: "CERTIFICATION", title: "Certifications" },
  { type: "EXTRACURRICULAR", title: "Extracurricular" }
];

export interface ResumeBullet {
  id: string;
  entryId: string;
  position: number;
  text: string;
}

export interface ResumeEntry {
  id: string;
  sectionId: string;
  position: number;
  title: string;
  subtitle?: string | null;
  companyOrOrg?: string | null;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  isCurrent?: boolean;
  description?: string | null;
  projectUrl?: string | null;
  techStack?: string[];
  bullets: ResumeBullet[];
}

export interface LinkItem {
  label: string;
  url: string;
}

export interface BasicInfo {
  name: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  headline?: string | null;
  links: LinkItem[];
}

export interface ResumeSection {
  id: string;
  resumeId: string;
  type: ResumeSectionType;
  titleOverride?: string | null;
  position: number;
  collapsed: boolean;
  entries: ResumeEntry[];
}

export const DEFAULT_BASIC_INFO: BasicInfo = {
  name: "",
  email: "",
  phone: null,
  location: null,
  headline: null,
  links: []
};

export interface Resume {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  basicInfo: BasicInfo;
  metadata: ResumeMetadata;
  sections: ResumeSection[];
}

export interface ResumeStructurePayload {
  resume: Resume;
}

export interface ImportTextPayload {
  text?: string;
  filename?: string;
  fileBase64?: string;
  mimeType?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
