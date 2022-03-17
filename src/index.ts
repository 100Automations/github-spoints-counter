"use strict";

import { ColumnElement } from "./column";

function main() {
  const columns = collectColumns();
  rewriteColumns(columns, "size");
}

function collectColumns() {
  const elements = document.getElementsByClassName("project-column");
  let columns = [];
  for (const element of elements) {
    if (element instanceof HTMLElement) {
      columns.push(new ColumnElement(element));
    }
  }
  return columns;
}

function rewriteColumns(columns: ColumnElement[], str: string) {
  const regex = composeRegex(str);
  for (const column of columns) {
    column.calculateValue(regex);
    column.rewriteCounter(str);
  }
}

function composeRegex(str: string) {
  const regex = new RegExp(`.*${str}.*?(\\d+).*`);
  return regex;
}

document.body.style.border = "5px solid red";
window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  main();
});
main();

export { collectColumns, rewriteColumns, composeRegex };
