"use strict";

import { ColumnElement, composeRegex } from "./column";
import { getData, data } from "./dataHandler";

let observer: MutationObserver;
const columns = collectColumns();

function main(filter: string, timer: number) {
  const targetNode = document.getElementsByClassName("project-columns")[0];
  const config = { childList: true, subtree: true };
  const callback = debounce(
    () =>
      mutationListener(filter, () => {
        observer.disconnect();
        observer.observe(targetNode, config);
      }),
    timer
  );
  observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

function mutationListener(filter: string, callback: Function) {
  rewriteColumns(filter);
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

function rewriteColumns(str: string) {
  const regex = composeRegex(str);
  for (const column of columns) {
    column.calculateValue(regex);
    column.rewriteCounter(str);
  }
}

function resetColumns() {
  for (const column of columns) {
    column.resetCounter();
  }
}

// TODO, attach observer directly to each column and only call the column that is relevant
function debounce(func: Function, timer = 500) {
  let timeout: number;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func();
    }, timer);
  };
}

//@ts-ignore
browser.runtime.onMessage.addListener(
  (message: { task: string; filter?: string }) => {
    if (observer) {
      observer.disconnect();
    }

    if (message.task == "mutate") {
      mutationListener(message.filter, () => {});
      main(message.filter, 500);
    } else if (message.task == "reset") {
      resetColumns();
    }
  }
);

getData({ rows: [], currentOn: null })
  .then((data: data) => {
    mutationListener(data.rows[data.currentOn].text, () => {});
    main(data.rows[data.currentOn].text, 1000);
  })
  .catch((error) => {
    console.log(error);
  });
