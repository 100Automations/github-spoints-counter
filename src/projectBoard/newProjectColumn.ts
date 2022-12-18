"use strict";
import { ColumnElement } from "./column";
import { extractValueFromElements } from "../utils";

class NewProjectColumnElement extends ColumnElement {
  readonly cachedResetText: string;

  constructor(element: HTMLElement) {
    super(element);
    this.cachedResetText = this.columnCounter.textContent;
  }

  protected get id() {
    return this.element.id;
  }

  protected get cards() {
    return this.element.getElementsByClassName("card__CardBase-sc-0-0");
  }

  protected get columnCounter() {
    return this.element.querySelector("[data-test-id~='column-items-counter']");
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
      const labels = card.querySelectorAll("[data-test-id~='issue-label']");
      const label_value = extractValueFromElements(labels, labelRegex);
      if (typeof label_value == "number") {
        value += label_value;
      } else {
        missingValue++;
      }
    }
    return [value, missingValue];
  }
}

export { NewProjectColumnElement };
