import formatInt from "../formatInt";

describe("formatInt function", () => {
  test("should return formated int number", () => {
    expect(formatInt(5, 3)).toMatch("005");
  });
});
