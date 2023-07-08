import React, { useEffect, useReducer, useRef } from "react";
import "./App.scss";
import useInterval from "./hooks/useInterval";
import TimeDisplay from "./components/TimeDisplay/TimeDisplay";
import TimerMainButton from "./components/TimerMainButton/TimerMainButton";
import NumberInput from "./components/NumberInput/NumberInput";
import ResetButton from "./components/ResetButton/ResetButton";

const initialState = {
  timeMin: "25",
  secs: 0,
  enableStart: true,
  restingMin: "5",
  longRestMin: "15",
  pomodoroNum: "4",
  elapsedPomodoros: 0,
  timerPause: false,
  restStage: false,
  elapsedRests: 0,
  playNotification: false,
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
  const {
    timeMin,
    secs,
    enableStart,
    restingMin,
    timerPause,
    restStage,
    pomodoroNum,
    elapsedPomodoros,
    elapsedRests,
    playNotification,
  } = state;
  const stopCounter = useRef<unknown>(null);
  const pomodoroSeconds = timeMin ? parseInt(timeMin) * 60 : 0;
  const restingSeconds = restingMin ? parseInt(restingMin) * 60 : 0;
  const displayTime = restStage ? restingSeconds : pomodoroSeconds;

  const add1Sec = () => {
    setState({ secs: secs + 1 });
  };

  const startCounter = useInterval(add1Sec);

  const resetAllValues = () => {
    typeof stopCounter.current === "function" && stopCounter.current();
    setState(initialState);
  };

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
        setState({ enableStart: false, secs: 0, playNotification: false });
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
    if (secs === pomodoroSeconds && !restStage) {
      typeof stopCounter.current === "function" && stopCounter.current();
      setState({
        enableStart: true,
        restStage: true,
        elapsedPomodoros: elapsedPomodoros + 1,
        playNotification: true,
      });
    } else if (restStage && secs === restingSeconds) {
      typeof stopCounter.current === "function" && stopCounter.current();
      setState({
        enableStart: true,
        restStage: false,
        elapsedRests: elapsedRests + 1,
      });
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
            <NumberInput
              id="pomodoro-time"
              labelText="Set time in minutes"
              onChange={handleTimeChange}
              value={timeMin}
            />
            <NumberInput
              id="resting-time"
              labelText="Set resting time in minutes"
              onChange={handleRestingTime}
              value={restingMin}
            />
            <NumberInput
              id="pomodoro-number"
              labelText="Set pomodoros"
              onChange={handlePomodoroNumber}
              value={pomodoroNum}
            />
          </div>
        </form>
        <TimeDisplay seconds={secs} timeset={displayTime} />
        <div className="d-flex flex-column">
          <TimerMainButton
            callback={handleTimerButton}
            started={!enableStart}
            paused={timerPause}
            restStage={false}
          />
          <ResetButton onClick={resetAllValues} />
        </div>
        {playNotification && (
          <audio
            preload="auto"
            src="https://cdn.pixabay.com/…/04/audio_46cecde167.mp3"
            crossOrigin="anonymous"
          />
        )}
      </section>
    </div>
  );
};

export default App;
