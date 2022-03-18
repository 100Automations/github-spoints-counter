"use strict";

import { ColumnElement } from "./column";

function main() {
  const columns = collectColumns();
  rewriteColumns(columns, "size");
  observer.disconnect();
  observer.observe(targetNode, config);
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

// TODO, attach observer directly to each column and only call the column that is relevant
let timeout;
const targetNode = document.getElementsByClassName("project-columns")[0];
const config = { childList: true, subtree: true };
const callback = () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    main();
  }, 500);
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

export { collectColumns, rewriteColumns, composeRegex };
