// Hack to get around jest TextEncoder errors. See https://github.com/jsdom/jsdom/issues/2524
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Imports
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const {
  NewProjectColumnElement,
} = require("../src/projectBoard/newProjectColumn");
const { composeRegex } = require("../src/utils");

const file = "tests/assets/test-new.html";

test("Column constructor", (done) => {
  JSDOM.fromFile(file)
    .then((dom) => {
      const document = dom.window.document;
      const approvalElement = document.getElementsByClassName(
        "column-frame__StyledFrame-sc-0-0"
      )[2];
      const column = new NewProjectColumnElement(approvalElement);
      expect(column.value).toBe(0);
      expect(column.missingValue).toBe(0);
      expect(column.id).toBe("225a3075");
      expect(column.cards.length).toBe(3);
      expect(column.columnCounter.textContent).toBe("3");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("Column calculateValue", (done) => {
  JSDOM.fromFile(file)
    .then((dom) => {
      const document = dom.window.document;
      const approvalElement = document.getElementsByClassName(
        "column-frame__StyledFrame-sc-0-0"
      )[1];
      const column = new NewProjectColumnElement(approvalElement);

      column.calculateValue(composeRegex("size"));
      expect(column.value.toFixed(1)).toBe("6.0");
      expect(column.missingValue).toBe(0);

      column.calculateValue(composeRegex("not-here"));
      expect(column.value.toFixed(1)).toBe("0.0");
      expect(column.missingValue).toBe(3);
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("Column calculateValue no-issue-card-column", (done) => {
  JSDOM.fromFile(file)
    .then((dom) => {
      const document = dom.window.document;
      const approvalElement = document.getElementsByClassName(
        "column-frame__StyledFrame-sc-0-0"
      )[2];
      const column = new NewProjectColumnElement(approvalElement);
      column.calculateValue(composeRegex("size"));
      expect(column.value.toFixed(1)).toBe("6.0");
      expect(column.missingValue).toBe(0);
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("Column rewriteCounter", (done) => {
  JSDOM.fromFile(file)
    .then((dom) => {
      const document = dom.window.document;
      const approvalElement = document.getElementsByClassName(
        "column-frame__StyledFrame-sc-0-0"
      )[3];
      const column = new NewProjectColumnElement(approvalElement);

      column.rewriteCounter("size");
      expect(column.columnCounter.textContent).toBe(
        "size: 0.0 | Issues without size label: 0"
      );
      column.resetCounter();
      expect(column.columnCounter.textContent).toBe("10");

      column.calculateValue(composeRegex("size"));
      column.rewriteCounter("size");
      expect(column.columnCounter.textContent).toBe(
        "size: 9.0 | Issues without size label: 6"
      );
      column.resetCounter();
      expect(column.columnCounter.textContent).toBe("10");

      column.calculateValue(composeRegex("not-here"));
      column.rewriteCounter("size");
      expect(column.columnCounter.textContent).toBe(
        "size: 0.0 | Issues without size label: 10"
      );
      column.resetCounter();
      expect(column.columnCounter.textContent).toBe("10");

      done();
    })
    .catch((err) => {
      done(err);
    });
});
