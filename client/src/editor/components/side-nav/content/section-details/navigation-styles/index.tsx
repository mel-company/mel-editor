import { useState } from "react";
import ColorPickerBar from "../../../../../../shared/components/ui/color-picker-bar";
import { useStoreSettingsStore } from "../../../../../../shared/store/editor/store-settings";

const NavigationLinks = () => {
  const { storeSettings, updateStoreSettings } = useStoreSettingsStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const links = storeSettings.header?.navigationLinks || [];

  const handleAdd = () => {
    if (!newLabel) return;
    const newLink = {
      id: Date.now().toString(),
      label: newLabel,
      url: newUrl || "#",
    };
    updateStoreSettings({
      header: {
        ...storeSettings.header,
        navigationLinks: [...links, newLink],
      },
    });
    setIsAdding(false);
    setNewLabel("");
    setNewUrl("");
  };

  const handleUpdate = (id: string) => {
    if (!newLabel) return;
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, label: newLabel, url: newUrl } : link
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
    setNewUrl(link.url);
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
                <input
                  type="text"
                  placeholder="الرابط"
                  className="w-full text-sm p-2 rounded border"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                />
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
                <span className="text-sm font-medium text-slate-700">
                  {link.label}
                </span>
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
            <input
              type="text"
              placeholder="الرابط"
              className="w-full text-sm p-2 rounded border"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
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

