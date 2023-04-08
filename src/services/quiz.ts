import AxiosApi from "../api";
import { APIS } from "../api/api";
import { Quiz, QuizResponse } from "../utils/interfaces";

export const getAllQuizzes = async () => {
  const res = await AxiosApi.get<QuizResponse>(`${APIS.QUIZ.quiz}`);
  const fetchedQuizzes: Quiz[] = [];
  for (let key in res.data) {
    fetchedQuizzes.push({
      ...res.data[key],
      questions: [],
    });
  }
  return fetchedQuizzes;
};

export const createQuiz = async (data: Quiz) => {
  const res = await AxiosApi.post(`${APIS.QUIZ.quiz}`, data);
  // const firebaseName = res.data.name;
  return res.data.name;
};

export const getSingleQuiz = async (quizID: string) => {
  const allQuizzes = await getAllQuizzes();
  const singleQuiz: Quiz = allQuizzes.find((quiz) => quiz.quizID === quizID)!;
  return singleQuiz;
};
