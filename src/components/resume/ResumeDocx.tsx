import { useState, useMemo } from "react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  ExternalHyperlink,
  TabStopPosition,
  TabStopType,
  convertInchesToTwip,
} from "docx";
import { FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Resume, ResumeEntry, ResumeSection } from "@resume/shared";
import { Button } from "@/components/ui/button";
import { formatDateRange } from "@/lib/utils";
import { sortSections, sectionDisplayTitle } from "@/lib/resume";
import { useAppModeStore } from "@/store/appModeStore";
import { useResumeStore } from "@/store/resumeStore";

// Helper to create a styled paragraph
const createParagraph = (
  children: (TextRun | ExternalHyperlink)[],
  options: {
    alignment?: typeof AlignmentType[keyof typeof AlignmentType];
    spacing?: { before?: number; after?: number };
    border?: { bottom?: { color: string; size: number; style: typeof BorderStyle.SINGLE } };
    tabStops?: { type: typeof TabStopType[keyof typeof TabStopType]; position: number }[];
  } = {}
) => {
  return new Paragraph({
    children,
    alignment: options.alignment,
    spacing: options.spacing,
    border: options.border,
    tabStops: options.tabStops,
  });
};

// Create section header
const createSectionHeader = (title: string) => {
  return new Paragraph({
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: 22, // 11pt
        font: "Times New Roman",
      }),
    ],
    spacing: { before: 200, after: 80 },
    border: {
      bottom: {
        color: "1a202c",
        size: 4,
        style: BorderStyle.SINGLE,
      },
    },
  });
};

// Create entry title with date on same line
const createEntryTitle = (entry: ResumeEntry) => {
  const dateRange = formatDateRange(entry.startDate, entry.endDate, entry.isCurrent);
  const children: (TextRun | ExternalHyperlink)[] = [
    new TextRun({
      text: entry.title,
      bold: true,
      size: 21, // 10.5pt
      font: "Times New Roman",
    }),
  ];
  
  if (entry.subtitle) {
    children.push(
      new TextRun({
        text: ` — ${entry.subtitle}`,
        size: 21,
        font: "Times New Roman",
      })
    );
  }
  
  if (dateRange) {
    children.push(
      new TextRun({
        text: "\t",
      }),
      new TextRun({
        text: dateRange,
        size: 19, // 9.5pt
        font: "Times New Roman",
      })
    );
  }
  
  return new Paragraph({
    children,
    spacing: { before: 100, after: 20 },
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: TabStopPosition.MAX,
      },
    ],
  });
};

// Create bullet point
const createBullet = (text: string) => {
  return new Paragraph({
    children: [
      new TextRun({
        text: `• ${text}`,
        size: 20, // 10pt
        font: "Times New Roman",
      }),
    ],
    spacing: { before: 20, after: 20 },
    indent: { left: convertInchesToTwip(0.25) },
  });
};

