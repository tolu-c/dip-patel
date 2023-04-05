import { useState } from "react";
import { Quiz } from "../utils/interfaces";
import { createQuiz, getAllQuizzes } from "../services/quiz";

const useQuiz = () => {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>();

  const handleGetAllQuizzes = () => {
    if (!quizzes) {
      setShowLoader(true);
    }

    getAllQuizzes()
      .then((res) => {
        setQuizzes(res);
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`);
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  const handleCreateQuiz = (data: Quiz) => {
    return new Promise<any>((resolve) => {
      setShowLoader(true);

      createQuiz(data)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          console.log(`Error: ${error.message}`);
        })
        .finally(() => {
          setShowLoader(false);
        });
    });
  };

  return { handleGetAllQuizzes, handleCreateQuiz, showLoader, quizzes };
};

export default useQuiz;
