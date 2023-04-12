import { FormEvent, useState } from "react";
import { Question, Quiz } from "../../utils/interfaces";
import InputField from "../form/InputField";
import { generateUniqueID } from "../../utils/generateUniqueID";
import Submit from "../form/Submit";
import useQuiz from "../../hooks/useQuiz";
import Modal from "../ui/Modal";

interface Props {
  onClose: () => void;
  quiz: Quiz;
}

const AddQuestion = ({ onClose, quiz }: Props) => {
  const { handleCreateQuestion } = useQuiz();
  const [question, setQuestion] = useState<Question>({
    quizID: quiz.quizID,
    questionID: "",
    questionText: "",
  });

  // watches for `questionText` value change
  const handleQuestionChange = (value: string, name: string) => {
    setQuestion({
      ...question,
      [name]: value,
    });
  };

  // submit function
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submittedQuestion: Question = {
      ...question,
      questionID: generateUniqueID(),
    };
    handleCreateQuestion(submittedQuestion.quizID, submittedQuestion);
    onClose();
  };

  return (
    <Modal
      headerTitle="Add Question to"
      headerSubTitle={quiz.name}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          label="Add Question"
          name="questionText"
          inputType="text"
          placeholder="Enter your question"
          required
          minLength={7}
          onChange={handleQuestionChange}
        />
        <Submit title="Add Question" />
      </form>
    </Modal>
  );
};

export default AddQuestion;
