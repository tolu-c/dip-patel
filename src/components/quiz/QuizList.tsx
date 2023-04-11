import { useEffect, Fragment } from "react";
import QuizListItem from "./QuizListItem";
import { Link } from "react-router-dom";
import useQuiz from "../../hooks/useQuiz";
import Loader from "../ui/Loader";

const QuizList = () => {
  const { handleGetAllQuizzes, showLoader, quizzes } = useQuiz();

  useEffect(() => {
    handleGetAllQuizzes();
    // eslint-disable-next-line
  }, []);

  if (showLoader) {
    return <Loader />;
  }
  if (!quizzes || quizzes.length <= 0) {
    return (
      <div className="flex gap-2 w-full items-center">
        <h2 className="text-bold font-lg">NO Quiz yet</h2>
        <Link
          to="/quiz/new"
          className="text-base underline hover:underline-offset-2 decoration-indigo-700 text-indigo-600"
        >
          Create Quiz
        </Link>
      </div>
    );
  }

  return (
    <Fragment>
      <h2 className="text-xl font-medium">Welcome to Dip Patel Quiz</h2>
      <h3 className="text-lg">Take a quiz</h3>

      <ul className="flex flex-col gap-4 divide-y divide-slate-100 shadow-md">
        {quizzes?.map((quiz) => (
          <QuizListItem
            quizID={quiz.quizID}
            name={quiz.name}
            description={quiz.description}
            points={quiz.points}
            timeLimit={quiz.timeLimit}
            key={quiz.quizID}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuizList;
