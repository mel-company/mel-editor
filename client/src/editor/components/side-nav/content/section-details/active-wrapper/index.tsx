import { PenOff, SquaresIntersect } from "lucide-react";
import { ReactNode } from "react";
import useSectionDetails from "../../../../../hooks/editor-section-details";

const ActiveSectionWrapper = ({ children }: { children: ReactNode }) => {
  const { section, activeSectionId } = useSectionDetails();
  if (!activeSectionId) return <InActive />;
  if (section?.editable === false) return <NotEditable />;
  return children;
};

export default ActiveSectionWrapper;

const InActive = () => (
  <div className="flex flex-col select-none gap-2 p-6 items-center justify-center rounded-lg bg-slate-50">
    <SquaresIntersect strokeWidth={1.8} className="text-slate-400" />
    <p className="sub-title text-center mx-2">
      {"يمكنك تعديل معلومات القسم بعد تحديده"}
    </p>
  </div>
);

const NotEditable = () => (
  <div className="flex flex-col select-none gap-2 p-6 items-center justify-center rounded-lg bg-slate-50">
    <div className="p-1.5 border-[1.6px] border-dashed border-slate-300 rounded-lg">
      <PenOff size={16} className="text-slate-400" />
    </div>
    <p className="sub-title text-center mb-1">{"لايمكن تعديل هذا القسم"}</p>
  </div>
);
