import { z } from "zod";
import { RESUME_SECTION_TYPES } from "./types";

type SectionTuple = [
  (typeof RESUME_SECTION_TYPES)[number],
  ...((typeof RESUME_SECTION_TYPES)[number])[]
];

const sectionTuple = RESUME_SECTION_TYPES as unknown as SectionTuple;

export const registerSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email().max(160),
  password: z.string().min(8).max(128)
});

export const loginSchema = z.object({
  email: z.string().email().max(160),
  password: z.string().min(8).max(128)
});

export const resumeMetadataSchema = z.object({
  locale: z.string().default("en-US"),
  theme: z.enum(["light", "dark"]).default("light"),
  fontFamily: z.string().max(60).default("Inter"),
  lineHeight: z.number().min(1).max(2).default(1.4),
  accentColor: z.string().default("#2563eb"),
  primaryColor: z.string().default("#111111")
});

export const resumeBulletSchema = z.object({
  id: z.string().uuid(),
  entryId: z.string().uuid(),
  position: z.number().int().min(0),
  text: z.string().min(1).max(400)
});

export const resumeEntrySchema = z.object({
  id: z.string().uuid(),
  sectionId: z.string().uuid(),
  position: z.number().int().min(0),
  title: z.string().min(1).max(160),
  subtitle: z.string().max(160).nullable().optional(),
  companyOrOrg: z.string().max(160).nullable().optional(),
  location: z.string().max(160).nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  isCurrent: z.boolean().optional(),
  description: z.string().max(400).nullable().optional(),
  projectUrl: z.string().url().nullable().optional(),
  techStack: z.array(z.string().max(40)).optional().default([]),
  bullets: z.array(resumeBulletSchema)
});

export const resumeSectionSchema = z.object({
  id: z.string().uuid(),
  resumeId: z.string().uuid(),
  type: z.enum(sectionTuple),
  titleOverride: z.string().max(120).nullable().optional(),
  position: z.number().int().min(0),
  collapsed: z.boolean().default(false),
  entries: z.array(resumeEntrySchema)
});

export const linkSchema = z.object({
  label: z.string().min(1).max(80),
  url: z.string().url().max(200)
});

export const basicInfoSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(40).nullable().optional(),
  location: z.string().max(160).nullable().optional(),
  headline: z.string().max(200).nullable().optional(),
  links: z.array(linkSchema).default([])
});

export const resumeSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  title: z.string().min(1).max(120),
  createdAt: z.string(),
  updatedAt: z.string(),
  basicInfo: basicInfoSchema,
  metadata: resumeMetadataSchema,
  sections: z.array(resumeSectionSchema)
});

export const resumeStructureSchema = z.object({
  resume: resumeSchema
});

export const importPayloadSchema = z.object({
  text: z.string().optional(),
  filename: z.string().optional(),
  fileBase64: z.string().optional(),
  mimeType: z.string().optional()
});
