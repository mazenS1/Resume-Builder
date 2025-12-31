import { Edit, Eye, RotateCcw, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeEditor } from "@/components/resume/ResumeEditor";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { ResumePdfDownloadButton } from "@/components/resume/ResumePDF";
import { ResumeDocxDownloadButton } from "@/components/resume/ResumeDocx";
import { ThemeSettingsDialog } from "@/components/resume/ThemeSettingsDialog";
import { ImportResumeDialog } from "@/components/resume/ImportResumeDialog";
import { useResumeStore } from "@/store/resumeStore";
import { sampleResume } from "@/data/sampleResume";
import { sampleResumeAr } from "@/data/sampleResumeAr";
import { useAppModeStore } from "@/store/appModeStore";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { useEffect, useState, useCallback, useRef } from "react";
import { translations } from "@/lib/i18n";

export const ResumeBuilder = () => {
  const resume = useResumeStore((state) => state.resume);
  const setResume = useResumeStore((state) => state.setResume);
  const language = useAppModeStore((state) => state.language);
  const saveResume = useAppModeStore((state) => state.saveResume);
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const editPanelRef = useRef<HTMLElement>(null);
  const previewPanelRef = useRef<HTMLElement>(null);
  
  const t = translations[language];

  // Handler for switching mobile views
  // - Keep Preview opening at the top
  const handleMobileViewChange = useCallback((nextView: 'edit' | 'preview') => {
    setMobileView(nextView);

    // Existing behavior: always show preview from the top.
    if (nextView === 'preview') {
      requestAnimationFrame(() => {
        if (previewPanelRef.current) {
          previewPanelRef.current.scrollTop = 0;
        }
        window.scrollTo(0, 0);
      });
    }
  }, []);

  const isRTL = language === "ar";

  // Auto-save to local storage
  useEffect(() => {
    if (resume) {
      const timeoutId = setTimeout(() => {
        saveResume(resume);
        setLastSaved(new Date());
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [resume, saveResume]);

  // Switch resume when language changes
  useEffect(() => {
    if (resume) {
      const currentLang = resume.metadata?.locale?.startsWith('ar') ? 'ar' : 'en';
      if (currentLang !== language) {
        // Only switch if it looks like a sample resume
        if (resume.id.includes('sample')) {
          setResume(structuredClone(language === 'ar' ? sampleResumeAr : sampleResume));
        }
      }
    }
  }, [language, resume, setResume]);

  const handleReset = useCallback(() => {
    const confirmMsg = language === 'ar' 
      ? 'هل تريد إعادة التعيين للبيانات النموذجية؟' 
      : 'Reset to sample data?';
    if (confirm(confirmMsg)) {
      const newResume = structuredClone(language === 'ar' ? sampleResumeAr : sampleResume);
      setResume(newResume);
      saveResume(newResume);
    }
  }, [language, setResume, saveResume]);

  if (!resume) {
    return null;
  }

  return (
    <div 
      className="flex min-h-screen flex-col bg-muted/30 print:bg-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm print:hidden">
        <div className="flex items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3">
          {/* Left: Title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-base sm:text-lg font-semibold truncate">{t.appName}</h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {lastSaved ? t.allChangesSaved : t.localMode}
            </p>
          </div>
          
          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Desktop actions */}
            <div className="hidden sm:flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
              <ThemeSettingsDialog />
              <ImportResumeDialog />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleReset}
                className="gap-1.5 h-9"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden md:inline">{t.reset}</span>
              </Button>
              <ResumeDocxDownloadButton size="sm" className="gap-1.5 h-9" />
              <ResumePdfDownloadButton size="sm" className="gap-1.5 h-9" />
            </div>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="sm:hidden h-9 w-9 p-0"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="sm:hidden border-t bg-background px-3 py-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{language === 'ar' ? 'الإعدادات' : 'Settings'}</span>
              <div className="flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeSettingsDialog />
              <ImportResumeDialog />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  handleReset();
                  setShowMobileMenu(false);
                }}
                className="flex-1 h-10"
              >
                <RotateCcw className="h-4 w-4 me-2" />
                {t.reset}
              </Button>
            </div>
            <div className="flex gap-2">
              <ResumeDocxDownloadButton 
                size="sm" 
                className="flex-1 h-10"
              />
              <ResumePdfDownloadButton 
                size="sm" 
                className="flex-1 h-10"
                onClick={() => setShowMobileMenu(false)}
              />
            </div>
          </div>
        )}
        
        {/* Mobile View Toggle */}
        <div className="lg:hidden border-t">
          <div className="flex">
            <button
              onClick={() => handleMobileViewChange('edit')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                mobileView === 'edit' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              <Edit className="h-4 w-4" />
              {t.edit}
            </button>
            <button
              onClick={() => handleMobileViewChange('preview')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                mobileView === 'preview' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              <Eye className="h-4 w-4" />
              {t.preview}
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-2 lg:gap-6 xl:gap-8 print:flex print:max-w-none overflow-hidden">
        {/* Mobile: Keep both panels mounted; avoid `display:none` to preserve scroll on iOS */}
        <div className="lg:hidden relative flex-1 print:hidden overflow-hidden">
          <section
            ref={editPanelRef}
            aria-hidden={mobileView !== 'edit'}
            className={`absolute inset-0 overflow-y-auto p-3 sm:p-4 transition-opacity ${
              mobileView === 'edit' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ResumeEditor />
          </section>

          <aside
            ref={previewPanelRef}
            aria-hidden={mobileView !== 'preview'}
            className={`absolute inset-0 overflow-y-auto p-3 sm:p-4 transition-opacity ${
              mobileView === 'preview' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="resume-preview-wrapper">
              <div className="resume-preview-scaler">
                <ResumePreview />
              </div>
            </div>
          </aside>
        </div>

        {/* Desktop: Side-by-side view */}
        <section className="hidden lg:block p-4 xl:p-6 print:hidden overflow-y-auto">
          <div className="max-w-xl mx-auto">
            <ResumeEditor />
          </div>
        </section>
        
        <aside className="hidden lg:flex p-4 xl:p-6 print:!flex print:w-full justify-center overflow-y-auto bg-muted/20">
          <div className="resume-preview-wrapper">
            <div className="resume-preview-scaler">
              <ResumePreview />
            </div>
          </div>
        </aside>
      </main>

      {/* Mobile FAB for quick PDF download */}
      <div className="lg:hidden fixed bottom-4 end-4 print:hidden z-30">
        <ResumePdfDownloadButton 
          size="lg" 
          className="h-14 w-14 rounded-full shadow-lg p-0"
          iconOnly
        />
      </div>
    </div>
  );
};
