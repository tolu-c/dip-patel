const api = process.env.REACT_APP_DB_URL!;

export const APIS = {
  QUIZ: {
    getQuiz: `${api}/quiz.json`,
    quiz: (quizID: string) => `${api}/quiz/${quizID}.json`,
  },
  QUESTION: {
    question: (quizID: string) => `${api}/question/${quizID}.json`,
    singleQuestion: (quizID: string, questionID: string) =>
      `${api}/question/${quizID}/${questionID}.json`,
  },
  ANSWER: {
    answer: (questionID: string, answerID: string) =>
      `${api}/answer/${questionID}/${answerID}.json`,
    getAnswer: (questionID: string) => `${api}/answer/${questionID}.json`,
  },
};
