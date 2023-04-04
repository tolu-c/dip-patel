import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Quiz, QuizResponse } from "../../utils/interfaces";
import QuizListItem from "./QuizListItem";
import { Link } from "react-router-dom";

const QuizList = () => {
  const [quizList, setQuizList] = useState<Quiz[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dbUrl = process.env.REACT_APP_DB_URL!;
  const getQuizzes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<QuizResponse>(`${dbUrl}`);
      const fetchedQuizzes: Quiz[] = [];
      for (let key in response.data) {
        fetchedQuizzes.push({
          ...response.data[key],
          quizID: key,
          questions: [],
        });
      }

      setQuizList(fetchedQuizzes);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [dbUrl, setQuizList, setIsLoading]);

  useEffect(() => {
    getQuizzes();
  }, [getQuizzes]);

  if (isLoading) {
    return <div>Fetching latest quizzes...</div>;
  }
  if (!quizList || quizList.length <= 0) {
    return (
      <div>
        <h2>NO Quiz yet</h2>
        <Link to="/quiz/new">Create Quiz</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome to Dip Patel Quiz</h2>
      <h3>Take a quiz</h3>

      <ul className="flex flex-col gap-4 divide-y">
        {quizList?.map((quiz) => (
          <QuizListItem
            quizID={quiz.quizID}
            name={quiz.name}
            description={quiz.description}
            points={quiz.points}
            timeLimit={quiz.timeLimit}
            questions={[]}
            key={quiz.quizID}
          />
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
