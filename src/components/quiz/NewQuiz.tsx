import InputField from "../form/InputField";
import TextAreaField from "../form/TextAreaField";
import Submit from "../form/Submit";
import { useState, FormEvent, ChangeEvent } from "react";
import { Quiz } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";
import useQuiz from "../../hooks/useQuiz";
import { v4 as uuidv4 } from "uuid";

const NewQuiz = () => {
  const [quiz, setQuiz] = useState<Quiz>({
    quizID: "",
    name: "",
    description: "",
    timeLimit: 0,
    points: 0,
    questions: [],
  });
  const navigate = useNavigate();
  const { handleCreateQuiz, showLoader } = useQuiz();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submittedQuiz: Quiz = {
      ...quiz,
      quizID: uuidv4(),
    };
    handleCreateQuiz(submittedQuiz);

    navigate(`/quiz/${submittedQuiz.quizID}`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuiz({
      ...quiz,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuiz({
      ...quiz,
      [event.target.name]: event.target.value,
    });
  };

  if (showLoader) {
    return <div>Creating your quiz... Hang on a bit.</div>;
  }

  return (
    <div>
      <h2>Create your own quiz</h2>

      <div className="flex flex-col gap-6">
        <form onSubmit={submitHandler}>
          <InputField
            label="Name"
            name="name"
            inputType="text"
            placeholder="Give your quiz a name"
            onChange={handleChange}
          />
          <TextAreaField
            label="description"
            name="description"
            placeholder="Enter your quiz description"
            onChange={handleChangeTextArea}
          />
          <div className="grid grid-cols-2 gap-6">
            <InputField
              label="Points"
              name="points"
              inputType="number"
              placeholder="How many points is your quiz"
              onChange={handleChange}
            />
            <InputField
              label="time limits"
              name="timeLimit"
              inputType="number"
              placeholder="How long to take your quiz?(mins)"
              onChange={handleChange}
            />
          </div>
          <Submit title="Create" />
        </form>
      </div>
    </div>
  );
};

export default NewQuiz;