// Generate the DOCX document
const generateDocx = async (resume: Resume): Promise<Blob> => {
  const orderedSections = sortSections(resume.sections);
  const summarySection = orderedSections.find((section) => section.type === "SUMMARY");
  const summaryEntry = summarySection?.entries[0];
  const otherSections = orderedSections.filter((section) => section.type !== "SUMMARY");

  const children: Paragraph[] = [];

  // Header - Name
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: resume.basicInfo.name || "Your Name",
          bold: true,
          size: 44, // 22pt
          font: "Times New Roman",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
    })
  );

  // Header - Headline
  if (resume.basicInfo.headline) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: resume.basicInfo.headline,
            size: 20,
            font: "Times New Roman",
            color: "2d3748",
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
      })
    );
  }

  // Contact info
  const contactItems: (TextRun | ExternalHyperlink)[] = [];
  
  if (resume.basicInfo.email) {
    if (contactItems.length > 0) {
      contactItems.push(new TextRun({ text: " • ", size: 18 }));
    }
    contactItems.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: resume.basicInfo.email,
            size: 18,
            font: "Times New Roman",
            color: "2563eb",
          }),
        ],
        link: `mailto:${resume.basicInfo.email}`,
      })
    );
  }
  
  if (resume.basicInfo.phone) {
    if (contactItems.length > 0) {
      contactItems.push(new TextRun({ text: " • ", size: 18 }));
    }
    contactItems.push(
      new TextRun({
        text: resume.basicInfo.phone,
        size: 18,
        font: "Times New Roman",
        color: "2d3748",
      })
    );
  }
  
  resume.basicInfo.links.forEach((link) => {
    if (contactItems.length > 0) {
      contactItems.push(new TextRun({ text: " • ", size: 18 }));
    }
    contactItems.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: link.label || link.url,
            size: 18,
            font: "Times New Roman",
            color: "2563eb",
          }),
        ],
        link: link.url.startsWith("http") ? link.url : `https://${link.url}`,
      })
    );
  });

  if (contactItems.length > 0) {
    children.push(
      new Paragraph({
        children: contactItems,
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
      })
    );
  }

  // Summary
  if (summaryEntry?.description) {
    children.push(createSectionHeader("Summary"));
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: summaryEntry.description,
            size: 20,
            font: "Times New Roman",
          }),
        ],
        spacing: { after: 80 },
      })
    );
  }

  // Other sections
  for (const section of otherSections) {
    children.push(createSectionHeader(sectionDisplayTitle(section)));

    if (section.type === "SKILL") {
      // Skills - compact format
      for (const entry of section.entries) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${entry.title}: `,
                bold: true,
                size: 20,
                font: "Times New Roman",
              }),
              new TextRun({
                text: entry.description || "",
                size: 20,
                font: "Times New Roman",
              }),
            ],
            spacing: { before: 40, after: 40 },
          })
        );
      }
    } else {
      // Standard entries
      for (const entry of section.entries) {
        children.push(createEntryTitle(entry));

        if (entry.companyOrOrg) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: entry.companyOrOrg,
                  size: 20,
                  font: "Times New Roman",
                }),
              ],
              spacing: { after: 20 },
            })
          );
        }

        if (entry.description) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: entry.description,
                  size: 20,
                  font: "Times New Roman",
                }),
              ],
              spacing: { before: 20, after: 20 },
            })
          );
        }

        if (entry.projectUrl) {
          children.push(
            new Paragraph({
              children: [
                new ExternalHyperlink({
                  children: [
                    new TextRun({
                      text: entry.projectUrl,
                      size: 18,
                      font: "Times New Roman",
                      color: "2563eb",
                    }),
                  ],
                  link: entry.projectUrl.startsWith("http") ? entry.projectUrl : `https://${entry.projectUrl}`,
                }),
              ],
              spacing: { before: 20, after: 40 },
            })
          );
        }

        for (const bullet of entry.bullets) {
          children.push(createBullet(bullet.text));
        }
      }
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.5),
              bottom: convertInchesToTwip(0.5),
              left: convertInchesToTwip(0.75),
              right: convertInchesToTwip(0.75),
            },
          },
        },
        children,
      },
    ],
  });

  return Packer.toBlob(doc);
};

export const ResumeDocxDownloadButton = ({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}) => {
  const resume = useResumeStore((state) => state.resume);
  const language = useAppModeStore((state) => state.language);
  const [isGenerating, setIsGenerating] = useState(false);
  const isRTL = language === "ar";

  const fileName = useMemo(() => {
    if (!resume) return "resume.docx";
    const base = resume.basicInfo.name || resume.title || "resume";
    return `${base.replace(/\s+/g, "_")}.docx`;
  }, [resume]);

  if (!resume) return null;

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateDocx(resume);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
      toast.success(isRTL ? "تم تحميل ملف Word" : "Word document downloaded!");
    } catch (error) {
      console.error("DOCX generation failed:", error);
      toast.error(isRTL ? "فشل إنشاء ملف Word" : "Failed to generate Word document");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button onClick={() => void handleDownload()} variant="outline" size={size} className={className} disabled={isGenerating}>
      {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
      <span className="ms-1.5">{isRTL ? "Word" : "Word"}</span>
    </Button>
  );
};

export const ResumeDocx = ResumeDocxDownloadButton;
