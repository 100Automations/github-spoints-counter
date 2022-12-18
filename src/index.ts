"use strict";

import { composeRegex } from "./column";
import { ProjectBoard } from "./projectBoard";
import { getData, data } from "./dataHandler";
import { debounce } from "./utils";

let observer: MutationObserver;
const projectBoard = new ProjectBoard();

// TODO, attach observer directly to each column and only call the column that is relevant
function main(filter: string, timer: number) {
  const targetNode = projectBoard.targetNode;
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
  observer.observe(document, config);
}

function mutationListener(filter: string, callback: Function) {
  rewriteColumns(filter);
  callback();
}

function rewriteColumns(label: string) {
  // composeRegex is not called in the Column class because it only needs calculation once and is otherwise stable.
  const regex = composeRegex(label);
  for (const column of projectBoard.columns) {
    column.calculateValue(regex);
    column.rewriteCounter(label);
  }
}

function resetColumns() {
  for (const column of projectBoard.columns) {
    column.resetCounter();
  }
}

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

getData({ rows: [], currentSelected: null })
  .then((data: data) => {
    main(data.rows[data.currentSelected].text, 1000);
    mutationListener(data.rows[data.currentSelected].text, () => {});
  })
  .catch((error) => {
    console.log(error);
  });
