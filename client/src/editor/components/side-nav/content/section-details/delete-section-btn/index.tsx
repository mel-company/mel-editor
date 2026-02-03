import { Shredder, Trash2 } from "lucide-react";
import React from "react";
import useSectionDetails from "../../../../../hooks/editor-section-details";

const DeleteSection = () => {
  const ref = React.useRef<HTMLDialogElement>(null);
  const { removeSection, section } = useSectionDetails();

  const removable = !!section?.editable

  if (!removable) return null

  return (
    <>
      <button
        disabled={!removable}
        onClick={() => removable && ref.current?.showModal()}
        className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 disabled:hover:bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed active:bg-slate-50 transition-colors cursor-pointer"
      >
        <Trash2 size={16} strokeWidth={1} />
      </button>

      <dialog ref={ref} className="modal">
        <div className="modal-box">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="p-4 rounded-full bg-red-50 text-red-500">
              <Shredder />
            </div>
            <div className="flex flex-col gap-1 items-center justify-center">
              <h1 className="text-lg font-medium">
                هل انت متأكد من حذف القسم؟
              </h1>
              <p className="text-sm text-slate-500 font-normal">
                لن تتمكن من استعادة التعديلات التي طبقتها على القسم.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 mt-2">
              <button
                className="btn btn-error rounded-lg"
                onClick={() => {
                  removeSection();
                  ref.current?.close();
                }}
              >
                تأكيد
              </button>
              <button
                onClick={() => ref.current?.close()}
                className="btn btn-ghost rounded-lg text-slate-600"
              >
                تراجع
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteSection;
