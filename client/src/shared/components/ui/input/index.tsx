import classNames from "classnames";
import { useState, useEffect, useRef } from "react";

const TextInput = ({
  placeholder,
  label,
  lg,
  value,
  onChange,
}: {
  placeholder: string;
  label: string;
  lg?: boolean;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  // Use local state to handle immediate typing, sync with external value
  const [localValue, setLocalValue] = useState(value);
  const isTypingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync local state with external value, but only when not actively typing
  useEffect(() => {
    if (!isTypingRef.current) {
      setLocalValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    isTypingRef.current = true;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reset typing flag after a short delay to allow external sync
    timeoutRef.current = setTimeout(() => {
      isTypingRef.current = false;
    }, 300);

    // Propagate change to parent
    onChange(e);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="sub-title">{label}</label>
      {lg ? (
        <textarea
          className="w-full rounded-xl p-2 text-sm h-full resize-none outline-none border border-slate-200"
          placeholder={placeholder}
          value={localValue}
          onChange={handleChange}
        />
      ) : (
        <input
          type="text"
          className="w-full rounded-lg p-2 text-sm h-full outline-none border border-slate-200"
          placeholder={placeholder}
          value={localValue}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default TextInput;
