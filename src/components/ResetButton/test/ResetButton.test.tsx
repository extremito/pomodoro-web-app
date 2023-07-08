import { render, screen } from "@testing-library/react";
import useEvent from "@testing-library/user-event";
import ResetButton from "../ResetButton";

describe("ResetButton component", () => {
  const mockClick = jest.fn();

  test("should render button", () => {
    render(<ResetButton onClick={mockClick} />);
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  test("should execute callback", () => {
    render(<ResetButton onClick={mockClick} />);
    useEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(mockClick).toHaveBeenCalled();
  });
});
