import { useParams } from "react-router-dom";
import AddQuestion from "../components/question/AddQuestion";
import { useEffect, useState } from "react";
import { Question, Quiz } from "../utils/interfaces";
import useQuiz from "../hooks/useQuiz";
import AddAnswer from "../components/answers/AddAnswer";

const EditQuiz = () => {
  const { quizID } = useParams<string>();
  const [editQuiz, setEditQuiz] = useState<boolean>(false);
  const [editQuestion, setEditQuestion] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [quiz, setQuiz] = useState<Quiz>();
  const {
    handleGetSingleQuiz: getSingleQuiz,
    showLoader,
    questions,
    handleGetQuestion,
    setShowLoader,
  } = useQuiz();

  const fetchQuiz = async () => {
    const singleQuiz = await getSingleQuiz(quizID!);
    setQuiz(singleQuiz);
  };

  // fetch questions function
  const fetchQuestions = () => {
    handleGetQuestion(quizID!).finally(() => {
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
      <h2>EditQuiz: {quiz?.name}</h2>
      <button
        type="button"
        onClick={() => {
          setEditQuiz(true);
        }}
      >
        Add Question
      </button>
      {editQuiz && (
        <AddQuestion
          onClose={() => {
            setEditQuiz(false);
          }}
          quiz={quiz!}
          isOpen={editQuiz}
        />
      )}
      {/* questions */}
      {!questions || questions.length === 0 ? (
        <p>No Questions yet</p>
      ) : (
        questions.map((question: Question) => (
          <ul key={question.questionID}>
            <li className="flex gap-x-4">
              <p>{question.questionText}</p>
              <button
                type="button"
                onClick={() => {
                  setCurrentQuestion(question);
                  setEditQuestion(true);
                }}
                className="underline cursor-pointer"
              >
                Edit
              </button>
            </li>
          </ul>
        ))
      )}
      {/* add answers modal */}
      {editQuestion && (
        <AddAnswer
          onClose={() => {
            setEditQuestion(false);
          }}
          question={currentQuestion!}
          isOpen={editQuestion}
        />
      )}
    </div>
  );
};

export default EditQuiz;
