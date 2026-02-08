import { Select } from "../select";

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
    <Select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};

export default SelectList;
