import { useRef } from "react";
interface RadioFieldProps {
  name: string;
  label: string;
  handleChange: (questionID: string, answerText: string) => void;
}

const RadioField = ({ name, label, handleChange }: RadioFieldProps) => {
  const answerRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-2">
      <input
        type="radio"
        id={label}
        name={name}
        value={label}
        ref={answerRef}
        onChange={() => handleChange(name, label)}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default RadioField;
