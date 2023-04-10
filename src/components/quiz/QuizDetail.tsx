import { Link } from "react-router-dom";
import useQuiz from "../../hooks/useQuiz";
import { useEffect, useState } from "react";
import { Question, Quiz } from "../../utils/interfaces";
import QuestionItem from "../question/QuestionItem";

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
    <div>
      QuizDetail: {quizID}
      <h2>{quiz?.name}</h2>
      <p>{quiz?.description}</p>
      {questions?.length === 0 || !questions ? (
        <p>No Questions to this quiz yet, Add One</p>
      ) : (
        <ul>
          {questions.map((question) => (
            <QuestionItem question={question} key={question.questionID} />
          ))}
        </ul>
      )}
      <hr />
      <Link to={`/quiz/${quizID}/edit`}>Edit</Link>
    </div>
  );
};

export default QuizDetail;
