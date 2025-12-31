// Internationalization support for Arabic and English

export type Language = "en" | "ar";

export const translations = {
  en: {
    // App
    appName: "Resume Builder",
    tagline: "Create your professional resume",
    atsReady: "ATS Ready Template",
    
    // Navigation & Actions
    edit: "Edit",
    preview: "Preview",
    download: "Download PDF",
    reset: "Reset",
    save: "Save",
    cancel: "Cancel",
    add: "Add",
    delete: "Delete",
    close: "Close",
    
    // Welcome Screen
    welcomeTitle: "Build Your Professional Resume",
    welcomeSubtitle: "Create an ATS-friendly resume in minutes",
    startFresh: "Start Fresh",
    loadSample: "Load Sample",
    chooseLanguage: "Choose Your Language",
    continueWithEnglish: "Continue in English",
    continueWithArabic: "المتابعة بالعربية",
    
    // Basic Info
    basicInfo: "Basic Information",
    basicInfoHint: "Keep this section crisp for ATS parsing.",
    fullName: "Full Name",
    headline: "Headline",
    headlinePlaceholder: "e.g., Software Engineer",
    email: "Email",
    phone: "Phone",
    location: "Location",
    primaryLink: "Primary Link",
    
    // Summary
    summary: "Summary",
    summaryHint: "2-3 sentences summarizing your impact.",
    
    // Sections
    sections: "Sections",
    sectionsHint: "Keep bullets metric-driven and impact focused.",
    addSection: "Add Section",
    sectionType: "Section Type",
    sectionTitle: "Section Title",
    sectionTitlePlaceholder: "e.g., Publications, Awards",
    entries: "entries",
    noEntries: "No entries yet",
    
    // Entry Fields
    title: "Title",
    subtitle: "Subtitle",
    subtitlePlaceholder: "Role / Degree",
    organization: "Organization",
    organizationPlaceholder: "Company / School",
    startDate: "Start",
    endDate: "End",
    entrySummary: "Description",
    bullets: "Key Points",
    bulletsHint: "One achievement per line",
    addEntry: "Add Entry",
    deleteEntry: "Delete Entry",
    addBullet: "Add Point",
    bulletPlaceholder: "Describe your achievement...",
    
    // Links Management
    links: "Links",
    linkLabel: "Label",
    linkLabelPlaceholder: "e.g., GitHub, LinkedIn",
    linkUrl: "URL",
    linkUrlPlaceholder: "https://...",
    addLink: "Add Link",
    removeLink: "Remove",
    
    // Education Section Fields
    schoolName: "School Name",
    schoolPlaceholder: "e.g., Stanford University",
    degree: "Degree",
    degreePlaceholder: "e.g., B.S. in Computer Science",
    
    // Work Experience Section Fields
    jobTitle: "Job Title",
    jobTitlePlaceholder: "e.g., Software Engineer",
    companyName: "Company",
    companyPlaceholder: "e.g., Google",
    jobLocation: "Location",
    jobLocationPlaceholder: "e.g., San Francisco, CA",
    achievements: "Achievements",
    achievementsHint: "One achievement per line (start with action verb)",
    
    // Skills Section Fields
    skillCategory: "Category",
    skillCategoryPlaceholder: "e.g., Programming Languages",
    skillsList: "Skills",
    skillsPlaceholder: "e.g., Python, JavaScript, React",
    
    // Projects Section Fields
    projectName: "Project Name",
    projectPlaceholder: "e.g., E-commerce Platform",
    projectUrl: "Project URL",
    projectUrlPlaceholder: "https://github.com/...",
    projectDescription: "Description",
    techStack: "Tech Stack",
    techStackPlaceholder: "e.g., React, Node.js, PostgreSQL",
    
    // Certifications Section Fields
    certName: "Certificate Name",
    certPlaceholder: "e.g., AWS Solutions Architect",
    issuingOrg: "Issuing Organization",
    issuingOrgPlaceholder: "e.g., Amazon Web Services",
    issueDate: "Issue Date",
    
    // Section Types
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certifications",
    languages: "Languages",
    custom: "Custom",
    
    // Status Messages
    allChangesSaved: "All changes saved locally",
    saving: "Saving...",
    localMode: "Local Mode",
    offlineReady: "Works offline",
    
    // Theme
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    
    // Language Toggle
    switchToArabic: "العربية",
    switchToEnglish: "English",
    
    // Confirmations
    confirmDelete: "Are you sure you want to delete this?",
    confirmReset: "This will reset to sample data. Continue?",
    
    // PDF
    downloadingPdf: "Generating PDF...",
    pdfReady: "PDF Ready",
    
    // Empty States
    getStarted: "Let's get started!",
    tapToEdit: "Tap on any section to edit",
  },
  ar: {
    // App
    appName: "منشئ السيرة الذاتية",
    tagline: "أنشئ سيرتك الذاتية المهنية",
    atsReady: "قالب متوافق مع ATS",
    
    // Navigation & Actions
    edit: "تعديل",
    preview: "معاينة",
    download: "تحميل PDF",
    reset: "إعادة تعيين",
    save: "حفظ",
    cancel: "إلغاء",
    add: "إضافة",
    delete: "حذف",
    close: "إغلاق",
    
    // Welcome Screen
    welcomeTitle: "أنشئ سيرتك الذاتية المهنية",
    welcomeSubtitle: "أنشئ سيرة ذاتية متوافقة مع أنظمة التوظيف في دقائق",
    startFresh: "ابدأ من الصفر",
    loadSample: "تحميل نموذج",
    chooseLanguage: "اختر لغتك",
    continueWithEnglish: "Continue in English",
    continueWithArabic: "المتابعة بالعربية",
    
    // Basic Info
    basicInfo: "المعلومات الأساسية",
    basicInfoHint: "اجعل هذا القسم مختصراً لتوافق أفضل مع أنظمة التوظيف.",
    fullName: "الاسم الكامل",
    headline: "العنوان الوظيفي",
    headlinePlaceholder: "مثال: مهندس برمجيات",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    location: "الموقع",
    primaryLink: "الرابط الرئيسي",
    
    // Summary
    summary: "الملخص",
    summaryHint: "جملتان أو ثلاث تلخص إنجازاتك.",
    
    // Sections
    sections: "الأقسام",
    sectionsHint: "ركز على الإنجازات القابلة للقياس.",
    addSection: "إضافة قسم",
    sectionType: "نوع القسم",
    sectionTitle: "عنوان القسم",
    sectionTitlePlaceholder: "مثال: المنشورات، الجوائز",
    entries: "عناصر",
    noEntries: "لا توجد عناصر بعد",
    
    // Entry Fields
    title: "العنوان",
    subtitle: "العنوان الفرعي",
    subtitlePlaceholder: "المنصب / الدرجة العلمية",
    organization: "المنظمة",
    organizationPlaceholder: "الشركة / الجامعة",
    startDate: "البدء",
    endDate: "الانتهاء",
    entrySummary: "الوصف",
    bullets: "النقاط الرئيسية",
    bulletsHint: "إنجاز واحد في كل سطر",
    addEntry: "إضافة عنصر",
    deleteEntry: "حذف العنصر",
    addBullet: "إضافة نقطة",
    bulletPlaceholder: "صف إنجازك...",
    
    // Links Management
    links: "الروابط",
    linkLabel: "العنوان",
    linkLabelPlaceholder: "مثال: GitHub, LinkedIn",
    linkUrl: "الرابط",
    linkUrlPlaceholder: "https://...",
    addLink: "إضافة رابط",
    removeLink: "حذف",
    
    // Education Section Fields
    schoolName: "اسم الجامعة / المدرسة",
    schoolPlaceholder: "مثال: جامعة الملك سعود",
    degree: "الدرجة العلمية",
    degreePlaceholder: "مثال: بكالوريوس علوم حاسب",
    
    // Work Experience Section Fields
    jobTitle: "المسمى الوظيفي",
    jobTitlePlaceholder: "مثال: مهندس برمجيات",
    companyName: "الشركة",
    companyPlaceholder: "مثال: أرامكو",
    jobLocation: "الموقع",
    jobLocationPlaceholder: "مثال: الرياض",
    achievements: "الإنجازات",
    achievementsHint: "إنجاز واحد في كل سطر (ابدأ بفعل)",
    
    // Skills Section Fields
    skillCategory: "الفئة",
    skillCategoryPlaceholder: "مثال: لغات البرمجة",
    skillsList: "المهارات",
    skillsPlaceholder: "مثال: Python, JavaScript, React",
    
    // Projects Section Fields
    projectName: "اسم المشروع",
    projectPlaceholder: "مثال: منصة تجارة إلكترونية",
    projectUrl: "رابط المشروع",
    projectUrlPlaceholder: "https://github.com/...",
    projectDescription: "الوصف",
    techStack: "التقنيات المستخدمة",
    techStackPlaceholder: "مثال: React, Node.js, PostgreSQL",
    
    // Certifications Section Fields
    certName: "اسم الشهادة",
    certPlaceholder: "مثال: AWS Solutions Architect",
    issuingOrg: "الجهة المانحة",
    issuingOrgPlaceholder: "مثال: Amazon Web Services",
    issueDate: "تاريخ الإصدار",
    
    // Section Types
    experience: "الخبرات",
    education: "التعليم",
    skills: "المهارات",
    projects: "المشاريع",
    certifications: "الشهادات",
    languages: "اللغات",
    custom: "مخصص",
    
    // Status Messages
    allChangesSaved: "تم حفظ جميع التغييرات محلياً",
    saving: "جارٍ الحفظ...",
    localMode: "الوضع المحلي",
    offlineReady: "يعمل بدون إنترنت",
    
    // Theme
    lightMode: "الوضع الفاتح",
    darkMode: "الوضع الداكن",
    
    // Language Toggle
    switchToArabic: "العربية",
    switchToEnglish: "English",
    
    // Confirmations
    confirmDelete: "هل أنت متأكد من الحذف؟",
    confirmReset: "سيتم إعادة التعيين للبيانات النموذجية. هل تريد المتابعة؟",
    
    // PDF
    downloadingPdf: "جارٍ إنشاء ملف PDF...",
    pdfReady: "ملف PDF جاهز",
    
    // Empty States
    getStarted: "هيا نبدأ!",
    tapToEdit: "اضغط على أي قسم للتعديل",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export const useTranslation = (language: Language) => {
  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };
  
  return { t, language, isRTL: language === "ar" };
};

// Helper to get translation outside of hooks
export const getTranslation = (language: Language, key: TranslationKey): string => {
  return translations[language][key] || translations.en[key] || key;
};
