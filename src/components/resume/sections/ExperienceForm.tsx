import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BulletList } from "./BulletList";
import { SectionEntryWrapper } from "./SectionEntryWrapper";
import type { SectionFormProps } from "./types";

export const ExperienceForm = ({
  entry,
  onUpdateField,
  onUpdateDate,
  onAddBullet,
  onUpdateBullet,
  onRemoveBullet,
  onDelete,
  t,
}: SectionFormProps) => {
  return (
    <SectionEntryWrapper onDelete={onDelete} deleteLabel={t.deleteEntry}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-xs">{t.jobTitle}</Label>
          <Input 
            value={entry.title} 
            onChange={(e) => onUpdateField("title", e.target.value)}
            placeholder={t.jobTitlePlaceholder}
            className="h-10 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">{t.companyName}</Label>
          <Input
            value={entry.companyOrOrg ?? ""}
            onChange={(e) => onUpdateField("companyOrOrg", e.target.value)}
            placeholder={t.companyPlaceholder}
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
        label={t.achievements}
        hint={t.achievementsHint}
        placeholder={t.bulletPlaceholder}
        t={t}
      />
    </SectionEntryWrapper>
  );
};
