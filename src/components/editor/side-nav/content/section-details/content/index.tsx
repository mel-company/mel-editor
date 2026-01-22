import useSectionDetails from "../../../../../../hooks/editor-section-details";
import { SectionPropsComponent } from "../../section-props";
import React from "react";
import { FileText } from "lucide-react";

const SectionContent = () => {
  const { option } = useSectionDetails();

  const content = option?.content;

  if (!content || (Array.isArray(content) && content.length === 0)) {
    return (
      <div className="p-4 text-center text-slate-400">
        <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">لا توجد نصوص قابلة للتعديل</p>
      </div>
    );
  }

  // Helper to categorize fields
  const getFieldCategory = (item: any) => {
    if (item.id?.startsWith('heading_') || item.name?.includes('title') || item.name?.includes('heading')) return 'headings';
    if (item.id?.startsWith('paragraph_') || item.type === 'textarea' || item.name?.includes('description')) return 'text';
    if (item.id?.startsWith('link_') || item.name?.includes('link') || item.name?.includes('url')) return 'links';
    return 'other';
  };

  const categorizedContent = React.useMemo(() => {
    const groups: Record<string, any[]> = { headings: [], text: [], links: [], other: [] };
    if (Array.isArray(content)) {
      content.forEach((item: any) => {
        const cat = getFieldCategory(item);
        groups[cat].push(item);
      });
    }
    return groups;
  }, [content]);

  // Get labels for common field names
  const getFieldLabel = (name: string) => {
    const labels: Record<string, string> = {
      title: "العنوان",
      description: "الوصف",
      text: "النص",
      subtitle: "العنوان الفرعي",
      buttonText: "نص الزر",
    };
    return labels[name] || name;
  };

  const renderGroup = (title: string, items: any[], icon: React.ComponentType<any>) => {
    if (items.length === 0) return null;
    const Icon = icon;
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-500 px-1">
          <Icon className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={`${item.id}-${item.name}`} className="border border-slate-200 rounded-lg p-3 bg-white shadow-sm hover:border-blue-300 transition-colors">
              <div className="mb-2">
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  {item.label || getFieldLabel(item.name)}
                </label>
              </div>
              <SectionPropsComponent {...item} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {renderGroup("العناوين", categorizedContent.headings, FileText)}
      {renderGroup("النصوص", categorizedContent.text, FileText)}
      {/* Re-use FileText or import LinkIcon if valid */}
      {renderGroup("أخرى", [...categorizedContent.links, ...categorizedContent.other], FileText)}
    </div>
  );
};

export default SectionContent;
