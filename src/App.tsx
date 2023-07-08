import React, { useEffect, useReducer, useRef } from "react";
import "./App.scss";
import useInterval from "./hooks/useInterval";
import TimeDisplay from "./components/TimeDisplay/TimeDisplay";
import TimerMainButton from "./components/TimerMainButton/TimerMainButton";
import NumberInput from "./components/NumberInput/NumberInput";
import Button from "./components/Button/Button";

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
    longRestMin,
  } = state;
  const stopCounter = useRef<unknown>(null);
  const pomodoroSeconds = timeMin ? parseInt(timeMin) * 60 : 0;
  const restingSeconds = restingMin ? parseInt(restingMin) * 60 : 0;
  const displayTime = restStage ? restingSeconds : pomodoroSeconds;
  const backgroundClass = !enableStart
    ? restStage
      ? "rest-running"
      : "pomodoro-running"
    : "";

  const disablePomodoroTimeSet = !enableStart;
  const disableRestTimeSet = !enableStart && restStage;
  const disableStartButton = restStage
    ? restingSeconds <= secs
    : pomodoroSeconds <= secs;

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
    setState({ timeMin: time });
  };

  const handleRestingTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const restingMin = e.target.value;
    setState({ restingMin });
  };

  const handleLongRestTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const longRestMin = e.target.value;
    setState({ longRestMin });
  };

  const handlePomodoroNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pomodoroNum = e.target.value;
    setState({ pomodoroNum });
  };

  const handleTimerButton = () => {
    switch (true) {
      case enableStart: {
        typeof stopCounter.current === "function" && stopCounter.current();
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

  const onClickSilence = () => {
    setState({ playNotification: false });
  };

  useEffect(() => {
    if (secs === pomodoroSeconds && !restStage) {
      typeof stopCounter.current === "function" && stopCounter.current();
      setState({
        enableStart: true,
        restStage: true,
        elapsedPomodoros: elapsedPomodoros + 1,
        playNotification: true,
        secs: 0,
      });
    } else if (restStage && secs === restingSeconds) {
      typeof stopCounter.current === "function" && stopCounter.current();
      setState({
        enableStart: true,
        restStage: false,
        elapsedRests: elapsedRests + 1,
        secs: 0,
      });
    }
  }, [secs]);

  return (
    <div className={`container-fluid app-container ${backgroundClass}`}>
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
              disabled={disablePomodoroTimeSet}
            />
            <NumberInput
              id="resting-time"
              labelText="Set resting time in minutes"
              onChange={handleRestingTime}
              value={restingMin}
              disabled={disableRestTimeSet}
            />
            <NumberInput
              id="longresting-time"
              labelText="Set long resting time in minutes"
              onChange={handleLongRestTime}
              value={longRestMin}
              disabled={disableRestTimeSet}
            />
            <NumberInput
              id="pomodoro-number"
              labelText="Set pomodoros"
              onChange={handlePomodoroNumber}
              value={pomodoroNum}
            />
          </div>
        </form>
        <TimeDisplay
          seconds={secs}
          timeset={displayTime}
          displayPomodoro={!restStage}
          displayRest={restStage}
        />
        <div className="d-flex flex-column align-items-center">
          <TimerMainButton
            callback={handleTimerButton}
            started={!enableStart}
            paused={timerPause}
            restStage={restStage}
            disabled={disableStartButton}
          />
          <Button onClick={resetAllValues}>Reset</Button>
          <Button onClick={onClickSilence} disabled={!playNotification}>
            Silence
          </Button>
        </div>
        {playNotification && (
          <audio
            autoPlay
            preload="auto"
            src="https://cdn.pixabay.com/audio/2021/08/04/audio_46cecde167.mp3"
            crossOrigin="anonymous"
          />
        )}
      </section>
    </div>
  );
};

export default App;
