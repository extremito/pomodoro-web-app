import React, { MouseEventHandler } from "react";

interface ITimerMainButton {
  started: boolean;
  restStage: boolean;
  callback: MouseEventHandler<HTMLButtonElement>;
}

const TimerMainButton = ({
  callback,
  started,
  restStage,
}: ITimerMainButton) => {
  const buttonTimerText = started ? "Stop pomodoro" : "Start pomodoro";
  return (
    <button
      type="button"
      className="btn btn-light btn-lg"
      onClick={callback}
    >
      {buttonTimerText}
    </button>
  );
};

export default TimerMainButton;
