import { Dispatch, SetStateAction, useEffect } from "react";
import { Question } from "../../utils/interfaces";
import QuestionItem from "./QuestionItem";
import Loader from "../ui/Loader";

type Props = {
  loading: boolean;
  questions: Question[];
  isOpen: boolean;
  fetchQuestions: () => void;
  setLoader: Dispatch<SetStateAction<boolean>>;
};

const QuestionsList = ({
  loading,
  questions,
  isOpen,
  fetchQuestions,
  setLoader,
}: Props) => {
  useEffect(() => {
    if (isOpen) {
      setLoader(true);
      fetchQuestions();
    }
    //eslint-disable-next-line
  }, []);

  if (loading) return <Loader />;

  if (!questions || questions.length === 0) {
    return <h2>No questions yet</h2>;
  }

  return (
    <div>
      <ul>
        {questions.map((question) => (
          <QuestionItem question={question} key={question.questionID} />
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
