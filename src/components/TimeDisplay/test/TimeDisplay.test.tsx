import { render, screen } from "@testing-library/react";
import TimeDisplay from "../TimeDisplay";

describe("TimeDisplay component", () => {
  test("should convert seconds to minutes", () => {
    render(
      <TimeDisplay
        seconds={150}
        timeset={180}
        displayPomodoro={true}
        displayRest={false}
      />
    );
    expect(screen.getByText("0 : 30")).toBeInTheDocument();
  });

  test("should display pomodoro title", () => {
    render(
      <TimeDisplay
        seconds={150}
        timeset={180}
        displayPomodoro={true}
        displayRest={false}
      />
    );
    expect(screen.getByText("Remaining pomodoro time")).toBeInTheDocument();
  });

  test("should display pomodoro title", () => {
    render(
      <TimeDisplay
        seconds={150}
        timeset={180}
        displayPomodoro={false}
        displayRest={true}
      />
    );
    expect(screen.getByText("Remaining rest time")).toBeInTheDocument();
  });
});
