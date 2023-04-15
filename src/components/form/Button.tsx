import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  size?: "base" | "small" | "large";
  color?: "primary" | "secondary";
  rounded?: "flat" | "pill" | "round" | "very-round";
  title: string;
  icon?: {
    iconElement: ReactNode;
    iconPosition: "left" | "right";
  };
}

const Button = ({
  onClick,
  size,
  color,
  title,
  icon,
  rounded,
}: ButtonProps) => {
  const sizeStyles: string = `${
    size === "small"
      ? "text-sm p-2"
      : size === "large"
      ? "text-lg p-4"
      : "text-base p-3"
  }`;
  const colorStyles: string = `${
    color === "primary"
      ? "bg-blue-600 text-white"
      : color === "secondary"
      ? "bg-red-600 text-white"
      : "bg-transparent text-black"
  }`;
  const roundedStyles: string = `${
    rounded === "pill"
      ? "rounded-full"
      : rounded === "flat"
      ? "rounded-none"
      : rounded === "round"
      ? "rounded-md"
      : rounded === "very-round"
      ? "rounded-lg"
      : "rounded"
  }`;

  return (
    <button
      type="button"
      className={`flex w-max lg:w-full font-medium ${sizeStyles} ${colorStyles} ${roundedStyles} flex items-center justify-center gap-2`}
      onClick={onClick}
    >
      {icon && icon.iconPosition === "left" && (
        <span className="text-white">{icon.iconElement}</span>
      )}
      <span>{title}</span>
      {icon && icon.iconPosition === "right" && (
        <span className="text-white">{icon.iconElement}</span>
      )}
    </button>
  );
};

export default Button;
