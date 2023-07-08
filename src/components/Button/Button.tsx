import React, { MouseEventHandler } from "react";

interface IButton {
  children: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button = ({ children, onClick, disabled = false }: IButton) => {
  return (
    <button
      type="button"
      className="btn btn-light btn-lg btn-block"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
