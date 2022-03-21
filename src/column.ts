"use strict";

interface ColumnElement {
  id: string;
  cards: HTMLCollection;
  columnCounter: Element;
  missingValue: number;
  resetText: string;
  value: number;
}

class ColumnElement {
  constructor(element: HTMLElement) {
    this.value = 0;
    this.missingValue = 0;
    this.unpackElement(element);
  }

  unpackElement(element: HTMLElement) {
    this.id = element.id;
    this.cards = element.getElementsByClassName("project-card");
    this.columnCounter = element.getElementsByClassName(
      "js-column-card-count"
    )[0];
    this.resetText = this.columnCounter.textContent;
  }

  calculateValue(regex: RegExp) {
    this.#resetValues();
    for (const card of this.cards) {
      if (
        (card as HTMLElement).dataset.cardType.includes("issue") &&
        !card.classList.contains("d-none")
      ) {
        const labels = card.getElementsByClassName("IssueLabel");
        const value = this.#extractValue(labels, regex);
        if (typeof value == "number") {
          this.value += value;
        } else {
          this.missingValue++;
        }
      }
    }
  }

  #resetValues() {
    this.value = 0;
    this.missingValue = 0;
  }

  #extractValue(labels: HTMLCollection, regex: RegExp) {
    for (const label of labels) {
      const labelName = label.textContent;
      const result = labelName.match(regex);
      if (result) {
        return parseFloat(result[1]);
      }
    }
    return null;
  }

  rewriteCounter(text: string) {
    this.columnCounter.textContent = `${text}: ${this.value.toFixed(
      1
    )} | missing: ${this.missingValue}`;
  }

  resetCounter() {
    this.columnCounter.textContent = this.resetText;
  }
}

function composeRegex(str: string) {
  const regex = new RegExp(`.*${str}:.*?(\\d+\\.?[\\d]*).*`);
  return regex;
}

export { ColumnElement, composeRegex };
