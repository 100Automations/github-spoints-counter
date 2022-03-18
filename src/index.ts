"use strict";

import { ColumnElement } from "./column";

function main() {
  let observer: MutationObserver;
  const targetNode = document.getElementsByClassName("project-columns")[0];
  const config = { childList: true, subtree: true };
  const callback = debounce(() =>
    mutationListener(() => {
      observer.disconnect();
      observer.observe(targetNode, config);
    })
  );
  observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

function mutationListener(callback: Function) {
  const columns = collectColumns();
  rewriteColumns(columns, "size");
  console.log("check_run");
  callback();
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
function debounce(func: Function, timer = 500) {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func();
    }, timer);
  };
}

main();

export { collectColumns, rewriteColumns, composeRegex };
