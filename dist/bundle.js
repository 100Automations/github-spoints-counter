(() => {
  "use strict";
  var e = {
      620: function (e, t) {
        var n,
          s,
          o,
          r =
            (this && this.__classPrivateFieldGet) ||
            function (e, t, n, s) {
              if ("a" === n && !s)
                throw new TypeError(
                  "Private accessor was defined without a getter"
                );
              if ("function" == typeof t ? e !== t || !s : !t.has(e))
                throw new TypeError(
                  "Cannot read private member from an object whose class did not declare it"
                );
              return "m" === n
                ? s
                : "a" === n
                ? s.call(e)
                : s
                ? s.value
                : t.get(e);
            };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.ColumnElement = void 0),
          (t.ColumnElement = class {
            constructor(e) {
              n.add(this),
                (this.value = 0),
                (this.missingValue = 0),
                this.unpackElement(e);
            }
            unpackElement(e) {
              (this.id = e.id),
                (this.cards = e.getElementsByClassName("project-card")),
                (this.columnCounter = e.getElementsByClassName(
                  "js-column-card-count"
                )[0]);
            }
            calculateValue(e) {
              r(this, n, "m", s).call(this);
              for (const t of this.cards) {
                const s = t.getElementsByClassName("IssueLabel"),
                  i = r(this, n, "m", o).call(this, s, e);
                "number" == typeof i ? (this.value += i) : this.missingValue++;
              }
            }
            rewriteCounter(e) {
              this.columnCounter.textContent = `${e}: ${this.value} | missing: ${this.missingValue}`;
            }
          }),
          (n = new WeakSet()),
          (s = function () {
            (this.value = 0), (this.missingValue = 0);
          }),
          (o = function (e, t) {
            for (const n of e) {
              const e = n.textContent.match(t);
              if (e) return parseInt(e[1]);
            }
            return null;
          });
      },
    },
    t = {};
  function n(s) {
    var o = t[s];
    if (void 0 !== o) return o.exports;
    var r = (t[s] = { exports: {} });
    return e[s].call(r.exports, r, r.exports, n), r.exports;
  }
  (() => {
    const e = n(620);
    function t() {
      !(function (e, t) {
        const n = (function (e) {
          return new RegExp(`.*${e}.*?(\\d+).*`);
        })(t);
        for (const s of e) s.calculateValue(n), s.rewriteCounter(t);
      })(
        (function () {
          const t = document.getElementsByClassName("project-column");
          let n = [];
          for (const s of t)
            s instanceof HTMLElement && n.push(new e.ColumnElement(s));
          return n;
        })(),
        "size"
      );
    }
    (document.body.style.border = "5px solid red"),
      window.addEventListener("DOMContentLoaded", (e) => {
        console.log("DOM fully loaded and parsed"), t();
      }),
      t();
  })();
})();
