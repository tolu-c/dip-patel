import { ChangeEvent, FormEvent, useState } from "react";
import { Question, Quiz } from "../../utils/interfaces";
import InputField from "../form/InputField";
import { v4 as uuidv4 } from "uuid";
import Submit from "../form/Submit";
import useQuiz from "../../hooks/useQuiz";
import QuestionsList from "./QuestionsList";
import Modal from "../ui/Modal";

interface Props {
  onClose: () => void;
  quiz: Quiz;
  isOpen: boolean;
}

const AddQuestion = ({ onClose, quiz, isOpen }: Props) => {
  const {
    handleCreateQuestion,
    handleGetQuestion,
    showLoader,
    setShowLoader,
    questions,
  } = useQuiz();
  const [question, setQuestion] = useState<Question>({
    quizID: quiz.quizID,
    questionID: "",
    questionText: "",
  });

  // fetch questions function
  const fetchQuestions = () => {
    handleGetQuestion(question.quizID).finally(() => {
      setShowLoader(false);
    });
  };

  // watches for `questionText` value change
  const handleQuestionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion({
      ...question,
      [event.target.name]: event.target.value,
    });
  };

  // submit function
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submittedQuestion: Question = {
      ...question,
      questionID: uuidv4(),
    };
    handleCreateQuestion(submittedQuestion.quizID, submittedQuestion)
      // re-fetches questions to pull the latest questions
      .then(() => {
        setShowLoader(true);
        fetchQuestions();
      })
      .finally(() => {
        setShowLoader(false);
      });
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
          onChange={handleQuestionChange}
        />
        <Submit title="Add Question" />
      </form>
      {/* question submitted appear here */}
      <QuestionsList
        questions={questions!}
        fetchQuestions={fetchQuestions}
        isOpen={isOpen}
        loading={showLoader}
        setLoader={setShowLoader}
      />
    </Modal>
  );
};

export default AddQuestion;
