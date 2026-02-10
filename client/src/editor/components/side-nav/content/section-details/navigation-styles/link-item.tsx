import { Edit, Trash2, Hash, Link } from "lucide-react";

interface LinkItemProps {
  link: {
    id: string;
    label: string;
    url: string;
    linkType?: 'external' | 'section';
    sectionId?: string;
  };
  onEdit: (link: any) => void;
  onDelete: (id: string) => void;
}

export const LinkItem = ({ link, onEdit, onDelete }: LinkItemProps) => {
  return (
    <div
      key={link.id}
      className="bg-slate-50 py-1 px-2.5 rounded-lg border border-slate-100"
    >
      <div className="group flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
        <div className="flex items-center gap-2">
          <div className="text-slate-400">
            {link.linkType === 'section' ? (
              <Hash className="w-4 h-4 text-slate-400" />
            ) : (
              <Link className="w-4 h-4 text-slate-400" />
            )}
          </div>
          <div className="text-xs font-medium text-slate-700">{link.label}</div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(link)}
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="تعديل"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(link.id)}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="حذف"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
