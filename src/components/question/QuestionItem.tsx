import { FormEvent, useEffect, useState } from "react";
import useQuiz from "../../hooks/useQuiz";
import { Question, Answer } from "../../utils/interfaces";
import AnswerItem from "../answers/AnswerItem";

type QuestionItemProps = {
  question: Question;
  onAddAnswer: (isCorrect: boolean, questionID: string) => void;
  isLastQuestion: boolean;
  handleNext: () => void;
  handleSubmission: () => void;
};

const QuestionItem = ({
  question,
  onAddAnswer,
  isLastQuestion,
  handleNext,
  handleSubmission,
}: QuestionItemProps) => {
  const { handleGetAnswer, setShowLoader, answers } = useQuiz();
  const [selectedAnswer, setsSelectedAnswer] = useState({});

  useEffect(() => {
    fetchAnswer();
    //eslint-disable-next-line
  }, [question]);

  const fetchAnswer = () => {
    handleGetAnswer(question.questionID).finally(() => {
      setShowLoader(false);
    });
  };

  const correctAnswer = answers?.filter((answer) => answer.isCorrect === true);
  const correctAnswerText = correctAnswer?.map((answer) => answer.answerText);
  const chosenAnswer = Object.values(selectedAnswer);
  const isAnswerCorrect =
    chosenAnswer[0] === (correctAnswerText ? correctAnswerText[0] : "null");

  const handleChange = (questionID: string, answerText: string) => {
    setsSelectedAnswer(() => ({
      [questionID]: answerText,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLastQuestion) {
      onAddAnswer(isAnswerCorrect, question.questionID);
      handleNext();
    } else {
      onAddAnswer(isAnswerCorrect, question.questionID);
      handleSubmission();
    }
  };

  return (
    <li className="p-2 flex flex-col gap-3">
      <h3 className="text-lg font-bold text-slate-700">
        {question.questionText}
      </h3>
      {!answers || answers.length === 0 ? (
        <p>No answers yet</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <ul className="flex flex-col items-start justify-start gap-8">
            {answers.map((answer: Answer) => (
              <AnswerItem
                key={answer.answerID}
                answer={answer}
                onChange={handleChange}
              />
            ))}
          </ul>
          <button
            type="submit"
            className="flex items-center justify-center py-3 text-base font-medium bg-blue-700 text-white rounded-md"
          >
            {!isLastQuestion ? "Next" : "Submit"}
          </button>
        </form>
      )}
    </li>
  );
};

export default QuestionItem;
