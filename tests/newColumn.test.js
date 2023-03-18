// Hack to get around jest TextEncoder errors. See https://github.com/jsdom/jsdom/issues/2524
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Imports
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { NewProjectBoard } = require("../src/projectBoard/projectBoard");
const {
  NewProjectColumnElement,
} = require("../src/projectBoard/newProjectColumn");
const { issueData } = require("./assets/asset-items");
const { jsonViewsData } = require("./assets/asset-views");
const { composeRegex } = require("../src/utils");

const file = "tests/assets/test-new.html";

test("Column constructor", (done) => {
  JSDOM.fromFile(file)
    .then((dom) => {
      const document = dom.window.document;
      const dependencyElement = document.getElementsByClassName(
        "column-frame__StyledFrame-sc-0-0"
      )[2];
      const column = new NewProjectColumnElement(dependencyElement);
      expect(column.value).toBe(0);
      expect(column.missingValue).toBe(0);
      expect(column.id).toBe("225a3075");
      expect(column.cards.length).toBe(6);
      expect(column.columnCounter.textContent).toBe("6");
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
      const dependencyElement = document.getElementsByClassName(
        "column-frame__StyledFrame-sc-0-0"
      )[1];
      const column = new NewProjectColumnElement(dependencyElement);

      column.setLabels([
        ["size: 3pt"],
        ["size: 10"],
        ["size 0"],
        ["size +1", "not-here 4"],
        ["dependency: 3pt"],
      ]);
      column.calculateValue(composeRegex("size"));
      expect(column.value.toFixed(1)).toBe("14.0");
      expect(column.missingValue).toBe(1);

      column.calculateValue(composeRegex("not-here"));
      expect(column.value.toFixed(1)).toBe("4.0");
      expect(column.missingValue).toBe(4);
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
      const noStatusElement = document.getElementsByClassName(
        "column-frame__StyledFrame-sc-0-0"
      )[0];
      const column = new NewProjectColumnElement(noStatusElement);
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

      // Setup board
      const board = new NewProjectBoard();
      const columnToLabels = board.columnToLabels(issueData, jsonViewsData, 2);

      // Setup element
      const toDoElement = document.getElementsByClassName(
        "column-frame__StyledFrame-sc-0-0"
      )[3];
      const column = new NewProjectColumnElement(toDoElement);
      column.setLabels(columnToLabels[column.id]);

      column.rewriteCounter("size");
      expect(column.columnCounter.textContent).toBe(
        "size: 0.0 | Issues without size label: 0"
      );
      column.resetCounter();
      expect(column.columnCounter.textContent).toBe("10");

      column.calculateValue(composeRegex("size"));
      column.rewriteCounter("size");
      expect(column.columnCounter.textContent).toBe(
        "size: 29.0 | Issues without size label: 0"
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
