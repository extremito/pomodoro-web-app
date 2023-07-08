import React from "react";
import PropTypes from "prop-types";
import formatInt from "../../utils/format/formatInt";

interface TimeDisplay {
  timeset: number;
  displayPomodoro: boolean;
  displayRest: boolean;
  seconds?: number;
}

const getDisplayTitle = (pomodoroRunning: boolean, restRunning: boolean) => {
  switch (true) {
    case pomodoroRunning: {
      return "Remaining pomodoro time";
    }
    case restRunning: {
      return "Remaining rest time";
    }
  }
};

const TimeDisplay = ({
  timeset,
  displayPomodoro,
  displayRest,
  seconds = 0,
}: TimeDisplay) => {
  const timeLeft = timeset - seconds;
  const secondsLeft = timeLeft % 60;
  const minutes = Math.trunc(timeLeft / 60);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {getDisplayTitle(displayPomodoro, displayRest)}
        </h5>
        <p className="card-text">
          {minutes} : {formatInt(secondsLeft, 2)}
        </p>
      </div>
    </div>
  );
};

TimeDisplay.propTypes = {
  timeset: PropTypes.number.isRequired,
  displayPomodoro: PropTypes.bool.isRequired,
  displayRest: PropTypes.bool.isRequired,
  seconds: PropTypes.number,
};

export default TimeDisplay;
