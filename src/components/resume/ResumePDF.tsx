import { useMemo, useState } from "react";
import { Document, Page, Text, View, StyleSheet, pdf, Font, Link } from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Resume, LinkItem } from "@resume/shared";
import { Button } from "@/components/ui/button";
import { formatDateRange } from "@/lib/utils";
import { sortSections, sectionDisplayTitle } from "@/lib/resume";
import { useAppModeStore } from "@/store/appModeStore";
import { useResumeStore } from "@/store/resumeStore";
import { DEFAULT_RESUME_METADATA } from "@resume/shared";

// Disable hyphenation to match preview behavior
Font.registerHyphenationCallback((word) => [word]);

// Register Inter font
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf",
      fontWeight: 700,
    },
  ],
});

// Register EB Garamond
Font.register({
  family: "EB Garamond",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/ebgaramond/v32/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-6_RUAw.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/ebgaramond/v32/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-DPNUAw.ttf",
      fontWeight: 700,
    },
  ],
});

// Register IBM Plex Sans Arabic for RTL support
Font.register({
  family: "IBMPlexSansArabic",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/ibmplexsansarabic/v14/Qw3CZRtWPQCuHme67tEYUIx3Kh0PHR9N6bs6.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/ibmplexsansarabic/v14/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YOG-dCT.ttf",
      fontWeight: 700,
    },
  ],
});

// Map UI font names to PDF-compatible font families
// Built-in PDF fonts: Helvetica, Times-Roman, Courier
const getPdfFontFamily = (fontFamily: string, isRTL: boolean): string => {
  if (isRTL) return "IBMPlexSansArabic";

  switch (fontFamily) {
    case "Inter":
      return "Inter";
    case "EB Garamond":
      return "EB Garamond";
    case "Georgia":
      return "Times-Roman"; // Similar serif font
    case "Times New Roman":
      return "Times-Roman"; // Built-in PDF font
    case "Arial":
    case "Helvetica":
      return "Helvetica"; // Built-in PDF font
    default:
      return "Inter"; // Default fallback
  }
};

const createStyles = (isRTL: boolean, pdfFontFamily: string) =>
  StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#ffffff",
      // Tighter margins to fit more content (similar to Word's narrow margins)
      padding: "20px 24px 20px 24px",
      fontFamily: pdfFontFamily,
    },
    header: {
      marginBottom: 8,
      alignItems: "center",
    },
    name: {
      fontSize: 22,
      fontWeight: 700,
      marginBottom: 2,
      textAlign: "center",
      fontFamily: pdfFontFamily,
    },
    headline: {
      fontSize: 10,
      marginBottom: 3,
      color: "#2d3748",
      textAlign: "center",
    },
    contactRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 6,
    },
    contactItem: {
      fontSize: 9,
      color: "#2d3748",
    },
    contactLink: {
      fontSize: 9,
      color: "#2563eb",
      textDecoration: "none",
    },
    contactSeparator: {
      fontSize: 9,
      color: "#2d3748",
      marginHorizontal: 3,
    },
    section: {
      marginBottom: 6,
    },
    sectionHeader: {
      fontSize: 11,
      fontWeight: 700,
      fontFamily: pdfFontFamily,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 4,
      borderBottomWidth: 0.5,
      borderBottomColor: "#1a202c",
      paddingBottom: 2,
      textAlign: isRTL ? "right" : "left",
    },
    entry: {
      marginBottom: 5,
    },
    entryRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 1,
    },
    entryTitle: {
      fontSize: 10.5,
      fontWeight: 700,
      fontFamily: pdfFontFamily,
      color: "#1a202c",
      textAlign: isRTL ? "right" : "left",
    },
    entrySubtitle: {
      fontSize: 10.5,
      fontWeight: 400,
      fontFamily: pdfFontFamily,
      color: "#1a202c",
    },
    entryCompany: {
      fontSize: 10,
      marginBottom: 1,
      color: "#1a202c",
      textAlign: isRTL ? "right" : "left",
    },
    entryDate: {
      fontSize: 9.5,
      color: "#1a202c",
      textAlign: isRTL ? "left" : "right",
    },
    entryDescription: {
      fontSize: 10,
      marginTop: 1,
      lineHeight: 1.3,
      color: "#1a202c",
      textAlign: isRTL ? "right" : "left",
    },
    bulletList: {
      marginLeft: isRTL ? 0 : 14,
      marginRight: isRTL ? 14 : 0,
      marginTop: 2,
    },
    bullet: {
      fontSize: 10,
      lineHeight: 1.3,
      marginBottom: 1,
      color: "#1a202c",
      textAlign: isRTL ? "right" : "left",
    },
    skillLine: {
      fontSize: 10,
      lineHeight: 1.3,
      marginBottom: 2,
      color: "#1a202c",
      textAlign: isRTL ? "right" : "left",
    },
    skillTitle: {
      fontWeight: "bold",
      fontFamily: pdfFontFamily,
    },
    projectLink: {
      fontSize: 9,
      color: "#2563eb",
      textDecoration: "none",
      marginTop: 1,
    },
  });

