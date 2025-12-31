import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatDateRange = (start?: string | null, end?: string | null, isCurrent?: boolean) => {
  if (!start && !end) return "";
  const startLabel = start ? new Date(start).toLocaleDateString(undefined, { month: "short", year: "numeric" }) : "";
  const endLabel = isCurrent ? "Present" : end ? new Date(end).toLocaleDateString(undefined, { month: "short", year: "numeric" }) : "";
  if (!startLabel) return endLabel;
  if (!endLabel) return startLabel;
  return `${startLabel} — ${endLabel}`;
};
