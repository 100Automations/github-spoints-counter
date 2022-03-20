"use strict";

import { collectColumns, rewriteColumns } from "./column";

let observer: MutationObserver;

function main(filter: string) {
  const targetNode = document.getElementsByClassName("project-columns")[0];
  const config = { childList: true, subtree: true };
  const callback = debounce(() =>
    mutationListener(filter, () => {
      observer.disconnect();
      observer.observe(targetNode, config);
    })
  );
  observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

function mutationListener(filter: string, callback: Function) {
  const columns = collectColumns();
  rewriteColumns(columns, filter);
  callback();
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
/*
//main("size");
console.log("zero?");
//@ts-ignore
browser.runtime.onMessage.addListener((message: { filter: string }) => {
  if (observer) {
    observer.disconnect();
  }
  mutationListener(message.filter, () => {});
  main(message.filter);
});*/
