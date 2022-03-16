"use strict";
/*

1. complete a function that rewrites all the numbers in the columns

2. complete a function that counts the number of points, check

3. complete a a function that takes input from a form and configures the other functions

*/
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("./column");
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
function composeRegex(str) { }
