export interface Quiz {
  name: string;
  description: string;
  timeLimit: number;
  points: number;
  questions: Question[];
}

export interface Question {
  id: number;
  quizID: number;
  questionText: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  questionID: number;
  answerText: string;
  isCorrect: Boolean;
}
