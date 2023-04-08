import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  onClose: () => void;
  quizID: string;
}

const AddQuestion = ({ onClose, quizID }: Props) => {
  const content: ReactNode = (
    <div
      className="fixed top-0 right-0 w-full h-full bg-black/20 z-50 p-6 flex justify-center items-center"
      onClick={onClose}
    >
      <div className="w-full md:w-3/4 lg:w-1/2 h-auto bg-white p-6">
        we are adding questions to this quiz with ID of {quizID}
      </div>
    </div>
  );

  return createPortal(
    content,
    document.getElementById("overlay") as HTMLElement
  );
};

export default AddQuestion;
