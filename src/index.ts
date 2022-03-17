"use strict";

// TODO see this for how to use babel for compiling https://github.com/microsoft/TypeScript-Babel-Starter/blob/master/package.json

import { ColumnElement } from "./column";
document.body.style.border = "5px solid green";

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
  const regex = new RegExp(`.*${str}.*(\\d+).*`);
  return regex;
}

export { collectColumns, rewriteColumns, composeRegex };
