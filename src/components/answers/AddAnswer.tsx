import { ChangeEvent, FormEvent, useState } from "react";
import { Answer, Question } from "../../utils/interfaces";
import { v4 as uuidv4 } from "uuid";
import InputField from "../form/InputField";
import Submit from "../form/Submit";
import Modal from "../ui/Modal";
import useQuiz from "../../hooks/useQuiz";
import AnswerList from "./AnswerList";

interface Props {
  onClose: () => void;
  question: Question;
  isOpen: boolean;
}

const AddAnswer = ({ onClose, question, isOpen }: Props) => {
  const [answer, setAnswer] = useState<Answer>({
    questionID: question.questionID,
    answerText: "",
    isCorrect: false,
    answerID: "",
  });
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(false);

  const {
    handleCreateAnswer,
    setShowLoader,
    showLoader,
    handleGetAnswer,
    answers,
  } = useQuiz();

  const fetchAnswer = () => {
    handleGetAnswer(answer.questionID).finally(() => {
      setShowLoader(false);
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswer({
      ...answer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submittedAnswer: Answer = {
      ...answer,
      answerID: uuidv4(),
      isCorrect: correctAnswer,
    };
    // console.log({ submittedAnswer });
    handleCreateAnswer(submittedAnswer.questionID, submittedAnswer)
      .then(() => {
        setShowLoader(true);
        fetchAnswer();
      })
      .finally(() => {
        setShowLoader(true);
      });
  };

  return (
    <Modal
      headerTitle="Add Answers to"
      headerSubTitle={question.questionText}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <InputField
          label="Add Answer"
          placeholder="Enter your answer"
          name="answerText"
          inputType="text"
          onChange={handleInputChange}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="isCorrect">Is this the correct answer</label>
          <button
            type="button"
            id="isCorrect"
            className="w-max"
            onClick={() => {
              setCorrectAnswer(!correctAnswer);
            }}
          >
            {correctAnswer ? "Yes" : "No"}
          </button>
        </div>

        <Submit title="Add Answer" />
      </form>
      {/* answers created */}
      <AnswerList
        answers={answers!}
        fetchAnswers={fetchAnswer}
        isOpen={isOpen}
        loading={showLoader}
        setLoader={setShowLoader}
      />
    </Modal>
  );
};

export default AddAnswer;
