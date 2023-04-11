import InputField from "../form/InputField";
import TextAreaField from "../form/TextAreaField";
import Submit from "../form/Submit";
import { useState, FormEvent, Fragment } from "react";
import { Quiz } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";
import useQuiz from "../../hooks/useQuiz";
import { v4 as uuidv4 } from "uuid";
import Loader from "../ui/Loader";

const NewQuiz = () => {
  const [quiz, setQuiz] = useState<Quiz>({
    quizID: "",
    name: "",
    description: "",
    timeLimit: 0,
    points: 0,
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

  const handleChange = (value: string, name: string) => {
    setQuiz({
      ...quiz,
      [name]: value,
    });
  };

  if (showLoader) {
    return <Loader />;
  }

  return (
    <Fragment>
      <h2 className="text-xl font-medium">Create your own quiz</h2>

      <div className="flex flex-col gap-6 p-2 md:p-4 lg:p-6">
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          <InputField
            label="Name"
            name="name"
            inputType="text"
            placeholder="Give your quiz a name"
            onChange={handleChange}
            required
            minLength={5}
          />
          <TextAreaField
            label="Description"
            name="description"
            placeholder="Enter your quiz description"
            onChange={handleChange}
            minLength={15}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Points"
              name="points"
              inputType="number"
              placeholder="How many points is your quiz"
              onChange={handleChange}
              required
            />
            <InputField
              label="Time limits"
              name="timeLimit"
              inputType="number"
              placeholder="How long to take your quiz?(mins)"
              onChange={handleChange}
              required
            />
          </div>
          <Submit title="Create" />
        </form>
      </div>
    </Fragment>
  );
};

export default NewQuiz;
