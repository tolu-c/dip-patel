import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { Question, Quiz } from "../../utils/interfaces";
import { XMarkIcon } from "@heroicons/react/24/solid";
import InputField from "../form/InputField";
import { v4 as uuidv4 } from "uuid";
import Submit from "../form/Submit";
import useQuiz from "../../hooks/useQuiz";
import QuestionsList from "./QuestionsList";

interface Props {
  onClose: () => void;
  quiz: Quiz;
  isOpen: boolean;
}

const AddQuestion = ({ onClose, quiz, isOpen }: Props) => {
  const { handleCreateQuestion, handleGetQuestion, showLoader, setShowLoader } =
    useQuiz();
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [question, setQuestion] = useState<Question>({
    quizID: quiz.quizID,
    questionID: "",
    questionText: "",
  });

  // fetch questions function
  const fetchQuestions = () => {
    handleGetQuestion(question.quizID)
      .then((res) => {
        setQuestions(res);
      })
      .finally(() => {
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

  const content: ReactNode = (
    <div className="fixed top-0 right-0 w-full h-full bg-black/20 z-50 p-6 flex justify-center items-center">
      <div className="w-full md:w-3/4 lg:w-1/2 h-auto bg-white grid grid-cols-1 gap-4 shadow-md">
        {/* header */}
        <div className="font-medium px-4 p-2 flex items-center justify-between">
          <h2 className="text-bold">
            Add Question to
            <span className="font-bold">"{quiz.name}"</span>
          </h2>
          <XMarkIcon className="w-6 h-6 cursor-pointer" onClick={onClose} />
        </div>
        {/* content */}
        <div className="px-6">
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
        </div>
      </div>
    </div>
  );

  return createPortal(
    content,
    document.getElementById("overlay") as HTMLElement
  );
};

export default AddQuestion;
