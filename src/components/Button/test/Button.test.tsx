import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";

describe("Button component", () => {
  const mockClick = jest.fn();

  afterEach(() => {
    mockClick.mockClear();
  });

  test("should render button", () => {
    render(<Button onClick={mockClick}>Test</Button>);
    expect(screen.getByRole("button", { name: "Test" })).toBeInTheDocument();
  });

  test("should execute callback", () => {
    render(<Button onClick={mockClick}>Test</Button>);
    userEvent.click(screen.getByRole("button", { name: "Test" }));
    expect(mockClick).toHaveBeenCalled();
  });

  test("should render disabled button", () => {
    render(
      <Button onClick={mockClick} disabled={true}>
        Test
      </Button>
    );
    expect(screen.getByRole("button", { name: "Test" })).toBeDisabled();
  });
});
