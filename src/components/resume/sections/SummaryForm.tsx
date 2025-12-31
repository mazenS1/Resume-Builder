import { Card } from "@/components/common/Card";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeEntry, ResumeSection } from "@resume/shared";

interface SummaryFormProps {
  section: ResumeSection;
  entry: ResumeEntry;
  onUpdate: (value: string) => void;
  isRTL: boolean;
  t: Record<string, string>;
}

export const SummaryForm = ({
  section: _section,
  entry,
  onUpdate,
  isRTL,
  t,
}: SummaryFormProps) => {
  return (
    <Card className="space-y-3">
      <div>
        <h2 className="text-base sm:text-lg font-semibold">{t.summary}</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">{t.summaryHint}</p>
      </div>
      <Textarea
        rows={4}
        value={entry.description ?? ""}
        className="text-base sm:text-sm min-h-[100px] resize-none"
        placeholder={isRTL ? 'اكتب ملخصاً موجزاً عن خبراتك...' : 'Write a brief summary of your experience...'}
        onChange={(event) => onUpdate(event.target.value)}
      />
    </Card>
  );
};
