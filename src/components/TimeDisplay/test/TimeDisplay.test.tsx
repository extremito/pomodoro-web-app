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
        displayWait={false}
      />
    );
    expect(screen.getByText("0 : 30")).toBeInTheDocument();
  });

  test.each`
    title                             | displayPomodoro | displayRest | displayWait
    ${"Remaining pomodoro time"}      | ${true}         | ${false}    | ${false}
    ${"Remaining rest time"}          | ${false}        | ${true}     | ${false}
    ${"Waiting for rest to start..."} | ${false}        | ${false}    | ${true}
  `(
    "should display $title",
    ({ title, displayPomodoro, displayRest, displayWait }) => {
      render(
        <TimeDisplay
          seconds={150}
          timeset={180}
          displayPomodoro={displayPomodoro}
          displayRest={displayRest}
          displayWait={displayWait}
        />
      );
      expect(screen.getByText(title)).toBeInTheDocument();
    }
  );
});
