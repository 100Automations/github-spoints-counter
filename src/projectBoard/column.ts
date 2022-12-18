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

export { ColumnElement };
