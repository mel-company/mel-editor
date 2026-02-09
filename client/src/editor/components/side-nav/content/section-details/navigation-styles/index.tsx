import { useState } from "react";
import ColorPickerBar from "../../../../../../shared/components/ui/color-picker-bar";
import { useStoreSettingsStore } from "../../../../../../shared/store/editor/store-settings";
import { usePageStore } from "../../../../../../shared/store/editor/page";

const NavigationLinks = () => {
  const { storeSettings, updateStoreSettings } = useStoreSettingsStore();
  const { getCurrentPage } = usePageStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLinkType, setNewLinkType] = useState<'external' | 'section'>('external');
  const [newSectionId, setNewSectionId] = useState("");

  const links = storeSettings.header?.navigationLinks || [];
  const currentPage = getCurrentPage();
  // Filter out navigation and footer sections, only show content sections
  const allSections = currentPage?.sections || [];
  const sections = allSections.filter(s => s.type !== 'navigation' && s.type !== 'footer');

  console.log('Navigation Links Debug:', {
    currentPage,
    allSectionsCount: allSections.length,
    filteredSectionsCount: sections.length,
    sections: sections.map(s => ({
      id: s.id,
      target_id: s.target_id,
      type: s.type,
      title: s.options?.[0]?.title
    }))
  });

  const handleAdd = () => {
    console.log('handleAdd called:', { newLabel, newLinkType, newSectionId, newUrl });

    if (!newLabel) {
      console.log('Validation failed: No label');
      return;
    }
    if (newLinkType === 'section' && !newSectionId) {
      console.log('Validation failed: Section type but no section selected');
      return;
    }
    if (newLinkType === 'external' && !newUrl) {
      console.log('Validation failed: External type but no URL');
      return;
    }

    const newLink = {
      id: Date.now().toString(),
      label: newLabel,
      url: newLinkType === 'external' ? newUrl : "",
      linkType: newLinkType,
      sectionId: newLinkType === 'section' ? newSectionId : undefined,
      pageId: undefined, // Explicitly set to undefined to prevent page navigation
    };

    console.log('Adding new link:', newLink);

    updateStoreSettings({
      header: {
        ...storeSettings.header,
        navigationLinks: [...links, newLink],
      },
    });
    setIsAdding(false);
    setNewLabel("");
    setNewUrl("");
    setNewLinkType('external');
    setNewSectionId("");
  };

  const handleUpdate = (id: string) => {
    if (!newLabel) return;
    if (newLinkType === 'section' && !newSectionId) return;
    if (newLinkType === 'external' && !newUrl) return;

    const updatedLinks = links.map((link) =>
      link.id === id ? {
        ...link,
        label: newLabel,
        url: newLinkType === 'external' ? newUrl : "",
        linkType: newLinkType,
        sectionId: newLinkType === 'section' ? newSectionId : undefined,
        pageId: newLinkType === 'section' ? undefined : link.pageId, // Explicitly set to undefined to prevent page navigation
      } : link
    );
    updateStoreSettings({
      header: {
        ...storeSettings.header,
        navigationLinks: updatedLinks,
      },
    });
    setEditingId(null);
    setNewLabel("");
    setNewUrl("");
    setNewLinkType('external');
    setNewSectionId("");
  };

  const handleDelete = (id: string) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    updateStoreSettings({
      header: {
        ...storeSettings.header,
        navigationLinks: updatedLinks,
      },
    });
  };

  const startEdit = (link: any) => {
    setEditingId(link.id);
    setNewLabel(link.label);
    setNewUrl(link.url || "");
    setNewLinkType(link.linkType || 'external');
    setNewSectionId(link.sectionId || "");
    setIsAdding(false);
  };

  return (
    <div className="mt-6 border-t pt-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="title text-sm">شريط التنقل</h4>
      </div>

      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-slate-50 p-3 rounded-lg border border-slate-100"
          >
            {editingId === link.id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="النصوص"
                  className="w-full text-sm p-2 rounded border"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setNewLinkType('external')}
                    className={`flex-1 text-xs py-2 px-3 rounded border transition-colors ${newLinkType === 'external'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                      }`}
                  >
                    رابط خارجي
                  </button>
                  <button
                    onClick={() => setNewLinkType('section')}
                    className={`flex-1 text-xs py-2 px-3 rounded border transition-colors ${newLinkType === 'section'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                      }`}
                  >
                    قسم في الصفحة
                  </button>
                </div>
                {newLinkType === 'external' ? (
                  <input
                    type="text"
                    placeholder="الرابط"
                    className="w-full text-sm p-2 rounded border"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                  />
                ) : (
                  <select
                    className="w-full text-sm p-2 rounded border"
                    value={newSectionId}
                    onChange={(e) => setNewSectionId(e.target.value)}
                  >
                    <option value="">اختر قسم</option>
                    {sections.map((section, index) => {
                      const sectionId = section.target_id || section.id;
                      const sectionTitle = section.options?.[0]?.title || section.type || `قسم ${index + 1}`;
                      return (
                        <option key={sectionId} value={sectionId}>
                          {sectionTitle}
                        </option>
                      );
                    })}
                  </select>
                )}
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-xs text-slate-500 hover:text-slate-700"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={() => handleUpdate(link.id)}
                    className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    حفظ
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-slate-700">
                    {link.label}
                  </span>
                  <span className="text-xs text-slate-500">
                    {link.linkType === 'section' ? '🔗 قسم في الصفحة' : '🌐 رابط خارجي'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(link)}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(link.id)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    حذف
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {isAdding ? (
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col gap-2">
            <input
              type="text"
              placeholder="النصوص"
              className="w-full text-sm p-2 rounded border"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={() => setNewLinkType('external')}
                className={`flex-1 text-xs py-2 px-3 rounded border transition-colors ${newLinkType === 'external'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                  }`}
              >
                رابط خارجي
              </button>
              <button
                onClick={() => setNewLinkType('section')}
                className={`flex-1 text-xs py-2 px-3 rounded border transition-colors ${newLinkType === 'section'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                  }`}
              >
                قسم في الصفحة
              </button>
            </div>
            {newLinkType === 'external' ? (
              <input
                type="text"
                placeholder="الرابط"
                className="w-full text-sm p-2 rounded border"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
            ) : (
              <select
                className="w-full text-sm p-2 rounded border"
                value={newSectionId}
                onChange={(e) => setNewSectionId(e.target.value)}
              >
                <option value="">اختر قسم</option>
                {sections.map((section, index) => (
                  <option key={section.target_id || section.id} value={section.target_id || section.id}>
                    {section.options?.[0]?.title || `قسم ${index + 1}`}
                  </option>
                ))}
              </select>
            )}
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setIsAdding(false)}
                className="text-xs text-slate-500 hover:text-slate-700"
              >
                إلغاء
              </button>
              <button
                onClick={handleAdd}
                className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                إضافة
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              setIsAdding(true);
              setEditingId(null);
              setNewLabel("");
              setNewUrl("");
              setNewLinkType('external');
              setNewSectionId("");
            }}
            className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            + إضافة رابط
          </button>
        )}
      </div>
    </div>
  );
};

