import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TimerMainButton from "../TimerMainButton";

describe("TimerMainButton component", () => {
  const callback = jest.fn();

  test.each`
    title                  | started  | restStage | paused   | waiting
    ${"Start pomodoro"}    | ${false} | ${false}  | ${false} | ${false}
    ${"Stop pomodoro"}     | ${true}  | ${false}  | ${false} | ${false}
    ${"Continue pomodoro"} | ${true}  | ${false}  | ${true}  | ${false}
    ${"Start rest"}        | ${false} | ${true}   | ${false} | ${false}
    ${"Start rest"}        | ${false} | ${false}  | ${false} | ${true}
    ${"Stop rest"}         | ${true}  | ${true}   | ${false} | ${false}
    ${"Continue rest"}     | ${true}  | ${true}   | ${true}  | ${false}
  `(
    "should render $title on button",
    ({ title, started, restStage, paused, waiting }) => {
      render(
        <TimerMainButton
          callback={callback}
          started={started}
          restStage={restStage}
          paused={paused}
          waiting={waiting}
          disabled={true}
        />
      );
      expect(screen.getByText(title)).toBeInTheDocument();
    }
  );

  test("should execute callback", () => {
    render(
      <TimerMainButton
        callback={callback}
        started={false}
        restStage={false}
        paused={false}
        waiting={false}
        disabled={false}
      />
    );
    userEvent.click(screen.getByText("Start pomodoro"));
    expect(callback).toHaveBeenCalled();
  });

  test("should disable button", () => {
    render(
      <TimerMainButton
        callback={callback}
        started={false}
        restStage={false}
        paused={false}
        waiting={false}
        disabled={true}
      />
    );
    expect(screen.getByText("Start pomodoro")).toBeDisabled();
  });
});
