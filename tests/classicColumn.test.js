// Hack to get around jest TextEncoder errors. See https://github.com/jsdom/jsdom/issues/2524
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Imports
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { ClassicColumnElement } = require("../src/projectBoard/classicColumn");
const { composeRegex } = require("../src/utils");

const file = "tests/assets/test-classic.html";

test("Column constructor", (done) => {
  JSDOM.fromFile(file)
    .then((dom) => {
      const document = dom.window.document;
      const backlogElement =
        document.getElementsByClassName("project-column")[3];
      const column = new ClassicColumnElement(backlogElement);
      expect(column.value).toBe(0);
      expect(column.missingValue).toBe(0);
      expect(column.id).toBe("column-10928271");
      expect(column.cards.length).toBe(22);
      expect(column.columnCounter.textContent).toBe("22");
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
      const backlogElement =
        document.getElementsByClassName("project-column")[3];
      const column = new ClassicColumnElement(backlogElement);

      column.calculateValue(composeRegex("size"));
      expect(column.value.toFixed(1)).toBe("63.4");
      expect(column.missingValue).toBe(0);

      column.calculateValue(composeRegex("not-here"));
      expect(column.value.toFixed(1)).toBe("0.0");
      expect(column.missingValue).toBe(22);
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
      const backlogElement =
        document.getElementsByClassName("project-column")[0];
      const column = new ClassicColumnElement(backlogElement);
      column.calculateValue(composeRegex("size"));
      expect(column.value.toFixed(1)).toBe("0.0");
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
      const backlogElement =
        document.getElementsByClassName("project-column")[3];
      const column = new ClassicColumnElement(backlogElement);

      column.rewriteCounter("size");
      expect(column.columnCounter.textContent).toBe(
        "size: 0.0 | Issues without size label: 0"
      );
      column.resetCounter();
      expect(column.columnCounter.textContent).toBe("22");

      column.calculateValue(composeRegex("size"));
      column.rewriteCounter("size");
      expect(column.columnCounter.textContent).toBe(
        "size: 63.4 | Issues without size label: 0"
      );
      column.resetCounter();
      expect(column.columnCounter.textContent).toBe("22");

      column.calculateValue(composeRegex("not-here"));
      column.rewriteCounter("size");
      expect(column.columnCounter.textContent).toBe(
        "size: 0.0 | Issues without size label: 22"
      );
      column.resetCounter();
      expect(column.columnCounter.textContent).toBe("22");

      done();
    })
    .catch((err) => {
      done(err);
    });
});
