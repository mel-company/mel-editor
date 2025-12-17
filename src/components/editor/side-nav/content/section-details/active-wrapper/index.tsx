import { useSectionStore } from "../../../../../../store/editor/section";
import { SquaresIntersect } from "lucide-react";
import { ReactNode } from "react";

const ActiveSectionWrapper = ({ children }: { children: ReactNode }) => {
  const { activeSectionId } = useSectionStore();
  if (!activeSectionId) return <InActive />;
  return children;
};

export default ActiveSectionWrapper;

const InActive = () => (
  <div className="flex flex-col select-none gap-2 p-6 items-center justify-center rounded-lg bg-slate-50">
    <SquaresIntersect strokeWidth={1.8} className="text-slate-400" />
    <p className="sub-title text-center mx-8">
      {"يمكنك تعديل معلومات القسم بعد تحديده"}
    </p>
  </div>
);
