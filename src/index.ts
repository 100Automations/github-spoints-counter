"use strict";
import {
  ProjectBoard,
  ClassicProjectBoard,
  NewProjectBoard,
} from "./projectBoard/projectBoard";
import { getLocalData, localData } from "./dataHandler";
import { debounce } from "./utils";

let observer: MutationObserver;
const projectBoard = ProjectBoard.isClassic()
  ? new ClassicProjectBoard()
  : new NewProjectBoard();

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
  projectBoard.calculateColumns(filter);
  callback();
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

    if (message.task == "updateSelected") {
      mutationListener(message.filter, () => {});
      main(message.filter, 500);
    } else if (message.task == "reset") {
      resetColumns();
    } else if (message.task == "getPageData") {
      browser.runtime.sendMessage({
        data: JSON.stringify(projectBoard.labelGroups),
      });
    }
  }
);

getLocalData({ currentSelected: null })
  .then((data: localData) => {
    if (data.currentSelected) {
      mutationListener(data.currentSelected || undefined, () => {});
      main(data.currentSelected || undefined, 500);
    } else {
      resetColumns();
    }
  })
  .catch((error: Error) => console.log(error));
