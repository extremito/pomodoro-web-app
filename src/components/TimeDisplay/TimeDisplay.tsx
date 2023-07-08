import React from "react";
import PropTypes from "prop-types";

interface TimeDisplay {
  seconds?: number;
}

const TimeDisplay = ({ seconds = 0 }: TimeDisplay) => {
  const secondsLeft = seconds % 60;
  const minutes = Math.trunc(seconds / 60);
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Elapsed time</h5>
        <p className="card-text">
          {minutes} : {secondsLeft}
        </p>
      </div>
    </div>
  );
};

TimeDisplay.propTypes = {
  seconds: PropTypes.number,
};

export default TimeDisplay;
