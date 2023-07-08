import React, { MouseEventHandler } from "react";
import "./TimerMainButton.scss";

interface ITimerMainButton {
  callback: MouseEventHandler<HTMLButtonElement>;
  started: boolean;
  paused: boolean;
  restStage: boolean;
}

const getButtonText = (
  started: boolean,
  paused: boolean,
  restStage: boolean
) => {
  switch (true) {
    case !started && !paused && !restStage: {
      return "Start pomodoro";
    }
    case started && paused && !restStage: {
      return "Continue pomodoro";
    }
    case started && !paused && !restStage: {
      return "Stop pomodoro";
    }
    case !started && !paused && restStage: {
      return "Start rest";
    }
  }
  return "";
};

const TimerMainButton = ({
  callback,
  started,
  paused,
  restStage,
}: ITimerMainButton) => {
  const buttonTimerText = getButtonText(started, paused, restStage);

  return (
    <button type="button" className="timer-button" onClick={callback}>
      {buttonTimerText}
    </button>
  );
};

export default TimerMainButton;
