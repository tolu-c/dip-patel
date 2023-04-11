import { Link } from "react-router-dom";
import { Quiz } from "../../utils/interfaces";
import {
  ClockIcon,
  StarIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/solid";

const QuizListItem = ({
  name,
  description,
  timeLimit,
  points,
  quizID,
}: Quiz) => {
  return (
    <li className="w-full p-3 flex justify-between items-center">
      <div className="flex flex-col gap-2 basis-3/4">
        <h2 className="text-lg font-semibold capitalize text-slate-700">
          {name} Quiz
        </h2>
        <p className="text-base text-slate-600">{description}</p>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center text-orange-950">
            <ClockIcon className="w-4 h-4" />
            <span className="text-sm font-bold text-slate-700">
              {timeLimit} mins
            </span>
          </div>
          <div className="flex gap-2 items-center text-green-950">
            <StarIcon className="w-4 h-4" />
            <span className="text-sm font-bold text-slate-700">
              {points} pts
            </span>
          </div>
        </div>
      </div>
      <Link
        to={`/quiz/${quizID}`}
        className="flex text-sm font-semibold gap-1 items-center cursor-pointer hover:underline text-slate-900 hover:text-blue-950"
      >
        Take Quiz
        <ArrowUpRightIcon className="w-4 h-4" />
      </Link>
    </li>
  );
};

export default QuizListItem;

// <Link to={`/quiz/${quizID}`}></Link>
