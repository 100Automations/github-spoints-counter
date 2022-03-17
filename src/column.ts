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

  #extractValue(labels: HTMLCollection, regex: RegExp) {
    for (const label of labels) {
      if (label instanceof HTMLElement) {
        const labelName = label.textContent;
        if (labelName.match(regex)) {
          // TODO, cast into int, if applicable, and then return the number
          return 0;
        }
      }
    }
    return null;
  }

  rewriteCounter() {
    // TODO, take this.columnCounter and fix the innerText with the new value
  }
}

export { ColumnElement };
