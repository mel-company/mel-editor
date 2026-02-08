import React from "react";
import { usePageTemplateStore } from "../../../../shared/store/editor/page-template";
import { PageType } from "../../../../shared/types";

type TemplateSelectorProps = {
  page: PageType;
};

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ page }) => {
  const { getSelectedTemplateId, setPageTemplate, syncWithServer } = usePageTemplateStore();
  
  const selectedTemplateId = getSelectedTemplateId(page.id) || page.templateVariants?.[0]?.id || "";
  const templates = page.templateVariants || [];
  
  const handleTemplateChange = async (templateId: string) => {
    setPageTemplate(page.id, templateId);
    await syncWithServer(page.id);
  };
  
  if (templates.length === 0) {
    return (
      <div className="p-4 text-sm text-gray-500">
        No template layouts available for this page
      </div>
    );
  }
  
  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-1">
          Page Layout Templates
        </h3>
        <p className="text-xs text-gray-500">
          Choose a complete layout for this page
        </p>
      </div>
      
      <div className="space-y-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleTemplateChange(template.id)}
            className={`
              w-full text-left p-4 rounded-lg border-2 transition-all
              ${
                selectedTemplateId === template.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }
            `}
          >
            <div className="flex items-start gap-3">
              {template.thumbnail?.url ? (
                <img
                  src={template.thumbnail.url}
                  alt={template.title}
                  className="w-24 h-32 object-cover rounded border border-gray-200"
                />
              ) : (
                <div className="w-24 h-32 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-400">No Preview</span>
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-gray-800">
                    {template.title}
                  </h4>
                  {selectedTemplateId === template.id && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  )}
                </div>
                
                {template.description && (
                  <p className="text-xs text-gray-600 mb-2">
                    {template.description}
                  </p>
                )}
                
                <div className="text-xs text-gray-500">
                  {template.sections.length} sections
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
