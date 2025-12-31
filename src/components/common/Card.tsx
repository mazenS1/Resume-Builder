import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className, ...props }: CardProps) => (
  <div className={cn("rounded-lg sm:rounded-xl border bg-card p-4 sm:p-6 shadow-sm", className)} {...props} />
);
