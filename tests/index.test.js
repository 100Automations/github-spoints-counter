const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { collectColumns, composeRegex } = require("../dist-ts/index");

//const dom = JSDOM.fromFile("tests/assets/test.html");

test("use jsdom in this test file", () => {
  expect(true).toBe(true);
});
