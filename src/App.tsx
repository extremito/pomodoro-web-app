import React, { useEffect, useReducer, useRef } from "react";
import "./App.scss";
import useInterval from "./hooks/useInterval";
import TimeDisplay from "./components/TimeDisplay/TimeDisplay";

const initialState = {
  timeMin: "25",
  secs: 0,
  enableStart: false,
  restingMin: "5",
  pomodoroNum: "",
};
type TInitState = typeof initialState;

const App = () => {
  const [state, setState] = useReducer(
    (state: TInitState, newState: Partial<TInitState>) => ({
      ...state,
      ...newState,
    }),
    initialState
  );
  const { timeMin, secs, enableStart, restingMin } = state;
  const stopCounter = useRef<unknown>(null);

  const add1Sec = () => {
    setState({ secs: secs + 1 });
  };

  const startCounter = useInterval(add1Sec);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setState({ timeMin: time, enableStart: parseInt(time) > 0 });
  };

  const handleRestingTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const restingMin = e.target.value;
    setState({ restingMin });
  };

  const handlePomodoroNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pomodoroNum = e.target.value;
    setState({ pomodoroNum });
  };

  const startPomodoro = () => {
    setState({ enableStart: false, secs: 0 });
    stopCounter.current = startCounter(1000);
  };

  useEffect(() => {
    if (secs === parseInt(timeMin) * 60) {
      typeof stopCounter.current === "function" && stopCounter.current();
      setState({ enableStart: true });
    }
  }, [secs]);

  return (
    <div className="container-fluid app-container">
      <header>
        <h1 className="text-light text-center">Pomodoro</h1>
      </header>
      <section>
        <form>
          <div className="form-row">
            <label htmlFor="pomodoro-time">Set time in minutes</label>
            <input
              id="pomodoro-time"
              className="form-control"
              onChange={handleTimeChange}
              value={timeMin}
            />
            <label htmlFor="resting-time">Set resting time in minutes</label>
            <input
              id="resting-time"
              className="form-control"
              onChange={handleRestingTime}
              value={restingMin}
            />
            <label htmlFor="pomodoro-number">Set pomodoros</label>
            <input
              id="pomodoro-number"
              className="form-control"
              onChange={handlePomodoroNumber}
              value={restingMin}
            />
          </div>
        </form>
        <TimeDisplay seconds={secs} />
        <button
          type="button"
          className="btn btn-light btn-lg"
          disabled={!enableStart}
          onClick={startPomodoro}
        >
          Start
        </button>
      </section>
    </div>
  );
};

export default App;
