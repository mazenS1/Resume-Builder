import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { ReactNode } from "react";

interface DraggableItemProps {
  id: string;
  children: ReactNode;
  disabled?: boolean;
}

export const DraggableItem = ({ id, children, disabled }: DraggableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {!disabled && (
        <button
          type="button"
          className="absolute top-3 start-3 z-10 cursor-grab active:cursor-grabbing touch-none p-1 rounded hover:bg-muted/80 transition-colors"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground/70" />
        </button>
      )}
      {children}
    </div>
  );
};
