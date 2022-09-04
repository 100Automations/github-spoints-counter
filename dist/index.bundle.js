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
exports.debounce = exports.combineClasses = void 0;
function combineClasses(...args) {
    return args.filter((x) => typeof x === "string").join(" ");
}
exports.combineClasses = combineClasses;
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
(0, dataHandler_1.getData)({ rows: [], currentSelected: null })
    .then((data) => {
    mutationListener(data.rows[data.currentSelected].text, () => { });
    main(data.rows[data.currentSelected].text, 1000);
})
    .catch((error) => {
    console.log(error);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0IsR0FBRyxxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLEtBQUssSUFBSSx1QkFBdUIsYUFBYSxrQkFBa0I7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsSUFBSTtBQUN0QztBQUNBO0FBQ0Esb0JBQW9COzs7Ozs7Ozs7OztBQy9EUDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlLEdBQUcsZUFBZTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7Ozs7Ozs7Ozs7O0FDWkY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZ0JBQWdCLEdBQUcsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGdCQUFnQjs7Ozs7OztVQ2hCaEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUIsbUJBQU8sQ0FBQyxpQ0FBVTtBQUNuQyxzQkFBc0IsbUJBQU8sQ0FBQywyQ0FBZTtBQUM3QyxnQkFBZ0IsbUJBQU8sQ0FBQywrQkFBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsNkJBQTZCLGlDQUFpQztBQUM5RDtBQUNBLG9FQUFvRTtBQUNwRTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZveHktcGFuZ29saW5zLy4vc3JjL2NvbHVtbi50cyIsIndlYnBhY2s6Ly9mb3h5LXBhbmdvbGlucy8uL3NyYy9kYXRhSGFuZGxlci50cyIsIndlYnBhY2s6Ly9mb3h5LXBhbmdvbGlucy8uL3NyYy91dGlscy50cyIsIndlYnBhY2s6Ly9mb3h5LXBhbmdvbGlucy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mb3h5LXBhbmdvbGlucy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59O1xudmFyIF9Db2x1bW5FbGVtZW50X2luc3RhbmNlcywgX0NvbHVtbkVsZW1lbnRfcmVzZXRWYWx1ZXMsIF9Db2x1bW5FbGVtZW50X2V4dHJhY3RWYWx1ZTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29tcG9zZVJlZ2V4ID0gZXhwb3J0cy5Db2x1bW5FbGVtZW50ID0gdm9pZCAwO1xuY2xhc3MgQ29sdW1uRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgICAgICBfQ29sdW1uRWxlbWVudF9pbnN0YW5jZXMuYWRkKHRoaXMpO1xuICAgICAgICB0aGlzLnZhbHVlID0gMDtcbiAgICAgICAgdGhpcy5taXNzaW5nVmFsdWUgPSAwO1xuICAgICAgICB0aGlzLnVucGFja0VsZW1lbnQoZWxlbWVudCk7XG4gICAgfVxuICAgIHVucGFja0VsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICB0aGlzLmlkID0gZWxlbWVudC5pZDtcbiAgICAgICAgdGhpcy5jYXJkcyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInByb2plY3QtY2FyZFwiKTtcbiAgICAgICAgdGhpcy5jb2x1bW5Db3VudGVyID0gZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwianMtY29sdW1uLWNhcmQtY291bnRcIilbMF07XG4gICAgICAgIHRoaXMucmVzZXRUZXh0ID0gdGhpcy5jb2x1bW5Db3VudGVyLnRleHRDb250ZW50O1xuICAgIH1cbiAgICBjYWxjdWxhdGVWYWx1ZShyZWdleCkge1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9Db2x1bW5FbGVtZW50X2luc3RhbmNlcywgXCJtXCIsIF9Db2x1bW5FbGVtZW50X3Jlc2V0VmFsdWVzKS5jYWxsKHRoaXMpO1xuICAgICAgICBmb3IgKGNvbnN0IGNhcmQgb2YgdGhpcy5jYXJkcykge1xuICAgICAgICAgICAgaWYgKGNhcmQuZGF0YXNldC5jYXJkVHlwZS5pbmNsdWRlcyhcImlzc3VlXCIpICYmXG4gICAgICAgICAgICAgICAgIWNhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZC1ub25lXCIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWxzID0gY2FyZC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiSXNzdWVMYWJlbFwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0NvbHVtbkVsZW1lbnRfaW5zdGFuY2VzLCBcIm1cIiwgX0NvbHVtbkVsZW1lbnRfZXh0cmFjdFZhbHVlKS5jYWxsKHRoaXMsIGxhYmVscywgcmVnZXgpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlICs9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taXNzaW5nVmFsdWUrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV3cml0ZUNvdW50ZXIodGV4dCkge1xuICAgICAgICB0aGlzLmNvbHVtbkNvdW50ZXIudGV4dENvbnRlbnQgPSBgJHt0ZXh0fTogJHt0aGlzLnZhbHVlLnRvRml4ZWQoMSl9IHwgbWlzc2luZzogJHt0aGlzLm1pc3NpbmdWYWx1ZX1gO1xuICAgIH1cbiAgICByZXNldENvdW50ZXIoKSB7XG4gICAgICAgIHRoaXMuY29sdW1uQ291bnRlci50ZXh0Q29udGVudCA9IHRoaXMucmVzZXRUZXh0O1xuICAgIH1cbn1cbmV4cG9ydHMuQ29sdW1uRWxlbWVudCA9IENvbHVtbkVsZW1lbnQ7XG5fQ29sdW1uRWxlbWVudF9pbnN0YW5jZXMgPSBuZXcgV2Vha1NldCgpLCBfQ29sdW1uRWxlbWVudF9yZXNldFZhbHVlcyA9IGZ1bmN0aW9uIF9Db2x1bW5FbGVtZW50X3Jlc2V0VmFsdWVzKCkge1xuICAgIHRoaXMudmFsdWUgPSAwO1xuICAgIHRoaXMubWlzc2luZ1ZhbHVlID0gMDtcbn0sIF9Db2x1bW5FbGVtZW50X2V4dHJhY3RWYWx1ZSA9IGZ1bmN0aW9uIF9Db2x1bW5FbGVtZW50X2V4dHJhY3RWYWx1ZShsYWJlbHMsIHJlZ2V4KSB7XG4gICAgZm9yIChjb25zdCBsYWJlbCBvZiBsYWJlbHMpIHtcbiAgICAgICAgY29uc3QgbGFiZWxOYW1lID0gbGFiZWwudGV4dENvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGxhYmVsTmFtZS5tYXRjaChyZWdleCk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHJlc3VsdFsxXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuZnVuY3Rpb24gY29tcG9zZVJlZ2V4KHN0cikge1xuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChgLioke3N0cn06Lio/KFxcXFxkK1xcXFwuP1tcXFxcZF0qKS4qYCk7XG4gICAgcmV0dXJuIHJlZ2V4O1xufVxuZXhwb3J0cy5jb21wb3NlUmVnZXggPSBjb21wb3NlUmVnZXg7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2V0RGF0YSA9IGV4cG9ydHMuZ2V0RGF0YSA9IHZvaWQgMDtcbmZ1bmN0aW9uIGdldERhdGEoa2V5cykge1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIHJldHVybiBicm93c2VyLnN0b3JhZ2UubG9jYWwuZ2V0KGtleXMpO1xufVxuZXhwb3J0cy5nZXREYXRhID0gZ2V0RGF0YTtcbmZ1bmN0aW9uIHNldERhdGEoZGF0YSkge1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIHJldHVybiBicm93c2VyLnN0b3JhZ2UubG9jYWwuc2V0KGRhdGEpO1xufVxuZXhwb3J0cy5zZXREYXRhID0gc2V0RGF0YTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWJvdW5jZSA9IGV4cG9ydHMuY29tYmluZUNsYXNzZXMgPSB2b2lkIDA7XG5mdW5jdGlvbiBjb21iaW5lQ2xhc3NlcyguLi5hcmdzKSB7XG4gICAgcmV0dXJuIGFyZ3MuZmlsdGVyKCh4KSA9PiB0eXBlb2YgeCA9PT0gXCJzdHJpbmdcIikuam9pbihcIiBcIik7XG59XG5leHBvcnRzLmNvbWJpbmVDbGFzc2VzID0gY29tYmluZUNsYXNzZXM7XG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB0aW1lciA9IDUwMCkge1xuICAgIGxldCB0aW1lb3V0O1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZnVuYygpO1xuICAgICAgICB9LCB0aW1lcik7XG4gICAgfTtcbn1cbmV4cG9ydHMuZGVib3VuY2UgPSBkZWJvdW5jZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvbHVtbl8xID0gcmVxdWlyZShcIi4vY29sdW1uXCIpO1xuY29uc3QgZGF0YUhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuL2RhdGFIYW5kbGVyXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xubGV0IG9ic2VydmVyO1xuY29uc3QgY29sdW1ucyA9IGNvbGxlY3RDb2x1bW5zKCk7XG4vLyBUT0RPLCBhdHRhY2ggb2JzZXJ2ZXIgZGlyZWN0bHkgdG8gZWFjaCBjb2x1bW4gYW5kIG9ubHkgY2FsbCB0aGUgY29sdW1uIHRoYXQgaXMgcmVsZXZhbnRcbmZ1bmN0aW9uIG1haW4oZmlsdGVyLCB0aW1lcikge1xuICAgIGNvbnN0IHRhcmdldE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvamVjdC1jb2x1bW5zXCIpWzBdO1xuICAgIGNvbnN0IGNvbmZpZyA9IHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH07XG4gICAgY29uc3QgY2FsbGJhY2sgPSAoMCwgdXRpbHNfMS5kZWJvdW5jZSkoKCkgPT4gbXV0YXRpb25MaXN0ZW5lcihmaWx0ZXIsICgpID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldE5vZGUsIGNvbmZpZyk7XG4gICAgfSksIHRpbWVyKTtcbiAgICBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldE5vZGUsIGNvbmZpZyk7XG59XG5mdW5jdGlvbiBtdXRhdGlvbkxpc3RlbmVyKGZpbHRlciwgY2FsbGJhY2spIHtcbiAgICByZXdyaXRlQ29sdW1ucyhmaWx0ZXIpO1xuICAgIGNhbGxiYWNrKCk7XG59XG5mdW5jdGlvbiBjb2xsZWN0Q29sdW1ucygpIHtcbiAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwcm9qZWN0LWNvbHVtblwiKTtcbiAgICBsZXQgY29sdW1ucyA9IFtdO1xuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBlbGVtZW50cykge1xuICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBjb2x1bW5zLnB1c2gobmV3IGNvbHVtbl8xLkNvbHVtbkVsZW1lbnQoZWxlbWVudCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW5zO1xufVxuZnVuY3Rpb24gcmV3cml0ZUNvbHVtbnMoc3RyKSB7XG4gICAgY29uc3QgcmVnZXggPSAoMCwgY29sdW1uXzEuY29tcG9zZVJlZ2V4KShzdHIpO1xuICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgY29sdW1uLmNhbGN1bGF0ZVZhbHVlKHJlZ2V4KTtcbiAgICAgICAgY29sdW1uLnJld3JpdGVDb3VudGVyKHN0cik7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVzZXRDb2x1bW5zKCkge1xuICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgY29sdW1uLnJlc2V0Q291bnRlcigpO1xuICAgIH1cbn1cbi8vQHRzLWlnbm9yZVxuYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSkgPT4ge1xuICAgIGlmIChvYnNlcnZlcikge1xuICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICAgIGlmIChtZXNzYWdlLnRhc2sgPT0gXCJtdXRhdGVcIikge1xuICAgICAgICBtdXRhdGlvbkxpc3RlbmVyKG1lc3NhZ2UuZmlsdGVyLCAoKSA9PiB7IH0pO1xuICAgICAgICBtYWluKG1lc3NhZ2UuZmlsdGVyLCA1MDApO1xuICAgIH1cbiAgICBlbHNlIGlmIChtZXNzYWdlLnRhc2sgPT0gXCJyZXNldFwiKSB7XG4gICAgICAgIHJlc2V0Q29sdW1ucygpO1xuICAgIH1cbn0pO1xuKDAsIGRhdGFIYW5kbGVyXzEuZ2V0RGF0YSkoeyByb3dzOiBbXSwgY3VycmVudFNlbGVjdGVkOiBudWxsIH0pXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICBtdXRhdGlvbkxpc3RlbmVyKGRhdGEucm93c1tkYXRhLmN1cnJlbnRTZWxlY3RlZF0udGV4dCwgKCkgPT4geyB9KTtcbiAgICBtYWluKGRhdGEucm93c1tkYXRhLmN1cnJlbnRTZWxlY3RlZF0udGV4dCwgMTAwMCk7XG59KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==