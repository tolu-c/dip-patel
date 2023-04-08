import { Link } from "react-router-dom";
import useQuiz from "../../hooks/useQuiz";
import { useEffect, useState } from "react";
import { Quiz } from "../../utils/interfaces";

interface Props {
  quizID: string;
}

const QuizDetail = ({ quizID }: Props) => {
  const [quiz, setQuiz] = useState<Quiz>();
  const { handleGetSingleQuiz: getSingleQuiz, showLoader } = useQuiz();

  const fetchQuiz = async () => {
    const singleQuiz = await getSingleQuiz(quizID);
    setQuiz(singleQuiz);
  };

  useEffect(() => {
    fetchQuiz();
    //eslint-disable-next-line
  }, []);

  if (showLoader) {
    return <p>Fetching your quiz... Give us a minute.</p>;
  }

  return (
    <div>
      QuizDetail: {quizID}
      <h2>{quiz?.name}</h2>
      <p>{quiz?.description}</p>
      <Link to={`/quiz/${quizID}/edit`}>Edit</Link>
    </div>
  );
};

export default QuizDetail;
