import type { Resume } from "@resume/shared";

export const sampleResumeAr: Resume = {
  id: "resume-sample-ar",
  userId: "user-sample",
  title: "السيرة الذاتية",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  basicInfo: {
    name: "سارة أحمد",
    email: "sara.ahmed@email.com",
    phone: "+966 55 123 4567",
    location: "الرياض، المملكة العربية السعودية",
    headline: "مهندسة برمجيات أولى",
    links: [
      { label: "LinkedIn", url: "linkedin.com/in/saraahmed" },
      { label: "GitHub", url: "github.com/sara-dev" }
    ]
  },
  metadata: {
    locale: "ar-SA",
    theme: "light",
    fontFamily: "IBM Plex Sans Arabic",
    lineHeight: 1.4,
    accentColor: "#0F172A",
    primaryColor: "#0F172A"
  },
  sections: [
    {
      id: "section-summary-ar",
      resumeId: "resume-sample-ar",
      type: "SUMMARY",
      titleOverride: "الملخص",
      position: 0,
      collapsed: false,
      entries: [
        {
          id: "summary-entry-ar",
          sectionId: "section-summary-ar",
          position: 0,
          title: "الملخص",
          bullets: [],
          subtitle: null,
          companyOrOrg: null,
          location: null,
          startDate: null,
          endDate: null,
          isCurrent: false,
          description:
            "مهندسة برمجيات ذات خبرة تزيد عن 5 سنوات في بناء تطبيقات ويب قابلة للتوسع وقيادة فرق متعددة التخصصات. شغوفة بالكود النظيف وتجربة المستخدم وتوجيه المطورين المبتدئين. سجل حافل في تسليم المشاريع في الوقت المحدد مع الحفاظ على معايير جودة عالية للكود.",
          projectUrl: null,
          techStack: []
        }
      ]
    },
    {
      id: "section-experience-ar",
      resumeId: "resume-sample-ar",
      type: "WORK_EXPERIENCE",
      titleOverride: "الخبرة العملية",
      position: 1,
      collapsed: false,
      entries: [
        {
          id: "exp-entry-1-ar",
          sectionId: "section-experience-ar",
          position: 0,
          title: "مهندسة برمجيات أولى",
          subtitle: null,
          companyOrOrg: "شركة التقنية المتقدمة",
          location: "الرياض",
          startDate: "2022-03-01",
          endDate: null,
          isCurrent: true,
          description: null,
          projectUrl: null,
          techStack: [],
          bullets: [
            {
              id: "bullet-exp-1-1-ar",
              entryId: "exp-entry-1-ar",
              position: 0,
              text: "قيادة فريق من 5 مهندسين لإعادة بناء لوحة تحكم العملاء، مما أدى إلى تحسين سرعة التحميل بنسبة 40٪"
            },
            {
              id: "bullet-exp-1-2-ar",
              entryId: "exp-entry-1-ar",
              position: 1,
              text: "تصميم بنية خدمات مصغرة تتعامل مع أكثر من 10 ملايين طلب يومي بنسبة تشغيل 99.9٪"
            },
            {
              id: "bullet-exp-1-3-ar",
              entryId: "exp-entry-1-ar",
              position: 2,
              text: "توجيه 3 مطورين مبتدئين من خلال مراجعة الكود وجلسات البرمجة الثنائية"
            }
          ]
        },
        {
          id: "exp-entry-2-ar",
          sectionId: "section-experience-ar",
          position: 1,
          title: "مهندسة برمجيات",
          subtitle: null,
          companyOrOrg: "شركة الابتكار",
          location: "عن بُعد",
          startDate: "2020-01-01",
          endDate: "2022-02-01",
          isCurrent: false,
          description: null,
          projectUrl: null,
          techStack: [],
          bullets: [
            {
              id: "bullet-exp-2-1-ar",
              entryId: "exp-entry-2-ar",
              position: 0,
              text: "تطوير واجهات برمجة التطبيقات RESTful باستخدام Node.js و Express لخدمة أكثر من 50 ألف مستخدم نشط"
            },
            {
              id: "bullet-exp-2-2-ar",
              entryId: "exp-entry-2-ar",
              position: 1,
              text: "تنفيذ خطوط CI/CD مما أدى إلى تقليل وقت النشر بنسبة 60٪"
            },
            {
              id: "bullet-exp-2-3-ar",
              entryId: "exp-entry-2-ar",
              position: 2,
              text: "التعاون مع فريق المنتج لإطلاق أكثر من 15 ميزة باستخدام منهجيات Agile"
            }
          ]
        }
      ]
    },
    {
      id: "section-education-ar",
      resumeId: "resume-sample-ar",
      type: "EDUCATION",
      titleOverride: "التعليم",
      position: 2,
      collapsed: false,
      entries: [
        {
          id: "edu-entry-1-ar",
          sectionId: "section-education-ar",
          position: 0,
          title: "جامعة الملك سعود",
          subtitle: "بكالوريوس في علوم الحاسب",
          companyOrOrg: null,
          location: "الرياض",
          startDate: "2015-09-01",
          endDate: "2019-06-01",
          isCurrent: false,
          description: null,
          projectUrl: null,
          techStack: [],
          bullets: [
            {
              id: "bullet-edu-1-ar",
              entryId: "edu-entry-1-ar",
              position: 0,
              text: "المعدل التراكمي: 4.5/5.0، قائمة الشرف"
            },
            {
              id: "bullet-edu-2-ar",
              entryId: "edu-entry-1-ar",
              position: 1,
              text: "المقررات ذات الصلة: هياكل البيانات، الخوارزميات، أنظمة قواعد البيانات، التعلم الآلي"
            }
          ]
        }
      ]
    },
    {
      id: "section-skills-ar",
      resumeId: "resume-sample-ar",
      type: "SKILL",
      titleOverride: "المهارات التقنية",
      position: 3,
      collapsed: false,
      entries: [
        {
          id: "skills-entry-1-ar",
          sectionId: "section-skills-ar",
          position: 0,
          title: "لغات البرمجة",
          subtitle: null,
          companyOrOrg: null,
          location: null,
          startDate: null,
          endDate: null,
          isCurrent: false,
          description: "JavaScript، TypeScript، Python، Go، SQL",
          projectUrl: null,
          techStack: [],
          bullets: []
        },
        {
          id: "skills-entry-2-ar",
          sectionId: "section-skills-ar",
          position: 1,
          title: "الأطر والأدوات",
          subtitle: null,
          companyOrOrg: null,
          location: null,
          startDate: null,
          endDate: null,
          isCurrent: false,
          description: "React، Node.js، Next.js، PostgreSQL، Docker، AWS، Git",
          projectUrl: null,
          techStack: [],
          bullets: []
        }
      ]
    },
    {
      id: "section-projects-ar",
      resumeId: "resume-sample-ar",
      type: "PROJECT",
      titleOverride: "المشاريع",
      position: 4,
      collapsed: false,
      entries: [
        {
          id: "project-entry-1-ar",
          sectionId: "section-projects-ar",
          position: 0,
          title: "مدير المهام مفتوح المصدر",
          subtitle: null,
          companyOrOrg: null,
          location: null,
          startDate: "2023-01-01",
          endDate: "2023-06-01",
          isCurrent: false,
          description: null,
          projectUrl: "github.com/sara-dev/taskmaster",
          techStack: ["React", "Node.js", "MongoDB"],
          bullets: [
            {
              id: "bullet-proj-1-1-ar",
              entryId: "project-entry-1-ar",
              position: 0,
              text: "بناء تطبيق كامل لإدارة المهام حصل على أكثر من 500 نجمة على GitHub"
            },
            {
              id: "bullet-proj-1-2-ar",
              entryId: "project-entry-1-ar",
              position: 1,
              text: "تنفيذ ميزات التعاون في الوقت الفعلي باستخدام WebSockets"
            }
          ]
        }
      ]
    }
  ]
};
