import { useParams } from "react-router-dom";
import AddQuestion from "../components/question/AddQuestion";
import { Fragment, useEffect, useState } from "react";
import { Question, Quiz } from "../utils/interfaces";
import useQuiz from "../hooks/useQuiz";
import AddAnswer from "../components/answers/AddAnswer";
import Loader from "../components/ui/Loader";
import Button from "../components/form/Button";
import {
  PlusSmallIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

const EditQuiz = () => {
  const { quizID } = useParams<string>();
  const [editQuiz, setEditQuiz] = useState<boolean>(false);
  const [editQuestion, setEditQuestion] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [quiz, setQuiz] = useState<Quiz>();
  const {
    handleGetSingleQuiz: getSingleQuiz,
    showLoader,
    questions,
    handleGetQuestion,
    handleDeleteQuestion,
    setShowLoader,
  } = useQuiz();

  const fetchQuiz = async () => {
    const singleQuiz = await getSingleQuiz(quizID!);
    setQuiz(singleQuiz);
  };

  // fetch questions function
  const fetchQuestions = () => {
    handleGetQuestion(quizID!).finally(() => {
      setShowLoader(false);
    });
  };

  // delete question function
  const deleteQuestion = (quizID: string, questionID: string) => {
    handleDeleteQuestion(quizID, questionID).then(() => {
      setShowLoader(true);
      fetchQuestions();
    });
  };

  useEffect(() => {
    fetchQuiz();
    if (!editQuiz || !editQuestion) {
      fetchQuestions();
    }
    //eslint-disable-next-line
  }, [editQuiz, editQuestion]);

  if (showLoader) {
    return <Loader />;
  }

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-950">
          Edit: <span className="text-bold">{quiz?.name}</span>
        </h2>
        <Button
          onClick={() => {
            setEditQuiz(true);
          }}
          size="small"
          title="Add question"
          color="primary"
          rounded="round"
          icon={{
            iconPosition: "left",
            iconElement: <PlusSmallIcon className="w-6 h-6" />,
          }}
        />
      </div>

      {editQuiz && (
        <AddQuestion
          onClose={() => {
            setEditQuiz(false);
          }}
          quiz={quiz!}
        />
      )}
      {/* questions */}
      {!questions || questions.length === 0 ? (
        <p className="text-amber-800 font-bold text-lg">No Questions yet</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {questions.map((question) => (
            <li key={question.questionID} className="flex gap-x-4">
              <p className="text-base font-medium text-slate-700">
                {question.questionText}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-green-600">
                  <PencilSquareIcon
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => {
                      setCurrentQuestion(question);
                      setEditQuestion(true);
                    }}
                  />
                </span>
                <span className="text-red-600">
                  <TrashIcon
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => {
                      deleteQuestion(question.quizID, question.questionID);
                    }}
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* add answers modal */}
      {editQuestion && (
        <AddAnswer
          onClose={() => {
            setEditQuestion(false);
          }}
          question={currentQuestion!}
        />
      )}
    </Fragment>
  );
};

export default EditQuiz;
