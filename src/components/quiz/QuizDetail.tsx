import { Link, useNavigate } from "react-router-dom";
import useQuiz from "../../hooks/useQuiz";
import { useEffect, useState } from "react";
import { Question, Quiz } from "../../utils/interfaces";
import Button from "../form/Button";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import QuestionList from "../question/QuestionList";

interface Props {
  quizID: string;
}

const QuizDetail = ({ quizID }: Props) => {
  const [quiz, setQuiz] = useState<Quiz>();
  const [questions, setQuestions] = useState<Question[] | null>(null);

  const {
    handleGetSingleQuiz: getSingleQuiz,
    handleGetQuestion,
    showLoader,
    setShowLoader,
  } = useQuiz();

  const navigate = useNavigate();

  const fetchQuiz = async () => {
    const singleQuiz = await getSingleQuiz(quizID);
    setQuiz(singleQuiz);
  };

  // fetch questions function
  const fetchQuestions = () => {
    handleGetQuestion(quizID)
      .then((res) => {
        setQuestions(res);
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    fetchQuiz();
    fetchQuestions();
    //eslint-disable-next-line
  }, []);

  if (showLoader) {
    return <p>Fetching your quiz... Give us a minute.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="text-slate-800 font-bold text-lg">{quiz?.name}</h2>
        <div>
          <Button
            onClick={() => {
              navigate(`/quiz/${quizID}/edit`);
            }}
            size="small"
            title="Edit"
            color="primary"
            rounded="round"
            icon={{
              iconPosition: "right",
              iconElement: <PencilSquareIcon className="w-4 h-4" />,
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-base font-normal text-slate-600 first-letter:capitalize">
          {quiz?.description}
        </p>
        <div className="flex gap-3">
          {questions && <span>{questions.length} questions</span>}
          <p>{quiz?.points} points</p>
          <p>{quiz?.timeLimit} minutes</p>
        </div>
      </div>
      {questions?.length === 0 || !questions ? (
        <p className="flex gap-2 items-baseline">
          <span>No questions yet</span>
          <Link
            to={`/quiz/${quizID}/edit`}
            className="hover:underline text-sm font-bold"
          >
            Add One
          </Link>
        </p>
      ) : (
        <QuestionList questions={questions} />
      )}
    </div>
  );
};

export default QuizDetail;
