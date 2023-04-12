import AxiosApi from "../api";
import { APIS } from "../api/api";
import { Question, Quiz, Answer } from "../utils/interfaces";

export const getAllQuizzes = async () => {
  const res = await AxiosApi.get(`${APIS.QUIZ.getQuiz}`);
  const data = res.data;
  const quizzesData: Quiz[] = Object.values(data);
  return quizzesData;
};

export const createQuiz = async (data: Quiz) => {
  const { quizID } = data;
  const res = await AxiosApi.put(`${APIS.QUIZ.quiz(quizID)}`, data);
  return res.data;
};

export const getSingleQuiz = async (quizID: string) => {
  const allQuizzes = await getAllQuizzes();
  const singleQuiz: Quiz = allQuizzes.find(
    (quiz: Quiz) => quiz.quizID === quizID
  )!;
  return singleQuiz;
};

export const createQuestion = async (quizID: string, data: Question) => {
  const { questionID } = data;
  const res = await AxiosApi.put(
    `${APIS.QUESTION.singleQuestion(quizID, questionID)}`,
    data
  );
  return res.data;
};

export const deleteQuestion = async (quizID: string, questionID: string) => {
  // get answers first
  const answersRes = await AxiosApi.get(`${APIS.ANSWER.getAnswer(questionID)}`);
  const answers = answersRes.data;

  // delete each answer
  const deleteAnswerPromises = Object.keys(answers).map((answerID) => {
    return AxiosApi.delete(`${APIS.ANSWER.answer(questionID, answerID)}`);
  });

  // delete question after answers have been deleted
  await Promise.all(deleteAnswerPromises);
  const questionRes = await AxiosApi.delete(
    `${APIS.QUESTION.singleQuestion(quizID, questionID)}`
  );
  return questionRes.data;
};

export const getQuestion = async (quizID: string) => {
  const res = await AxiosApi.get(`${APIS.QUESTION.question(quizID)}`);
  const data = res.data;
  const fetchedQuestions: Question[] = Object.values(data);
  return fetchedQuestions;
};

export const createAnswer = async (questionID: string, data: Answer) => {
  const { answerID } = data;
  const res = await AxiosApi.put(
    `${APIS.ANSWER.answer(questionID, answerID)}`,
    data
  );
  return res.data;
};

export const getAnswer = async (questionID: string) => {
  const res = await AxiosApi.get(`${APIS.ANSWER.getAnswer(questionID)}`);
  const data = res.data;
  const fetchedAnswers: Answer[] = Object.values(data);
  return fetchedAnswers;
};
