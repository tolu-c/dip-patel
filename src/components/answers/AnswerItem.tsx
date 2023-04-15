import { Answer } from "../../utils/interfaces";
import RadioField from "../form/RadioField";

type Props = {
  answer: Answer;
  onChange: (questionID: string, answerText: string) => void;
};

const AnswerItem = ({ answer, onChange }: Props) => {
  return (
    <RadioField
      name={answer.questionID}
      label={answer.answerText}
      handleChange={onChange}
    />
  );
};

export default AnswerItem;
