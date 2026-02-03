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
import { ListChevronsUpDown, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSectionStore } from "../../../../../shared/store/editor/section";
import { usePageStore } from "../../../../../shared/store/editor/page";
import { SectionType, SectionOptionType } from "../../../../../shared/types";
import NewSectionBtn from "./new-section-btn";
import classNames from "classnames";

const EditorSectionList = () => {
  const { getSections, setSections, activeSectionId } = useSectionStore();
  const { getCurrentPage } = usePageStore();
  const currentPage = getCurrentPage();
  const sections = getSections({ onlyEditable: true });
  const [isCollapsed, setIsCollapsed] = useState(!!activeSectionId);
  const prevActiveSectionId = useRef(activeSectionId);

  useEffect(() => {
    // Only auto-collapse when going from no selection to having one
    if (!prevActiveSectionId.current && activeSectionId) {
      setIsCollapsed(true);
    }
    // Only auto-expand when going from selection to none
    if (prevActiveSectionId.current && !activeSectionId) {
      setIsCollapsed(false);
    }
    prevActiveSectionId.current = activeSectionId;
  }, [activeSectionId]);

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
    <div className="flex flex-col justify-end z-10 bg-white shrink-0" style={!isCollapsed ? { boxShadow: "0px -4px 8px -2px rgba(0, 0, 0, 0.025)" } : { boxShadow: "none" }}>
      <div className="h-px bg-slate-100 w-full" />

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-between my-2 w-full rounded-md"
      >
        <div className="flex items-center gap-1">
          <ChevronDown
            size={16}
            className={`text-slate-400 transition-transform duration-300 ${isCollapsed ? "-rotate-90" : ""}`}
          />
          <h3 className="title">{"الاقسام"}</h3>
        </div>
        {currentPage && (
          <span className="text-xs text-slate-500">
            ({sections.length} قسم)
          </span>
        )}
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${isCollapsed ? "max-h-0 overflow-hidden" : "max-h-[500px] overflow-y-auto"}`}
      >

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
              items={sections.map((section) => section.target_id).filter((id): id is string => id !== undefined)}
              strategy={verticalListSortingStrategy}
            >
              <div className="w-full h-full gap-2 flex flex-col">
                {sections.map((section) => {
                  return (
                    <SectionItem key={section?.target_id} section={section} />
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
      {!isCollapsed && (
        <div className="mt-2">
          <NewSectionBtn />
        </div>
      )}
    </div>
  );
};

export default EditorSectionList;

const SectionItem = ({ section }: { section: SectionType }) => {
  const { activeSectionId, setActiveSectionId } = useSectionStore();
  const [thumbPos, setThumbPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.target_id ?? "" });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  const option = section?.options?.find(
    (option: SectionOptionType) => option?.id === section?.section_id
  );

  const handleMouseEnter = () => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setThumbPos({ top: rect.top + rect.height / 2, left: rect.left });
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        (itemRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      style={style}
      onClick={() => section.target_id && setActiveSectionId(section.target_id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classNames(
        `w-full transition-all bg-slate-50/70 group py-2 px-1 rounded-lg flex items-center justify-end relative cursor-pointer select-none ${isDragging ? "shadow-lg bg-slate-50" : "hover:bg-slate-50/50"
        }`,
        {
          "bg-slate-50": activeSectionId === section.target_id,
        }
      )}
    >
      <div className={classNames("h-full absolute w-2.5 rounded-e-full top-0 end-0 transition-colors", {
        "bg-linear-45 from-blue-400 to-blue-500": activeSectionId === section.target_id,
        "bg-slate-100": activeSectionId !== section.target_id,
      })} />

      <div className="flex items-center gap-2 w-full group">
        <div
          {...attributes}
          {...listeners}
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-500 cursor-grab touch-none bg-white"
        >
          <ListChevronsUpDown size={16} />
        </div>
        <span className="text-xs select-none w-full">{option?.title}</span>
      </div>
      <div
        style={{ top: thumbPos.top, left: thumbPos.left }}
        className={classNames(
          "fixed pointer-events-none rounded-xl overflow-hidden bg-slate-100 z-100 -translate-y-1/2 -translate-x-[calc(100%+1rem)] transition-opacity duration-300",
          {
            "opacity-100": isHovered,
            "opacity-0": !isHovered,
          }
        )}
      >
        <img className="w-32" src={option?.thumbnail?.url} alt="" />
      </div>


    </div>
  );
};
