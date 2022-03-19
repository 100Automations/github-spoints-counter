// @ts-nocheck
"use strict";

import './popup.css';


console.log(document.getElementById('app'))

const App = (
  <div className="app">
    <div id="popup" class="container p-3">
      <Series />
    </div>
  </div>
)


console.log(document.getElementById('app'))

const Series = (
  <div>
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
)

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */

document.getElementById('app').replaceWith(App)