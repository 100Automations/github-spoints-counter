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
            if (card.dataset.cardType.includes("issue")) {
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
    const regex = new RegExp(`.*${str}.*?(\\d+\\.?[\\d]*).*`);
    return regex;
}
exports.composeRegex = composeRegex;


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
let observer;
const columns = collectColumns();
function main(filter) {
    const targetNode = document.getElementsByClassName("project-columns")[0];
    const config = { childList: true, subtree: true };
    const callback = debounce(() => mutationListener(filter, () => {
        observer.disconnect();
        observer.observe(targetNode, config);
    }));
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
// TODO, attach observer directly to each column and only call the column that is relevant
function debounce(func, timer = 500) {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func();
        }, timer);
    };
}
//main("size");
//@ts-ignore
browser.runtime.onMessage.addListener((message) => {
    if (observer) {
        observer.disconnect();
    }
    if (message.task == "mutate") {
        mutationListener(message.filter, () => { });
        main(message.filter);
    }
    else if (message.task == "reset") {
        resetColumns();
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0IsR0FBRyxxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxLQUFLLElBQUksdUJBQXVCLGFBQWEsa0JBQWtCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLElBQUk7QUFDdEM7QUFDQTtBQUNBLG9CQUFvQjs7Ozs7OztVQzlEcEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUIsbUJBQU8sQ0FBQyxpQ0FBVTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZveHktcGFuZ29saW5zLy4vc3JjL2NvbHVtbi50cyIsIndlYnBhY2s6Ly9mb3h5LXBhbmdvbGlucy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mb3h5LXBhbmdvbGlucy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fY2xhc3NQcml2YXRlRmllbGRHZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRHZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufTtcclxudmFyIF9Db2x1bW5FbGVtZW50X2luc3RhbmNlcywgX0NvbHVtbkVsZW1lbnRfcmVzZXRWYWx1ZXMsIF9Db2x1bW5FbGVtZW50X2V4dHJhY3RWYWx1ZTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmNvbXBvc2VSZWdleCA9IGV4cG9ydHMuQ29sdW1uRWxlbWVudCA9IHZvaWQgMDtcclxuY2xhc3MgQ29sdW1uRWxlbWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XHJcbiAgICAgICAgX0NvbHVtbkVsZW1lbnRfaW5zdGFuY2VzLmFkZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLm1pc3NpbmdWYWx1ZSA9IDA7XHJcbiAgICAgICAgdGhpcy51bnBhY2tFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgdW5wYWNrRWxlbWVudChlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGVsZW1lbnQuaWQ7XHJcbiAgICAgICAgdGhpcy5jYXJkcyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInByb2plY3QtY2FyZFwiKTtcclxuICAgICAgICB0aGlzLmNvbHVtbkNvdW50ZXIgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJqcy1jb2x1bW4tY2FyZC1jb3VudFwiKVswXTtcclxuICAgICAgICB0aGlzLnJlc2V0VGV4dCA9IHRoaXMuY29sdW1uQ291bnRlci50ZXh0Q29udGVudDtcclxuICAgIH1cclxuICAgIGNhbGN1bGF0ZVZhbHVlKHJlZ2V4KSB7XHJcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfQ29sdW1uRWxlbWVudF9pbnN0YW5jZXMsIFwibVwiLCBfQ29sdW1uRWxlbWVudF9yZXNldFZhbHVlcykuY2FsbCh0aGlzKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGNhcmQgb2YgdGhpcy5jYXJkcykge1xyXG4gICAgICAgICAgICBpZiAoY2FyZC5kYXRhc2V0LmNhcmRUeXBlLmluY2x1ZGVzKFwiaXNzdWVcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVscyA9IGNhcmQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIklzc3VlTGFiZWxcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0NvbHVtbkVsZW1lbnRfaW5zdGFuY2VzLCBcIm1cIiwgX0NvbHVtbkVsZW1lbnRfZXh0cmFjdFZhbHVlKS5jYWxsKHRoaXMsIGxhYmVscywgcmVnZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSArPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWlzc2luZ1ZhbHVlKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXdyaXRlQ291bnRlcih0ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5jb2x1bW5Db3VudGVyLnRleHRDb250ZW50ID0gYCR7dGV4dH06ICR7dGhpcy52YWx1ZS50b0ZpeGVkKDEpfSB8IG1pc3Npbmc6ICR7dGhpcy5taXNzaW5nVmFsdWV9YDtcclxuICAgIH1cclxuICAgIHJlc2V0Q291bnRlcigpIHtcclxuICAgICAgICB0aGlzLmNvbHVtbkNvdW50ZXIudGV4dENvbnRlbnQgPSB0aGlzLnJlc2V0VGV4dDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkNvbHVtbkVsZW1lbnQgPSBDb2x1bW5FbGVtZW50O1xyXG5fQ29sdW1uRWxlbWVudF9pbnN0YW5jZXMgPSBuZXcgV2Vha1NldCgpLCBfQ29sdW1uRWxlbWVudF9yZXNldFZhbHVlcyA9IGZ1bmN0aW9uIF9Db2x1bW5FbGVtZW50X3Jlc2V0VmFsdWVzKCkge1xyXG4gICAgdGhpcy52YWx1ZSA9IDA7XHJcbiAgICB0aGlzLm1pc3NpbmdWYWx1ZSA9IDA7XHJcbn0sIF9Db2x1bW5FbGVtZW50X2V4dHJhY3RWYWx1ZSA9IGZ1bmN0aW9uIF9Db2x1bW5FbGVtZW50X2V4dHJhY3RWYWx1ZShsYWJlbHMsIHJlZ2V4KSB7XHJcbiAgICBmb3IgKGNvbnN0IGxhYmVsIG9mIGxhYmVscykge1xyXG4gICAgICAgIGNvbnN0IGxhYmVsTmFtZSA9IGxhYmVsLnRleHRDb250ZW50O1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGxhYmVsTmFtZS5tYXRjaChyZWdleCk7XHJcbiAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChyZXN1bHRbMV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5mdW5jdGlvbiBjb21wb3NlUmVnZXgoc3RyKSB7XHJcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYC4qJHtzdHJ9Lio/KFxcXFxkK1xcXFwuP1tcXFxcZF0qKS4qYCk7XHJcbiAgICByZXR1cm4gcmVnZXg7XHJcbn1cclxuZXhwb3J0cy5jb21wb3NlUmVnZXggPSBjb21wb3NlUmVnZXg7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBjb2x1bW5fMSA9IHJlcXVpcmUoXCIuL2NvbHVtblwiKTtcclxubGV0IG9ic2VydmVyO1xyXG5jb25zdCBjb2x1bW5zID0gY29sbGVjdENvbHVtbnMoKTtcclxuZnVuY3Rpb24gbWFpbihmaWx0ZXIpIHtcclxuICAgIGNvbnN0IHRhcmdldE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvamVjdC1jb2x1bW5zXCIpWzBdO1xyXG4gICAgY29uc3QgY29uZmlnID0geyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfTtcclxuICAgIGNvbnN0IGNhbGxiYWNrID0gZGVib3VuY2UoKCkgPT4gbXV0YXRpb25MaXN0ZW5lcihmaWx0ZXIsICgpID0+IHtcclxuICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXROb2RlLCBjb25maWcpO1xyXG4gICAgfSkpO1xyXG4gICAgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjayk7XHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldE5vZGUsIGNvbmZpZyk7XHJcbn1cclxuZnVuY3Rpb24gbXV0YXRpb25MaXN0ZW5lcihmaWx0ZXIsIGNhbGxiYWNrKSB7XHJcbiAgICByZXdyaXRlQ29sdW1ucyhmaWx0ZXIpO1xyXG4gICAgY2FsbGJhY2soKTtcclxufVxyXG5mdW5jdGlvbiBjb2xsZWN0Q29sdW1ucygpIHtcclxuICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInByb2plY3QtY29sdW1uXCIpO1xyXG4gICAgbGV0IGNvbHVtbnMgPSBbXTtcclxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBlbGVtZW50cykge1xyXG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgY29sdW1ucy5wdXNoKG5ldyBjb2x1bW5fMS5Db2x1bW5FbGVtZW50KGVsZW1lbnQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29sdW1ucztcclxufVxyXG5mdW5jdGlvbiByZXdyaXRlQ29sdW1ucyhzdHIpIHtcclxuICAgIGNvbnN0IHJlZ2V4ID0gKDAsIGNvbHVtbl8xLmNvbXBvc2VSZWdleCkoc3RyKTtcclxuICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHVtbnMpIHtcclxuICAgICAgICBjb2x1bW4uY2FsY3VsYXRlVmFsdWUocmVnZXgpO1xyXG4gICAgICAgIGNvbHVtbi5yZXdyaXRlQ291bnRlcihzdHIpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHJlc2V0Q29sdW1ucygpIHtcclxuICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHVtbnMpIHtcclxuICAgICAgICBjb2x1bW4ucmVzZXRDb3VudGVyKCk7XHJcbiAgICB9XHJcbn1cclxuLy8gVE9ETywgYXR0YWNoIG9ic2VydmVyIGRpcmVjdGx5IHRvIGVhY2ggY29sdW1uIGFuZCBvbmx5IGNhbGwgdGhlIGNvbHVtbiB0aGF0IGlzIHJlbGV2YW50XHJcbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHRpbWVyID0gNTAwKSB7XHJcbiAgICBsZXQgdGltZW91dDtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgIH0sIHRpbWVyKTtcclxuICAgIH07XHJcbn1cclxuLy9tYWluKFwic2l6ZVwiKTtcclxuLy9AdHMtaWdub3JlXHJcbmJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UpID0+IHtcclxuICAgIGlmIChvYnNlcnZlcikge1xyXG4gICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuICAgIGlmIChtZXNzYWdlLnRhc2sgPT0gXCJtdXRhdGVcIikge1xyXG4gICAgICAgIG11dGF0aW9uTGlzdGVuZXIobWVzc2FnZS5maWx0ZXIsICgpID0+IHsgfSk7XHJcbiAgICAgICAgbWFpbihtZXNzYWdlLmZpbHRlcik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChtZXNzYWdlLnRhc2sgPT0gXCJyZXNldFwiKSB7XHJcbiAgICAgICAgcmVzZXRDb2x1bW5zKCk7XHJcbiAgICB9XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=