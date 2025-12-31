import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings, Palette } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { useAppModeStore } from "@/store/appModeStore";

const FONT_OPTIONS = [
  { value: "Inter", label: "Inter (Modern)" },
  { value: "Georgia", label: "Georgia (Classic)" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Arial", label: "Arial" },
  { value: "Helvetica", label: "Helvetica" },
];

const LINE_HEIGHT_OPTIONS = [
  { value: 1.2, label: "Compact" },
  { value: 1.4, label: "Normal" },
  { value: 1.6, label: "Relaxed" },
];

export const ThemeSettingsDialog = () => {
  const [open, setOpen] = useState(false);
  const resume = useResumeStore((state) => state.resume);
  const updateMetadata = useResumeStore((state) => state.updateMetadata);
  const language = useAppModeStore((state) => state.language);
  const isRTL = language === "ar";

  if (!resume) return null;

  const metadata = resume.metadata;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 h-9">
          <Settings className="h-3.5 w-3.5" />
          <span className="hidden md:inline">{isRTL ? "التخصيص" : "Customize"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[92vw] sm:max-w-md" dir={isRTL ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            {isRTL ? "تخصيص المظهر" : "Customize Appearance"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Font Family */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {isRTL ? "نوع الخط" : "Font Family"}
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {FONT_OPTIONS.map((font) => (
                <Button
                  key={font.value}
                  type="button"
                  variant={metadata.fontFamily === font.value ? "default" : "outline"}
                  className="justify-start text-sm h-10"
                  style={{ fontFamily: font.value }}
                  onClick={() => updateMetadata((m) => ({ ...m, fontFamily: font.value }))}
                >
                  {font.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Line Height */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {isRTL ? "تباعد الأسطر" : "Line Spacing"}
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {LINE_HEIGHT_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={metadata.lineHeight === option.value ? "default" : "outline"}
                  className="h-10 text-sm"
                  onClick={() => updateMetadata((m) => ({ ...m, lineHeight: option.value }))}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              {isRTL ? "الألوان" : "Colors"}
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  {isRTL ? "اللون الأساسي" : "Primary Color"}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={metadata.primaryColor || "#0f172a"}
                    onChange={(e) => updateMetadata((m) => ({ ...m, primaryColor: e.target.value }))}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={metadata.primaryColor || "#0f172a"}
                    onChange={(e) => updateMetadata((m) => ({ ...m, primaryColor: e.target.value }))}
                    className="flex-1 h-10 text-sm font-mono"
                    dir="ltr"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  {isRTL ? "اللون المميز" : "Accent Color"}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={metadata.accentColor || "#2563eb"}
                    onChange={(e) => updateMetadata((m) => ({ ...m, accentColor: e.target.value }))}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={metadata.accentColor || "#2563eb"}
                    onChange={(e) => updateMetadata((m) => ({ ...m, accentColor: e.target.value }))}
                    className="flex-1 h-10 text-sm font-mono"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <Button
            type="button"
            className="w-full h-11"
            onClick={() => setOpen(false)}
          >
            {isRTL ? "حفظ" : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
