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
  const regex = new RegExp(`.*${str}.*?(\\d+\\.?[\\d]*).*`);
  return regex;
}

console.log("1");
document.body.style.border = "5px solid red";

// @ts-ignore
console.log(browser.runtime);

// @ts-ignore
browser.webRequest.onCompleted.addListener(
  () => {
    console.log("three");
  },
  { urls: ["<all_urls>"] }
);

document.body.style.border = "5px solid green";
console.log("2");

main();

export { collectColumns, rewriteColumns, composeRegex };