const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
};

// Helper to render contact item - either as text or clickable link
const ContactItem = ({
  item,
  linkData,
  style,
  linkStyle,
}: {
  item: string;
  linkData?: LinkItem;
  style: ReturnType<typeof createStyles>["contactItem"];
  linkStyle: ReturnType<typeof createStyles>["contactLink"];
}) => {
  if (linkData?.url) {
    const url = linkData.url.startsWith("http") ? linkData.url : `https://${linkData.url}`;
    return (
      <Link src={url} style={linkStyle}>
        {item}
      </Link>
    );
  }
  // Check if it's an email
  if (item.includes("@") && !item.startsWith("http")) {
    return (
      <Link src={`mailto:${item}`} style={linkStyle}>
        {item}
      </Link>
    );
  }
  return <Text style={style}>{item}</Text>;
};

const ResumePdfDocument = ({ resume, isRTL }: { resume: Resume; isRTL: boolean }) => {
  // Get font from metadata, with fallback to defaults
  const metadata = resume.metadata ?? DEFAULT_RESUME_METADATA;
  const pdfFontFamily = getPdfFontFamily(metadata.fontFamily, isRTL);
  const styles = createStyles(isRTL, pdfFontFamily);
  const orderedSections = sortSections(resume.sections);
  const summarySection = orderedSections.find((section) => section.type === "SUMMARY");
  const summaryEntry = summarySection?.entries[0];
  const otherSections = orderedSections.filter((section) => section.type !== "SUMMARY");

  // Build contact items with their link data for hyperlinking
  const contactItemsWithLinks: Array<{ text: string; linkData?: LinkItem }> = [];
  
  if (resume.basicInfo.email) {
    contactItemsWithLinks.push({ text: resume.basicInfo.email });
  }
  if (resume.basicInfo.phone) {
    contactItemsWithLinks.push({ text: resume.basicInfo.phone });
  }
  resume.basicInfo.links.forEach((link) => {
    contactItemsWithLinks.push({
      text: link.label || link.url,
      linkData: link,
    });
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {resume.basicInfo.name || "Your Name"}
          </Text>
          {resume.basicInfo.headline ? (
            <Text style={styles.headline}>
              {resume.basicInfo.headline}
            </Text>
          ) : null}
          {contactItemsWithLinks.length > 0 ? (
            <View style={styles.contactRow}>
              {contactItemsWithLinks.map((item, idx) => (
                <View key={idx} style={{ flexDirection: "row", alignItems: "center" }}>
                  {idx > 0 && <Text style={styles.contactSeparator}>•</Text>}
                  <ContactItem
                    item={item.text}
                    linkData={item.linkData}
                    style={styles.contactItem}
                    linkStyle={styles.contactLink}
                  />
                </View>
              ))}
            </View>
          ) : null}
        </View>

        {summaryEntry?.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>
              {summarySection
                ? isRTL
                  ? sectionDisplayTitle(summarySection)
                  : sectionDisplayTitle(summarySection).toUpperCase()
                : "SUMMARY"}
            </Text>
            <Text style={styles.entryDescription}>
              {summaryEntry.description}
            </Text>
          </View>
        ) : null}

        {otherSections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionHeader}>
              {isRTL ? sectionDisplayTitle(section) : sectionDisplayTitle(section).toUpperCase()}
            </Text>

            {section.type === "SKILL" ? (
              <View>
                {section.entries.map((entry) => (
                  <Text key={entry.id} style={styles.skillLine}>
                    <Text style={styles.skillTitle}>{entry.title}:</Text>
                    {entry.description ? ` ${entry.description}` : ""}
                  </Text>
                ))}
              </View>
            ) : (
              <View>
                {section.entries.map((entry) => (
                  <View key={entry.id} style={styles.entry}>
                    <View style={styles.entryRow}>
                      <Text style={styles.entryTitle}>
                        {entry.title}
                        {entry.subtitle ? <Text style={styles.entrySubtitle}>{` — ${entry.subtitle}`}</Text> : null}
                      </Text>
                      {formatDateRange(entry.startDate, entry.endDate, entry.isCurrent) ? (
                        <Text style={styles.entryDate}>
                          {formatDateRange(entry.startDate, entry.endDate, entry.isCurrent)}
                        </Text>
                      ) : null}
                    </View>

                    {entry.companyOrOrg ? (
                      <Text style={styles.entryCompany}>
                        {entry.companyOrOrg}
                      </Text>
                    ) : null}

                    {entry.description ? (
                      <Text style={styles.entryDescription}>
                        {entry.description}
                      </Text>
                    ) : null}

                    {/* Project URL as clickable link */}
                    {entry.projectUrl ? (
                      <Link
                        src={entry.projectUrl.startsWith("http") ? entry.projectUrl : `https://${entry.projectUrl}`}
                        style={styles.projectLink}
                      >
                        {entry.projectUrl}
                      </Link>
                    ) : null}

                    {entry.bullets.length ? (
                      <View style={styles.bulletList}>
                        {entry.bullets.map((bullet) => (
                          <Text key={bullet.id} style={styles.bullet}>
                            {`• ${bullet.text}`}
                          </Text>
                        ))}
                      </View>
                    ) : null}

                    {!entry.bullets.length && entry.techStack?.length ? (
                      <Text style={styles.entryDescription}>
                        {entry.techStack.join(" • ")}
                      </Text>
                    ) : null}
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export const ResumePdfDownloadButton = ({
  className,
  size = "sm",
  iconOnly = false,
  onClick,
}: {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  iconOnly?: boolean;
  onClick?: () => void;
}) => {
  const resume = useResumeStore((state) => state.resume);
  const language = useAppModeStore((state) => state.language);
  const [isGenerating, setIsGenerating] = useState(false);

  const fileName = useMemo(() => {
    if (!resume) return "resume.pdf";
    const base = resume.basicInfo.name || resume.title || "resume";
    return `${base.replace(/\s+/g, "_")}.pdf`;
  }, [resume]);

  if (!resume) return null;

  const handleDownload = async () => {
    setIsGenerating(true);
    onClick?.();
    try {
      const isRTL = language === "ar";
      // Uses built-in fonts for offline support
      const blob = await pdf(<ResumePdfDocument resume={resume} isRTL={isRTL} />).toBlob();
      downloadBlob(blob, fileName);
      toast.success(language === "ar" ? "تم تحميل ملف PDF" : "PDF downloaded!");
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error(language === "ar" ? "فشل إنشاء ملف PDF" : "Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button onClick={() => void handleDownload()} size={size} className={className} disabled={isGenerating}>
      {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      {!iconOnly && <span className="hidden sm:inline ms-1.5">{language === "ar" ? "تحميل" : "Download"}</span>}
    </Button>
  );
};

export const ResumePDF = ResumePdfDownloadButton;
