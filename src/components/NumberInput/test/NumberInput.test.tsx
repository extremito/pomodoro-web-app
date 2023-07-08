import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberInput from "../NumberInput";

describe("NumberInput component", () => {
  const testLabel = "Numeric input";
  const testValue = "5";
  const mockChange = jest.fn();

  test("should render component", () => {
    render(
      <NumberInput
        id="test"
        labelText={testLabel}
        value={testValue}
        onChange={mockChange}
      />
    );
    expect(screen.getByText(testLabel)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue(testValue);
  });

  test("should call function when input a value", () => {
    render(
      <NumberInput
        id="test"
        labelText={testLabel}
        value={testValue}
        onChange={mockChange}
      />
    );
    userEvent.type(screen.getByText(testLabel), "7");
    expect(mockChange).toHaveBeenCalled();
  });
  
  test('should disable button', () => {
    render(
      <NumberInput
        id="test"
        labelText={testLabel}
        value={testValue}
        onChange={mockChange}
        disabled={true}
      />
    );
    expect(screen.getByRole("textbox")).toBeDisabled()
  })
});
