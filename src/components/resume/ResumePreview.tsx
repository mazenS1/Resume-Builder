import { useMemo } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { useEditorSyncStore } from "@/store/editorSyncStore";
import { sortSections, sectionDisplayTitle } from "@/lib/resume";
import { formatDateRange } from "@/lib/utils";
import { useAppModeStore } from "@/store/appModeStore";
import { DEFAULT_RESUME_METADATA } from "@resume/shared";

// Helper component to render contact items with proper linking
const ContactItemLink = ({ item, url, accentColor }: { item: string; url?: string; accentColor: string }) => {
  // If it's an email
  if (item.includes("@") && !item.startsWith("http")) {
    return (
      <a 
        href={`mailto:${item}`} 
        className="hover:underline"
        style={{ color: accentColor }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item}
      </a>
    );
  }
  // If it has a URL
  if (url) {
    const href = url.startsWith("http") ? url : `https://${url}`;
    return (
      <a 
        href={href} 
        className="hover:underline"
        style={{ color: accentColor }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item}
      </a>
    );
  }
  // Plain text (like phone number)
  return <span>{item}</span>;
};

export const ResumePreview = () => {
  const resume = useResumeStore((state) => state.resume);
  const language = useAppModeStore((state) => state.language);
  const activeSectionId = useEditorSyncStore((state) => state.activeSectionId);
  const activeEntryId = useEditorSyncStore((state) => state.activeEntryId);
  const isRTL = language === "ar";

  // Get metadata with defaults
  const metadata = resume?.metadata ?? DEFAULT_RESUME_METADATA;
  const { fontFamily, lineHeight, accentColor, primaryColor } = metadata;

  const [summarySection, otherSections] = useMemo(() => {
    if (!resume) return [null, []];
    const ordered = sortSections(resume.sections);
    const summary = ordered.find((section) => section.type === "SUMMARY") ?? null;
    const rest = ordered.filter((section) => section.type !== "SUMMARY");
    return [summary, rest];
  }, [resume]);

  if (!resume) return null;

  // Build contact items with their associated URLs for proper linking
  const contactItemsWithLinks: Array<{ text: string; url?: string }> = [];
  
  if (resume.basicInfo.email) {
    contactItemsWithLinks.push({ text: resume.basicInfo.email });
  }
  if (resume.basicInfo.phone) {
    contactItemsWithLinks.push({ text: resume.basicInfo.phone });
  }
  resume.basicInfo.links.forEach((link) => {
    contactItemsWithLinks.push({
      text: link.label || link.url,
      url: link.url,
    });
  });

  const summaryEntry = summarySection?.entries[0];

  // Dynamic styles based on metadata
  const containerStyle = {
    fontFamily: fontFamily || "Inter",
    lineHeight: lineHeight || 1.4,
    color: primaryColor || "#0f172a",
  };

  return (
    <div className="w-full print:static">
      <div 
        className={`resume-page-classic ${isRTL ? 'rtl' : ''}`} 
        dir={isRTL ? 'rtl' : 'ltr'}
        style={containerStyle}
      >
        {/* Header Section */}
        <header className="text-center mb-2 sm:mb-2">
          <h1 className="text-[20px] sm:text-[22px] md:text-[22px] font-bold mb-0.5 sm:mb-1">
            {resume.basicInfo.name || "Your Name"}
          </h1>
          {resume.basicInfo.headline && (
            <p className="text-[9px] sm:text-[10px] md:text-[10px] opacity-80 mb-0.5">
              {resume.basicInfo.headline}
            </p>
          )}
          {contactItemsWithLinks.length > 0 && (
            <div className="text-[8.5px] sm:text-[9px] md:text-[9px] opacity-80 tracking-wide flex flex-wrap justify-center gap-x-1.5 gap-y-0.5">
              {contactItemsWithLinks.map((item, idx) => (
                <span key={idx} className="whitespace-nowrap">
                  {idx > 0 && <span className="mx-0.5">•</span>}
                  <ContactItemLink item={item.text} url={item.url} accentColor={accentColor} />
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Summary Section */}
        {summaryEntry?.description && (
          <section className="mb-1.5 sm:mb-2">
            <h2 
              className="classic-section-header"
            >
              SUMMARY
            </h2>
            <p className="classic-body-text mt-0.5">
              {summaryEntry.description}
            </p>
          </section>
        )}

        {/* Other Sections */}
        {otherSections.map((section) => {
          const isSectionActive = activeSectionId === section.id;
          return (
          <section 
            key={section.id} 
            className={`mb-1.5 sm:mb-2 transition-all duration-200 ${
              isSectionActive ? 'ring-2 ring-primary/30 ring-offset-1 rounded-sm bg-primary/5' : ''
            }`}
            data-section-id={section.id}
          >
            <h2 
              className="classic-section-header"
            >
              {sectionDisplayTitle(section).toUpperCase()}
            </h2>
            
            {/* Skills Section - Compact Format */}
            {section.type === "SKILL" ? (
              <div className="mt-1">
                {section.entries.map((entry, index) => {
                  const isEntryActive = activeEntryId === entry.id;
                  return (
                  <div 
                    key={entry.id} 
                    className={`${index > 0 ? "mt-0.5" : ""} ${
                      isEntryActive ? 'bg-primary/10 -mx-1 px-1 rounded' : ''
                    }`}
                    data-entry-id={entry.id}
                  >
                    <p className="classic-body-text">
                      <span className="font-bold">{entry.title}:</span> {entry.description}
                    </p>
                  </div>
                  );
                })}
              </div>
            ) : (
              /* All Other Sections - Standard Format */
              <div className="mt-1">
                {section.entries.map((entry, index) => {
                  const isEntryActive = activeEntryId === entry.id;
                  return (
                <article 
                  key={entry.id} 
                  className={`${index > 0 ? "mt-1.5 sm:mt-1.5" : ""} transition-all duration-200 ${
                    isEntryActive ? 'bg-primary/10 -mx-1 px-1 rounded' : ''
                  }`}
                  data-entry-id={entry.id}
                >
                  {/* Title and Date Row */}
                  <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'} sm:flex-row sm:justify-between sm:items-baseline gap-0 mb-0 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                    <h3 className="classic-entry-title w-full sm:w-auto">
                      {entry.title}
                      {entry.subtitle && <span className="font-normal"> — {entry.subtitle}</span>}
                    </h3>
                    {formatDateRange(entry.startDate, entry.endDate, entry.isCurrent) && (
                      <span className="classic-date">
                        {formatDateRange(entry.startDate, entry.endDate, entry.isCurrent)}
                      </span>
                    )}
                  </div>
                  {/* Company/Organization Line */}
                    {entry.companyOrOrg && (
                      <p className="classic-body-text mb-0">
                        {entry.companyOrOrg}
                      </p>
                    )}

                    {/* Description */}
                    {entry.description && (
                      <p className="classic-body-text mt-0.5">
                        {entry.description}
                      </p>
                    )}

                    {/* Project URL */}
                    {entry.projectUrl && (
                      <a 
                        href={entry.projectUrl.startsWith("http") ? entry.projectUrl : `https://${entry.projectUrl}`}
                        className="classic-body-text mt-0.5 text-[#2563eb] hover:underline block text-[9px] sm:text-[9px]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {entry.projectUrl}
                      </a>
                    )}

                    {/* Bullets */}
                    {entry.bullets.length > 0 && (
                      <ul className="classic-bullet-list">
                        {entry.bullets.map((bullet) => (
                          <li key={bullet.id}>{bullet.text}</li>
                        ))}
                      </ul>
                    )}

                    {/* Tech Stack (if no bullets) */}
                    {!entry.bullets.length && entry.techStack && entry.techStack.length > 0 && (
                      <p className="classic-body-text mt-0.5">
                        {entry.techStack.join(" • ")}
                      </p>
                    )}
                  </article>
                  );
                })}
              </div>
            )}
          </section>
          );
        })}
      </div>
    </div>
  );
};
