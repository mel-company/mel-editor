import { useSectionStore } from "../../../../../../shared/store/editor/section";
import { Plus } from "lucide-react";
import { useState, useRef } from "react";
import { mockTemplate } from "@templates/data/template";

const NewSectionBtn = () => {
  const { addSection } = useSectionStore();
  const all_sections = mockTemplate.sections?.filter(
    (section) => section.editable !== false
  );
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popupPos, setPopupPos] = useState({ bottom: 0, right: 0 });

  const handleOpen = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPopupPos({
        bottom: window.innerHeight - rect.top + 4,
        right: window.innerWidth - rect.left + 8,
      });
    }
    setOpen(!open);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleOpen}
        className="w-full text-blue-600 hover:text-blue-700 transition-colors cursor-pointer py-2 text-center text-sm"
      >
        اضافة قسم
      </button>

      {open && <div className="fixed inset-0 z-99" onClick={() => setOpen(false)} />}
      {open && (
        <div
          className="fixed no-scrollbar w-56 max-h-72 overflow-y-auto z-100 flex flex-col gap-1.5 shadow-md bg-white rounded-lg p-2 border border-slate-200"
          style={{ bottom: popupPos.bottom, right: popupPos.right }}
        >
          {all_sections?.map((section) => (
            <div
              key={section.id}
              className="p-1 ps-2 gap-2 flex items-center justify-between rounded-lg bg-slate-50 text-xs"
            >
              <span>{section?.options?.[0]?.title}</span>
              <button
                onClick={() => {
                  addSection({ ...section, target_id: crypto.randomUUID() });
                  setOpen(false);
                }}
                className="flex transition-shadow items-center cursor-pointer gap-0.5 text-blue-600 bg-white rounded-md px-2 py-1.5 hover:shadow-sm shadow-slate-200/60"
              >
                <span>{"اضافة"}</span>
                <Plus size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewSectionBtn;
