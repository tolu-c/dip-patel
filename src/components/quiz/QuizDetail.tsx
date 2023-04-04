import { Link } from "react-router-dom";

interface Props {
  quizID: string;
}

const QuizDetail = ({ quizID }: Props) => {
  return (
    <div>
      QuizDetail: {quizID}
      <Link to={`/quiz/${quizID}/edit`}>Edit</Link>
    </div>
  );
};

export default QuizDetail;
