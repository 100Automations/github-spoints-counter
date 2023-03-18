"use strict";
import { ColumnElement } from "./column";
import { extractValueFromElements } from "../utils";

class ClassicColumnElement extends ColumnElement {
  readonly cachedResetText: string;

  constructor(element: HTMLElement) {
    super(element);
    this.cachedResetText = this.columnCounter.textContent;
  }

  protected get id() {
    return this.element.id;
  }

  protected get cards() {
    return this.element.getElementsByClassName("project-card");
  }

  protected get columnCounter() {
    return this.element.getElementsByClassName("js-column-card-count")[0];
  }

  protected get resetText() {
    return this.cachedResetText;
  }

  protected extractValue(
    cards: HTMLCollection,
    labelRegex: RegExp
  ): [number, number] {
    let value = 0;
    let missingValue = 0;
    for (const card of cards) {
      if (
        (card as HTMLElement).dataset.cardType.includes("issue") &&
        !card.classList.contains("d-none")
      ) {
        const labels = card.getElementsByClassName("IssueLabel");
        const label_value = extractValueFromElements(labels, labelRegex);
        if (typeof label_value == "number") {
          value += label_value;
        } else {
          missingValue++;
        }
      }
    }
    return [value, missingValue];
  }
}

export { ClassicColumnElement };
