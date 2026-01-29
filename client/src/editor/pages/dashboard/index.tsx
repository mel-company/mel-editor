import React from "react";
import { useNavigate } from "react-router-dom";
import { usePageStore } from "../../../shared/store/editor/page";
import { useStoreSettingsStore } from "../../../shared/store/editor/store-settings";
import { FileEdit, Eye, Layout, Store, Globe, UploadCloud } from "lucide-react";
import { publishStore } from "../../../shared/api/production";
import { useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { pages } = usePageStore();
  const { storeSettings } = useStoreSettingsStore();
  const hasPages = pages.length > 0;
  const [isPublishing, setIsPublishing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [publishStatus, setPublishStatus] = useState<"idle" | "success" | "error">("idle");

  const handlePublish = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
      return;
    }

    setIsPublishing(true);
    setShowConfirm(false);
    setPublishStatus("idle");

    try {
      await publishStore();
      setPublishStatus("success");
      setTimeout(() => setPublishStatus("idle"), 3000);
    } catch (error) {
      console.error("Publish error:", error);
      setPublishStatus("error");
      setTimeout(() => setPublishStatus("idle"), 5000);
    } finally {
      setIsPublishing(false);
    }
  };

  let publishBtnText = isPublishing ? "جاري النشر..." : "نشر";
  let publishBtnColor = hasPages && !isPublishing
    ? "bg-indigo-600 text-white hover:bg-indigo-700"
    : "bg-slate-200 text-slate-400 cursor-not-allowed";

  if (showConfirm) {
    publishBtnText = "هل أنت متأكد؟";
    publishBtnColor = "bg-orange-500 text-white hover:bg-orange-600";
  } else if (publishStatus === "success") {
    publishBtnText = "تم النشر!";
    publishBtnColor = "bg-green-600 text-white";
  } else if (publishStatus === "error") {
    publishBtnText = "فشل النشر";
    publishBtnColor = "bg-red-600 text-white";
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">لوحة التحكم</h1>
          <p className="text-slate-600">
            إدارة متجرك وتخصيص تصميمه وعرضه للزوار
          </p>
        </div>

        {/* Store Info Card */}
        {storeSettings.name && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-slate-200">
            <div className="flex items-center gap-4">
              {storeSettings.logo?.base64Content || storeSettings.logo?.url ? (
                <img
                  src={
                    storeSettings.logo?.base64Content ||
                    storeSettings.logo?.url
                  }
                  alt={storeSettings.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
                  <Store className="w-8 h-8 text-slate-400" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {storeSettings.name}
                </h2>
                {storeSettings.description && (
                  <p className="text-slate-600 text-sm mt-1">
                    {storeSettings.description}
                  </p>
                )}
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {storeSettings.type === "restaurant" ? "مطعم" : "متجر إلكتروني"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Editor Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileEdit className="w-6 h-6 text-blue-600" />
              </div>
              {hasPages && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                  جاهز
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">المحرر</h3>
            <p className="text-slate-600 text-sm mb-4">
              {hasPages
                ? "عدّل صفحات متجرك وأضف المحتوى"
                : "ابدأ باختيار قالب لإنشاء متجرك"}
            </p>
            <button
              onClick={() => navigate(hasPages ? "/editor" : "/")}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {hasPages ? "فتح المحرر" : "اختيار قالب"}
            </button>
          </div>

          {/* Store View Card (Preview) */}
          <div
            className={`bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow ${!hasPages ? "opacity-50" : ""
              }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              معاينة المسودة
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              شاهد التغييرات قبل النشر
            </p>
            <button
              onClick={() => navigate("/store-view")}
              disabled={!hasPages}
              className={`w-full px-4 py-2 rounded-lg transition-colors font-medium ${hasPages
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
            >
              معاينة
            </button>
          </div>

          {/* Production / Publish Card */}
          <div
            className={`bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow ${!hasPages ? "opacity-50" : ""
              }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Globe className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              نشر المتجر
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              نشر التغييرات للمتجر الحي
            </p>
            <div className="flex gap-2">
              <button
                onClick={handlePublish}
                disabled={!hasPages || isPublishing}
                className={`flex-1 px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm flex items-center justify-center gap-1 ${publishBtnColor}`}
              >
                {!isPublishing && publishStatus === "idle" && !showConfirm && <UploadCloud className="w-4 h-4" />}
                {publishBtnText}
              </button>
              <button
                onClick={() => window.open("/", "_blank")}
                disabled={!hasPages}
                className={`px-3 py-2 rounded-lg transition-colors font-medium text-sm border ${hasPages
                  ? "border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  : "border-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
              >
                زيارة
              </button>
            </div>
          </div>

          {/* Templates Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Layout className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">القوالب</h3>
            <p className="text-slate-600 text-sm mb-4">
              اختر قالب جديد أو غيّر القالب الحالي
            </p>
            <button
              onClick={() => navigate("/templates")}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              تصفح القوالب
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        {hasPages && (
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              إحصائيات سريعة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-800">
                  {pages.length}
                </div>
                <div className="text-sm text-slate-600 mt-1">عدد الصفحات</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-800">
                  {pages.reduce((acc, page) => acc + page.sections.length, 0)}
                </div>
                <div className="text-sm text-slate-600 mt-1">عدد الأقسام</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-800">
                  {storeSettings.type === "restaurant" ? "مطعم" : "متجر"}
                </div>
                <div className="text-sm text-slate-600 mt-1">نوع المتجر</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

