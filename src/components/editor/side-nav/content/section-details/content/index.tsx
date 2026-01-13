import useSectionDetails from "../../../../../../hooks/editor-section-details";
import { SectionPropsComponent } from "../../section-props";
import React from "react";
import { FileText } from "lucide-react";

const SectionContent = () => {
  const { section } = useSectionDetails();

  const content = section?.options?.find(
    (option) => option.id === section?.section_id
  )?.content;

  if (!content || (Array.isArray(content) && content.length === 0)) {
    return (
      <div className="p-4 text-center text-slate-400">
        <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">لا توجد نصوص قابلة للتعديل</p>
      </div>
    );
  }

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

  return (
    <div className="flex flex-col gap-4">
      {Array.isArray(content) &&
        content.map((item: { name: string; value: string; id: string; label?: string }) => {
          return (
            <div key={`${item.id}-${item.value}`} className="border border-slate-200 rounded-lg p-3 bg-white">
              <div className="mb-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {item.label || getFieldLabel(item.name)}
                </label>
              </div>
              <SectionPropsComponent {...item} />
            </div>
          );
        })}
    </div>
  );
};

export default SectionContent;
