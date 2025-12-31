import { FileText, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppModeStore } from "@/store/appModeStore";
import { useResumeStore } from "@/store/resumeStore";
import { sampleResume } from "@/data/sampleResume";
import { sampleResumeAr } from "@/data/sampleResumeAr";
import { translations } from "@/lib/i18n";
import { nanoid } from "nanoid";
import type { Resume } from "@resume/shared";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export const WelcomeScreen = () => {
  const language = useAppModeStore((state) => state.language);
  const setLanguage = useAppModeStore((state) => state.setLanguage);
  const setHasCompletedOnboarding = useAppModeStore((state) => state.setHasCompletedOnboarding);
  const saveResume = useAppModeStore((state) => state.saveResume);
  const setActiveResumeId = useAppModeStore((state) => state.setActiveResumeId);
  const setResume = useResumeStore((state) => state.setResume);
  
  const t = translations[language];
  const isRTL = language === "ar";

  const createBlankResume = (): Resume => {
    const id = nanoid();
    return {
      id,
      userId: "local-user",
      title: language === "ar" ? "سيرتي الذاتية" : "My Resume",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      basicInfo: {
        name: "",
        email: "",
        phone: null,
        location: null,
        headline: null,
        links: []
      },
      metadata: {
        locale: language === "ar" ? "ar-SA" : "en-US",
        theme: "light",
        fontFamily: language === "ar" ? "IBM Plex Sans Arabic" : "EB Garamond",
        lineHeight: 1.4,
        accentColor: "#0F172A",
        primaryColor: "#0F172A"
      },
      sections: [
        {
          id: nanoid(),
          resumeId: id,
          type: "SUMMARY",
          titleOverride: language === "ar" ? "الملخص" : "Summary",
          position: 0,
          collapsed: false,
          entries: [{
            id: nanoid(),
            sectionId: "",
            position: 0,
            title: language === "ar" ? "الملخص" : "Summary",
            bullets: [],
            subtitle: null,
            companyOrOrg: null,
            location: null,
            startDate: null,
            endDate: null,
            isCurrent: false,
            description: "",
            projectUrl: null,
            techStack: []
          }]
        },
        {
          id: nanoid(),
          resumeId: id,
          type: "WORK_EXPERIENCE",
          titleOverride: language === "ar" ? "الخبرات" : "Experience",
          position: 1,
          collapsed: false,
          entries: []
        },
        {
          id: nanoid(),
          resumeId: id,
          type: "EDUCATION",
          titleOverride: language === "ar" ? "التعليم" : "Education",
          position: 2,
          collapsed: false,
          entries: []
        },
        {
          id: nanoid(),
          resumeId: id,
          type: "SKILL",
          titleOverride: language === "ar" ? "المهارات" : "Skills",
          position: 3,
          collapsed: false,
          entries: []
        }
      ]
    };
  };

  const handleStartFresh = () => {
    const newResume = createBlankResume();
    saveResume(newResume);
    setActiveResumeId(newResume.id);
    setResume(newResume);
    setHasCompletedOnboarding(true);
  };

  const handleLoadSample = () => {
    const sample = structuredClone(language === "ar" ? sampleResumeAr : sampleResume);
    // Create a new ID so it's a fresh copy
    sample.id = nanoid();
    sample.createdAt = new Date().toISOString();
    sample.updatedAt = new Date().toISOString();
    saveResume(sample);
    setActiveResumeId(sample.id);
    setResume(sample);
    setHasCompletedOnboarding(true);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex flex-col"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}
      <header className="flex justify-between items-center p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm sm:text-base hidden sm:inline">{t.appName}</span>
        </div>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-12">
        <div className="w-full max-w-lg text-center space-y-8">
          {/* Hero */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              {t.atsReady}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {t.welcomeTitle}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
              {t.welcomeSubtitle}
            </p>
          </div>

          {/* Language Selection */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
              <Globe className="w-4 h-4" />
              {t.chooseLanguage}
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant={language === "en" ? "default" : "outline"}
                size="lg"
                onClick={() => setLanguage("en")}
                className="min-w-[140px] h-12 text-base"
              >
                English
              </Button>
              <Button
                variant={language === "ar" ? "default" : "outline"}
                size="lg"
                onClick={() => setLanguage("ar")}
                className="min-w-[140px] h-12 text-base font-arabic"
                style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}
              >
                العربية
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              size="lg"
              onClick={handleLoadSample}
              className="w-full h-14 text-base sm:text-lg font-semibold"
            >
              {t.loadSample}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleStartFresh}
              className="w-full h-14 text-base sm:text-lg"
            >
              {t.startFresh}
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6 text-center">
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-muted flex items-center justify-center">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {language === "ar" ? "قوالب احترافية" : "Pro Templates"}
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-muted flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {language === "ar" ? "متوافق مع ATS" : "ATS Ready"}
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-muted flex items-center justify-center">
                <Globe className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {language === "ar" ? "يعمل بدون إنترنت" : "Works Offline"}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center">
        <p className="text-xs text-muted-foreground">
          {language === "ar" 
            ? "بياناتك محفوظة محلياً على جهازك" 
            : "Your data is stored locally on your device"}
        </p>
      </footer>
    </div>
  );
};
