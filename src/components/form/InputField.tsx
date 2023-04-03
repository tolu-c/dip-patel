import { ChangeEvent } from "react";

type Props = {
  label: string;
  inputType: "text" | "number";
  placeholder: string;
  onChange: (value: string) => void;
};

const InputField = ({ label, inputType, placeholder, onChange }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const inputValue = event.target.value;
    onChange(inputValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label}>{label}</label>
      <input
        type={inputType}
        name={label}
        id={label}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;
