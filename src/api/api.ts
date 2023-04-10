const api = process.env.REACT_APP_DB_URL!;

export const APIS = {
  QUIZ: {
    quiz: `${api}/quiz.json`,
    addQuiz: (quizID: string) => `${api}/quiz/${quizID}.json`,
    getQuiz: (questionID: string) => `${api}/${questionID}/quiz.json`,
  },
  QUESTION: {
    question: (quizID: string) => `${api}/question/${quizID}.json`,
  },
  ANSWER: {
    answer: (questionID: string) => `${api}/answer/${questionID}.json`,
  },
};
