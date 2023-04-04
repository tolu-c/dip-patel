import { Link } from "react-router-dom";
import { Quiz } from "../../utils/interfaces";

const QuizListItem = ({
  name,
  description,
  timeLimit,
  points,
  quizID,
}: Quiz) => {
  return (
    <li>
      <Link to={`/quiz/${quizID}`}>
        <h2>
          Take <span className="font-medium text-lg">{name}</span> quiz
        </h2>
      </Link>
      <p>{description}</p>
      <div>
        <p>
          {points} points - {timeLimit} minutes
        </p>
      </div>
    </li>
  );
};

export default QuizListItem;
