import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TimerMainButton from "../TimerMainButton";

describe("TimerMainButton component", () => {
  const callback = jest.fn();

  test.each`
    title                  | started  | restStage | paused
    ${"Start pomodoro"}    | ${false} | ${false}  | ${false}
    ${"Stop pomodoro"}     | ${true}  | ${false}  | ${false}
    ${"Continue pomodoro"} | ${true}  | ${false}  | ${true}
    ${"Start rest"}        | ${false} | ${true}   | ${false}
    ${"Stop rest"}         | ${true}  | ${true}   | ${false}
    ${"Continue rest"}     | ${true}  | ${true}   | ${true}
  `(
    "should render $title on button",
    ({ title, started, restStage, paused }) => {
      render(
        <TimerMainButton
          callback={callback}
          started={started}
          restStage={restStage}
          paused={paused}
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
      />
    );
    userEvent.click(screen.getByText("Start pomodoro"));
    expect(callback).toHaveBeenCalled();
  });
});
