"use strict";

import { ClassicColumnElement, NewProjectsColumnElement } from "./column";

class ProjectBoard {
  readonly columns: ClassicColumnElement[];

  constructor() {
    this.columns = this.collectColumns();
  }

  get targetNode() {
    if (this.isClassic()) {
      return document.getElementsByClassName("project-columns")[0];
    } else {
      return document.querySelector("[data-test-id~='app-root']");
    }
  }

  isClassic() {
    const elements = document.getElementsByTagName("turbo-frame");
    return Boolean(elements.length);
  }

  collectColumns() {
    let elements: HTMLCollection;
    const isClassic = this.isClassic();
    if (isClassic) {
      elements = document.getElementsByClassName("project-column");
    } else {
      elements = document.getElementsByClassName(
        "column-frame__StyledFrame-sc-0-0"
      );
    }
    let columns = [];
    for (const element of elements) {
      if (element instanceof HTMLElement) {
        if (isClassic) {
          columns.push(new ClassicColumnElement(element));
        } else {
          columns.push(new NewProjectsColumnElement(element));
        }
      }
    }
    return columns;
  }
}

export { ProjectBoard };
