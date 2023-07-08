import React, { MouseEventHandler } from "react";

interface IResetButton {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ResetButton = ({ onClick }: IResetButton) => {
  return (
    <button
      type="button"
      className="btn btn-light btn-lg btn-block"
      onClick={onClick}
    >
      Reset
    </button>
  );
};

export default ResetButton;
