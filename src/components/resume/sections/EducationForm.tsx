import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BulletList } from "./BulletList";
import { SectionEntryWrapper } from "./SectionEntryWrapper";
import type { SectionFormProps } from "./types";

export const EducationForm = ({
  entry,
  onUpdateField,
  onUpdateDate,
  onAddBullet,
  onUpdateBullet,
  onRemoveBullet,
  onDelete,
  isRTL,
  t,
}: SectionFormProps) => {
  return (
    <SectionEntryWrapper onDelete={onDelete} deleteLabel={t.deleteEntry}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-xs">{t.schoolName}</Label>
          <Input 
            value={entry.title} 
            onChange={(e) => onUpdateField("title", e.target.value)}
            placeholder={t.schoolPlaceholder}
            className="h-10 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">{t.degree}</Label>
          <Input
            value={entry.subtitle ?? ""}
            onChange={(e) => onUpdateField("subtitle", e.target.value)}
            placeholder={t.degreePlaceholder}
            className="h-10 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">{t.jobLocation}</Label>
          <Input
            value={entry.location ?? ""}
            onChange={(e) => onUpdateField("location", e.target.value)}
            placeholder={t.jobLocationPlaceholder}
            className="h-10 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">{t.startDate} / {t.endDate}</Label>
          <div className="grid grid-cols-2 gap-2 overflow-hidden">
            <Input
              type="month"
              value={entry.startDate ? entry.startDate.slice(0, 7) : ""}
              onChange={(e) => onUpdateDate("startDate", e.target.value)}
              className="h-10 text-sm"
            />
            <Input
              type="month"
              value={entry.endDate ? entry.endDate.slice(0, 7) : ""}
              onChange={(e) => onUpdateDate("endDate", e.target.value)}
              className="h-10 text-sm"
            />
          </div>
        </div>
      </div>
      <BulletList
        bullets={entry.bullets}
        onAdd={onAddBullet}
        onUpdate={onUpdateBullet}
        onRemove={onRemoveBullet}
        label={t.bullets}
        hint={isRTL ? 'مثال: المعدل، الأنشطة' : 'e.g., GPA, Activities'}
        placeholder={t.bulletPlaceholder}
        t={t}
      />
    </SectionEntryWrapper>
  );
};
