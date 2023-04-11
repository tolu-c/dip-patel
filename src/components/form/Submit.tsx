interface SubmitProps {
  title: string;
}

const Submit = ({ title }: SubmitProps) => {
  return (
    <div className="flex w-full">
      <button
        type="submit"
        className="w-full bg-black text-white text-lg capitalize font-semibold py-3"
      >
        {title}
      </button>
    </div>
  );
};

export default Submit;
