// @ts-nocheck
import './popup.css';


/*

    <div id="popup" class="container p-3">
      <form class="row align-items-center">
        <div class="col-3">
          <button class="btn btn-primary btn-sm" type="button">Edit</button>
        </div>
        <div class="col-6">
          <input class="form-control" type="text" value="size" disabled />
        </div>
        <div class="col-3 form-switch d-flex justify-content-end">
          <input class="form-check-input" type="checkbox" />
        </div>
      </form>
      <form class="row align-items-center">
        <div class="col-3">
          <button class="btn btn-primary btn-sm" type="button">Submit</button>
        </div>
        <div class="col-6">
          <input class="form-control" type="text" value="size" />
        </div>
      </form>
      <div>
        <button type="button" class="btn btn-primary btn-sm">Add Filter</button>
      </div>
    </div>
    */

class Popup {
  constructor() {
    this.body = document.getElementById("popup");
    return;
  }

  addFilter() {
    const form = document
      .createElement("form")
      .classList.add("row", "align-items-center");
    const obj = {
      form: {
        tag: "form",
        classes: ["row", "align-items-center"],
        children: [
          {
            tag: "div",
            classes: "col-3",
            children: [
              {
                tag: "button",
                classes: ["btn", "btn-primary", "btn-sm"],
                text: "Submit",
              },
            ],
          },
          {
            tag: "div",
            classes: "col-6",
            children: [
              {
                tag: "input",
                classes: ["form-control"],
              },
            ],
          },
        ],
      },
    };
  }
}

function domElementGenerate() {}
/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
/*
browser.tabs
  .executeScript({ file: "/content_scripts/beastify.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
*/
