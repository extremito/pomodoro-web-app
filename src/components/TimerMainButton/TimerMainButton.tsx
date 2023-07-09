import React, { MouseEventHandler } from "react";
import "./TimerMainButton.scss";

interface ITimerMainButton {
  callback: MouseEventHandler<HTMLButtonElement>;
  started: boolean;
  paused: boolean;
  restStage: boolean;
  waiting: boolean;
  disabled: boolean;
}

const getButtonText = (
  started: boolean,
  paused: boolean,
  restStage: boolean,
  waiting: boolean
) => {
  switch (true) {
    case !started && !paused && !restStage && !waiting: {
      return "Start pomodoro";
    }
    case started && paused && !restStage && !waiting: {
      return "Continue pomodoro";
    }
    case started && !paused && !restStage && !waiting: {
      return "Stop pomodoro";
    }
    case !started && !paused && !restStage && waiting:
    case !started && !paused && restStage:
      return "Start rest";
    case started && !paused && restStage: {
      return "Stop rest";
    }
    case started && paused && restStage: {
      return "Continue rest";
    }
  }
  return "";
};

const TimerMainButton = ({
  callback,
  started,
  paused,
  restStage,
  disabled,
  waiting,
}: ITimerMainButton) => {
  const buttonTimerText = getButtonText(started, paused, restStage, waiting);

  return (
    <button
      type="button"
      className="timer-button"
      onClick={callback}
      disabled={disabled}
    >
      {buttonTimerText}
    </button>
  );
};

export default TimerMainButton;
