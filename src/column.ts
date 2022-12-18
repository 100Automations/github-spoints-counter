"use strict";

abstract class ColumnElement {
  readonly element: Element;
  missingValue: number;
  value: number;

  constructor(element: HTMLElement) {
    this.value = 0;
    this.missingValue = 0;
    this.element = element;
  }

  calculateValue = (labelRegex: RegExp) => {
    this.#resetValues();
    try {
      [this.value, this.missingValue] = this.extractValue(
        this.cards,
        labelRegex
      );
    } catch {}
  };

  #resetValues() {
    this.value = 0;
    this.missingValue = 0;
  }

  rewriteCounter(text: string) {
    this.columnCounter.textContent = `${text}: ${this.value.toFixed(
      1
    )} | Issues without ${text} label: ${this.missingValue}`;
  }

  resetCounter() {
    this.columnCounter.textContent = this.resetText;
  }

  /**
   * The unique id of the column. This is not used, but is here in case it is needed in the future.
   */
  protected abstract get id(): string;

  /**
   * A collection of card elements on the project board. This should only include cards that are actually issue cards and not custom cards, since other functions will assume this.
   */
  protected abstract get cards(): HTMLCollection;

  /**
   * The element with the text that will change after labels are calculated. Specifically, the textContent on the element, should be the text that will appear after label calculation.
   */
  protected abstract get columnCounter(): Element;

  /**
   * The text to fall back on when the extension is turned off. This ideally is cached as a a private instance variable in the constructor, and is returned via this getter.
   */
  protected abstract get resetText(): string;

  /**
   * The first number returned should be the value of this column. The second should be the number of cards without the specified label.
   */
  protected abstract extractValue(
    cards: HTMLCollection,
    labelRegex: RegExp
  ): [number, number];
}

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
        const label_value = this.extractLabelValue(labels, labelRegex);
        if (typeof label_value == "number") {
          value += label_value;
        } else {
          missingValue++;
        }
      }
    }
    return [value, missingValue];
  }

  protected extractLabelValue(labels: HTMLCollection, labelRegex: RegExp) {
    for (const label of labels) {
      const labelName = label.textContent;
      const result = labelName.match(labelRegex);
      if (result) {
        return parseFloat(result[1]);
      }
    }
    return null;
  }
}

class NewProjectsColumnElement extends ColumnElement {
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
      const label_value = this.extractLabelValue(labels, labelRegex);
      if (typeof label_value == "number") {
        value += label_value;
      } else {
        missingValue++;
      }
    }
    return [value, missingValue];
  }

  protected extractLabelValue(labels: NodeList, labelRegex: RegExp) {
    for (const label of labels) {
      const labelName = label.textContent;
      const result = labelName.match(labelRegex);
      if (result) {
        return parseFloat(result[1]);
      }
    }
    return null;
  }
}

export { ClassicColumnElement, NewProjectsColumnElement };
