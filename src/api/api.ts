const api = process.env.REACT_APP_DB_URL!;

export const APIS = {
  QUIZ: {
    quiz: `${api}/quiz.json`,
  },
  QUESTION: {
    addQuestion: `${api}/question.json`,
  },
};
