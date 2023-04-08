interface SubmitProps {
  title: string;
}

const Submit = ({ title }: SubmitProps) => {
  return (
    <div>
      <button type="submit">{title}</button>
    </div>
  );
};

export default Submit;
