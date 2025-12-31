import type { ResumeSection } from "@resume/shared";

export const sortSections = (sections: ResumeSection[]) =>
  [...sections].sort((a, b) => a.position - b.position);

export const sectionDisplayTitle = (section: ResumeSection) =>
  section.titleOverride ?? section.type.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
