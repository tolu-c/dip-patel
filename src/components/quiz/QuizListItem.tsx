import { Quiz } from "../../utils/interfaces";

const QuizListItem = ({ name, description, timeLimit, points }: Quiz) => {
  return (
    <li>
      <h2>
        Take <span className="font-medium text-lg">{name}</span> quiz
      </h2>
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
