import { useEffect } from "react";
import { ResumeBuilder } from "@/components/resume/ResumeBuilder";
import { WelcomeScreen } from "@/components/welcome";
import { useResumeStore } from "@/store/resumeStore";
import { useAppModeStore } from "@/store/appModeStore";

const App = () => {
  const resume = useResumeStore((state) => state.resume);
  const hasCompletedOnboarding = useAppModeStore((state) => state.hasCompletedOnboarding);
  const language = useAppModeStore((state) => state.language);
  const savedResumes = useAppModeStore((state) => state.savedResumes);
  const activeResumeId = useAppModeStore((state) => state.activeResumeId);
  const setResume = useResumeStore((state) => state.setResume);

  // Set document direction based on language
  useEffect(() => {
    const root = document.documentElement;
    if (language === "ar") {
      root.setAttribute("dir", "rtl");
      root.setAttribute("lang", "ar");
    } else {
      root.setAttribute("dir", "ltr");
      root.setAttribute("lang", "en");
    }
  }, [language]);

  // Load active resume from local storage on mount
  useEffect(() => {
    if (activeResumeId && savedResumes.length > 0 && !resume) {
      const savedResume = savedResumes.find(r => r.id === activeResumeId);
      if (savedResume) {
        setResume(structuredClone(savedResume));
      }
    }
  }, [activeResumeId, savedResumes, resume, setResume]);

  // Show welcome screen if user hasn't completed onboarding
  if (!hasCompletedOnboarding || !resume) {
    return <WelcomeScreen />;
  }

  return <ResumeBuilder />;
};

export default App;
