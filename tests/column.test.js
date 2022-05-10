const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { ColumnElement, composeRegex } = require("../src/column");

test("Column constructor", (done) => {
  JSDOM.fromFile("tests/assets/test.html")
    .then((dom) => {
      const document = dom.window.document;
      const backlogElement =
        document.getElementsByClassName("project-column")[3];
      const column = new ColumnElement(backlogElement);
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
  JSDOM.fromFile("tests/assets/test.html")
    .then((dom) => {
      const document = dom.window.document;
      const backlogElement =
        document.getElementsByClassName("project-column")[3];
      const column = new ColumnElement(backlogElement);

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
  JSDOM.fromFile("tests/assets/test.html")
    .then((dom) => {
      const document = dom.window.document;
      const backlogElement =
        document.getElementsByClassName("project-column")[0];
      const column = new ColumnElement(backlogElement);
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
  JSDOM.fromFile("tests/assets/test.html")
    .then((dom) => {
      const document = dom.window.document;
      const backlogElement =
        document.getElementsByClassName("project-column")[3];
      const column = new ColumnElement(backlogElement);

      column.rewriteCounter("size");
      expect(column.columnCounter.textContent).toBe("size: 0.0 | missing: 0");
      column.resetCounter();
      expect(column.columnCounter.textContent).toBe("22");

      column.calculateValue(composeRegex("size"));
      column.rewriteCounter("size");
      expect(column.columnCounter.textContent).toBe("size: 63.4 | missing: 0");
      column.resetCounter();
      expect(column.columnCounter.textContent).toBe("22");

      column.calculateValue(composeRegex("not-here"));
      column.rewriteCounter("size");
      expect(column.columnCounter.textContent).toBe("size: 0.0 | missing: 22");
      column.resetCounter();
      expect(column.columnCounter.textContent).toBe("22");

      done();
    })
    .catch((err) => {
      done(err);
    });
});
