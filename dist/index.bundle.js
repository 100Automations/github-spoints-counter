/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/column.ts":
/*!***********************!*\
  !*** ./src/column.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports) {


var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ColumnElement_instances, _ColumnElement_resetValues, _ColumnElement_extractValue;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.composeRegex = exports.ColumnElement = void 0;
class ColumnElement {
    constructor(element) {
        _ColumnElement_instances.add(this);
        this.value = 0;
        this.missingValue = 0;
        this.unpackElement(element);
    }
    unpackElement(element) {
        this.id = element.id;
        this.cards = element.getElementsByClassName("project-card");
        this.columnCounter = element.getElementsByClassName("js-column-card-count")[0];
        this.resetText = this.columnCounter.textContent;
    }
    calculateValue(regex) {
        __classPrivateFieldGet(this, _ColumnElement_instances, "m", _ColumnElement_resetValues).call(this);
        for (const card of this.cards) {
            if (card.dataset.cardType.includes("issue") &&
                !card.classList.contains("d-none")) {
                const labels = card.getElementsByClassName("IssueLabel");
                const value = __classPrivateFieldGet(this, _ColumnElement_instances, "m", _ColumnElement_extractValue).call(this, labels, regex);
                if (typeof value == "number") {
                    this.value += value;
                }
                else {
                    this.missingValue++;
                }
            }
        }
    }
    rewriteCounter(text) {
        this.columnCounter.textContent = `${text}: ${this.value.toFixed(1)} | missing: ${this.missingValue}`;
    }
    resetCounter() {
        this.columnCounter.textContent = this.resetText;
    }
}
exports.ColumnElement = ColumnElement;
_ColumnElement_instances = new WeakSet(), _ColumnElement_resetValues = function _ColumnElement_resetValues() {
    this.value = 0;
    this.missingValue = 0;
}, _ColumnElement_extractValue = function _ColumnElement_extractValue(labels, regex) {
    for (const label of labels) {
        const labelName = label.textContent;
        const result = labelName.match(regex);
        if (result) {
            return parseFloat(result[1]);
        }
    }
    return null;
};
function composeRegex(str) {
    const regex = new RegExp(`.*${str}:.*?(\\d+\\.?[\\d]*).*`);
    return regex;
}
exports.composeRegex = composeRegex;


/***/ }),

