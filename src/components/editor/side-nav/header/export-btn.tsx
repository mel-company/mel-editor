import { Download, Save } from "lucide-react";
import { downloadJSON, exportToJSON } from "../../../../utils/export";
import React from "react";

const ExportButton = () => {
  const handleExport = () => {
    downloadJSON("template-export.json");
  };

  const handleCopyJSON = () => {
    const jsonString = exportToJSON();
    navigator.clipboard.writeText(jsonString).then(() => {
      alert("تم نسخ JSON بنجاح!");
    });
  };

  return (
    <div className="flex gap-2 mt-2">
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
  );
};

export default ExportButton;
