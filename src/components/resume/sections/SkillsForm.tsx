import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionEntryWrapper } from "./SectionEntryWrapper";
import type { SectionFormProps } from "./types";

export const SkillsForm = ({
  entry,
  onUpdateField,
  onDelete,
  t,
}: SectionFormProps) => {
  return (
    <SectionEntryWrapper onDelete={onDelete} deleteLabel={t.deleteEntry}>
      <div className="grid gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs">{t.skillCategory}</Label>
          <Input 
            value={entry.title} 
            onChange={(e) => onUpdateField("title", e.target.value)}
            placeholder={t.skillCategoryPlaceholder}
            className="h-10 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">{t.skillsList}</Label>
          <Textarea
            rows={2}
            value={entry.description ?? ""}
            onChange={(e) => onUpdateField("description", e.target.value)}
            placeholder={t.skillsPlaceholder}
            className="text-sm min-h-[60px] resize-none"
          />
        </div>
      </div>
    </SectionEntryWrapper>
  );
};
