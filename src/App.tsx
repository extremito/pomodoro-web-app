import React, { useState, useReducer } from "react";
import logo from "./logo.svg";
import "./App.css";

const initialState = { time: "0", secs: 0, enableStart: true };
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

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ time: e.target.value });
  };

  const startCounter = () => {
    const id = setInterval((secs) => {
      setState({ secs: secs + 1 });
      console.log(secs, 'interval')
    }, 1000, state.secs);
    return () => clearInterval(id);
  };

  const startPomodoro = () => {
    setState({ enableStart: false });
    const stopCounter = startCounter();
    setTimeout(() => {
      setState({ enableStart: true });
      stopCounter();
      console.log("done");
    }, parseInt(time) * 1000);
  };

  return (
    <div className="container">
      <header>
        <h1>Pomodoro</h1>
      </header>
      <section>
        <label>
          Set time
          <input type="number" onChange={handleTimeChange} value={time} />
        </label>
        <h3>Time</h3>
        <p>{secs}</p>
        <button disabled={!enableStart} onClick={startPomodoro}>
          Start
        </button>
      </section>
    </div>
  );
};

export default App;
