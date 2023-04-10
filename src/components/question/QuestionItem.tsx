import { useEffect } from "react";
import useQuiz from "../../hooks/useQuiz";
import { Question, Answer } from "../../utils/interfaces";
import AnswerItem from "../answers/AnswerItem";

type QuestionItemProps = {
  question: Question;
};

const QuestionItem = ({ question }: QuestionItemProps) => {
  const { handleGetAnswer, setShowLoader, answers } = useQuiz();
  const fetchAnswer = () => {
    handleGetAnswer(question.questionID).finally(() => {
      setShowLoader(false);
    });
  };

  useEffect(() => {
    fetchAnswer();
    //eslint-disable-next-line
  }, []);

  return (
    <li>
      {question.questionText}
      {!answers || answers.length === 0 ? (
        <p>No answers yet</p>
      ) : (
        <ul>
          {answers.map((answer: Answer) => (
            <AnswerItem key={answer.answerID} answer={answer} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default QuestionItem;
