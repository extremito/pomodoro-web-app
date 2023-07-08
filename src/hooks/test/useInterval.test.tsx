import { renderHook } from "@testing-library/react";
import useInterval from "../useInterval";

jest.useFakeTimers();

const mockFn = jest.fn();

describe("useInterval", () => {
  afterEach(() => {
    mockFn.mockClear();
  });

  test("should return interval starter", () => {
    const { result } = renderHook(() => useInterval(mockFn));
    expect(result.current).toEqual(expect.any(Function));
    expect(mockFn).not.toHaveBeenCalled();
  });

  test("should call passed callback", () => {
    const { result } = renderHook(() => useInterval(mockFn));
    expect(result.current(1000)).toEqual(expect.any(Function));
    jest.advanceTimersToNextTimer();
    expect(mockFn).toHaveBeenCalled();
  });
  
  test('should clear interval', () => {
    const { result } = renderHook(() => useInterval(mockFn));
    const stopTimer = result.current(1000)
    stopTimer()
    expect(clearInterval).toHaveBeenCalled();
  })
});
