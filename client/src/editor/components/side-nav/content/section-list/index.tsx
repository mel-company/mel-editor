import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ListChevronsUpDown } from "lucide-react";
import { useSectionStore } from "../../../../../shared/store/editor/section";
import { usePageStore } from "../../../../../shared/store/editor/page";
import { SectionType } from "../../../../../types";
import classNames from "classnames";
import Divider from "../../../../../shared/components/ui/divider";

const EditorSectionList = () => {
  const { getSections, setSections } = useSectionStore();
  const { getCurrentPage } = usePageStore();
  const currentPage = getCurrentPage();
  const sections = getSections();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex(
        (section) => section.target_id === active.id
      );
      const newIndex = sections.findIndex(
        (section) => section.target_id === over?.id
      );

      setSections(arrayMove(sections, oldIndex, newIndex));
    }
  };

  return (
    <div className="h-full flex flex-col justify-end mb-4">
      <div className="editor-nav-section">
        <Divider />
        <div className="flex items-center justify-between mb-2">
          <h3 className="title">{"الاقسام"}</h3>
          {currentPage && (
            <span className="text-xs text-slate-500">
              ({sections.length} قسم)
            </span>
          )}
        </div>
        {currentPage && (
          <p className="text-xs text-slate-500 mb-3">
            أقسام صفحة: <span className="font-medium text-slate-700">{currentPage.name}</span>
          </p>
        )}
        {sections.length === 0 ? (
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <p className="text-xs text-slate-500">
              لا توجد أقسام في هذه الصفحة
            </p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((section) => section.target_id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="w-full h-full gap-2 flex flex-col">
                {sections.map((section, index) => {
                  return (
                    <SectionItem key={section?.target_id} section={section} />
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};

export default EditorSectionList;

const SectionItem = ({ section }: { section: SectionType }) => {
  const { activeSectionId, setActiveSectionId } = useSectionStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.target_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  const option = section?.options?.find(
    (option) => option?.id === section?.section_id
  );
  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => setActiveSectionId(section.target_id)}
      className={classNames(
        `w-full border-e-8 transition-all group p-1.5 rounded-lg bg-slate-50 flex items-center gap-1 relative cursor-pointer select-none ${
          isDragging ? "shadow-lg" : ""
        }`,
        {
          "border-slate-200": activeSectionId !== section.target_id,
          "border-blue-500": activeSectionId === section.target_id,
        }
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="p-1.5 bg-white transition-all text-slate-400 hover:text-slate-500 rounded-md cursor-col-resize touch-none"
      >
        <ListChevronsUpDown size={16} />
      </div>
      <span className="text-xs select-none">{option?.title}</span>
      <div className="absolute delay-150 pointer-events-none top-1/2 end-0 rounded-xl -translate-x-full -translate-y-1/2 overflow-hidden bg-slate-100 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <img className="w-32" src={option?.thumbnail?.url} alt="" />
      </div>
    </div>
  );
};
