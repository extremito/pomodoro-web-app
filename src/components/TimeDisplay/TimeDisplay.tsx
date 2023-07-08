import React from "react";
import PropTypes from "prop-types";
import formatInt from "../../utils/format/formatInt";

interface TimeDisplay {
  timeset: number;
  seconds?: number;
}

const TimeDisplay = ({ timeset, seconds = 0 }: TimeDisplay) => {
  const timeLeft = timeset - seconds;
  const secondsLeft = timeLeft % 60;
  const minutes = Math.trunc(timeLeft / 60);
  
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Elapsed time</h5>
        <p className="card-text">
          {minutes} : {formatInt(secondsLeft, 2)}
        </p>
      </div>
    </div>
  );
};

TimeDisplay.propTypes = {
  seconds: PropTypes.number,
};

export default TimeDisplay;
