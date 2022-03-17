"use strict";

interface ColumnElement {
  id: String;
  cards: HTMLCollection;
  columnCounter: Element;
  missingCounter: number;
  value: number;
}

class ColumnElement {
  constructor(element: HTMLElement) {
    this.value = 0;
    this.missingCounter = 0;
    this.unpackElement(element);
  }

  unpackElement(element: HTMLElement) {
    this.id = element.id;
    this.cards = element.getElementsByClassName("project-card");
    this.columnCounter = element.getElementsByClassName(
      "js-column-card-count"
    )[0];
  }

  calculateValue(regex: RegExp) {
    this.#resetValues();
    for (const card of this.cards) {
      const labels = card.getElementsByClassName("IssueLabel");
      const value = this.#extractValue(labels, regex);
      if (typeof value == "number") {
        this.value += value;
      } else {
        this.missingCounter++;
      }
    }
  }

  #resetValues() {
    this.value = 0;
    this.missingCounter = 0;
  }

  #extractValue(labels: HTMLCollection, regex: RegExp) {
    for (const label of labels) {
      const labelName = label.textContent;
      const result = labelName.match(regex);
      if (result) {
        return parseInt(result[1]);
      }
    }
    return null;
  }

  rewriteCounter(text: string) {
    this.columnCounter.textContent = `${text}: ${this.value} | missing: ${this.missingCounter}`;
  }
}

export { ColumnElement };
