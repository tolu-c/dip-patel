import { ChangeEvent, useRef } from "react";

type Props = {
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const TextAreaField = ({ label, placeholder, onChange }: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const inputValue = inputRef?.current?.value ?? "";
    onChange(inputValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label} className="capitalize">
        {label}
      </label>
      <textarea
        name={label}
        id={label}
        placeholder={placeholder}
        ref={inputRef}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default TextAreaField;
