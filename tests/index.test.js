// Hack to get around jest TextEncoder errors. See https://github.com/jsdom/jsdom/issues/2524
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Import
const jsdom = require("jsdom");

//const dom = JSDOM.fromFile("tests/assets/test.html");

test("use jsdom in this test file", () => {
  expect(true).toBe(true);
});