/***/ "./src/dataHandler.ts":
/*!****************************!*\
  !*** ./src/dataHandler.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setData = exports.getData = void 0;
function getData(keys) {
    //@ts-ignore
    return browser.storage.local.get(keys);
}
exports.getData = getData;
function setData(data) {
    //@ts-ignore
    return browser.storage.local.set(data);
}
exports.setData = setData;


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.debounce = void 0;
function debounce(func, timer = 500) {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func();
        }, timer);
    };
}
exports.debounce = debounce;


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const column_1 = __webpack_require__(/*! ./column */ "./src/column.ts");
const dataHandler_1 = __webpack_require__(/*! ./dataHandler */ "./src/dataHandler.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
let observer;
const columns = collectColumns();
// TODO, attach observer directly to each column and only call the column that is relevant
function main(filter, timer) {
    const targetNode = document.getElementsByClassName("project-columns")[0];
    const config = { childList: true, subtree: true };
    const callback = (0, utils_1.debounce)(() => mutationListener(filter, () => {
        observer.disconnect();
        observer.observe(targetNode, config);
    }), timer);
    observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}
function mutationListener(filter, callback) {
    rewriteColumns(filter);
    callback();
}
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
function rewriteColumns(str) {
    const regex = (0, column_1.composeRegex)(str);
    for (const column of columns) {
        column.calculateValue(regex);
        column.rewriteCounter(str);
    }
}
function resetColumns() {
    for (const column of columns) {
        column.resetCounter();
    }
}
//@ts-ignore
browser.runtime.onMessage.addListener((message) => {
    if (observer) {
        observer.disconnect();
    }
    if (message.task == "mutate") {
        mutationListener(message.filter, () => { });
        main(message.filter, 500);
    }
    else if (message.task == "reset") {
        resetColumns();
    }
});
(0, dataHandler_1.getData)({ rows: [], currentOn: null })
    .then((data) => {
    mutationListener(data.rows[data.currentOn].text, () => { });
    main(data.rows[data.currentOn].text, 1000);
})
    .catch((error) => {
    console.log(error);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0IsR0FBRyxxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLEtBQUssSUFBSSx1QkFBdUIsYUFBYSxrQkFBa0I7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsSUFBSTtBQUN0QztBQUNBO0FBQ0Esb0JBQW9COzs7Ozs7Ozs7OztBQy9EUDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlLEdBQUcsZUFBZTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7Ozs7Ozs7Ozs7O0FDWkY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsZ0JBQWdCOzs7Ozs7O1VDWmhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUJBQWlCLG1CQUFPLENBQUMsaUNBQVU7QUFDbkMsc0JBQXNCLG1CQUFPLENBQUMsMkNBQWU7QUFDN0MsZ0JBQWdCLG1CQUFPLENBQUMsK0JBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELDZCQUE2QiwyQkFBMkI7QUFDeEQ7QUFDQSw4REFBOEQ7QUFDOUQ7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mb3h5LXBhbmdvbGlucy8uL3NyYy9jb2x1bW4udHMiLCJ3ZWJwYWNrOi8vZm94eS1wYW5nb2xpbnMvLi9zcmMvZGF0YUhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZm94eS1wYW5nb2xpbnMvLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vZm94eS1wYW5nb2xpbnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZm94eS1wYW5nb2xpbnMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn07XHJcbnZhciBfQ29sdW1uRWxlbWVudF9pbnN0YW5jZXMsIF9Db2x1bW5FbGVtZW50X3Jlc2V0VmFsdWVzLCBfQ29sdW1uRWxlbWVudF9leHRyYWN0VmFsdWU7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5jb21wb3NlUmVnZXggPSBleHBvcnRzLkNvbHVtbkVsZW1lbnQgPSB2b2lkIDA7XHJcbmNsYXNzIENvbHVtbkVsZW1lbnQge1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgICAgIF9Db2x1bW5FbGVtZW50X2luc3RhbmNlcy5hZGQodGhpcyk7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5taXNzaW5nVmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMudW5wYWNrRWxlbWVudChlbGVtZW50KTtcclxuICAgIH1cclxuICAgIHVucGFja0VsZW1lbnQoZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBlbGVtZW50LmlkO1xyXG4gICAgICAgIHRoaXMuY2FyZHMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwcm9qZWN0LWNhcmRcIik7XHJcbiAgICAgICAgdGhpcy5jb2x1bW5Db3VudGVyID0gZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwianMtY29sdW1uLWNhcmQtY291bnRcIilbMF07XHJcbiAgICAgICAgdGhpcy5yZXNldFRleHQgPSB0aGlzLmNvbHVtbkNvdW50ZXIudGV4dENvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICBjYWxjdWxhdGVWYWx1ZShyZWdleCkge1xyXG4gICAgICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0NvbHVtbkVsZW1lbnRfaW5zdGFuY2VzLCBcIm1cIiwgX0NvbHVtbkVsZW1lbnRfcmVzZXRWYWx1ZXMpLmNhbGwodGhpcyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBjYXJkIG9mIHRoaXMuY2FyZHMpIHtcclxuICAgICAgICAgICAgaWYgKGNhcmQuZGF0YXNldC5jYXJkVHlwZS5pbmNsdWRlcyhcImlzc3VlXCIpICYmXHJcbiAgICAgICAgICAgICAgICAhY2FyZC5jbGFzc0xpc3QuY29udGFpbnMoXCJkLW5vbmVcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVscyA9IGNhcmQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIklzc3VlTGFiZWxcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0NvbHVtbkVsZW1lbnRfaW5zdGFuY2VzLCBcIm1cIiwgX0NvbHVtbkVsZW1lbnRfZXh0cmFjdFZhbHVlKS5jYWxsKHRoaXMsIGxhYmVscywgcmVnZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSArPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWlzc2luZ1ZhbHVlKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXdyaXRlQ291bnRlcih0ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5jb2x1bW5Db3VudGVyLnRleHRDb250ZW50ID0gYCR7dGV4dH06ICR7dGhpcy52YWx1ZS50b0ZpeGVkKDEpfSB8IG1pc3Npbmc6ICR7dGhpcy5taXNzaW5nVmFsdWV9YDtcclxuICAgIH1cclxuICAgIHJlc2V0Q291bnRlcigpIHtcclxuICAgICAgICB0aGlzLmNvbHVtbkNvdW50ZXIudGV4dENvbnRlbnQgPSB0aGlzLnJlc2V0VGV4dDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkNvbHVtbkVsZW1lbnQgPSBDb2x1bW5FbGVtZW50O1xyXG5fQ29sdW1uRWxlbWVudF9pbnN0YW5jZXMgPSBuZXcgV2Vha1NldCgpLCBfQ29sdW1uRWxlbWVudF9yZXNldFZhbHVlcyA9IGZ1bmN0aW9uIF9Db2x1bW5FbGVtZW50X3Jlc2V0VmFsdWVzKCkge1xyXG4gICAgdGhpcy52YWx1ZSA9IDA7XHJcbiAgICB0aGlzLm1pc3NpbmdWYWx1ZSA9IDA7XHJcbn0sIF9Db2x1bW5FbGVtZW50X2V4dHJhY3RWYWx1ZSA9IGZ1bmN0aW9uIF9Db2x1bW5FbGVtZW50X2V4dHJhY3RWYWx1ZShsYWJlbHMsIHJlZ2V4KSB7XHJcbiAgICBmb3IgKGNvbnN0IGxhYmVsIG9mIGxhYmVscykge1xyXG4gICAgICAgIGNvbnN0IGxhYmVsTmFtZSA9IGxhYmVsLnRleHRDb250ZW50O1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGxhYmVsTmFtZS5tYXRjaChyZWdleCk7XHJcbiAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChyZXN1bHRbMV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5mdW5jdGlvbiBjb21wb3NlUmVnZXgoc3RyKSB7XHJcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYC4qJHtzdHJ9Oi4qPyhcXFxcZCtcXFxcLj9bXFxcXGRdKikuKmApO1xyXG4gICAgcmV0dXJuIHJlZ2V4O1xyXG59XHJcbmV4cG9ydHMuY29tcG9zZVJlZ2V4ID0gY29tcG9zZVJlZ2V4O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnNldERhdGEgPSBleHBvcnRzLmdldERhdGEgPSB2b2lkIDA7XHJcbmZ1bmN0aW9uIGdldERhdGEoa2V5cykge1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICByZXR1cm4gYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChrZXlzKTtcclxufVxyXG5leHBvcnRzLmdldERhdGEgPSBnZXREYXRhO1xyXG5mdW5jdGlvbiBzZXREYXRhKGRhdGEpIHtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgcmV0dXJuIGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5zZXQoZGF0YSk7XHJcbn1cclxuZXhwb3J0cy5zZXREYXRhID0gc2V0RGF0YTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWJvdW5jZSA9IHZvaWQgMDtcclxuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgdGltZXIgPSA1MDApIHtcclxuICAgIGxldCB0aW1lb3V0O1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgfSwgdGltZXIpO1xyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmRlYm91bmNlID0gZGVib3VuY2U7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBjb2x1bW5fMSA9IHJlcXVpcmUoXCIuL2NvbHVtblwiKTtcclxuY29uc3QgZGF0YUhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuL2RhdGFIYW5kbGVyXCIpO1xyXG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XHJcbmxldCBvYnNlcnZlcjtcclxuY29uc3QgY29sdW1ucyA9IGNvbGxlY3RDb2x1bW5zKCk7XHJcbi8vIFRPRE8sIGF0dGFjaCBvYnNlcnZlciBkaXJlY3RseSB0byBlYWNoIGNvbHVtbiBhbmQgb25seSBjYWxsIHRoZSBjb2x1bW4gdGhhdCBpcyByZWxldmFudFxyXG5mdW5jdGlvbiBtYWluKGZpbHRlciwgdGltZXIpIHtcclxuICAgIGNvbnN0IHRhcmdldE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvamVjdC1jb2x1bW5zXCIpWzBdO1xyXG4gICAgY29uc3QgY29uZmlnID0geyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfTtcclxuICAgIGNvbnN0IGNhbGxiYWNrID0gKDAsIHV0aWxzXzEuZGVib3VuY2UpKCgpID0+IG11dGF0aW9uTGlzdGVuZXIoZmlsdGVyLCAoKSA9PiB7XHJcbiAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0Tm9kZSwgY29uZmlnKTtcclxuICAgIH0pLCB0aW1lcik7XHJcbiAgICBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKTtcclxuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0Tm9kZSwgY29uZmlnKTtcclxufVxyXG5mdW5jdGlvbiBtdXRhdGlvbkxpc3RlbmVyKGZpbHRlciwgY2FsbGJhY2spIHtcclxuICAgIHJld3JpdGVDb2x1bW5zKGZpbHRlcik7XHJcbiAgICBjYWxsYmFjaygpO1xyXG59XHJcbmZ1bmN0aW9uIGNvbGxlY3RDb2x1bW5zKCkge1xyXG4gICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvamVjdC1jb2x1bW5cIik7XHJcbiAgICBsZXQgY29sdW1ucyA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb2x1bW5zLnB1c2gobmV3IGNvbHVtbl8xLkNvbHVtbkVsZW1lbnQoZWxlbWVudCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb2x1bW5zO1xyXG59XHJcbmZ1bmN0aW9uIHJld3JpdGVDb2x1bW5zKHN0cikge1xyXG4gICAgY29uc3QgcmVnZXggPSAoMCwgY29sdW1uXzEuY29tcG9zZVJlZ2V4KShzdHIpO1xyXG4gICAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29sdW1ucykge1xyXG4gICAgICAgIGNvbHVtbi5jYWxjdWxhdGVWYWx1ZShyZWdleCk7XHJcbiAgICAgICAgY29sdW1uLnJld3JpdGVDb3VudGVyKHN0cik7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gcmVzZXRDb2x1bW5zKCkge1xyXG4gICAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29sdW1ucykge1xyXG4gICAgICAgIGNvbHVtbi5yZXNldENvdW50ZXIoKTtcclxuICAgIH1cclxufVxyXG4vL0B0cy1pZ25vcmVcclxuYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSkgPT4ge1xyXG4gICAgaWYgKG9ic2VydmVyKSB7XHJcbiAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKG1lc3NhZ2UudGFzayA9PSBcIm11dGF0ZVwiKSB7XHJcbiAgICAgICAgbXV0YXRpb25MaXN0ZW5lcihtZXNzYWdlLmZpbHRlciwgKCkgPT4geyB9KTtcclxuICAgICAgICBtYWluKG1lc3NhZ2UuZmlsdGVyLCA1MDApO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAobWVzc2FnZS50YXNrID09IFwicmVzZXRcIikge1xyXG4gICAgICAgIHJlc2V0Q29sdW1ucygpO1xyXG4gICAgfVxyXG59KTtcclxuKDAsIGRhdGFIYW5kbGVyXzEuZ2V0RGF0YSkoeyByb3dzOiBbXSwgY3VycmVudE9uOiBudWxsIH0pXHJcbiAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgbXV0YXRpb25MaXN0ZW5lcihkYXRhLnJvd3NbZGF0YS5jdXJyZW50T25dLnRleHQsICgpID0+IHsgfSk7XHJcbiAgICBtYWluKGRhdGEucm93c1tkYXRhLmN1cnJlbnRPbl0udGV4dCwgMTAwMCk7XHJcbn0pXHJcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=