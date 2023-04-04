import { ChangeEvent, useRef } from "react";

type Props = {
  label: string;
  name: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextAreaField = ({ label, name, placeholder, onChange }: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label} className="capitalize">
        {label}
      </label>
      <textarea
        name={name}
        id={label}
        placeholder={placeholder}
        ref={inputRef}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextAreaField;
