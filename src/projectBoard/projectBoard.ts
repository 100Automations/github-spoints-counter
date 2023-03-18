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

  abstract get labelSelector(): string;

  get labelGroups() {
    const all_labels = document.querySelectorAll(this.labelSelector);
    const verifiedLabels = [];
    const verifiedLabelGroups = new Set();
    const verifiedRegex = composeRegex("([A-Za-z]+)");
    for (const label of all_labels) {
      const text = label.textContent.trim();
      const match = text.match(verifiedRegex);
      if (match) {
        const labelGroup = match[1].toLocaleLowerCase();
        if (!verifiedLabelGroups.has(labelGroup)) {
          verifiedLabels.push({ text: labelGroup });
          verifiedLabelGroups.add(labelGroup);
        }
      }
    }
    return verifiedLabels;
  }
}

class ClassicProjectBoard extends ProjectBoard {
  get targetNode() {
    return document.getElementsByClassName("project-columns")[0];
  }

  get labelSelector() {
    return ".IssueLabel";
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
  columns: NewProjectColumnElement[];

  get targetNode(): Element {
    return document.querySelector("[data-test-id~='app-root']");
  }

  get labelSelector() {
    return "[data-test-id~='issue-label']";
  }

  private async apidata() {
    const apiData = document.getElementById(
      "memex-refresh-api-data"
    ).textContent;
    const apiURL = JSON.parse(apiData).url;
    const response = await fetch(
      `https://github.com/${apiURL}?visibleFields=%5B%22Labels%22%5D`,
      {
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    const data = await response.json();
    return [data.memexProjectItems, data.memexViews];
  }

  private getGroupById(viewsData: any[]) {
    const viewNumbertoDataMap = {};
    for (const view of viewsData) {
      if (view.layout == "board_layout") {
        const groupByID = view.verticalGroupBy;
        viewNumbertoDataMap[view.number] =
          groupByID.length > 0 ? groupByID[0] : "Status";
      }
    }
    return viewNumbertoDataMap;
  }

  private getLabelsData(fields: any, targetFieldId: string) {
    let fieldId: string;
    const labels = [];
    for (const field of fields) {
      if (field.memexProjectColumnId == targetFieldId) {
        fieldId = field.value.id;
      }
      if (field.memexProjectColumnId == "Labels") {
        for (const label of field.value) {
          labels.push(label.name);
        }
      }
    }
    return [fieldId, labels] as const;
  }

  private columnToLabels(issueData, jsonViewsData, boardNumber: number) {
    const columnToLabels = {};
    const groupByID: string = this.getGroupById(jsonViewsData)[boardNumber];
    for (const issue of issueData) {
      const issueFields = issue.memexProjectColumnValues;
      const [fieldId, labels] = this.getLabelsData(issueFields, groupByID);
      columnToLabels[fieldId] ??= [];
      columnToLabels[fieldId].push(labels);
    }
    return columnToLabels;
  }

  protected collectColumns(): NewProjectColumnElement[] {
    const elements = document.querySelectorAll(
      "[data-test-id~='board-view-column']"
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
    // Columns need to be collected during calculation time because when the board is swapped, the dom is destroyed and remade rather than refreshed.
    this.columns = this.collectColumns();
    const regex = composeRegex(filter);
    const boardNumber = parseInt(window.location.href.slice(-1));
    this.apidata().then((data) => {
      const [issueData, jsonViewsData] = data;
      const columnToLabelsMap = this.columnToLabels(
        issueData,
        jsonViewsData,
        boardNumber
      );
      for (const column of this.columns) {
        column.setLabels(columnToLabelsMap[column.id]);
        column.calculateValue(regex);
        column.rewriteCounter(filter);
      }
    });
  }
}

export { ProjectBoard, ClassicProjectBoard, NewProjectBoard };
