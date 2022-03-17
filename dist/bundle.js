/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/column.ts":
/*!***********************!*\
  !*** ./src/column.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports) {

eval("\r\nvar __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {\r\n    if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a getter\");\r\n    if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot read private member from an object whose class did not declare it\");\r\n    return kind === \"m\" ? f : kind === \"a\" ? f.call(receiver) : f ? f.value : state.get(receiver);\r\n};\r\nvar _ColumnElement_instances, _ColumnElement_resetValues, _ColumnElement_extractValue;\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ColumnElement = void 0;\r\nclass ColumnElement {\r\n    constructor(element) {\r\n        _ColumnElement_instances.add(this);\r\n        this.value = 0;\r\n        this.missingCounter = 0;\r\n        this.unpackElement(element);\r\n    }\r\n    unpackElement(element) {\r\n        this.id = element.id;\r\n        this.cards = element.getElementsByClassName(\"project-card\");\r\n        this.columnCounter = element.getElementsByClassName(\"js-column-card-count\")[0];\r\n    }\r\n    calculateValue(regex) {\r\n        __classPrivateFieldGet(this, _ColumnElement_instances, \"m\", _ColumnElement_resetValues).call(this);\r\n        for (const card of this.cards) {\r\n            const labels = card.getElementsByClassName(\"IssueLabel\");\r\n            const value = __classPrivateFieldGet(this, _ColumnElement_instances, \"m\", _ColumnElement_extractValue).call(this, labels, regex);\r\n            if (typeof value == \"number\") {\r\n                this.value += value;\r\n            }\r\n            else {\r\n                this.missingCounter++;\r\n            }\r\n        }\r\n    }\r\n    rewriteCounter(text) {\r\n        this.columnCounter.textContent = `${text}: ${this.value} | missing: ${this.missingCounter}`;\r\n    }\r\n}\r\nexports.ColumnElement = ColumnElement;\r\n_ColumnElement_instances = new WeakSet(), _ColumnElement_resetValues = function _ColumnElement_resetValues() {\r\n    this.value = 0;\r\n    this.missingCounter = 0;\r\n}, _ColumnElement_extractValue = function _ColumnElement_extractValue(labels, regex) {\r\n    for (const label of labels) {\r\n        const labelName = label.textContent;\r\n        const result = labelName.match(regex);\r\n        if (result) {\r\n            return parseInt(result[1]);\r\n        }\r\n    }\r\n    return null;\r\n};\r\n\n\n//# sourceURL=webpack://foxy-pangolins/./src/column.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.composeRegex = exports.rewriteColumns = exports.collectColumns = void 0;\r\nconst column_1 = __webpack_require__(/*! ./column */ \"./src/column.ts\");\r\ndocument.body.style.border = \"5px solid green\";\r\nfunction collectColumns() {\r\n    const elements = document.getElementsByClassName(\"project-column\");\r\n    let columns = [];\r\n    for (const element of elements) {\r\n        if (element instanceof HTMLElement) {\r\n            columns.push(new column_1.ColumnElement(element));\r\n        }\r\n    }\r\n    return columns;\r\n}\r\nexports.collectColumns = collectColumns;\r\nfunction rewriteColumns(columns, str) {\r\n    const regex = composeRegex(str);\r\n    for (const column of columns) {\r\n        column.calculateValue(regex);\r\n        column.rewriteCounter(str);\r\n    }\r\n}\r\nexports.rewriteColumns = rewriteColumns;\r\nfunction composeRegex(str) {\r\n    const regex = new RegExp(`.*${str}.*(\\\\d+).*`);\r\n    return regex;\r\n}\r\nexports.composeRegex = composeRegex;\r\n\n\n//# sourceURL=webpack://foxy-pangolins/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;