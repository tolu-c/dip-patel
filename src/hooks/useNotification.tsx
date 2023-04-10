import { XMarkIcon } from "@heroicons/react/20/solid";
import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";

interface NotificationProps {
  title: string;
  message: string;
  onClose?: () => void;
  type: "success" | "error" | "info" | "warning";
}

const useNotification = () => {
  const [notification, setNotification] = useState<ReactNode | null>(null);
  const showNotification = ({
    title,
    message,
    onClose,
    type,
  }: NotificationProps) => {
    const content: ReactNode = (
      <div className={`${type === "success" ? "bg-green-700" : "bg-red-700"}`}>
        <XMarkIcon
          className="w-4 h-4 absolute top-1 right-1"
          onClick={onClose}
        />
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    );

    setNotification(content);

    return createPortal(
      notification,
      document.getElementById("notification") as HTMLElement
    );
  };

  return { showNotification };
};

export default useNotification;
