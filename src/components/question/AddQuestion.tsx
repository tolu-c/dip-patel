import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { Question, Quiz } from "../../utils/interfaces";
import { XMarkIcon } from "@heroicons/react/24/solid";
import InputField from "../form/InputField";
import AddAnswer from "../answers/AddAnswer";
import { v4 as uuidv4 } from "uuid";
import Submit from "../form/Submit";

interface Props {
  onClose: () => void;
  quiz: Quiz;
}

const AddQuestion = ({ onClose, quiz }: Props) => {
  const [addAnswer, setAddAnswer] = useState<boolean>(false);
  const [question, setQuestion] = useState<Question>({
    quizID: quiz.quizID,
    questionID: "",
    questionText: "",
    answers: [],
  });

  const handleQuestionChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQuestion({
      ...question,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const submittedQuestion: Question = {
      ...question,
      questionID: uuidv4(),
    };
    console.log({ submittedQuestion });
  };
  console.log(question);

  const content: ReactNode = (
    <div
      className="fixed top-0 right-0 w-full h-full bg-black/20 z-50 p-6 flex justify-center items-center"
      // onClick={onClose}
    >
      <div className="w-full md:w-3/4 lg:w-1/2 h-auto bg-white grid grid-cols-1 gap-4">
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
          <form onSubmit={handleSubmit}>
            <InputField
              label="Add Question"
              name="questionText"
              inputType="text"
              placeholder="Enter your question"
              onChange={handleQuestionChange}
            />
            {/* <div>
              <button
                type="button"
                onClick={() => {
                  setAddAnswer(true);
                }}
              >
                Add Answer
              </button>
              {addAnswer && <AddAnswer />}
            </div> */}
            <Submit title="Add Question" />
          </form>
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
