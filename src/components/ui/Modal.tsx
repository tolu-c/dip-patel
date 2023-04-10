import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  headerTitle: string;
  headerSubTitle?: string;
}

const Modal = ({
  children,
  onClose,
  headerTitle,
  headerSubTitle,
}: ModalProps) => {
  const content: ReactNode = (
    <div className="fixed top-0 right-0 w-full h-full bg-black/20 z-50 p-6 flex justify-center items-center">
      <div className="w-full md:w-3/4 lg:w-1/2 h-auto bg-white grid grid-cols-1 gap-4 shadow-md">
        {/* header */}
        <div className="font-medium px-4 p-2 flex items-center justify-between">
          <h2 className="text-bold">
            {headerTitle}
            <span className="font-bold">"{headerSubTitle}"</span>
          </h2>
          <XMarkIcon className="w-6 h-6 cursor-pointer" onClick={onClose} />
        </div>
        {/* content */}
        <div className="px-6">{children}</div>
      </div>
    </div>
  );

  return createPortal(
    content,
    document.getElementById("overlay") as HTMLElement
  );
};

export default Modal;
