import InputField from "../form/InputField";
import TextAreaField from "../form/TextAreaField";
import Submit from "../form/Submit";
import { useState, FormEvent, ChangeEvent } from "react";
import { Quiz } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const dbUrl = process.env.REACT_APP_DB_URL!;
  const addQuiz = async (quizData: Quiz): Promise<any> => {
    const response = await axios.post(`${dbUrl}/quiz.json`, quizData);
    return response.data.name;
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const quizID = await addQuiz(quiz);
    navigate(`/quiz/${quizID}`);
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
          <Submit />
        </form>
      </div>
    </div>
  );
};

export default NewQuiz;
