import React, { useState } from "react";
import { useStoreSettingsStore } from "../../../../../store/editor/store-settings";
import { usePageStore } from "../../../../../store/editor/page";
import FileUploadInput from "../../../../ui/file-upload";
import TextInput from "../../../../ui/input";
import SelectList from "../../../../ui/select-list";
import Divider from "../../../../ui/divider";
import ColorPickerBar from "../../../../ui/color-picker-bar";
import { Plus, Trash2 } from "lucide-react";
import FileUploadBar from "../../../../ui/file-upload/bar";

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
            <FileUploadBar label="الشعار"
              value={storeSettings.logo || {}}
              onChange={setLogo} />
            {/* <FileUploadInput
                label="شعار المتجر"
                value={storeSettings.logo || {}}
                onChange={setLogo}
              /> */}

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


      {/* Header Settings */}
      {/* <div>
        <h3 className="title">{"الناف بار (Navigation Bar)"}</h3>

        <div className="mt-3">
          <p className="text-sm text-slate-600 mb-2">
            الشعار يأخذ تلقائياً من شعار المتجر
          </p>
        </div>

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
      </div> */}


      {/* Footer Settings */}
      {/* <div>
        <h3 className="title">{"الفوتر"}</h3>

        <div className="mt-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={storeSettings.footer?.showFooter !== false}
              onChange={(e) => {
                updateStoreSettings({
                  footer: {
                    ...storeSettings.footer,
                    showFooter: e.target.checked,
                  },
                });
              }}
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-sm font-medium text-slate-700">
              إظهار الفوتر
            </span>
          </label>
          <p className="text-xs text-slate-500 mt-1">
            {storeSettings.footer?.showFooter !== false
              ? "الفوتر سيظهر في جميع الصفحات"
              : "الفوتر مخفي في جميع الصفحات"}
          </p>
        </div>

        {storeSettings.footer?.showFooter !== false && (
          <>
            <Divider />

            <div className="mt-3">
              <label className="sub-title mb-2 block">نوع التصميم</label>
              <SelectList
                selected={
                  storeSettings.footer?.footerVariant
                    ? `Footer ${storeSettings.footer.footerVariant}`
                    : "Footer 1"
                }
                options={["Footer 1", "Footer 2", "Footer 3"]}
                setSelected={(selected) => {
                  const variant = selected.replace("Footer ", "");
                  updateStoreSettings({
                    footer: {
                      ...storeSettings.footer,
                      footerVariant: variant,
                    },
                  });
                }}
              />
              <p className="text-xs text-slate-500 mt-1">
                {storeSettings.footer?.footerVariant === "1" && "تصميم داكن مع تدرج لوني"}
                {storeSettings.footer?.footerVariant === "2" && "تصميم فاتح بسيط"}
                {storeSettings.footer?.footerVariant === "3" && "تصميم بسيط ومختصر"}
              </p>
            </div>

            <Divider />

            <div className="mt-3">
              <h4 className="sub-title mb-3">المحتوى</h4>

              <div className="flex flex-col gap-3">
                <TextInput
                  label="عنوان الفوتر"
                  placeholder="مثال: عن المتجر"
                  value={storeSettings.footer?.title || ""}
                  onChange={(e) =>
                    updateStoreSettings({
                      footer: { ...storeSettings.footer, title: e.target.value },
                    })
                  }
                />

                <TextInput
                  label="وصف الفوتر"
                  placeholder="وصف قصير عن المتجر"
                  value={storeSettings.footer?.description || ""}
                  onChange={(e) =>
                    updateStoreSettings({
                      footer: { ...storeSettings.footer, description: e.target.value },
                    })
                  }
                  lg
                />

                <TextInput
                  label="نص إضافي"
                  placeholder="نص إضافي للفوتر"
                  value={storeSettings.footer?.text || ""}
                  onChange={(e) =>
                    updateStoreSettings({
                      footer: { ...storeSettings.footer, text: e.target.value },
                    })
                  }
                  lg
                />
              </div>
            </div>

            <Divider />

            <div className="mt-3">
              <h4 className="sub-title mb-3">معلومات الاتصال</h4>

              <div className="flex flex-col gap-3">
                <TextInput
                  label="البريد الإلكتروني"
                  placeholder="info@example.com"
                  value={storeSettings.footer?.contactInfo?.email || ""}
                  onChange={(e) =>
                    updateStoreSettings({
                      footer: {
                        ...storeSettings.footer,
                        contactInfo: {
                          ...storeSettings.footer?.contactInfo,
                          email: e.target.value,
                        },
                      },
                    })
                  }
                />

                <TextInput
                  label="رقم الهاتف"
                  placeholder="+123 456 7890"
                  value={storeSettings.footer?.contactInfo?.phone || ""}
                  onChange={(e) =>
                    updateStoreSettings({
                      footer: {
                        ...storeSettings.footer,
                        contactInfo: {
                          ...storeSettings.footer?.contactInfo,
                          phone: e.target.value,
                        },
                      },
                    })
                  }
                />

                <TextInput
                  label="العنوان"
                  placeholder="الرياض، المملكة العربية السعودية"
                  value={storeSettings.footer?.contactInfo?.address || ""}
                  onChange={(e) =>
                    updateStoreSettings({
                      footer: {
                        ...storeSettings.footer,
                        contactInfo: {
                          ...storeSettings.footer?.contactInfo,
                          address: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>

            <Divider />

            <div className="mt-3">
              <h4 className="sub-title mb-3">الألوان</h4>
              <FooterColorsEditor />
            </div>

            <Divider />

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
          </>
        )}
      </div> */}
    </div>
  );
};

// Footer Colors Editor Component
const FooterColorsEditor = () => {
  const { storeSettings, updateStoreSettings } = useStoreSettingsStore();
  const [open, setOpen] = useState("");

  const styles = storeSettings.footer?.styles || {
    backgroundColor: "#1e293b",
    textColor: "#ffffff",
    padding: "",
    margin: "",
  };

  const updateStyles = (newStyles: Partial<typeof styles>) => {
    updateStoreSettings({
      footer: {
        ...storeSettings.footer,
        styles: {
          ...styles,
          ...newStyles,
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h5 className="text-xs text-slate-600 mb-2">لون الخلفية</h5>
        <ColorPickerBar
          label="الخلفية"
          value={styles.backgroundColor || "#1e293b"}
          onChange={(value) => updateStyles({ backgroundColor: value })}
          open={open}
          setOpen={setOpen}
        />
      </div>

      <div>
        <h5 className="text-xs text-slate-600 mb-2">لون النص</h5>
        <ColorPickerBar
          label="النص"
          value={styles.textColor || "#ffffff"}
          onChange={(value) => updateStyles({ textColor: value })}
          open={open}
          setOpen={setOpen}
        />
      </div>

      {/* <div>
        <h5 className="text-xs text-slate-600 mb-2">المسافات الداخلية</h5>
        <input
          type="text"
          value={styles.padding || ""}
          onChange={(e) => updateStyles({ padding: e.target.value })}
          placeholder="مثال: 20px أو 1rem"
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <h5 className="text-xs text-slate-600 mb-2">المسافات الخارجية</h5>
        <input
          type="text"
          value={styles.margin || ""}
          onChange={(e) => updateStyles({ margin: e.target.value })}
          placeholder="مثال: 20px أو 1rem"
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}
    </div>
  );
};

export default EditorStoreSettings;
