import { FormEvent, useState } from "react";
import { Answer, Question } from "../../utils/interfaces";
import { v4 as uuidv4 } from "uuid";
import InputField from "../form/InputField";
import Submit from "../form/Submit";
import Modal from "../ui/Modal";
import useQuiz from "../../hooks/useQuiz";

interface Props {
  onClose: () => void;
  question: Question;
}

const AddAnswer = ({ onClose, question }: Props) => {
  const [answer, setAnswer] = useState<Answer>({
    questionID: question.questionID,
    answerText: "",
    isCorrect: false,
    answerID: "",
  });
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(false);

  const { handleCreateAnswer } = useQuiz();

  const handleInputChange = (value: string, name: string) => {
    setAnswer({
      ...answer,
      [name]: value,
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
    handleCreateAnswer(submittedAnswer.questionID, submittedAnswer);
  };

  return (
    <Modal
      headerTitle="Add Answers to"
      headerSubTitle={question.questionText}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          label="Add Answer"
          placeholder="Enter your answer"
          name="answerText"
          inputType="text"
          onChange={handleInputChange}
        />
        <div className="flex flex-col gap-2">
          <label
            htmlFor="isCorrect"
            className="capitalize font-medium text-lg text-slate-800"
          >
            Is this the correct answer
          </label>
          <button
            type="button"
            id="isCorrect"
            className={`w-max text-lg font-bold ${
              correctAnswer ? "text-green-950" : "text-red-950"
            }`}
            onClick={() => {
              setCorrectAnswer(!correctAnswer);
            }}
          >
            {correctAnswer ? "Yes" : "No"}
          </button>
        </div>

        <Submit title="Add Answer" />
      </form>
    </Modal>
  );
};

export default AddAnswer;
