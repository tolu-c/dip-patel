import { useParams } from "react-router-dom";
import AddQuestion from "../components/question/AddQuestion";

const EditQuiz = () => {
  const { quizID } = useParams();
  return (
    <div>
      EditQuiz: {quizID}
      <AddQuestion />
    </div>
  );
};

export default EditQuiz;
