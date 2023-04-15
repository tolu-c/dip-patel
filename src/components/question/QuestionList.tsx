import { Fragment, useEffect, useState } from "react";
import { Question } from "../../utils/interfaces";
import QuestionItem from "./QuestionItem";
import Modal from "../ui/Modal";
import Button from "../form/Button";
import { useNavigate } from "react-router-dom";

type Props = {
  questions: Question[];
};

const QuestionList = ({ questions }: Props) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] =
    useState<number>(0);
  const [passed, setPassed] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<
    {
      isCorrect: boolean;
      questionID: string;
    }[]
  >([]);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  let numCorrectAnswers: number;

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    checkAnswers();
    setIsSubmitted(true);
  };

  useEffect(() => {
    checkAnswers();
    //eslint-disable-next-line
  }, [userAnswers]);

  const checkAnswers = () => {
    numCorrectAnswers = userAnswers.filter((answer) => answer.isCorrect).length;
    setNumberOfCorrectAnswers(numCorrectAnswers);
    const totalPass: boolean =
      numCorrectAnswers >= Math.round(questions.length * 0.7);

    setPassed(totalPass);
  };

  const getAnswer = (isCorrect: boolean, questionID: string) => {
    setUserAnswers((prevAnswers) => [
      { isCorrect, questionID },
      ...prevAnswers,
    ]);
  };

  return (
    <Fragment>
      {isSubmitted && (
        <Modal
          headerTitle="Well done, You have finished the quiz"
          onClose={() => {
            navigate("/quiz");
          }}
        >
          <div className="flex flex-col gap-4">
            {passed ? (
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold text-teal-800">
                  Congratulations!!!
                </h2>
                <p className="text-sm font-medium text-slate-600">
                  You passed the quiz with a score of {numberOfCorrectAnswers}/
                  {questions.length}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold text-amber-800">Oops!!!</h2>
                <p className="text-sm font-medium text-slate-600">
                  You failed the quiz with a score of {numberOfCorrectAnswers}/
                  {questions.length}
                </p>
              </div>
            )}
            <Button
              size="base"
              rounded="flat"
              color="primary"
              onClick={() => {
                navigate("/quiz");
              }}
              title="Back to Quiz"
            />
          </div>
        </Modal>
      )}
      <ul className="flex flex-col divide-y p-2 gap-4 w-3/4 border shadow-md mx-auto">
        <QuestionItem
          question={questions[currentQuestionIndex]}
          isLastQuestion={isLastQuestion}
          onAddAnswer={getAnswer}
          handleNext={handleNext}
          handleSubmission={handleSubmit}
        />
      </ul>
    </Fragment>
  );
};

export default QuestionList;
