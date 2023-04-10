import { Question } from "../../utils/interfaces";

type QuestionItemProps = {
  question: Question;
};

const QuestionItem = ({ question }: QuestionItemProps) => {
  return <li>{question.questionText}</li>;
};

export default QuestionItem;
