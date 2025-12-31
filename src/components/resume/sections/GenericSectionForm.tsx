import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BulletList } from "./BulletList";
import { SectionEntryWrapper } from "./SectionEntryWrapper";
import type { SectionFormProps } from "./types";

export const GenericSectionForm = ({
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
          <Label className="text-xs">{t.title}</Label>
          <Input 
            value={entry.title} 
            onChange={(e) => onUpdateField("title", e.target.value)}
            className="h-10 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">{t.subtitle}</Label>
          <Input
            value={entry.subtitle ?? ""}
            onChange={(e) => onUpdateField("subtitle", e.target.value)}
            placeholder={t.subtitlePlaceholder}
            className="h-10 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">{t.organization}</Label>
          <Input
            value={entry.companyOrOrg ?? ""}
            onChange={(e) => onUpdateField("companyOrOrg", e.target.value)}
            placeholder={t.organizationPlaceholder}
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
      <div className="space-y-1.5">
        <Label className="text-xs">{t.entrySummary}</Label>
        <Textarea
          rows={2}
          value={entry.description ?? ""}
          onChange={(e) => onUpdateField("description", e.target.value)}
          className="text-sm min-h-[60px] resize-none"
        />
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
