import { useEffect } from "react";
import useQuiz from "../../hooks/useQuiz";
import { Question, Answer } from "../../utils/interfaces";
import AnswerItem from "../answers/AnswerItem";

type QuestionItemProps = {
  question: Question;
  handleChange: (questionID: string, answerText: string) => void;
};

const QuestionItem = ({ question, handleChange }: QuestionItemProps) => {
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
    <li className="p-2 flex flex-col gap-3">
      <h3 className="text-lg font-bold text-slate-700">
        {question.questionText}
      </h3>
      {!answers || answers.length === 0 ? (
        <p>No answers yet</p>
      ) : (
        <ul className="flex items-center justify-start gap-8">
          {answers.map((answer: Answer) => (
            <AnswerItem
              key={answer.answerID}
              answer={answer}
              onChange={() =>
                handleChange(answer.questionID, answer.answerText)
              }
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default QuestionItem;
