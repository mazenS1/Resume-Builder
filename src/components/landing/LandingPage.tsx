import { useEffect, useRef } from "react";
import {
  FileText,
  Globe,
  Sparkles,
  Shield,
  WifiOff,
  Lock,
  Zap,
  GripVertical,
  Eye,
  CheckCircle2,
  ArrowLeft,
  Github,
  FileDown,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppModeStore } from "@/store/appModeStore";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export const LandingPage = () => {
  const setHasSeenLanding = useAppModeStore((state) => state.setHasSeenLanding);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleGetStarted = () => {
    setHasSeenLanding(true);
  };

  const features = [
    {
      icon: Globe,
      titleAr: "عربي وإنجليزي",
      descAr: "دعم كامل للعربية مع اتجاه RTL والإنجليزية مع LTR",
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      icon: Sparkles,
      titleAr: "متوافق مع ATS",
      descAr: "تصميم نظيف يتجاوز أنظمة فحص السير الذاتية",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: WifiOff,
      titleAr: "يعمل بدون نت",
      descAr: "كل شي محفوظ على جهازك، ما يحتاج اتصال",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Lock,
      titleAr: "خصوصية تامة",
      descAr: "بياناتك ما تغادر جهازك، أبداً",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: FileDown,
      titleAr: "تصدير PDF و Word",
      descAr: "صدّر سيرتك بصيغة PDF أو DOCX بضغطة زر",
      gradient: "from-amber-400 to-yellow-600",
    },
    {
      icon: GripVertical,
      titleAr: "سحب وإفلات",
      descAr: "رتّب أقسام سيرتك بسهولة بالسحب والإفلات",
      gradient: "from-yellow-400 to-amber-600",
    },
    {
      icon: Palette,
      titleAr: "تخصيص كامل",
      descAr: "غيّر الألوان والخطوط حسب ذوقك",
      gradient: "from-orange-400 to-amber-500",
    },
    {
      icon: Zap,
      titleAr: "حفظ تلقائي",
      descAr: "تغييراتك تتحفظ تلقائياً كل ثانية",
      gradient: "from-yellow-500 to-amber-500",
    },
  ];

  const steps = [
    {
      numberAr: "١",
      titleAr: "اختر اللغة",
      descAr: "حدد إذا تبي سيرتك بالعربي أو الإنجليزي",
      gradient: "from-amber-400 to-yellow-500",
    },
    {
      numberAr: "٢",
      titleAr: "عبّي بياناتك",
      descAr: "أضف خبراتك ومهاراتك وتعليمك",
      gradient: "from-yellow-500 to-amber-600",
    },
    {
      numberAr: "٣",
      titleAr: "صدّر وقدّم",
      descAr: "حمّل سيرتك PDF أو Word وقدّم على الوظائف",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div
      className="min-h-screen bg-background dark:bg-[#0a0a0f] overflow-hidden"
      dir="rtl"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-transparent rounded-full blur-3xl animate-float opacity-60 dark:opacity-40" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-yellow-500/20 via-orange-500/10 to-transparent rounded-full blur-3xl animate-float-delayed opacity-50 dark:opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/10 via-transparent to-amber-500/10 rounded-full blur-3xl animate-pulse-slow opacity-40 dark:opacity-20" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 dark:bg-[#0a0a0f]/60 backdrop-blur-xl border-b border-border/50 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow duration-300">
                <FileText className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <a
                href="https://github.com/mazenS1/Resume-FrontEnd"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-muted dark:hover:bg-white/5 transition-all duration-300 hover:scale-105"
              >
                <Github className="w-5 h-5" />
              </a>
              <Button
                onClick={handleGetStarted}
                size="sm"
                className="hidden sm:flex bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-500/90 hover:to-yellow-600/90 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105"
              >
                ابدأ الآن
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 dark:from-amber-500/20 dark:to-yellow-500/20 border border-amber-500/20 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 text-sm font-medium mb-6 animate-fade-in-down backdrop-blur-sm">
              <Sparkles className="w-4 h-4 animate-pulse" />
              مجاني ومفتوح المصدر
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-relaxed mb-6 animate-fade-in-up animation-delay-100">
              <span className="text-foreground dark:text-white block mb-4">
                سيرة ذاتية
              </span>
              <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent animate-gradient">
                احترافية
              </span>
              <span className="text-foreground dark:text-white">في دقايق</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              منشئ سيرة ذاتية مجاني يدعم العربية والإنجليزية، يعمل بدون نت،
              ويحافظ على خصوصية بياناتك بالكامل
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-300">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-500/90 hover:to-yellow-600/90 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 group"
              >
                ابدأ الآن مجاناً
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              </Button>
              <a
                href="https://github.com/mazenS1/Resume-FrontEnd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 text-lg border-2 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <Github className="w-5 h-5 ml-2" />
                  شوف الكود
                </Button>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground dark:text-gray-500 animate-fade-in-up animation-delay-400">
              {["بدون تسجيل", "بدون بطاقة ائتمان", "مجاني للأبد"].map(
                (text, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 hover:text-foreground dark:hover:text-gray-300 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {text}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Hero Preview */}
          <div className="mt-16 relative animate-fade-in-up animation-delay-500">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 rounded-3xl blur-2xl opacity-60 dark:opacity-40 animate-pulse-slow" />

            <div className="relative bg-gradient-to-b from-white/50 to-white/30 dark:from-white/5 dark:to-white/[0.02] rounded-2xl p-4 sm:p-8 border border-border/50 dark:border-white/10 backdrop-blur-sm">
              <div className="bg-white dark:bg-[#12121a] rounded-xl shadow-2xl overflow-hidden border border-border dark:border-white/10">
                {/* Browser Chrome */}
                <div className="bg-gray-50 dark:bg-white/5 px-4 py-3 border-b border-border dark:border-white/10 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors cursor-pointer" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white dark:bg-white/10 rounded-md px-3 py-1.5 text-xs text-muted-foreground text-center border dark:border-white/10">
                      resumearab.com
                    </div>
                  </div>
                </div>
                {/* App Preview */}
                <div className="p-6 sm:p-8 grid md:grid-cols-2 gap-6">
                  {/* Editor Side */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      تحرير السيرة
                    </div>
                    <div className="space-y-3">
                      <div className="h-10 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-white/10 dark:to-white/5 rounded-lg animate-shimmer" />
                      <div className="h-10 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-white/10 dark:to-white/5 rounded-lg animate-shimmer animation-delay-100" />
                      <div className="h-24 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-white/10 dark:to-white/5 rounded-lg animate-shimmer animation-delay-200" />
                      <div className="h-10 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-white/10 dark:to-white/5 rounded-lg w-3/4 animate-shimmer animation-delay-300" />
                    </div>
                  </div>
                  {/* Preview Side */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      المعاينة
                    </div>
                    <div className="bg-white dark:bg-[#0a0a0f] border border-border dark:border-white/10 rounded-lg p-4 shadow-sm">
                      <div className="space-y-3 text-right">
                        <div className="h-6 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded w-1/2" />
                        <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-1/2" />
                        <div className="border-t border-border dark:border-white/10 my-3" />
                        <div className="h-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded w-1/3" />
                        <div className="h-2 bg-gray-100 dark:bg-white/5 rounded" />
                        <div className="h-2 bg-gray-100 dark:bg-white/5 rounded w-5/6" />
                        <div className="h-2 bg-gray-100 dark:bg-white/5 rounded w-4/5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/50 dark:via-white/[0.02] to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-4">
              كل اللي تحتاجه في{" "}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                مكان واحد
              </span>
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto">
              ميزات قوية تساعدك تسوي سيرة ذاتية تبرز بين المتقدمين
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 translate-y-8 group"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="relative h-full bg-white/50 dark:bg-white/[0.03] rounded-2xl p-6 border border-border/50 dark:border-white/10 hover:border-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-primary/10 overflow-hidden">
                  {/* Gradient Border on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
                  />
                  <div
                    className={`absolute inset-[1px] bg-white dark:bg-[#12121a] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground dark:text-white mb-2 group-hover:text-primary transition-colors">
                      {feature.titleAr}
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      {feature.descAr}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-4">
              ثلاث خطوات{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                بس
              </span>
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-400">
              سيرتك الذاتية جاهزة في أقل من 10 دقايق
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 opacity-30" />

            {steps.map((step, index) => (
              <div
                key={index}
                className="text-center relative animate-on-scroll opacity-0 translate-y-8"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center mx-auto mb-6 text-4xl font-bold text-white shadow-2xl shadow-primary/20 group hover:scale-110 transition-transform duration-300`}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                  <span className="relative">{step.numberAr}</span>
                  {/* Ping Animation */}
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} animate-ping opacity-20`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground dark:text-white mb-3">
                  {step.titleAr}
                </h3>
                <p className="text-muted-foreground dark:text-gray-400">
                  {step.descAr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 dark:from-emerald-500/10 dark:via-teal-500/5 dark:to-cyan-500/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-12 animate-on-scroll opacity-0 translate-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6 backdrop-blur-sm">
              <Shield className="w-4 h-4 animate-pulse" />
              خصوصيتك أولويتنا
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-4">
              بياناتك{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                ملكك وحدك
              </span>
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto">
              ما نجمع أي بيانات، ما نرسل شي لأي سيرفر، وما نشارك معلوماتك مع أحد
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Lock,
                title: "تخزين محلي",
                desc: "كل بياناتك محفوظة في متصفحك فقط",
              },
              {
                icon: WifiOff,
                title: "بدون سيرفر",
                desc: "التطبيق يشتغل كامل بدون أي اتصال بالإنترنت",
              },
              {
                icon: Shield,
                title: "مفتوح المصدر",
                desc: "الكود متاح للجميع، شوف بنفسك كيف يشتغل",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 translate-y-8 group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 dark:border-emerald-500/10 text-center hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/25 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bilingual Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0 translate-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-4">
                عربي أو إنجليزي؟
                <br />
                <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  كلاهما!
                </span>
              </h2>
              <p className="text-lg text-muted-foreground dark:text-gray-400 mb-6">
                سواء تبي سيرتك بالعربي للوظائف المحلية أو بالإنجليزي للشركات
                العالمية، التطبيق يدعم اللغتين بشكل كامل.
              </p>
              <ul className="space-y-4">
                {[
                  "دعم كامل للعربية مع اتجاه RTL",
                  "خطوط عربية وإنجليزية احترافية",
                  "نماذج جاهزة باللغتين",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-muted-foreground dark:text-gray-400 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="group-hover:text-foreground dark:group-hover:text-white transition-colors">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative animate-on-scroll opacity-0 translate-y-8 animation-delay-200">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-3xl blur-2xl opacity-60 dark:opacity-40" />

              <div className="relative bg-gradient-to-br from-white/50 to-white/30 dark:from-white/5 dark:to-white/[0.02] rounded-2xl p-6 border border-border/50 dark:border-white/10 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="bg-white dark:bg-[#12121a] rounded-xl p-4 border border-border dark:border-white/10 text-right shadow-lg hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300"
                    dir="rtl"
                  >
                    <div className="text-xs text-muted-foreground mb-3 font-medium">
                      العربية
                    </div>
                    <div className="h-5 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded mb-3 w-3/4" />
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 dark:bg-white/10 rounded" />
                      <div className="h-2 bg-gray-200 dark:bg-white/10 rounded w-5/6" />
                      <div className="h-2 bg-gray-200 dark:bg-white/10 rounded w-4/6" />
                    </div>
                  </div>
                  <div
                    className="bg-white dark:bg-[#12121a] rounded-xl p-4 border border-border dark:border-white/10 text-left shadow-lg hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300"
                    dir="ltr"
                  >
                    <div className="text-xs text-muted-foreground mb-3 font-medium">
                      English
                    </div>
                    <div className="h-5 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded mb-3 w-3/4" />
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 dark:bg-white/10 rounded" />
                      <div className="h-2 bg-gray-200 dark:bg-white/10 rounded w-5/6" />
                      <div className="h-2 bg-gray-200 dark:bg-white/10 rounded w-4/6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-yellow-600 to-orange-600" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-delayed" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="animate-on-scroll opacity-0 translate-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              جاهز تبني سيرتك الذاتية؟
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              ابدأ الآن مجاناً وبدون تسجيل. سيرتك الذاتية الاحترافية على بعد
              دقايق قليلة.
            </p>
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="h-14 px-10 text-lg font-semibold bg-white text-amber-600 hover:bg-white/90 shadow-2xl shadow-black/20 hover:scale-105 transition-all duration-300 group"
            >
              ابدأ الآن
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50 dark:border-white/5 bg-background/50 dark:bg-[#0a0a0f]/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg block">ResumeArab</span>
                <span className="text-sm text-muted-foreground dark:text-gray-500">
                  منشئ السيرة الذاتية المجاني
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/mazenS1/Resume-FrontEnd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground dark:text-gray-500 hover:text-foreground dark:hover:text-white transition-colors group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                GitHub
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 dark:border-white/5 text-center">
            <p className="text-sm text-muted-foreground dark:text-gray-500">
              صُنع بـ <span className="text-red-500 animate-pulse">❤️</span>{" "}
              للباحثين عن عمل في الوطن العربي
            </p>
            <p className="text-xs text-muted-foreground dark:text-gray-600 mt-2">
              MIT License • مفتوح المصدر
            </p>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2s infinite linear;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-500 { animation-delay: 500ms; }

        .animate-on-scroll {
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-on-scroll.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};
