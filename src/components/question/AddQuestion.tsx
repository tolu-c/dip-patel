import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  onClose: () => void;
}

const AddQuestion = ({ onClose }: Props) => {
  const content: ReactNode = (
    <div
      className="fixed top-0 right-0 w-full h-full bg-black/20 z-50 p-6"
      onClick={onClose}
    >
      <div>AddQuestion</div>
    </div>
  );

  return createPortal(
    content,
    document.getElementById("overlay") as HTMLElement
  );
};

export default AddQuestion;
