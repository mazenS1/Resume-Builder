import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import type { BulletListProps } from "./types";

export const BulletList = ({
  bullets,
  onAdd,
  onUpdate,
  onRemove,
  label,
  hint,
  placeholder,
  t,
}: BulletListProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs">{label}</Label>
        {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
      </div>
      <div className="space-y-2">
        {bullets.map((bullet) => (
          <div key={bullet.id} className="flex items-center gap-2">
            <Input
              value={bullet.text}
              onChange={(e) => onUpdate(bullet.id, e.target.value)}
              placeholder={placeholder}
              className="h-10 text-sm flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemove(bullet.id)}
              className="h-10 w-10 p-0 text-muted-foreground hover:text-destructive flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="w-full h-9 gap-1"
        >
          <Plus className="h-3.5 w-3.5" />
          {t.addBullet}
        </Button>
      </div>
    </div>
  );
};
