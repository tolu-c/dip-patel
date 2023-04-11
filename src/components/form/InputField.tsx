import { useState, useRef } from "react";

interface Props {
  label: string;
  name: string;
  inputType: "text" | "number";
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  onChange: (value: string, name: string) => void;
}

const InputField = ({
  label,
  name,
  inputType,
  placeholder,
  onChange,
  required,
  minLength,
  maxLength,
}: Props) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    const value = inputRef.current?.value || "";
    const isValid = validateInput(value);
    setIsValid(isValid);
    onChange(value, name);
  };

  const validateInput = (value: string): boolean => {
    if (inputType === "text") {
      if (required && value.trim() === "") {
        setErrorText(`${label} cannot be empty.`);
        return false;
      }
      if (minLength && value.trim().length < minLength) {
        setErrorText(
          `${label} has to be at least ${minLength} characters long.`
        );
        return false;
      }
      if (maxLength && value.trim().length > maxLength) {
        setErrorText(`${label} cannot be longer than ${maxLength} characters.`);
        return false;
      }
    }
    // default value
    return true;
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={label}
        className="capitalize font-medium text-lg text-slate-800"
      >
        {label}
      </label>
      <input
        type={inputType}
        name={name}
        id={label}
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        ref={inputRef}
        className="placeholder:text-sm placeholder:text-slate-700 text-slate-900 bg-white border border-slate-700 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 "
      />
      {!isValid && (
        <span className="text-sm font-medium text-red-600">{errorText}</span>
      )}
    </div>
  );
};

export default InputField;
