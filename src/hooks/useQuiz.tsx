import { useState } from "react";
import { Question, Quiz } from "../utils/interfaces";
import {
  createQuestion,
  createQuiz,
  getAllQuizzes,
  getQuestion,
  getSingleQuiz,
} from "../services/quiz";
// import useNotification from "./useNotification";

const useQuiz = () => {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>();
  // const { showNotification } = useNotification();

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

  const handleGetSingleQuiz = async (quizID: string) => {
    return new Promise<any>((resolve) => {
      setShowLoader(true);

      getSingleQuiz(quizID)
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

  const handleCreateQuestion = (quizID: string, data: Question) => {
    return new Promise<any>((resolve) => {
      setShowLoader(true);

      createQuestion(quizID, data)
        .then((res) => {
          resolve(res);
          // showNotification({
          //   title: "Success",
          //   message: "Question added successfully",
          //   type: "success",
          // });
        })
        .catch((error) => {
          console.log(`Error: ${error.message}`);
        })
        .finally(() => {
          setShowLoader(false);
        });
    });
  };

  const handleGetQuestion = async (quizID: string) => {
    return new Promise<any>((resolve, reject) => {
      getQuestion(quizID)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          console.log(`Error: ${error.message}`);
          reject(error);
        });
    });
  };

  return {
    handleGetAllQuizzes,
    handleCreateQuiz,
    handleGetSingleQuiz,
    handleCreateQuestion,
    handleGetQuestion,
    setShowLoader,
    showLoader,
    quizzes,
  };
};

export default useQuiz;
