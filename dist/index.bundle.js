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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0IsR0FBRyxxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLEtBQUssSUFBSSx1QkFBdUIsYUFBYSxrQkFBa0I7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsSUFBSTtBQUN0QztBQUNBO0FBQ0Esb0JBQW9COzs7Ozs7Ozs7OztBQy9EUDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlLEdBQUcsZUFBZTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7Ozs7Ozs7Ozs7O0FDWkY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsZ0JBQWdCOzs7Ozs7O1VDWmhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUJBQWlCLG1CQUFPLENBQUMsaUNBQVU7QUFDbkMsc0JBQXNCLG1CQUFPLENBQUMsMkNBQWU7QUFDN0MsZ0JBQWdCLG1CQUFPLENBQUMsK0JBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELDZCQUE2QiwyQkFBMkI7QUFDeEQ7QUFDQSw4REFBOEQ7QUFDOUQ7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mb3h5LXBhbmdvbGlucy8uL3NyYy9jb2x1bW4udHMiLCJ3ZWJwYWNrOi8vZm94eS1wYW5nb2xpbnMvLi9zcmMvZGF0YUhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZm94eS1wYW5nb2xpbnMvLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vZm94eS1wYW5nb2xpbnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZm94eS1wYW5nb2xpbnMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jbGFzc1ByaXZhdGVGaWVsZEdldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZEdldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufTtcbnZhciBfQ29sdW1uRWxlbWVudF9pbnN0YW5jZXMsIF9Db2x1bW5FbGVtZW50X3Jlc2V0VmFsdWVzLCBfQ29sdW1uRWxlbWVudF9leHRyYWN0VmFsdWU7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbXBvc2VSZWdleCA9IGV4cG9ydHMuQ29sdW1uRWxlbWVudCA9IHZvaWQgMDtcbmNsYXNzIENvbHVtbkVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICAgICAgX0NvbHVtbkVsZW1lbnRfaW5zdGFuY2VzLmFkZCh0aGlzKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IDA7XG4gICAgICAgIHRoaXMubWlzc2luZ1ZhbHVlID0gMDtcbiAgICAgICAgdGhpcy51bnBhY2tFbGVtZW50KGVsZW1lbnQpO1xuICAgIH1cbiAgICB1bnBhY2tFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5pZCA9IGVsZW1lbnQuaWQ7XG4gICAgICAgIHRoaXMuY2FyZHMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwcm9qZWN0LWNhcmRcIik7XG4gICAgICAgIHRoaXMuY29sdW1uQ291bnRlciA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImpzLWNvbHVtbi1jYXJkLWNvdW50XCIpWzBdO1xuICAgICAgICB0aGlzLnJlc2V0VGV4dCA9IHRoaXMuY29sdW1uQ291bnRlci50ZXh0Q29udGVudDtcbiAgICB9XG4gICAgY2FsY3VsYXRlVmFsdWUocmVnZXgpIHtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfQ29sdW1uRWxlbWVudF9pbnN0YW5jZXMsIFwibVwiLCBfQ29sdW1uRWxlbWVudF9yZXNldFZhbHVlcykuY2FsbCh0aGlzKTtcbiAgICAgICAgZm9yIChjb25zdCBjYXJkIG9mIHRoaXMuY2FyZHMpIHtcbiAgICAgICAgICAgIGlmIChjYXJkLmRhdGFzZXQuY2FyZFR5cGUuaW5jbHVkZXMoXCJpc3N1ZVwiKSAmJlxuICAgICAgICAgICAgICAgICFjYXJkLmNsYXNzTGlzdC5jb250YWlucyhcImQtbm9uZVwiKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVscyA9IGNhcmQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIklzc3VlTGFiZWxcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9Db2x1bW5FbGVtZW50X2luc3RhbmNlcywgXCJtXCIsIF9Db2x1bW5FbGVtZW50X2V4dHJhY3RWYWx1ZSkuY2FsbCh0aGlzLCBsYWJlbHMsIHJlZ2V4KTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSArPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWlzc2luZ1ZhbHVlKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJld3JpdGVDb3VudGVyKHRleHQpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5Db3VudGVyLnRleHRDb250ZW50ID0gYCR7dGV4dH06ICR7dGhpcy52YWx1ZS50b0ZpeGVkKDEpfSB8IG1pc3Npbmc6ICR7dGhpcy5taXNzaW5nVmFsdWV9YDtcbiAgICB9XG4gICAgcmVzZXRDb3VudGVyKCkge1xuICAgICAgICB0aGlzLmNvbHVtbkNvdW50ZXIudGV4dENvbnRlbnQgPSB0aGlzLnJlc2V0VGV4dDtcbiAgICB9XG59XG5leHBvcnRzLkNvbHVtbkVsZW1lbnQgPSBDb2x1bW5FbGVtZW50O1xuX0NvbHVtbkVsZW1lbnRfaW5zdGFuY2VzID0gbmV3IFdlYWtTZXQoKSwgX0NvbHVtbkVsZW1lbnRfcmVzZXRWYWx1ZXMgPSBmdW5jdGlvbiBfQ29sdW1uRWxlbWVudF9yZXNldFZhbHVlcygpIHtcbiAgICB0aGlzLnZhbHVlID0gMDtcbiAgICB0aGlzLm1pc3NpbmdWYWx1ZSA9IDA7XG59LCBfQ29sdW1uRWxlbWVudF9leHRyYWN0VmFsdWUgPSBmdW5jdGlvbiBfQ29sdW1uRWxlbWVudF9leHRyYWN0VmFsdWUobGFiZWxzLCByZWdleCkge1xuICAgIGZvciAoY29uc3QgbGFiZWwgb2YgbGFiZWxzKSB7XG4gICAgICAgIGNvbnN0IGxhYmVsTmFtZSA9IGxhYmVsLnRleHRDb250ZW50O1xuICAgICAgICBjb25zdCByZXN1bHQgPSBsYWJlbE5hbWUubWF0Y2gocmVnZXgpO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChyZXN1bHRbMV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcbmZ1bmN0aW9uIGNvbXBvc2VSZWdleChzdHIpIHtcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYC4qJHtzdHJ9Oi4qPyhcXFxcZCtcXFxcLj9bXFxcXGRdKikuKmApO1xuICAgIHJldHVybiByZWdleDtcbn1cbmV4cG9ydHMuY29tcG9zZVJlZ2V4ID0gY29tcG9zZVJlZ2V4O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNldERhdGEgPSBleHBvcnRzLmdldERhdGEgPSB2b2lkIDA7XG5mdW5jdGlvbiBnZXREYXRhKGtleXMpIHtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICByZXR1cm4gYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChrZXlzKTtcbn1cbmV4cG9ydHMuZ2V0RGF0YSA9IGdldERhdGE7XG5mdW5jdGlvbiBzZXREYXRhKGRhdGEpIHtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICByZXR1cm4gYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldChkYXRhKTtcbn1cbmV4cG9ydHMuc2V0RGF0YSA9IHNldERhdGE7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVib3VuY2UgPSB2b2lkIDA7XG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB0aW1lciA9IDUwMCkge1xuICAgIGxldCB0aW1lb3V0O1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZnVuYygpO1xuICAgICAgICB9LCB0aW1lcik7XG4gICAgfTtcbn1cbmV4cG9ydHMuZGVib3VuY2UgPSBkZWJvdW5jZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvbHVtbl8xID0gcmVxdWlyZShcIi4vY29sdW1uXCIpO1xuY29uc3QgZGF0YUhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuL2RhdGFIYW5kbGVyXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xubGV0IG9ic2VydmVyO1xuY29uc3QgY29sdW1ucyA9IGNvbGxlY3RDb2x1bW5zKCk7XG4vLyBUT0RPLCBhdHRhY2ggb2JzZXJ2ZXIgZGlyZWN0bHkgdG8gZWFjaCBjb2x1bW4gYW5kIG9ubHkgY2FsbCB0aGUgY29sdW1uIHRoYXQgaXMgcmVsZXZhbnRcbmZ1bmN0aW9uIG1haW4oZmlsdGVyLCB0aW1lcikge1xuICAgIGNvbnN0IHRhcmdldE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvamVjdC1jb2x1bW5zXCIpWzBdO1xuICAgIGNvbnN0IGNvbmZpZyA9IHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH07XG4gICAgY29uc3QgY2FsbGJhY2sgPSAoMCwgdXRpbHNfMS5kZWJvdW5jZSkoKCkgPT4gbXV0YXRpb25MaXN0ZW5lcihmaWx0ZXIsICgpID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldE5vZGUsIGNvbmZpZyk7XG4gICAgfSksIHRpbWVyKTtcbiAgICBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldE5vZGUsIGNvbmZpZyk7XG59XG5mdW5jdGlvbiBtdXRhdGlvbkxpc3RlbmVyKGZpbHRlciwgY2FsbGJhY2spIHtcbiAgICByZXdyaXRlQ29sdW1ucyhmaWx0ZXIpO1xuICAgIGNhbGxiYWNrKCk7XG59XG5mdW5jdGlvbiBjb2xsZWN0Q29sdW1ucygpIHtcbiAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwcm9qZWN0LWNvbHVtblwiKTtcbiAgICBsZXQgY29sdW1ucyA9IFtdO1xuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBlbGVtZW50cykge1xuICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBjb2x1bW5zLnB1c2gobmV3IGNvbHVtbl8xLkNvbHVtbkVsZW1lbnQoZWxlbWVudCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW5zO1xufVxuZnVuY3Rpb24gcmV3cml0ZUNvbHVtbnMoc3RyKSB7XG4gICAgY29uc3QgcmVnZXggPSAoMCwgY29sdW1uXzEuY29tcG9zZVJlZ2V4KShzdHIpO1xuICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgY29sdW1uLmNhbGN1bGF0ZVZhbHVlKHJlZ2V4KTtcbiAgICAgICAgY29sdW1uLnJld3JpdGVDb3VudGVyKHN0cik7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVzZXRDb2x1bW5zKCkge1xuICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgY29sdW1uLnJlc2V0Q291bnRlcigpO1xuICAgIH1cbn1cbi8vQHRzLWlnbm9yZVxuYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSkgPT4ge1xuICAgIGlmIChvYnNlcnZlcikge1xuICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICAgIGlmIChtZXNzYWdlLnRhc2sgPT0gXCJtdXRhdGVcIikge1xuICAgICAgICBtdXRhdGlvbkxpc3RlbmVyKG1lc3NhZ2UuZmlsdGVyLCAoKSA9PiB7IH0pO1xuICAgICAgICBtYWluKG1lc3NhZ2UuZmlsdGVyLCA1MDApO1xuICAgIH1cbiAgICBlbHNlIGlmIChtZXNzYWdlLnRhc2sgPT0gXCJyZXNldFwiKSB7XG4gICAgICAgIHJlc2V0Q29sdW1ucygpO1xuICAgIH1cbn0pO1xuKDAsIGRhdGFIYW5kbGVyXzEuZ2V0RGF0YSkoeyByb3dzOiBbXSwgY3VycmVudE9uOiBudWxsIH0pXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICBtdXRhdGlvbkxpc3RlbmVyKGRhdGEucm93c1tkYXRhLmN1cnJlbnRPbl0udGV4dCwgKCkgPT4geyB9KTtcbiAgICBtYWluKGRhdGEucm93c1tkYXRhLmN1cnJlbnRPbl0udGV4dCwgMTAwMCk7XG59KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==