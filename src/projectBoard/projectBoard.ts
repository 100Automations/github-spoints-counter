"use strict";
import { ColumnElement } from "./column";
import { ClassicColumnElement } from "./classicColumn";
import { NewProjectColumnElement } from "./newProjectColumn";
import { composeRegex } from "../utils";

abstract class ProjectBoard {
  readonly columns: ColumnElement[];
  readonly url: string;

  constructor() {
    this.columns = this.collectColumns();
    this.url = window.location.href;
  }

  abstract get targetNode(): Element;

  static isClassic() {
    const elements = document.getElementsByTagName("turbo-frame");
    return Boolean(elements.length);
  }

  protected abstract collectColumns(): ColumnElement[];

  abstract calculateColumns(filter: string): void;
}

class ClassicProjectBoard extends ProjectBoard {
  get targetNode() {
    return document.getElementsByClassName("project-columns")[0];
  }

  protected collectColumns(): ColumnElement[] {
    const elements = document.getElementsByClassName("project-column");
    let columns = [];
    for (const element of elements) {
      if (element instanceof HTMLElement) {
        columns.push(new ClassicColumnElement(element));
      }
    }
    return columns;
  }

  calculateColumns(filter: string): void {
    const regex = composeRegex(filter);
    for (const column of this.columns) {
      column.calculateValue(regex);
      column.rewriteCounter(filter);
    }
  }
}

class NewProjectBoard extends ProjectBoard {
  get targetNode(): Element {
    return document.querySelector("[data-test-id~='app-root']");
  }

  private get itemsData() {
    const data = document.getElementById("memex-items-data").textContent;
    return JSON.parse(data);
  }

  private get viewsData() {
    const data = document.getElementById("memex-views").textContent;
    return JSON.parse(data);
  }

  protected collectColumns(): ColumnElement[] {
    const elements = document.getElementsByClassName(
      "column-frame__StyledFrame-sc-0-0"
    );
    let columns = [];
    for (const element of elements) {
      if (element instanceof HTMLElement) {
        columns.push(new NewProjectColumnElement(element));
      }
    }
    return columns;
  }

  calculateColumns(filter: string): void {
    throw new Error("Method not implemented.");
  }
}

export { ProjectBoard, ClassicProjectBoard, NewProjectBoard };
