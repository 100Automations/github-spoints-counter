const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { ColumnElement } = require("../dist/column");

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
      console.log(column.columnCounter.textContent);
      expect(column.columnCounter.textContent).toBe("22");
      done();
    })
    .catch((err) => {
      done(err);
    });
});
