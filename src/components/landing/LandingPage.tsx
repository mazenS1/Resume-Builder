import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Server,
  Github,
  FileText,
  Languages,
  Download,
  Palette,
  Sparkles,
  Wifi,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAppModeStore } from "@/store/appModeStore";
import { cn } from "@/lib/utils";

// Custom hook for intersection observer (scroll animations)
const useInView = (options = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element); // Only animate once
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px", ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
};

// Animated section wrapper component
const AnimatedSection = ({
  children,
  className,
  delay = 0,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) => {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "transition-all duration-700",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
};

// Resume template data for carousel
const resumeTemplates = [
  {
    id: 1,
    name: "أحمد محمد",
    title: "مهندس برمجيات أول",
    skills: ["React", "Node.js", "Python", "AWS"],
    color: "#2a2825",
    accent: "#3d3a36",
  },
  {
    id: 2,
    name: "سارة أحمد",
    title: "مديرة تسويق رقمي",
    skills: ["SEO", "Analytics", "Content", "Ads"],
    color: "#1e3a5f",
    accent: "#2d4a6f",
  },
  {
    id: 3,
    name: "محمد خالد",
    title: "محلل بيانات",
    skills: ["SQL", "Tableau", "Python", "Excel"],
    color: "#2d3436",
    accent: "#404548",
  },
];

export const LandingPage = () => {
  const setHasSeenLanding = useAppModeStore((state) => state.setHasSeenLanding);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate templates
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentTemplate((prev) => (prev + 1) % resumeTemplates.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTemplate = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentTemplate((prev) => (prev + 1) % resumeTemplates.length);
  }, []);

  const prevTemplate = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentTemplate(
      (prev) => (prev - 1 + resumeTemplates.length) % resumeTemplates.length
    );
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGetStarted = () => {
    setHasSeenLanding(true);
  };

  return (
    <div
      className="min-h-screen bg-[#1a1a1a] text-[#fafafa] overflow-x-hidden"
      dir="rtl"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-16 py-4 sm:py-6 bg-[#1a1a1a]/80 backdrop-blur-md border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#c9a96e] flex items-center justify-center">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a1a1a]" />
              </div>
              <span
              className="text-xl sm:text-2xl tracking-[0.2em] font-bold uppercase"
              style={{ fontFamily: "'Amiri', serif" }}
              >
              سيرة
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "المميزات", id: "features" },
              { label: "الأمان", id: "security" },
              { label: "كيف يعمل", id: "how-it-works" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-xs tracking-[0.1em] uppercase text-[#9a9a9a] hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] rounded px-2 py-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="https://github.com/mazenS1/ResumeArab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9a9a9a] hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] rounded p-1"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <button
              onClick={handleGetStarted}
              className={cn(
                "text-xs tracking-[0.15em] uppercase text-[#b0b0b0] hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] rounded px-2 py-1",
                isVisible ? "opacity-100" : "opacity-0"
              )}
            >
              ابدأ الآن
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 pt-24 overflow-x-hidden">
        <div className="absolute top-0 bottom-0 right-[15%] w-px bg-gradient-to-b from-transparent via-[#444] to-transparent opacity-50 hidden sm:block" />

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center py-16 sm:py-32">
          {/* Text Column - Always first on mobile for context */}
          <div className="order-1">
            <div
              className={cn(
                "mb-8 transition-all duration-700 delay-200",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-[#666]">
                منشئ السيرة الذاتية
              </span>
            </div>

            <h1
              className={cn(
                "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[0.9] mb-6 sm:mb-8 transition-all duration-700 delay-300",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ fontFamily: "'Amiri', serif" }}
            >
              <span className="block">سيرة ذاتية</span>
              <span className="block mt-2 italic text-[#c9a96e]">
                استثنائية
              </span>
            </h1>

            <p
              className={cn(
                "text-[#a0a0a0] text-base sm:text-lg lg:text-xl leading-relaxed max-w-md mb-8 sm:mb-12 transition-all duration-700 delay-500",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              صمّم سيرتك الذاتية بأناقة تليق بطموحاتك المهنية. متوافقة مع أنظمة
              التوظيف، بتصميم راقٍ لا يُنسى.
            </p>

            <div
              className={cn(
                "transition-all duration-700 delay-700",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              <button
                onClick={handleGetStarted}
                className="group relative inline-flex items-center gap-3 sm:gap-4 bg-[#fafafa] text-[#1a1a1a] px-6 sm:px-10 py-4 sm:py-5 text-sm tracking-[0.15em] uppercase overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1a1a1a]"
              >
                <span className="absolute inset-0 bg-[#c9a96e] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10">ابدأ مجاناً</span>
                <ArrowLeft className="relative z-10 w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </button>
            </div>

            <div
              className={cn(
                "flex flex-wrap gap-6 sm:gap-12 mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-[#333] transition-all duration-700 delay-900",
                isVisible ? "opacity-100" : "opacity-0"
              )}
            >
              {[
                { label: "خصوصية تامة", value: "١٠٠٪" },
                { label: "بدون تسجيل", value: "مجاني" },
                { label: "عربي وإنجليزي", value: "RTL" },
              ].map((stat, index) => (
                <div key={index}>
                  <div
                    className="text-xl sm:text-2xl lg:text-3xl font-normal text-[#c9a96e] mb-1"
                    style={{ fontFamily: "'Amiri', serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs tracking-[0.1em] uppercase text-[#a8a8a8]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Preview Column - Interactive Carousel */}
          <div className="order-2 relative px-2 sm:px-0 overflow-hidden">
            <div
              className={cn(
                "relative transition-all duration-700 delay-500",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              )}
            >
              {/* Decorative borders - hidden on mobile to prevent overflow */}
              <div className="absolute -inset-8 border border-[#333] hidden sm:block" />
              <div className="absolute -inset-4 border border-[#444] hidden sm:block" />

              {/* Template Carousel */}
              <div className="relative overflow-hidden rounded-sm">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(${currentTemplate * 100}%)` }}
                >
                  {resumeTemplates.map((template) => (
                    <div key={template.id} className="w-full flex-shrink-0">
                      <div
                        className="relative text-[#d4d0cb] p-4 sm:p-8 lg:p-12 aspect-[8.5/11] shadow-2xl transition-colors duration-500"
                        style={{ backgroundColor: template.color }}
                      >
                        <div className="space-y-4 sm:space-y-6">
                          <div
                            className="text-center pb-4 sm:pb-6 border-b transition-colors duration-500"
                            style={{ borderColor: template.accent }}
                          >
                            <div
                              className="text-lg sm:text-2xl lg:text-3xl font-medium text-[#e8e4df]"
                              style={{ fontFamily: "'Amiri', serif" }}
                            >
                              {template.name}
                            </div>
                            <div className="text-[10px] sm:text-xs tracking-[0.15em] uppercase text-[#a09a92] mt-1 sm:mt-2">
                              {template.title}
                            </div>
                          </div>

                          <div className="space-y-3 sm:space-y-4">
                            <div>
                              <div className="text-[8px] sm:text-[10px] tracking-[0.2em] uppercase text-[#8a857d] mb-1 sm:mb-2">
                                الخبرات
                              </div>
                              <div className="space-y-1">
                                <div
                                  className="h-1.5 sm:h-2 rounded w-full transition-colors duration-500"
                                  style={{ backgroundColor: template.accent }}
                                />
                                <div
                                  className="h-1.5 sm:h-2 rounded w-4/5 transition-colors duration-500"
                                  style={{ backgroundColor: template.accent }}
                                />
                                <div
                                  className="h-1.5 sm:h-2 rounded w-3/4 transition-colors duration-500"
                                  style={{ backgroundColor: template.accent }}
                                />
                              </div>
                            </div>

                            <div>
                              <div className="text-[8px] sm:text-[10px] tracking-[0.2em] uppercase text-[#8a857d] mb-1 sm:mb-2">
                                التعليم
                              </div>
                              <div className="space-y-1">
                                <div
                                  className="h-1.5 sm:h-2 rounded w-full transition-colors duration-500"
                                  style={{ backgroundColor: template.accent }}
                                />
                                <div
                                  className="h-1.5 sm:h-2 rounded w-2/3 transition-colors duration-500"
                                  style={{ backgroundColor: template.accent }}
                                />
                              </div>
                            </div>

                            <div>
                              <div className="text-[8px] sm:text-[10px] tracking-[0.2em] uppercase text-[#8a857d] mb-1 sm:mb-2">
                                المهارات
                              </div>
                              <div className="flex flex-wrap gap-1 sm:gap-2">
                                {template.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="px-2 sm:px-3 py-0.5 sm:py-1 text-[#b0aaa2] text-[8px] sm:text-[10px] tracking-wider transition-colors duration-500"
                                    style={{ backgroundColor: template.accent }}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent pointer-events-none"
                          style={{
                            background: `linear-gradient(to top, ${template.color}, transparent)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Controls */}
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex items-center justify-between">
                  <button
                    onClick={prevTemplate}
                    className="group relative w-8 h-8 sm:w-10 sm:h-10 bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#444] flex items-center justify-center text-white overflow-hidden hover:border-[#c9a96e] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]"
                    aria-label="القالب السابق"
                  >
                    <span className="absolute inset-0 bg-[#c9a96e] scale-0 group-hover:scale-100 transition-transform duration-300 rounded-sm" />
                    <ChevronRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:text-[#1a1a1a] transition-colors duration-300" />
                  </button>

                  {/* Dots indicator */}
                  <div className="flex gap-1.5 sm:gap-2">
                    {resumeTemplates.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIsAutoPlaying(false);
                          setCurrentTemplate(index);
                        }}
                        className={cn(
                          "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]",
                          currentTemplate === index
                            ? "bg-[#c9a96e] w-4 sm:w-6"
                            : "bg-[#555] hover:bg-[#777]"
                        )}
                        aria-label={`انتقل للقالب ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextTemplate}
                    className="group relative w-8 h-8 sm:w-10 sm:h-10 bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#444] flex items-center justify-center text-white overflow-hidden hover:border-[#c9a96e] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]"
                    aria-label="القالب التالي"
                  >
                    <span className="absolute inset-0 bg-[#c9a96e] scale-0 group-hover:scale-100 transition-transform duration-300 rounded-sm" />
                    <ChevronLeft className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:text-[#1a1a1a] transition-colors duration-300" />
                  </button>
                </div>
              </div>

              <div
                className={cn(
                  "absolute -bottom-3 sm:-bottom-6 left-2 sm:-left-6 bg-[#c9a96e] text-[#1a1a1a] px-4 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-xs tracking-[0.15em] uppercase transition-all duration-700 delay-1000",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
              >
                ATS متوافق
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <AnimatedSection
        id="features"
        className="py-32 px-8 lg:px-16 border-t border-[#2a2a2a]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs tracking-[0.3em] uppercase text-[#9a9a9a] block mb-4">
              المميزات
            </span>
            <h2
              className="text-4xl lg:text-5xl font-normal"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              كل ما تحتاجه في{" "}
              <span className="italic text-[#c9a96e]">مكان واحد</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Languages,
                title: "عربي وإنجليزي",
                desc: "دعم كامل للغتين مع تنسيق RTL احترافي يراعي اتجاه الكتابة",
              },
              {
                icon: Sparkles,
                title: "متوافق مع ATS",
                desc: "تصميم مُحسّن ليمر من أنظمة تتبع المتقدمين بنجاح تام",
              },
              {
                icon: Palette,
                title: "تخصيص كامل",
                desc: "تحكم بالألوان والخطوط والتنسيق لتعكس شخصيتك المهنية",
              },
              {
                icon: Download,
                title: "تصدير متعدد",
                desc: "حمّل سيرتك بصيغة PDF أو Word بضغطة واحدة",
              },
              {
                icon: Wifi,
                title: "يعمل بدون إنترنت",
                desc: "التطبيق يعمل بالكامل على جهازك حتى بدون اتصال",
              },
              {
                icon: FileText,
                title: "قوالب احترافية",
                desc: "قوالب مصممة بعناية فائقة لتعكس احترافيتك",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 border border-[#2a2a2a] hover:border-[#c9a96e]/30 bg-[#1f1f1f] hover:bg-[#242424] transition-all duration-500 focus-within:ring-2 focus-within:ring-[#c9a96e]"
              >
                <feature.icon
                  className="w-8 h-8 text-[#c9a96e] mb-6"
                  strokeWidth={1.5}
                />
                <h3
                  className="text-xl mb-3 text-[#fafafa]"
                  style={{ fontFamily: "'Amiri', serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-[#a8a8a8] text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Security Section */}
      <AnimatedSection
        id="security"
        className="py-32 px-8 lg:px-16 bg-[#151515] border-t border-[#2a2a2a]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-[#9a9a9a] block mb-4">
                الأمان والخصوصية
              </span>
              <h2
                className="text-4xl lg:text-5xl font-normal mb-8"
                style={{ fontFamily: "'Amiri', serif" }}
              >
                خصوصيتك <span className="italic text-[#c9a96e]">أولويتنا</span>
              </h2>
              <p className="text-[#a8a8a8] text-lg leading-relaxed mb-8">
                نؤمن بأن بياناتك الشخصية ملكك وحدك. لذلك صممنا التطبيق ليعمل
                بالكامل على جهازك دون الحاجة لإرسال أي معلومات لخوادم خارجية.
              </p>
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center gap-3 text-[#c9a96e] hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#151515] rounded px-2 py-1"
              >
                <span className="text-sm tracking-[0.1em] uppercase">
                  ابدأ بأمان
                </span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Lock,
                  title: "تشفير محلي",
                  desc: "بياناتك محفوظة على جهازك فقط",
                },
                {
                  icon: Server,
                  title: "بدون خوادم",
                  desc: "لا نحتفظ بأي بيانات على خوادمنا",
                },
                {
                  icon: Eye,
                  title: "بدون تتبع",
                  desc: "لا نستخدم أي أدوات تتبع أو تحليل",
                },
                {
                  icon: Shield,
                  title: "مفتوح المصدر",
                  desc: "الكود متاح للجميع للمراجعة والتدقيق",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 border border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#c9a96e]/30 transition-colors duration-300"
                >
                  <item.icon
                    className="w-6 h-6 text-[#c9a96e] mb-4"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-base mb-2 text-[#fafafa]">
                    {item.title}
                  </h3>
                  <p className="text-[#9a9a9a] text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Open Source Section */}
      <AnimatedSection className="py-32 px-8 lg:px-16 border-t border-[#2a2a2a]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-[#333] mb-8">
            <Github className="w-10 h-10 text-[#c9a96e]" strokeWidth={1.5} />
          </div>

          <h2
            className="text-4xl lg:text-5xl font-normal mb-6"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            مفتوح <span className="italic text-[#c9a96e]">المصدر</span>
          </h2>

          <p className="text-[#a8a8a8] text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            نؤمن بالشفافية والمشاركة. الكود المصدري متاح بالكامل على GitHub.
            يمكنك المساهمة في تطوير المشروع أو استخدامه كما تشاء.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/mazenS1/ResumeArab"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 bg-[#fafafa] text-[#1a1a1a] px-8 py-4 text-sm tracking-[0.1em] uppercase overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
            >
              <span className="absolute inset-0 bg-[#c9a96e] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <Github className="relative z-10 w-5 h-5" />
              <span className="relative z-10">عرض على GitHub</span>
            </a>
            <button
              onClick={handleGetStarted}
              className="group relative inline-flex items-center justify-center gap-3 border border-[#444] text-[#fafafa] px-8 py-4 text-sm tracking-[0.1em] uppercase overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
            >
              <span className="absolute inset-0 bg-[#c9a96e] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-300">جرّب الآن</span>
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* How it Works Section */}
      <AnimatedSection
        id="how-it-works"
        className="py-32 px-8 lg:px-16 bg-[#151515] border-t border-[#2a2a2a]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs tracking-[0.3em] uppercase text-[#9a9a9a] block mb-4">
              كيف يعمل
            </span>
            <h2
              className="text-4xl lg:text-5xl font-normal"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              ثلاث خطوات <span className="italic text-[#c9a96e]">فقط</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                number: "٠١",
                title: "أدخل بياناتك",
                desc: "قم بإدخال معلوماتك الشخصية وخبراتك ومهاراتك بسهولة",
              },
              {
                number: "٠٢",
                title: "خصّص التصميم",
                desc: "اختر الألوان والخطوط التي تناسب ذوقك المهني",
              },
              {
                number: "٠٣",
                title: "حمّل وشارك",
                desc: "احصل على سيرتك بصيغة PDF جاهزة للإرسال فوراً",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-6xl lg:text-7xl font-normal text-[#c9a96e] mb-6"
                  style={{ fontFamily: "'Amiri', serif" }}
                >
                  {item.number}
                </div>
                <h3
                  className="text-2xl mb-4 text-[#fafafa]"
                  style={{ fontFamily: "'Amiri', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#a8a8a8] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-32 px-8 lg:px-16 border-t border-[#2a2a2a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl lg:text-6xl font-normal mb-8"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            جاهز لبناء <span className="italic text-[#c9a96e]">سيرتك؟</span>
          </h2>
          <p className="text-[#a8a8a8] text-lg mb-12 max-w-xl mx-auto">
            ابدأ الآن مجاناً بدون تسجيل. سيرتك الذاتية الاحترافية على بعد خطوات
            قليلة.
          </p>
          <button
            onClick={handleGetStarted}
            className="group relative inline-flex items-center gap-4 bg-[#c9a96e] text-[#1a1a1a] px-12 py-6 text-sm tracking-[0.15em] uppercase overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1a1a1a]"
          >
            <span className="absolute inset-0 bg-[#fafafa] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10">ابدأ الآن مجاناً</span>
            <ArrowLeft className="relative z-10 w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </button>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-16 px-8 lg:px-16 bg-[#111] border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-2">
              <span
                className="text-2xl tracking-[0.15em] font-light uppercase block mb-4"
                style={{ fontFamily: "'Amiri', serif" }}
              >
                سيرة
              </span>
              <p className="text-[#9a9a9a] text-sm leading-relaxed max-w-sm">
                منشئ سيرة ذاتية مجاني ومفتوح المصدر، مصمم خصيصاً للباحثين عن عمل
                في الوطن العربي.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm tracking-[0.1em] uppercase text-[#a8a8a8] mb-4">
                روابط
              </h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={handleGetStarted}
                    className="text-[#9a9a9a] hover:text-[#c9a96e] transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] rounded px-1"
                  >
                    ابدأ الآن
                  </button>
                </li>
                <li>
                  <a
                    href="https://github.com/mazenS1/ResumeArab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9a9a9a] hover:text-[#c9a96e] transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] rounded px-1"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-sm tracking-[0.1em] uppercase text-[#a8a8a8] mb-4">
                تواصل
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/mazenS1/ResumeArab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#333] flex items-center justify-center text-[#9a9a9a] hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-[#2a2a2a] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[#8a8a8a] text-xs">
              © {new Date().getFullYear()} سيرة جميع الحقوق محفوظة.
            </p>
            <p className="text-[#8a8a8a] text-xs flex items-center gap-1">
              صُنع بـ <Heart className="w-3 h-3 text-[#c9a96e]" /> للباحثين عن
              عمل
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
