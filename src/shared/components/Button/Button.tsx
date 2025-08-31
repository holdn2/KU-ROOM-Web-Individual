import React from "react";
import "./Button.css";
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  size?: "sm" | "xs";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary" | "quaternary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  size,
  disabled = false,
  variant = "primary",
}) => {
  return (
    <button
      className={`button ${variant} ${disabled ? "disabled" : ""} ${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
