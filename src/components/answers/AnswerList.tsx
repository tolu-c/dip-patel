import { Dispatch, SetStateAction, useEffect } from "react";
import { Answer } from "../../utils/interfaces";
import AnswerItem from "./AnswerItem";

type Props = {
  loading: boolean;
  answers: Answer[];
  isOpen: boolean;
  fetchAnswers: () => void;
  setLoader: Dispatch<SetStateAction<boolean>>;
};

const AnswerList = ({
  loading,
  answers,
  isOpen,
  fetchAnswers,
  setLoader,
}: Props) => {
  useEffect(() => {
    if (isOpen) {
      setLoader(true);
      fetchAnswers();
    }
    //eslint-disable-next-line
  }, []);

  if (loading) return <p>Fetching answers...</p>;

  if (!answers || answers.length === 0) {
    return <h2>No answers yet</h2>;
  }
  return (
    <ul>
      {answers.map((answer) => (
        <AnswerItem answer={answer} key={answer.answerID} />
      ))}
    </ul>
  );
};

export default AnswerList;
