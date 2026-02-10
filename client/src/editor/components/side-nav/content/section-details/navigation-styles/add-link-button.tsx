interface AddLinkButtonProps {
  onAdd: () => void;
}

export const AddLinkButton = ({ onAdd }: AddLinkButtonProps) => {
  return (
    <button
      onClick={onAdd}
      className="w-full py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-2"
    >
      <span>+ إضافة رابط</span>
    </button>
  );
};
