import classNames from "classnames";

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
  return (
    <div className="flex flex-col gap-1">
      <label className="sub-title">{label}</label>
      <div
        className={classNames(
          "w-full max-w-sm bg-slate-50 active:border-slate-100 focus:border-slate-100 rounded-xl p-1",
          {
            "h-24": lg,
          }
        )}
      >
        {lg ? (
          <textarea
            className="w-full rounded-xl p-2 text-sm h-full resize-none outline-none"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        ) : (
          <input
            type="text"
            className="w-full rounded-xl p-2 text-sm h-full outline-none"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};

export default TextInput;
