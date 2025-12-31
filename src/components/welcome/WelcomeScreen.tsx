import { FileText, Globe, Sparkles, Shield, WifiOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppModeStore } from "@/store/appModeStore";
import { useResumeStore } from "@/store/resumeStore";
import { sampleResume } from "@/data/sampleResume";
import { sampleResumeAr } from "@/data/sampleResumeAr";
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
  
  // Always show UI in Arabic (RTL)
  const isRTL = true;

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
          <span className="font-semibold text-sm sm:text-base hidden sm:inline">منشئ السيرة الذاتية</span>
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
              جاهز لأنظمة التوظيف الذكية
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              يلا نبني سيرتك الذاتية! 🚀
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
              سوّي سيرة ذاتية احترافية في دقايق معدودة، بدون تعقيد وبشكل يناسب سوق العمل
            </p>
          </div>

          {/* Language Selection */}
          <div className="space-y-3 bg-muted/50 rounded-xl p-4 border border-border/50">
            <p className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
              <Globe className="w-4 h-4" />
              اختر لغة السيرة الذاتية
            </p>
            <p className="text-xs text-muted-foreground/70">
              هذا الخيار يحدد لغة محتوى سيرتك الذاتية فقط
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant={language === "en" ? "default" : "outline"}
                size="lg"
                onClick={() => setLanguage("en")}
                className="min-w-[140px] h-12 text-base"
              >
                English Resume
              </Button>
              <Button
                variant={language === "ar" ? "default" : "outline"}
                size="lg"
                onClick={() => setLanguage("ar")}
                className="min-w-[140px] h-12 text-base font-arabic"
                style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}
              >
                سيرة بالعربي
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              size="lg"
              onClick={handleStartFresh}
              className="w-full h-14 text-base sm:text-lg font-semibold"
            >
              ابدأ من الصفر ✨
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadSample}
              className="w-full h-14 text-base sm:text-lg"
            >
              شوف مثال جاهز
            </Button>
          </div>

          {/* Security Features - More Prominent */}
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400 font-medium">
              <Shield className="w-5 h-5" />
              <span>خصوصيتك أولويتنا</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="flex flex-col items-center gap-1.5 p-2">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-xs text-green-700 dark:text-green-400">
                  بياناتك محفوظة على جهازك فقط
                </p>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-2">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <WifiOff className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-xs text-green-700 dark:text-green-400">
                  يشتغل بدون نت
                </p>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-2">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-xs text-green-700 dark:text-green-400">
                  ما نشارك بياناتك مع أي طرف
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-2 text-center">
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-muted flex items-center justify-center">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                تصميم احترافي
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-muted flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                متوافق مع ATS
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-muted flex items-center justify-center">
                <Globe className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                عربي وإنجليزي
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center">
        <p className="text-xs text-muted-foreground">
          صُنع بـ ❤️ للباحثين عن عمل في الوطن العربي
        </p>
      </footer>
    </div>
  );
};
