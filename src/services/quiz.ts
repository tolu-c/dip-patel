import AxiosApi from "../api";
import { APIS } from "../api/api";
import { Question, Quiz, QuizResponse, Answer } from "../utils/interfaces";

export const getAllQuizzes = async () => {
  const res = await AxiosApi.get<QuizResponse>(`${APIS.QUIZ.quiz}`);
  const fetchedQuizzes: Quiz[] = [];
  for (let key in res.data) {
    fetchedQuizzes.push({
      ...res.data[key],
    });
  }
  return fetchedQuizzes;
};

export const createQuiz = async (data: Quiz) => {
  const res = await AxiosApi.post(`${APIS.QUIZ.quiz}`, data);
  return res.data.name;
};

export const getSingleQuiz = async (quizID: string) => {
  const allQuizzes = await getAllQuizzes();
  const singleQuiz: Quiz = allQuizzes.find((quiz) => quiz.quizID === quizID)!;
  return singleQuiz;
};

export const createQuestion = async (quizID: string, data: Question) => {
  const res = await AxiosApi.post(`${APIS.QUESTION.question(quizID)}`, data);
  return res.data;
};

export const getQuestion = async (quizID: string) => {
  const res = await AxiosApi.get(`${APIS.QUESTION.question(quizID)}`);
  const fetchedQuestions: Question[] = [];
  for (let key in res.data) {
    fetchedQuestions.push({ ...res.data[key] });
  }
  return fetchedQuestions;
};

export const createAnswer = async (questionID: string, data: Answer) => {
  const res = await AxiosApi.post(`${APIS.ANSWER.answer(questionID)}`, data);
  return res.data;
};
