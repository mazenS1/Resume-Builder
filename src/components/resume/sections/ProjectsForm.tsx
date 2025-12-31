import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BulletList } from "./BulletList";
import { SectionEntryWrapper } from "./SectionEntryWrapper";
import type { SectionFormProps } from "./types";

export const ProjectsForm = ({
  entry,
  onUpdateField,
  onUpdateDate,
  onUpdateEntry,
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
          <Label className="text-xs">{t.projectName}</Label>
          <Input 
            value={entry.title} 
            onChange={(e) => onUpdateField("title", e.target.value)}
            placeholder={t.projectPlaceholder}
            className="h-10 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">{t.projectUrl}</Label>
          <Input
            value={entry.projectUrl ?? ""}
            onChange={(e) => onUpdateEntry((ent) => ({
              ...ent,
              projectUrl: e.target.value || null
            }))}
            placeholder={t.projectUrlPlaceholder}
            className="h-10 text-sm"
            dir="ltr"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">{t.techStack}</Label>
          <Input
            value={entry.description ?? ""}
            onChange={(e) => onUpdateField("description", e.target.value)}
            placeholder={t.techStackPlaceholder}
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
        hint={t.bulletsHint}
        placeholder={t.bulletPlaceholder}
        t={t}
      />
    </SectionEntryWrapper>
  );
};
