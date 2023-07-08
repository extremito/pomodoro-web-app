import React, { useEffect, useReducer, useRef } from "react";
import "./App.scss";
import useInterval from "./hooks/useInterval";
import TimeDisplay from "./components/TimeDisplay/TimeDisplay";
import TimerMainButton from "./components/TimerMainButton/TimerMainButton";

const initialState = {
  timeMin: "25",
  secs: 0,
  enableStart: true,
  restingMin: "5",
  longRestMin: "15",
  pomodoroNum: "4",
  elapsedPomodoros: 0,
  timerPause: false,
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
  const { timeMin, secs, enableStart, restingMin, timerPause } = state;
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

  const handleTimerButton = () => {
    switch (true) {
      case enableStart: {
        setState({ enableStart: false, secs: 0 });
        stopCounter.current = startCounter(1000);
        break;
      }
      case !enableStart && !timerPause: {
        setState({ timerPause: true });
        typeof stopCounter.current === "function" && stopCounter.current();
        break;
      }
      case timerPause: {
        setState({ timerPause: false });
        stopCounter.current = startCounter(1000);
        break;
      }
    }
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
        <TimerMainButton
          callback={handleTimerButton}
          started={!enableStart}
          restStage={false}
        />
      </section>
    </div>
  );
};

export default App;
