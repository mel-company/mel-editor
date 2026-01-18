import { Download, Save, Database, Hammer, Eye } from "lucide-react";
import { downloadJSON, exportToJSON } from "../../../../utils/export";
import { convertEditorToApiFormat } from "../../../../utils/template-to-api";
import { updateTemplate } from "../../../../services/api";
import { usePageStore } from "../../../../store/editor/page";
import { useStoreSettingsStore } from "../../../../store/editor/store-settings";
import React, { useState } from "react";

const ExportButton = () => {
  const [saving, setSaving] = useState(false);

  const handleExport = () => {
    downloadJSON("template-export.json");
  };

  const handleCopyJSON = () => {
    const jsonString = exportToJSON();
    navigator.clipboard.writeText(jsonString).then(() => {
      alert("تم نسخ JSON بنجاح!");
    });
  };

  const handleSaveToDatabase = async () => {
    // Always get templateId from localStorage (should be set when template is selected)
    const templateId = localStorage.getItem("currentTemplateId");

    if (!templateId) {
      alert("⚠️ لا يوجد قالب محدد. يرجى اختيار قالب أولاً من صفحة اختيار القوالب.");
      return;
    }

    try {
      setSaving(true);
      console.log("🔄 Starting save process...");

      // Convert all pages and sections to API format
      console.log("📦 Converting editor data to API format...");
      const apiData = convertEditorToApiFormat(templateId);

      console.log("💾 Saving template to database:", {
        templateId,
        pagesCount: apiData.body.pages.length,
        totalSections: apiData.body.pages.reduce(
          (sum: number, page: any) => sum + (page.sections?.length || 0),
          0
        ),
      });

      // Always update the same template (not create new)
      // Pass body only, name/description/image will be fetched from current template
      console.log("📤 Sending update request...");
      await updateTemplate(templateId, {
        body: apiData.body,
      });

      console.log("✅ Save completed successfully");
      alert("✅ تم حفظ جميع التعديلات والأقسام بنجاح في الداتابيس!");
    } catch (error: any) {
      console.error("❌ Error updating template:", error);

      // Show user-friendly error message
      const errorMessage = error.message || "حدث خطأ غير متوقع";
      alert(`❌ خطأ في حفظ التعديلات:\n\n${errorMessage}\n\nيرجى:\n1. التحقق من اتصال الإنترنت\n2. التحقق من حالة الخادم\n3. المحاولة مرة أخرى`);
    } finally {
      setSaving(false);
      console.log("🏁 Save process finished");
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex gap-2">
        <button
          onClick={handleExport}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
        >
          <Download size={14} />
          تصدير JSON
        </button>
        <button
          onClick={handleCopyJSON}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-xs"
          title="نسخ JSON"
        >
          <Save size={14} />
        </button>
      </div>
      <button
        onClick={handleSaveToDatabase}
        disabled={saving}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        title="حفظ في الداتابيس"
      >
        <Database size={14} />
        {saving ? "جاري الحفظ..." : "حفظ في الداتابيس"}
      </button>
      <button
        onClick={() => {
          // Real Client-Side Build: Snapshot the current state
          try {
            // Access stores directly (we need to be inside component or use getState if outside, 
            // but here we are inside component so we can use hooks or direct import of store)
            // Access stores directly (we need to be inside component or use getState if outside, 
            // but here we are inside component so we can use hooks or direct import of store)
            // Using direct store access to ensure we get latest state without extra re-renders
            // const { usePageStore } = require("../../../../store/editor/page");
            // const { useStoreSettingsStore } = require("../../../../store/editor/store-settings");

            const pages = usePageStore.getState().pages;
            const storeSettings = useStoreSettingsStore.getState().storeSettings;

            const buildData = {
              pages,
              storeSettings
            };

            localStorage.setItem("built-template-data", JSON.stringify(buildData));

            alert("✅ تم بناء النسخة بنجاح!\n\nتم حفظ التغييرات الحالية لإعداد المعاينة.\nاضغط على 'معاينة التطبيق' لرؤية النتيجة.");
            console.log("Build snapshot saved to localStorage", buildData);
          } catch (e) {
            console.error("Build failed", e);
            alert("❌ حدث خطأ أثناء البناء");
          }
        }}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs font-medium"
      >
        <Hammer size={14} />
        بناء نسخة جديدة (Build)
      </button>

      <button
        onClick={() => {
          window.open("/template-preview", "_blank");
        }}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-xs font-medium"
      >
        <Eye size={14} />
        معاينة التطبيق (Preview)
      </button>
    </div>
  );
};

export default ExportButton;