const NavigationStyles = () => {
  const { storeSettings, updateStoreSettings } = useStoreSettingsStore();
  const [open, setOpen] = useState("");

  const headerStyles = storeSettings.header?.styles || {
    backgroundColor: "#FFFFFF",
    textColor: "#1D293D",
  };

  const updateHeaderStyles = (newStyles: Partial<typeof headerStyles>) => {
    updateStoreSettings({
      header: {
        ...storeSettings.header,
        styles: {
          ...headerStyles,
          ...newStyles,
        },
      },
    });
  };

  return (
    <div className="editor-nav-section">
      <h3 className="title">{"أنماط شريط التنقل"}</h3>

      <div className="flex flex-col gap-3">
        <div>
          <h4 className="sub-title mb-2">{"لون الخلفية"}</h4>
          <ColorPickerBar
            label="الخلفية"
            value={headerStyles.backgroundColor || "#FFFFFF"}
            onChange={(value) => updateHeaderStyles({ backgroundColor: value })}
            open={open}
            setOpen={setOpen}
          />
        </div>

        <div>
          <h4 className="sub-title mb-2">{"لون النص"}</h4>
          <ColorPickerBar
            label="النص"
            value={headerStyles.textColor || "#1D293D"}
            onChange={(value) => updateHeaderStyles({ textColor: value })}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>

      <NavigationLinks />


    </div>
  );
};

export default NavigationStyles;

