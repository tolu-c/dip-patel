import { useParams } from "react-router-dom";
import AddQuestion from "../components/question/AddQuestion";
import { useEffect, useState } from "react";
import { Quiz } from "../utils/interfaces";
import useQuiz from "../hooks/useQuiz";

const EditQuiz = () => {
  const { quizID } = useParams();
  const [editQuiz, setEditQuiz] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<Quiz>();
  const { handleGetSingleQuiz: getSingleQuiz, showLoader } = useQuiz();

  const fetchQuiz = async () => {
    const singleQuiz = await getSingleQuiz(quizID!);
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
        />
      )}
    </div>
  );
};

export default EditQuiz;
