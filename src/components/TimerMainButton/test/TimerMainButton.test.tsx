import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TimerMainButton from "../TimerMainButton";

describe("TimerMainButton component", () => {
  const callback = jest.fn();

  test("should render button on start pomodoro stage", () => {
    render(
      <TimerMainButton
        callback={callback}
        started={false}
        restStage={false}
        paused={false}
      />
    );
    expect(screen.getByText("Start pomodoro"));
  });

  test("should render button on stop pomodoro stage", () => {
    render(
      <TimerMainButton
        callback={callback}
        started={true}
        restStage={false}
        paused={false}
      />
    );
    expect(screen.getByText("Stop pomodoro"));
  });

  test("should render button on pause pomodoro stage", () => {
    render(
      <TimerMainButton
        callback={callback}
        started={true}
        restStage={false}
        paused={true}
      />
    );
    expect(screen.getByText("Continue pomodoro"));
  });

  test("should execute callback", () => {
    render(
      <TimerMainButton
        callback={callback}
        started={false}
        restStage={false}
        paused={false}
      />
    );
    userEvent.click(screen.getByText("Start pomodoro"));
    expect(callback).toHaveBeenCalled();
  });
});
