const SelectList = ({
  options,
  selected,
  setSelected,
}: {
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
}) => {
  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      className="select border-none rounded-lg bg-slate-50 active:border-none active:outline-none focus:border-none focus:outline-none focus:ring-0"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectList;
