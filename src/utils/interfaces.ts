export interface Quiz {
  quizID: string;
  name: string;
  description: string;
  timeLimit: number;
  points: number;
}
export interface Question {
  questionID: string;
  quizID: string;
  questionText: string;
}

export interface Answer {
  answerID: string;
  questionID: string;
  answerText: string;
  isCorrect: Boolean;
}

export interface QuizResponse {
  [key: string]: {
    name: string;
    description: string;
    points: number;
    timeLimit: number;
    quizID: string;
  };
}
