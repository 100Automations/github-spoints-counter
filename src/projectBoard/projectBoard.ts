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
  readonly columns: NewProjectColumnElement[];

  get targetNode(): Element {
    return document.querySelector("[data-test-id~='app-root']");
  }

  private get viewsData() {
    const data = document.getElementById("memex-views").textContent;
    const jsonViewsData = JSON.parse(data);
    const viewNumbertoDataMap = {};
    for (const view of jsonViewsData) {
      if (view.layout == "board_layout") {
        const groupByID = view.verticalGroupBy;
        viewNumbertoDataMap[view.number] =
          groupByID.length > 0 ? groupByID[0] : "Status";
      }
    }
    return viewNumbertoDataMap;
  }

  private columnToLabels(boardNumber: number) {
    const columnToLabels = {};
    const groupByID = this.viewsData[boardNumber];
    const data = document.getElementById("memex-items-data").textContent;
    const jsonData = JSON.parse(data);
    for (const issue of jsonData) {
      const issueColumns = issue.memexProjectColumnValues;
      const labels = [];
      let columnId: string;
      for (const column of issueColumns) {
        if (column.memexProjectColumnId == groupByID) {
          columnId = column.value.id;
        }
        if (column.memexProjectColumnId == "Labels") {
          for (const label of column.value) {
            labels.push(label.name);
          }
        }
      }
      columnToLabels[columnId] ??= [];
      columnToLabels[columnId].push(labels);
    }
    return columnToLabels;
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
    const regex = composeRegex(filter);
    const columnToLabels = this.columnToLabels(2);
    for (const column of this.columns) {
      column.setLabels(columnToLabels[column.id]);
      column.calculateValue(regex);
      column.rewriteCounter(filter);
    }
  }
}

export { ProjectBoard, ClassicProjectBoard, NewProjectBoard };
