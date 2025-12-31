import type { Resume } from "@resume/shared";

export const sampleResume: Resume = {
  id: "resume-sample-en",
  userId: "user-sample",
  title: "Professional Resume",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  basicInfo: {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    headline: "Senior Software Engineer",
    links: [
      { label: "LinkedIn", url: "linkedin.com/in/sarahjohnson" },
      { label: "GitHub", url: "github.com/sarahj-dev" }
    ]
  },
  metadata: {
    locale: "en-US",
    theme: "light",
    fontFamily: "Inter",
    lineHeight: 1.4,
    accentColor: "#0F172A",
    primaryColor: "#0F172A"
  },
  sections: [
    {
      id: "section-summary",
      resumeId: "resume-sample-en",
      type: "SUMMARY",
      titleOverride: "Summary",
      position: 0,
      collapsed: false,
      entries: [
        {
          id: "summary-entry",
          sectionId: "section-summary",
          position: 0,
          title: "Summary",
          bullets: [],
          subtitle: null,
          companyOrOrg: null,
          location: null,
          startDate: null,
          endDate: null,
          isCurrent: false,
          description:
            "Results-driven software engineer with 5+ years of experience building scalable web applications and leading cross-functional teams. Passionate about clean code, user experience, and mentoring junior developers. Proven track record of delivering projects on time while maintaining high code quality standards.",
          projectUrl: null,
          techStack: []
        }
      ]
    },
    {
      id: "section-experience",
      resumeId: "resume-sample-en",
      type: "WORK_EXPERIENCE",
      titleOverride: "Work Experience",
      position: 1,
      collapsed: false,
      entries: [
        {
          id: "exp-entry-1",
          sectionId: "section-experience",
          position: 0,
          title: "Senior Software Engineer",
          subtitle: null,
          companyOrOrg: "TechCorp Inc.",
          location: "San Francisco, CA",
          startDate: "2022-03-01",
          endDate: null,
          isCurrent: true,
          description: null,
          projectUrl: null,
          techStack: [],
          bullets: [
            {
              id: "bullet-exp-1-1",
              entryId: "exp-entry-1",
              position: 0,
              text: "Led a team of 5 engineers to rebuild the customer dashboard, resulting in 40% faster load times"
            },
            {
              id: "bullet-exp-1-2",
              entryId: "exp-entry-1",
              position: 1,
              text: "Architected microservices infrastructure handling 10M+ daily requests with 99.9% uptime"
            },
            {
              id: "bullet-exp-1-3",
              entryId: "exp-entry-1",
              position: 2,
              text: "Mentored 3 junior developers, conducting code reviews and pair programming sessions"
            }
          ]
        },
        {
          id: "exp-entry-2",
          sectionId: "section-experience",
          position: 1,
          title: "Software Engineer",
          subtitle: null,
          companyOrOrg: "StartupXYZ",
          location: "Remote",
          startDate: "2020-01-01",
          endDate: "2022-02-01",
          isCurrent: false,
          description: null,
          projectUrl: null,
          techStack: [],
          bullets: [
            {
              id: "bullet-exp-2-1",
              entryId: "exp-entry-2",
              position: 0,
              text: "Developed RESTful APIs using Node.js and Express, serving 50K+ active users"
            },
            {
              id: "bullet-exp-2-2",
              entryId: "exp-entry-2",
              position: 1,
              text: "Implemented CI/CD pipelines reducing deployment time by 60%"
            },
            {
              id: "bullet-exp-2-3",
              entryId: "exp-entry-2",
              position: 2,
              text: "Collaborated with product team to ship 15+ features using agile methodologies"
            }
          ]
        }
      ]
    },
    {
      id: "section-education",
      resumeId: "resume-sample-en",
      type: "EDUCATION",
      titleOverride: "Education",
      position: 2,
      collapsed: false,
      entries: [
        {
          id: "edu-entry-1",
          sectionId: "section-education",
          position: 0,
          title: "Stanford University",
          subtitle: "B.S. in Computer Science",
          companyOrOrg: null,
          location: "Stanford, CA",
          startDate: "2015-09-01",
          endDate: "2019-06-01",
          isCurrent: false,
          description: null,
          projectUrl: null,
          techStack: [],
          bullets: [
            {
              id: "bullet-edu-1",
              entryId: "edu-entry-1",
              position: 0,
              text: "GPA: 3.8/4.0, Dean's List"
            },
            {
              id: "bullet-edu-2",
              entryId: "edu-entry-1",
              position: 1,
              text: "Relevant coursework: Data Structures, Algorithms, Database Systems, Machine Learning"
            }
          ]
        }
      ]
    },
    {
      id: "section-skills",
      resumeId: "resume-sample-en",
      type: "SKILL",
      titleOverride: "Technical Skills",
      position: 3,
      collapsed: false,
      entries: [
        {
          id: "skills-entry-1",
          sectionId: "section-skills",
          position: 0,
          title: "Languages",
          subtitle: null,
          companyOrOrg: null,
          location: null,
          startDate: null,
          endDate: null,
          isCurrent: false,
          description: "JavaScript, TypeScript, Python, Go, SQL",
          projectUrl: null,
          techStack: [],
          bullets: []
        },
        {
          id: "skills-entry-2",
          sectionId: "section-skills",
          position: 1,
          title: "Frameworks & Tools",
          subtitle: null,
          companyOrOrg: null,
          location: null,
          startDate: null,
          endDate: null,
          isCurrent: false,
          description: "React, Node.js, Next.js, PostgreSQL, Docker, AWS, Git",
          projectUrl: null,
          techStack: [],
          bullets: []
        }
      ]
    },
    {
      id: "section-projects",
      resumeId: "resume-sample-en",
      type: "PROJECT",
      titleOverride: "Projects",
      position: 4,
      collapsed: false,
      entries: [
        {
          id: "project-entry-1",
          sectionId: "section-projects",
          position: 0,
          title: "Open Source Task Manager",
          subtitle: null,
          companyOrOrg: null,
          location: null,
          startDate: "2023-01-01",
          endDate: "2023-06-01",
          isCurrent: false,
          description: null,
          projectUrl: "github.com/sarahj-dev/taskmaster",
          techStack: ["React", "Node.js", "MongoDB"],
          bullets: [
            {
              id: "bullet-proj-1-1",
              entryId: "project-entry-1",
              position: 0,
              text: "Built a full-stack task management app with 500+ GitHub stars"
            },
            {
              id: "bullet-proj-1-2",
              entryId: "project-entry-1",
              position: 1,
              text: "Implemented real-time collaboration features using WebSockets"
            }
          ]
        }
      ]
    }
  ]
};
