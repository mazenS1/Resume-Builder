import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { ReactNode } from "react";

interface SectionEntryWrapperProps {
  children: ReactNode;
  onDelete: () => void;
  deleteLabel: string;
}

export const SectionEntryWrapper = ({
  children,
  onDelete,
  deleteLabel,
}: SectionEntryWrapperProps) => {
  return (
    <div className="p-3 pt-0 space-y-3 border-t">
      {children}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onDelete}
        className="w-full h-10 text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4 me-2" />
        {deleteLabel}
      </Button>
    </div>
  );
};
