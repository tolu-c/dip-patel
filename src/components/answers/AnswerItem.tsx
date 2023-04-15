import { Answer } from "../../utils/interfaces";
import RadioField from "../form/RadioField";

type Props = {
  answer: Answer;
  onChange: (questionID: string, answerText: string) => void;
};

const AnswerItem = ({ answer, onChange }: Props) => {
  return (
    <li>
      <RadioField
        name={answer.questionID}
        label={answer.answerText}
        handleChange={onChange}
      />
    </li>
  );
};

export default AnswerItem;
