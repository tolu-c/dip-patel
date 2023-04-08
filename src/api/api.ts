const api = process.env.REACT_APP_DB_URL!;

export const APIS = {
  QUIZ: {
    quiz: `${api}/quiz.json`,
    getQuiz: (questionID: string) => `${api}/${questionID}/quiz.json`,
    addQuestion: (questionID: string) => `${api}/${questionID}/quiz.json`,
  },
  QUESTION: {},
};
