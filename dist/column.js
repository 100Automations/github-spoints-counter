"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ColumnElement_instances, _ColumnElement_extractValue;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnElement = void 0;
class ColumnElement {
    constructor(element) {
        _ColumnElement_instances.add(this);
        this.value = 0;
        this.missingCounter = 0;
        this.unpackElement(element);
    }
    unpackElement(element) {
        this.id = element.id;
        this.cards = element.getElementsByClassName("project-card");
        this.columnCounter = element.getElementsByClassName("js-column-card-count")[0];
    }
    calculateValue(regex) {
        for (const card of this.cards) {
            const labels = card.getElementsByClassName("IssueLabel");
            const value = __classPrivateFieldGet(this, _ColumnElement_instances, "m", _ColumnElement_extractValue).call(this, labels, regex);
            if (typeof value == "number") {
                this.value += value;
            }
            else {
                this.missingCounter++;
            }
        }
    }
    rewriteCounter() {
        // TODO, take this.columnCounter and fix the innerText with the new value
    }
}
exports.ColumnElement = ColumnElement;
_ColumnElement_instances = new WeakSet(), _ColumnElement_extractValue = function _ColumnElement_extractValue(labels, regex) {
    for (const label of labels) {
        if (label instanceof HTMLElement) {
            const labelName = label.innerText;
            if (labelName.match(regex)) {
                // TODO, cast into int, if applicable, and then return the number
                return 0;
            }
        }
    }
    return null;
};
