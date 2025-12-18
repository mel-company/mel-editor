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
import { useSectionStore } from "../../../../../store/editor/section";
import { SectionType } from "../../../../../types";
import classNames from "classnames";

const EditorSectionList = () => {
  const { sections, setSections } = useSectionStore();

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
        (section) => section.id === active.id
      );
      const newIndex = sections.findIndex((section) => section.id === over?.id);

      setSections(arrayMove(sections, oldIndex, newIndex));
    }
  };

  return (
    <div className="editor-nav-section">
      <h3 className="title">{"الاقسام"}</h3>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections}
          strategy={verticalListSortingStrategy}
        >
          <div className="w-full h-full gap-2 flex flex-col">
            {sections.map((section) => (
              <SectionItem key={section.id} section={section} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
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
  } = useSortable({ id: section.id });

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
      onClick={() => setActiveSectionId(section.id)}
      className={classNames(
        `w-full group p-1.5 rounded-lg bg-slate-50 flex items-center gap-1 relative cursor-pointer select-none ${
          isDragging ? "shadow-lg" : ""
        }`,
        {
          "border-s-4 border-blue-500": activeSectionId === section.id,
        }
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="p-1.5 bg-white hover:ring hover:ring-slate-200 transition-all text-slate-400 rounded-md cursor-col-resize touch-none"
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
