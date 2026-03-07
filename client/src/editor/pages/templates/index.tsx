import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  Sparkles,
  Store,
  ArrowLeft,
  Eye,
  LayoutGrid,
  Palette,
  ArrowRightLeft,
  Loader2,
  AlertCircle
} from "lucide-react";
import { usePageStore } from "../../../shared/store/editor/page";
import { useStoreSettingsStore } from "../../../shared/store/editor/store-settings";
import { TemplateType, PageType } from "../../../shared/types";
import { getActiveTemplates, ApiTemplateResponse } from "../../../shared/services/api";
import {
  convertApiTemplateToTemplateType,
  convertApiPagesToPageTypes,
} from "../../../shared/utils/template-converter";

// Import local templates - use relative paths from client/src
import { mockTemplate as retailV1Template } from "../../../../../templates/ecommerce/retail-v1/home/sections/template";
import { mockTemplate as organicV1Template } from "../../../../../templates/ecommerce/organic-v1/home/sections/template";

interface TemplateWithMeta extends TemplateType {
  source: "api" | "local";
  category: string;
}

const TemplatesPage = () => {
  const navigate = useNavigate();
  const { setPages, setCurrentPageId, currentPageId } = usePageStore();
  const { storeSettings, updateStoreSettings } = useStoreSettingsStore();

  const [templates, setTemplates] = useState<TemplateWithMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateWithMeta | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Load templates from API and local
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get local templates
        const localTemplates: TemplateWithMeta[] = [
          { ...retailV1Template, source: "local", category: "e-commerce" },
          { ...organicV1Template, source: "local", category: "e-commerce" },
        ];

        // Try to get API templates, but don't fail if API is unavailable
        let apiTemplates: TemplateWithMeta[] = [];
        try {
          const apiResponse: ApiTemplateResponse = await getActiveTemplates();
          apiTemplates = apiResponse.data.map((apiTemplate) => ({
            ...convertApiTemplateToTemplateType(apiTemplate),
            source: "api" as const,
            category: apiTemplate.body?.store?.type || "e-commerce",
          }));
        } catch (apiErr) {
          console.warn("API templates unavailable, using local templates only:", apiErr);
          // Don't set error - local templates will still work
        }

        // Combine templates
        const allTemplates = [...localTemplates, ...apiTemplates];
        setTemplates(allTemplates);

        // Set current active template based on current pages
        const currentTemplate = allTemplates.find(t =>
          t.pages?.some(p => p.id === currentPageId)
        );
        if (currentTemplate) {
          setActiveTemplateId(currentTemplate.id);
        }
      } catch (err) {
        console.error("Error loading templates:", err);
        // Even on error, ensure local templates are shown
        const localTemplates: TemplateWithMeta[] = [
          { ...retailV1Template, source: "local", category: "e-commerce" },
          { ...organicV1Template, source: "local", category: "e-commerce" },
        ];
        setTemplates(localTemplates);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, [currentPageId]);

  const handleApplyTemplate = async (template: TemplateWithMeta) => {
    try {
      setLoading(true);

      // Convert template pages to usable format
      let templatePages: PageType[] = [];

      if (template.source === "api") {
        const apiResponse: ApiTemplateResponse = await getActiveTemplates();
        const matchedTemplate = apiResponse.data.find((t) => t.id === template.id);
        if (matchedTemplate) {
          templatePages = convertApiPagesToPageTypes(matchedTemplate.body.pages, matchedTemplate.id);
        }
      } else {
        // Local template - use as-is
        templatePages = template.pages?.map(page => ({
          ...page,
          id: crypto.randomUUID(),
          sections: page.sections?.map(section => ({
            ...section,
            id: crypto.randomUUID(),
          })),
        })) || [];
      }

      if (templatePages.length > 0) {
        setPages(templatePages);
        setCurrentPageId(templatePages[0].id);
        setActiveTemplateId(template.id);

        // Update store type if needed
        if (template.category === "restaurant" && storeSettings.type !== "restaurant") {
          updateStoreSettings({ type: "restaurant" });
        } else if (template.category === "e-commerce" && storeSettings.type !== "e-commerce") {
          updateStoreSettings({ type: "e-commerce" });
        }

        // Navigate to editor to see the applied template
        navigate("/editor");
      }
    } catch (err) {
      console.error("Error applying template:", err);
      setError("حدث خطأ أثناء تطبيق القالب");
    } finally {
      setLoading(false);
    }
  };

  const filteredTemplates = selectedCategory === "all"
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const categories = [
    { id: "all", label: "الكل", icon: LayoutGrid },
    { id: "e-commerce", label: "متجر إلكتروني", icon: Store },
    { id: "restaurant", label: "مطعم", icon: Sparkles },
  ];

  if (loading && templates.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-slate-600">جاري تحميل القوالب...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/editor")}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">العودة للمحرر</span>
              </button>
            </div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Palette className="w-6 h-6 text-emerald-600" />
              قوالب المتجر
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all
                  ${selectedCategory === category.id
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mr-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* Current Template Info */}
        {activeTemplateId && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Check className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-emerald-900">القالب الحالي</span>
            </div>
            <p className="text-emerald-700 mr-8">
              {templates.find(t => t.id === activeTemplateId)?.title || "غير معروف"}
            </p>
          </div>
        )}

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`
                group bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300
                ${activeTemplateId === template.id
                  ? "border-emerald-500 ring-4 ring-emerald-100"
                  : "border-slate-200 hover:border-emerald-300 hover:shadow-xl"
                }
              `}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img
                  src={template.thumbnail?.url || "/placeholder-template.jpg"}
                  alt={template.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' fill='%23f1f5f9'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8'%3ENo Preview%3C/text%3E%3C/svg%3E";
                  }}
                />

                {/* Active Badge */}
                {activeTemplateId === template.id && (
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    نشط
                  </div>
                )}

                {/* Preview Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => setPreviewTemplate(template)}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-slate-900 rounded-xl font-medium hover:bg-slate-100 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    معاينة
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900">
                    {template.title}
                  </h3>
                  <span className={`
                    px-2.5 py-1 rounded-lg text-xs font-medium
                    ${template.source === "local"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-purple-50 text-purple-700"
                    }
                  `}>
                    {template.source === "local" ? "محلي" : "سحابي"}
                  </span>
                </div>

                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {template.description}
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                  {activeTemplateId === template.id ? (
                    <button
                      disabled
                      className="flex-1 py-2.5 bg-emerald-100 text-emerald-700 rounded-xl font-medium cursor-default"
                    >
                      القالب الحالي
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setPreviewTemplate(template)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleApplyTemplate(template)}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <ArrowRightLeft className="w-4 h-4" />
                            تطبيق
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LayoutGrid className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              لا توجد قوالب
            </h3>
            <p className="text-slate-600">
              لا توجد قوالب متاحة في هذه الفئة
            </p>
          </div>
        )}
      </main>

      {/* Preview Modal */}
      {previewTemplate && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {previewTemplate.title}
                </h2>
                <p className="text-slate-600 mt-1">
                  {previewTemplate.description}
                </p>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="bg-slate-100 rounded-2xl overflow-hidden">
                <img
                  src={previewTemplate.thumbnail?.url || "/placeholder-template.jpg"}
                  alt={previewTemplate.title}
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' fill='%23f1f5f9'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8'%3ENo Preview Available%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>

              {/* Template Details */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500 mb-1">الصفحات</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {previewTemplate.pages?.length || 0}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500 mb-1">الأقسام</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {previewTemplate.pages?.reduce((acc, page) => acc + (page.sections?.length || 0), 0) || 0}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500 mb-1">نوع المتجر</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {previewTemplate.category === "restaurant" ? "مطعم" : "متجر"}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500 mb-1">المصدر</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {previewTemplate.source === "local" ? "محلي" : "سحابي"}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-6 py-2.5 text-slate-700 hover:bg-slate-100 rounded-xl font-medium transition-colors"
              >
                إغلاق
              </button>
              {activeTemplateId !== previewTemplate.id && (
                <button
                  onClick={() => {
                    handleApplyTemplate(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ArrowRightLeft className="w-4 h-4" />
                      تطبيق القالب
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesPage;
