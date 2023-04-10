import { useEffect } from "react";
import QuizListItem from "./QuizListItem";
import { Link } from "react-router-dom";
import useQuiz from "../../hooks/useQuiz";

const QuizList = () => {
  const { handleGetAllQuizzes, showLoader, quizzes } = useQuiz();

  useEffect(() => {
    handleGetAllQuizzes();
    // eslint-disable-next-line
  }, []);

  if (showLoader) {
    return <div>Fetching latest quizzes...</div>;
  }
  if (!quizzes || quizzes.length <= 0) {
    return (
      <div>
        <h2>NO Quiz yet</h2>
        <Link to="/quiz/new">Create Quiz</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome to Dip Patel Quiz</h2>
      <h3>Take a quiz</h3>

      <ul className="flex flex-col gap-4 divide-y">
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
    </div>
  );
};

export default QuizList;
