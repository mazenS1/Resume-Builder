import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, FileText, FileJson, Loader2 } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { useAppModeStore } from "@/store/appModeStore";
import { translations } from "@/lib/i18n";
import { toast } from "sonner";
import type { Resume } from "@resume/shared";

export const ImportResumeDialog = () => {
  const [open, setOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setResume = useResumeStore((state) => state.setResume);
  const language = useAppModeStore((state) => state.language);
  const saveResume = useAppModeStore((state) => state.saveResume);
  const t = translations[language];
  const isRTL = language === "ar";

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      if (file.name.endsWith(".json")) {
        // Import JSON resume
        const text = await file.text();
        const data = JSON.parse(text) as Resume;
        
        // Validate basic structure
        if (!data.basicInfo || !data.sections) {
          throw new Error("Invalid resume format");
        }
        
        // Update IDs to avoid conflicts
        const now = new Date().toISOString();
        data.id = `imported-${Date.now()}`;
        data.createdAt = now;
        data.updatedAt = now;
        
        setResume(data);
        saveResume(data);
        toast.success(isRTL ? "تم استيراد السيرة الذاتية بنجاح" : "Resume imported successfully!");
        setOpen(false);
      } else {
        toast.error(isRTL ? "صيغة الملف غير مدعومة" : "Unsupported file format");
      }
    } catch (error) {
      console.error("Import failed:", error);
      toast.error(isRTL ? "فشل استيراد الملف" : "Failed to import file");
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [setResume, saveResume, isRTL]);

  const handleExportJSON = useCallback(() => {
    const resume = useResumeStore.getState().resume;
    if (!resume) return;

    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resume.basicInfo.name || "resume"}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(isRTL ? "تم تصدير السيرة الذاتية" : "Resume exported!");
  }, [isRTL]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 h-9">
          <Upload className="h-3.5 w-3.5" />
          <span className="hidden md:inline">{isRTL ? "استيراد/تصدير" : "Import/Export"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[92vw] sm:max-w-md" dir={isRTL ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {isRTL ? "استيراد وتصدير" : "Import & Export"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Import Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">
              {isRTL ? "استيراد سيرة ذاتية" : "Import Resume"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isRTL 
                ? "استيراد سيرة ذاتية من ملف JSON محفوظ مسبقاً"
                : "Import a resume from a previously exported JSON file"}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 gap-2"
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
            >
              {isImporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {isRTL ? "اختر ملف JSON" : "Choose JSON File"}
            </Button>
          </div>

          <div className="border-t pt-4 space-y-3">
            <h3 className="text-sm font-medium">
              {isRTL ? "تصدير السيرة الذاتية" : "Export Resume"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isRTL 
                ? "احفظ نسخة احتياطية أو انقل بياناتك لجهاز آخر"
                : "Save a backup or transfer your data to another device"}
            </p>
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 gap-2"
              onClick={handleExportJSON}
            >
              <FileJson className="h-4 w-4" />
              {isRTL ? "تصدير كـ JSON" : "Export as JSON"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
