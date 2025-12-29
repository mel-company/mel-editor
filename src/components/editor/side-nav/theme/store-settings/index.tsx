import React from "react";
import { useStoreSettingsStore } from "../../../../../store/editor/store-settings";
import { usePageStore } from "../../../../../store/editor/page";
import FileUploadInput from "../../../../ui/file-upload";
import TextInput from "../../../../ui/input";
import SelectList from "../../../../ui/select-list";
import Divider from "../../../../ui/divider";
import { Plus, Trash2 } from "lucide-react";

const EditorStoreSettings = () => {
  const {
    storeSettings,
    setLogo,
    setHeaderLogo,
    setFooterLogo,
    setStoreType,
    updateStoreSettings,
  } = useStoreSettingsStore();
  const { pages } = usePageStore();

  const storeTypeOptions = ["e-commerce", "restaurant"];

  return (
    <div className="editor-nav-section flex flex-col gap-4">
      <div>
        {/* Store Logo */}
        <div className="mt-3">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <FileUploadInput
                label="شعار المتجر"
                value={storeSettings.logo || {}}
                onChange={setLogo}
              />
            </div>
            {(storeSettings.logo?.base64Content || storeSettings.logo?.url) && (
              <button
                onClick={() => setLogo({})}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 mt-6"
                title="حذف الشعار"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Store Name */}
        <div className="mt-3">
          <TextInput
            label="اسم المتجر"
            placeholder="اسم المتجر"
            value={storeSettings.name}
            onChange={(e) => updateStoreSettings({ name: e.target.value })}
          />
        </div>

        {/* Store Description */}
        <div className="mt-3">
          <TextInput
            label="وصف المتجر"
            placeholder="وصف المتجر"
            value={storeSettings.description}
            onChange={(e) =>
              updateStoreSettings({ description: e.target.value })
            }
            lg
          />
        </div>
      </div>

      <Divider />

      {/* Header Settings */}
      <div>
        <h3 className="title">{"الناف بار (Navigation Bar)"}</h3>

        <div className="mt-3">
          <p className="text-sm text-slate-600 mb-2">
            الشعار يأخذ تلقائياً من شعار المتجر
          </p>
        </div>

        {/* Navigation Links - Static (Read-only) */}
        <div className="mt-3">
          <label className="sub-title mb-2 block">روابط التنقل</label>
          <div className="flex flex-col gap-2">
            {storeSettings.header?.navigationLinks?.map((link, index) => {
              const pageLabels = pages.reduce((acc, page) => {
                acc[page.id] = page.name;
                return acc;
              }, {} as Record<string, string>);

              return (
                <div key={link.id} className="flex gap-2 items-center p-2 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <span className="text-xs text-slate-600">
                      {link.label || pageLabels[link.pageId || ""] || "رابط"}
                    </span>
                  </div>
                </div>
              );
            })}
            {(!storeSettings.header?.navigationLinks || storeSettings.header.navigationLinks.length === 0) && (
              <p className="text-xs text-slate-400 p-2">لا توجد روابط</p>
            )}
          </div>
        </div>
      </div>

      <Divider />

      {/* Footer Settings */}
      <div>
        <h3 className="title">{"الفوتر"}</h3>

        <div className="mt-3">
          <p className="text-sm text-slate-600 mb-2">
            الشعار يأخذ تلقائياً من شعار المتجر
          </p>
        </div>

        {/* Footer Links */}
        <div className="mt-3">
          <label className="sub-title mb-2 block">روابط سريعة</label>
          <div className="flex flex-col gap-2">
            {storeSettings.footer?.links?.map((link, index) => {
              const selectedPageId = link.url?.replace("/", "") || "";
              const pageOptions = pages.map((page) => page.name);
              const pageIdMap = pages.reduce((acc, page) => {
                acc[page.name] = page.id;
                return acc;
              }, {} as Record<string, string>);

              return (
                <div key={link.id} className="flex gap-2 items-start">
                  <div className="flex-1 flex flex-col gap-2">
                    <div>
                      <label className="text-xs text-slate-600 mb-1 block">
                        اختر الصفحة
                      </label>
                      <SelectList
                        selected={
                          pages.find((p) => p.id === selectedPageId)?.name || ""
                        }
                        options={pageOptions}
                        setSelected={(pageName) => {
                          const pageId = pageIdMap[pageName];
                          const selectedPage = pages.find(
                            (p) => p.id === pageId
                          );
                          const updatedLinks = [
                            ...(storeSettings.footer?.links || []),
                          ];
                          updatedLinks[index] = {
                            ...link,
                            label: selectedPage?.name || link.label,
                            url: `/${pageId}`,
                          };
                          updateStoreSettings({
                            footer: {
                              ...storeSettings.footer,
                              links: updatedLinks,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const updatedLinks =
                        storeSettings.footer?.links?.filter(
                          (_, i) => i !== index
                        ) || [];
                      updateStoreSettings({
                        footer: {
                          ...storeSettings.footer,
                          links: updatedLinks,
                        },
                      });
                    }}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 mt-1"
                    title="حذف الرابط"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-3">
          <TextInput
            label="نص الفوتر"
            placeholder="نص الفوتر"
            value={storeSettings.footer?.text || ""}
            onChange={(e) =>
              updateStoreSettings({
                footer: { ...storeSettings.footer, text: e.target.value },
              })
            }
            lg
          />
        </div>

        {/* Social Media Links */}
        <div className="mt-3">
          <label className="sub-title mb-2 block">روابط وسائل التواصل الاجتماعي</label>
          <div className="flex flex-col gap-2">
            {storeSettings.footer?.socialLinks?.map((social, index) => {
              const platformOptions = ["Facebook", "Instagram", "Twitter", "Linkedin", "YouTube", "TikTok", "Snapchat"];
              return (
                <div key={social.id} className="flex gap-2 items-start">
                  <div className="flex-1 flex flex-col gap-2">
                    <div>
                      <label className="text-xs text-slate-600 mb-1 block">
                        المنصة
                      </label>
                      <SelectList
                        selected={social.platform || ""}
                        options={platformOptions}
                        setSelected={(platform) => {
                          const updatedSocialLinks = [
                            ...(storeSettings.footer?.socialLinks || []),
                          ];
                          updatedSocialLinks[index] = {
                            ...social,
                            platform,
                          };
                          updateStoreSettings({
                            footer: {
                              ...storeSettings.footer,
                              socialLinks: updatedSocialLinks,
                            },
                          });
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 mb-1 block">
                        الرابط
                      </label>
                      <TextInput
                        label=""
                        placeholder="https://..."
                        value={social.url || ""}
                        onChange={(e) => {
                          const updatedSocialLinks = [
                            ...(storeSettings.footer?.socialLinks || []),
                          ];
                          updatedSocialLinks[index] = {
                            ...social,
                            url: e.target.value,
                          };
                          updateStoreSettings({
                            footer: {
                              ...storeSettings.footer,
                              socialLinks: updatedSocialLinks,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const updatedSocialLinks =
                        storeSettings.footer?.socialLinks?.filter(
                          (_, i) => i !== index
                        ) || [];
                      updateStoreSettings({
                        footer: {
                          ...storeSettings.footer,
                          socialLinks: updatedSocialLinks,
                        },
                      });
                    }}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 mt-1"
                    title="حذف الرابط"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
            <button
              onClick={() => {
                const newSocial = {
                  id: crypto.randomUUID(),
                  platform: "Facebook",
                  url: "",
                };
                const currentSocialLinks = storeSettings.footer?.socialLinks || [];
                updateStoreSettings({
                  footer: {
                    ...storeSettings.footer,
                    socialLinks: [...currentSocialLinks, newSocial],
                  },
                });
              }}
              className="flex items-center justify-center gap-2 p-2 border border-dashed border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة رابط</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorStoreSettings;
