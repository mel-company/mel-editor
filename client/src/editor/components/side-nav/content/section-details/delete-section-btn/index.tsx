import { Shredder, Trash2 } from "lucide-react";
import { useState } from "react";
import useSectionDetails from "../../../../../hooks/editor-section-details";
import { Button } from "../../../../../../shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../../../../../shared/components/ui/dialog";

const DeleteSection = () => {
  const [open, setOpen] = useState(false);
  const { removeSection, section } = useSectionDetails();

  const removable = !!section?.editable

  if (!removable) return null

  return (
    <>
      <button
        disabled={!removable}
        onClick={() => removable && setOpen(true)}
        className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 disabled:hover:bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed active:bg-slate-50 transition-colors cursor-pointer"
      >
        <Trash2 size={16} strokeWidth={1} />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center justify-center gap-4 p-6">
            <div className="p-4 rounded-full bg-red-50 text-red-500">
              <Shredder />
            </div>
            <div className="flex flex-col gap-1 items-center justify-center">
              <DialogTitle className="text-lg font-medium">
                هل انت متأكد من حذف القسم؟
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-500 font-normal text-center">
                لن تتمكن من استعادة التعديلات التي طبقتها على القسم.
              </DialogDescription>
            </div>

            <div className="flex items-center justify-center gap-2 mt-2">
              <Button
                variant="destructive"
                onClick={() => {
                  removeSection();
                  setOpen(false);
                }}
              >
                تأكيد
              </Button>
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                تراجع
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteSection;
