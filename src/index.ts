/*

1. complete a function that rewrites all the numbers in the columns

2. complete a function that counts the number of points, check

3. complete a a function that takes input from a form and configures the other functions

*/

import { ColumnElement } from "./column";

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
  }
}

function composeRegex(str: string) {
  const regex = new RegExp(`.*${str}.*(\\d+).*`);
  return regex;
}

export { collectColumns, composeRegex };
