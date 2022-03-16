const { ColumnElement } = require("../dist/column");

test("use jsdom in this test file", () => {
  const element = document.createElement("div");
  expect(element).not.toBeNull();
});
