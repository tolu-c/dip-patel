interface RadioFieldProps {
  name: string;
  label: string;
  handleChange: (questionID: string, answerText: string) => void;
}

const RadioField = ({ name, label, handleChange }: RadioFieldProps) => {
  return (
    <label
      htmlFor={label}
      className="gap-4 border p-3 group hover:bg-green-100 w-full rounded-md flex items-center justify-start cursor-pointer"
    >
      <input
        type="radio"
        id={label}
        name={name}
        value={label}
        onChange={() => handleChange(name, label)}
      />
      <span className="text-slate-600 group-hover:text-green-800 font-medium group-hover:font-bold text-base first-letter:capitalize">
        {label}
      </span>
    </label>
  );
};

export default RadioField;
