import React, { useEffect, useReducer, useRef } from "react";
import "./App.scss";
import useInterval from "./hooks/useInterval";

const initialState = { time: "", secs: 0, enableStart: false };
type TInitState = typeof initialState;

const App = () => {
  const [state, setState] = useReducer(
    (state: TInitState, newState: Partial<TInitState>) => ({
      ...state,
      ...newState,
    }),
    initialState
  );
  const { time, secs, enableStart } = state;
  const stopCounter = useRef<unknown>(null);

  const add1Sec = () => {
    setState({ secs: secs + 1 });
  };

  const startCounter = useInterval(add1Sec);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setState({ time, enableStart: parseInt(time) > 0 });
  };

  const startPomodoro = () => {
    setState({ enableStart: false, secs: 0 });
    stopCounter.current = startCounter(1000);
  };

  useEffect(() => {
    if (secs === parseInt(time)) {
      typeof stopCounter.current === "function" && stopCounter.current();
    }
  }, [secs]);

  return (
    <div className="container-fluid app-container">
      <header>
        <h1 className="text-light text-center">Pomodoro</h1>
      </header>
      <section>
        <div className="form-row">
          <label htmlFor="pomodoro-time">Set time</label>
          <input
            id="pomodoro-time"
            className="form-control"
            type="number"
            onChange={handleTimeChange}
            value={time}
          />
        </div>
        <h3>Time</h3>
        <p>{secs}</p>
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
