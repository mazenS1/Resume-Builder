import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionEntryWrapper } from "./SectionEntryWrapper";
import type { SectionFormProps } from "./types";

export const CertificationsForm = ({
  entry,
  onUpdateField,
  onUpdateDate,
  onDelete,
  t,
}: SectionFormProps) => {
  return (
    <SectionEntryWrapper onDelete={onDelete} deleteLabel={t.deleteEntry}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-xs">{t.certName}</Label>
          <Input 
            value={entry.title} 
            onChange={(e) => onUpdateField("title", e.target.value)}
            placeholder={t.certPlaceholder}
            className="h-10 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">{t.issuingOrg}</Label>
          <Input
            value={entry.subtitle ?? ""}
            onChange={(e) => onUpdateField("subtitle", e.target.value)}
            placeholder={t.issuingOrgPlaceholder}
            className="h-10 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">{t.issueDate}</Label>
          <Input
            type="month"
            value={entry.startDate ? entry.startDate.slice(0, 7) : ""}
            onChange={(e) => onUpdateDate("startDate", e.target.value)}
            className="h-10 text-sm"
          />
        </div>
      </div>
    </SectionEntryWrapper>
  );
};
