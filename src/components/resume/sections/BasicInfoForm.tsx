import { Card } from "@/components/common/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import type { Resume } from "@resume/shared";

interface BasicInfoFormProps {
  basicInfo: Resume["basicInfo"];
  onUpdateField: (field: keyof Resume["basicInfo"]) => (value: string) => void;
  onAddLink: () => void;
  onUpdateLink: (index: number, field: "label" | "url", value: string) => void;
  onRemoveLink: (index: number) => void;
  isRTL: boolean;
  t: Record<string, string>;
}

export const BasicInfoForm = ({
  basicInfo,
  onUpdateField,
  onAddLink,
  onUpdateLink,
  onRemoveLink,
  isRTL,
  t,
}: BasicInfoFormProps) => {
  return (
    <Card className="space-y-4">
      <div>
        <h2 className="text-base sm:text-lg font-semibold">{t.basicInfo}</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">{t.basicInfoHint}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-sm">{t.fullName}</Label>
          <Input 
            id="name" 
            value={basicInfo.name} 
            onChange={(event) => onUpdateField("name")(event.target.value)}
            className="h-11 sm:h-10 text-base sm:text-sm"
            placeholder={isRTL ? 'الاسم الكامل' : 'Full Name'}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="headline" className="text-sm">{t.headline}</Label>
          <Input
            id="headline"
            value={basicInfo.headline ?? ""}
            onChange={(event) => onUpdateField("headline")(event.target.value)}
            placeholder={t.headlinePlaceholder}
            className="h-11 sm:h-10 text-base sm:text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm">{t.email}</Label>
          <Input 
            id="email" 
            type="email" 
            value={basicInfo.email} 
            onChange={(event) => onUpdateField("email")(event.target.value)}
            className="h-11 sm:h-10 text-base sm:text-sm"
            dir="ltr"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-sm">{t.phone}</Label>
          <Input 
            id="phone" 
            value={basicInfo.phone ?? ""} 
            onChange={(event) => onUpdateField("phone")(event.target.value)}
            className="h-11 sm:h-10 text-base sm:text-sm"
            dir="ltr"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="location" className="text-sm">{t.location}</Label>
          <Input 
            id="location" 
            value={basicInfo.location ?? ""} 
            onChange={(event) => onUpdateField("location")(event.target.value)}
            className="h-11 sm:h-10 text-base sm:text-sm"
          />
        </div>
      </div>
      
      {/* Dynamic Links Section */}
      <div className="space-y-3 pt-2 border-t">
        <div className="flex items-center justify-between">
          <Label className="text-sm">{t.links}</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddLink}
            className="h-8 gap-1"
          >
            <Plus className="h-3.5 w-3.5" />
            {t.addLink}
          </Button>
        </div>
        {basicInfo.links.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">
            {isRTL ? 'لا توجد روابط. اضغط على إضافة رابط.' : 'No links yet. Click Add Link.'}
          </p>
        ) : (
          <div className="space-y-2">
            {basicInfo.links.map((link, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <Input
                  value={link.label}
                  onChange={(e) => onUpdateLink(index, "label", e.target.value)}
                  placeholder={t.linkLabelPlaceholder}
                  className="h-10 text-sm sm:flex-[0.4] min-w-0"
                />
                <Input
                  value={link.url}
                  onChange={(e) => onUpdateLink(index, "url", e.target.value)}
                  placeholder={t.linkUrlPlaceholder}
                  className="h-10 text-sm sm:flex-[0.6] min-w-0"
                  dir="ltr"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveLink(index)}
                  className="h-10 w-10 p-0 text-muted-foreground hover:text-destructive flex-shrink-0 self-end sm:self-auto"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
