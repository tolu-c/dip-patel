interface Props {
  quizID: string;
}

const QuizDetail = ({ quizID }: Props) => {
  return <div>QuizDetail - {quizID}</div>;
};

export default QuizDetail;
