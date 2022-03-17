const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { ColumnElement } = require("../dist-ts/column");

test("Column constructor", (done) => {
  JSDOM.fromFile("tests/assets/test.html")
    .then((dom) => {
      const document = dom.window.document;
      const backlogElement =
        document.getElementsByClassName("project-column")[3];
      const column = new ColumnElement(backlogElement);
      expect(column.value).toBe(0);
      expect(column.missingCounter).toBe(0);
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
      column.calculateValue(new RegExp(".*size.*?(\\d+).*"));
      expect(column.value).toBe(62);
      expect(column.missingCounter).toBe(0);
      column.calculateValue(new RegExp(".*not-here.*?(\\d+).*"));
      expect(column.value).toBe(0);
      expect(column.missingCounter).toBe(22);
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
      expect(column.columnCounter.textContent).toBe("size: 0 | missing: 0");
      column.calculateValue(new RegExp(".*size.*?(\\d+).*"));
      column.rewriteCounter("size");
      expect(column.columnCounter.textContent).toBe("size: 62 | missing: 0");
      column.calculateValue(new RegExp(".*not-here.*?(\\d+).*"));
      column.rewriteCounter("size");
      expect(column.columnCounter.textContent).toBe("size: 0 | missing: 22");
      done();
    })
    .catch((err) => {
      done(err);
    });
});
