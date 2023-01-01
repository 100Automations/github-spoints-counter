(()=>{"use strict";var e={828:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.setData=t.getData=void 0,t.getData=function(e){return browser.storage.local.get(e)},t.setData=function(e){return browser.storage.local.set(e)}},342:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ClassicColumnElement=void 0;const n=o(622),s=o(593);class r extends n.ColumnElement{constructor(e){super(e),this.cachedResetText=this.columnCounter.textContent}get id(){return this.element.id}get cards(){return this.element.getElementsByClassName("project-card")}get columnCounter(){return this.element.getElementsByClassName("js-column-card-count")[0]}get resetText(){return this.cachedResetText}extractValue(e,t){let o=0,n=0;for(const r of e)if(r.dataset.cardType.includes("issue")&&!r.classList.contains("d-none")){const e=r.getElementsByClassName("IssueLabel"),c=(0,s.extractValueFromElements)(e,t);"number"==typeof c?o+=c:n++}return[o,n]}}t.ClassicColumnElement=r},622:function(e,t){var o,n,s=this&&this.__classPrivateFieldGet||function(e,t,o,n){if("a"===o&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===o?n:"a"===o?n.call(e):n?n.value:t.get(e)};Object.defineProperty(t,"__esModule",{value:!0}),t.ColumnElement=void 0,t.ColumnElement=class{constructor(e){o.add(this),this.calculateValue=e=>{s(this,o,"m",n).call(this);try{[this.value,this.missingValue]=this.extractValue(this.cards,e)}catch(e){}},this.value=0,this.missingValue=0,this.element=e}rewriteCounter(e){this.columnCounter.textContent=`${e}: ${this.value.toFixed(1)} | Issues without ${e} label: ${this.missingValue}`}resetCounter(){this.columnCounter.textContent=this.resetText}},o=new WeakSet,n=function(){this.value=0,this.missingValue=0}},889:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NewProjectColumnElement=void 0;const n=o(622),s=o(593);class r extends n.ColumnElement{constructor(e){super(e),this.cachedResetText=this.columnCounter.textContent}get id(){return this.element.id}get cards(){return this.element.getElementsByClassName("card__CardBase-sc-0-0")}get columnCounter(){return this.element.querySelector("[data-test-id~='column-items-counter']")}get resetText(){return this.cachedResetText}setLabels(e){this.labels=e}extractValue(e,t){let o=0,n=0;for(const e of this.labels){const r=(0,s.extractValueFromStrings)(e,t);"number"==typeof r?o+=r:n++}return[o,n]}}t.NewProjectColumnElement=r},211:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(s,r){function c(e){try{a(n.next(e))}catch(e){r(e)}}function l(e){try{a(n.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?s(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,l)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.NewProjectBoard=t.ClassicProjectBoard=t.ProjectBoard=void 0;const s=o(342),r=o(889),c=o(593);class l{constructor(){this.columns=this.collectColumns(),this.url=window.location.href}static isClassic(){const e=document.getElementsByTagName("turbo-frame");return Boolean(e.length)}}t.ProjectBoard=l,t.ClassicProjectBoard=class extends l{get targetNode(){return document.getElementsByClassName("project-columns")[0]}collectColumns(){const e=document.getElementsByClassName("project-column");let t=[];for(const o of e)o instanceof HTMLElement&&t.push(new s.ClassicColumnElement(o));return t}calculateColumns(e){const t=(0,c.composeRegex)(e);for(const o of this.columns)o.calculateValue(t),o.rewriteCounter(e)}},t.NewProjectBoard=class extends l{get targetNode(){return document.querySelector("[data-test-id~='app-root']")}apidata(){return n(this,void 0,void 0,(function*(){const e=document.getElementById("memex-refresh-api-data").textContent,t=JSON.parse(e).url,o=yield fetch(`https://github.com/${t}?visibleFields=%5B%22Labels%22%5D`,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}}),n=yield o.json();return[n.memexProjectItems,n.memexViews]}))}getGroupById(e){const t={};for(const o of e)if("board_layout"==o.layout){const e=o.verticalGroupBy;t[o.number]=e.length>0?e[0]:"Status"}return t}columnToLabels(e){var t;return n(this,void 0,void 0,(function*(){const o={},[n,s]=yield this.apidata(),r=this.getGroupById(s)[e];for(const e of n){const n=e.memexProjectColumnValues,s=[];let c;for(const e of n)if(e.memexProjectColumnId==r&&(c=e.value.id),"Labels"==e.memexProjectColumnId)for(const t of e.value)s.push(t.name);null!==(t=o[c])&&void 0!==t||(o[c]=[]),o[c].push(s)}return o}))}collectColumns(){const e=document.getElementsByClassName("column-frame__StyledFrame-sc-0-0");let t=[];for(const o of e)o instanceof HTMLElement&&t.push(new r.NewProjectColumnElement(o));return t}calculateColumns(e){this.columns=this.collectColumns();const t=(0,c.composeRegex)(e),o=parseInt(window.location.href.slice(-1));this.columnToLabels(o).then((o=>{for(const n of this.columns)n.setLabels(o[n.id]),n.calculateValue(t),n.rewriteCounter(e)}))}}},593:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.onKey=t.extractValueFromStrings=t.extractValueFromElements=t.debounce=t.composeRegex=t.combineClasses=void 0,t.combineClasses=function(...e){return e.filter((e=>"string"==typeof e)).join(" ")},t.debounce=function(e,t=500){let o;return()=>{clearTimeout(o),o=setTimeout((()=>{e()}),t)}},t.onKey=function(e,...t){return o=>{t.includes(o.key)&&(o.preventDefault(),e(o))}},t.extractValueFromElements=function(e,t){for(const o of e){const e=o.textContent.match(t);if(e)return parseFloat(e[1])}return null},t.extractValueFromStrings=function(e,t){for(const o of e){const e=o.match(t);if(e)return parseFloat(e[1])}return null},t.composeRegex=function(e){return new RegExp(`.*${e}:.*?(\\d+\\.?[\\d]*).*`)}}},t={};function o(n){var s=t[n];if(void 0!==s)return s.exports;var r=t[n]={exports:{}};return e[n].call(r.exports,r,r.exports,o),r.exports}(()=>{const e=o(211),t=o(828),n=o(593);let s;const r=e.ProjectBoard.isClassic()?new e.ClassicProjectBoard:new e.NewProjectBoard;function c(e,t){const o=r.targetNode,c={childList:!0,subtree:!0},a=(0,n.debounce)((()=>l(e,(()=>{s.disconnect(),s.observe(o,c)}))),t);s=new MutationObserver(a),s.observe(document,c)}function l(e,t){r.calculateColumns(e),t()}browser.runtime.onMessage.addListener((e=>{s&&s.disconnect(),"mutate"==e.task?(l(e.filter,(()=>{})),c(e.filter,500)):"reset"==e.task&&function(){for(const e of r.columns)e.resetCounter()}()})),(0,t.getData)({rows:[],currentSelected:null}).then((e=>{c(e.rows[e.currentSelected].text,1e3),l(e.rows[e.currentSelected].text,(()=>{}))})).catch((e=>{console.log(e)}))})()})();