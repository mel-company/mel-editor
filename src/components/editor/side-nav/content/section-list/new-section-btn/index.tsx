import classNames from "classnames";
import { useSectionStore } from "../../../../../../store/editor/section";
import { Plus } from "lucide-react";
import { useState } from "react";
import { mockTemplate } from "../../../../../../mock/template";

const NewSectionBtn = () => {
  const { setSections, sections } = useSectionStore();
  const all_sections = mockTemplate.sections?.filter(
    (section) => section.editable
  );
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full border-2 border-dashed border-slate-200 mt-1 text-slate-500 transition-colors cursor-pointer py-2.5 rounded-lg bg-slate-50/50 hover:bg-slate-50 active:bg-slate-50/50 text-center text-xs"
      >
        اضافة قسم
      </button>

      <div
        className={classNames(
          "absolute ease-in-out duration-150 transition-all max-h-72 overflow-y-auto z-50 flex flex-col gap-1.5 shadow-lg shadow-slate-200 bottom-0 end-2 bg-white rounded-lg p-2",
          {
            "-translate-x-2/3 translate-y-2 opacity-0 scale-90 pointer-events-none":
              !open,
            "-translate-x-full translate-y-0 scale-100 opacity-100": open,
          }
        )}
      >
        {all_sections?.map((section) => (
          <div
            key={section.id}
            className="p-1 ps-2 gap-2 flex items-center justify-between rounded-lg bg-slate-50 text-xs"
          >
            <span>{section?.options[0]?.title}</span>
            <button
              onClick={() => {
                setSections([
                  ...sections,
                  { ...section, target_id: crypto.randomUUID() },
                ]);
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
    </div>
  );
};

export default NewSectionBtn;
