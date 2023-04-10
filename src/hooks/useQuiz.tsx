import { useState } from "react";
import { Answer, Question, Quiz } from "../utils/interfaces";
import {
  createAnswer,
  createQuestion,
  createQuiz,
  getAllQuizzes,
  getQuestion,
  getSingleQuiz,
  getAnswer,
} from "../services/quiz";
// import useNotification from "./useNotification";

const useQuiz = () => {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>();
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [answers, setAnswers] = useState<Answer[] | null>(null);
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
          setQuestions(res);
        })
        .catch((error) => {
          console.log(`Error: ${error.message}`);
          reject(error);
        });
    });
  };

  const handleCreateAnswer = (questionID: string, data: Answer) => {
    return new Promise<any>((resolve) => {
      setShowLoader(true);

      createAnswer(questionID, data)
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

  const handleGetAnswer = async (questionID: string) => {
    return new Promise<any>((resolve, reject) => {
      getAnswer(questionID)
        .then((res) => {
          resolve(res);
          setAnswers(res);
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
    handleCreateAnswer,
    handleGetAnswer,
    setShowLoader,
    showLoader,
    quizzes,
    answers,
    questions,
  };
};

export default useQuiz;
