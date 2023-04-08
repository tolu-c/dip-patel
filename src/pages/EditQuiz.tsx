import { useParams } from "react-router-dom";
import AddQuestion from "../components/question/AddQuestion";
import { useState } from "react";

const EditQuiz = () => {
  const { quizID } = useParams();
  const [editQuiz, setEditQuiz] = useState<boolean>(false);
  return (
    <div>
      <h2>EditQuiz: {quizID}</h2>
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
          quizID={quizID!}
        />
      )}
    </div>
  );
};

export default EditQuiz;
