import { Answer } from "../../utils/interfaces";

type Props = {
  answer: Answer;
};

const AnswerItem = ({ answer }: Props) => {
  return <li>{answer.answerText}</li>;
};

export default AnswerItem;
