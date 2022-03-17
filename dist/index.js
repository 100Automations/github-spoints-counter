"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeRegex = exports.rewriteColumns = exports.collectColumns = void 0;
// TODO see this for how to use babel for compiling https://github.com/microsoft/TypeScript-Babel-Starter/blob/master/package.json
const column_1 = require("./column");
document.body.style.border = "5px solid green";
function collectColumns() {
    const elements = document.getElementsByClassName("project-column");
    let columns = [];
    for (const element of elements) {
        if (element instanceof HTMLElement) {
            columns.push(new column_1.ColumnElement(element));
        }
    }
    return columns;
}
exports.collectColumns = collectColumns;
function rewriteColumns(columns, str) {
    const regex = composeRegex(str);
    for (const column of columns) {
        column.calculateValue(regex);
        column.rewriteCounter(str);
    }
}
exports.rewriteColumns = rewriteColumns;
function composeRegex(str) {
    const regex = new RegExp(`.*${str}.*(\\d+).*`);
    return regex;
}
exports.composeRegex = composeRegex;
