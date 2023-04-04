import { ChangeEvent } from "react";

type Props = {
  label: string;
  name: string;
  inputType: "text" | "number";
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
  label,
  name,
  inputType,
  placeholder,
  onChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label}>{label}</label>
      <input
        type={inputType}
        name={name}
        id={label}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
