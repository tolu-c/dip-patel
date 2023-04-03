import { useParams } from "react-router-dom";
import QuizDetail from "../components/quiz/QuizDetail";

type Props = {};

const QuizID = (props: Props) => {
  const { quizID } = useParams();
  return <QuizDetail quizID={quizID ? quizID : ""} />;
};

export default QuizID;
