import InputField from "../form/InputField";
import TextAreaField from "../form/TextAreaField";
import Submit from "../form/Submit";
import { useState, FormEvent } from "react";
import { Quiz } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";

const NewQuiz = () => {
  const [name, setName] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [timeLimit, setTimeLimit] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  const navigate = useNavigate();

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const quiz: Quiz = { name, description, timeLimit, points };
    console.log({ quiz });
    navigate(`/quiz/${quiz.name}`);
  };

  return (
    <div>
      <h2>Create your own quiz</h2>

      <div className="flex flex-col gap-6">
        <form onSubmit={submitHandler}>
          <InputField
            label="name"
            inputType="text"
            placeholder="Give your quiz a name"
            onChange={(value) => setName(value)}
          />
          <TextAreaField
            label="description"
            placeholder="Enter your quiz description"
            onChange={(value) => setDescription(value)}
          />
          <div className="grid grid-cols-2 gap-6">
            <InputField
              label="Points"
              inputType="number"
              placeholder="How many points is your quiz"
              onChange={(value) => setPoints(Number(value))}
            />
            <InputField
              label="time limits"
              inputType="number"
              placeholder="How long to take your quiz?(mins)"
              onChange={(value) => setTimeLimit(Number(value))}
            />
          </div>
          <Submit />
        </form>
      </div>
    </div>
  );
};

export default NewQuiz;