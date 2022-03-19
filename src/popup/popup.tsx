// @ts-nocheck
"use strict";

import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import "./popup.css";

const Popup = () => {
  const [rows, setRows] = useState([Filter]);
  const [currIndex, setCurrIndex] = useState(null);
  const [currText, setCurrText] = useState(null);

  useEffect(() => {
    if (currText) {
      function sendText(tabs) {
        console.log("here we go?");
        browser.tabs.sendMessage(tabs[0].id, {
          filter: currText,
        });
      }

      function onError(error) {
        console.log(`Error: ${error}`);
      }

      let querying = browser.tabs.query({ currentWindow: true, active: true });
      querying.then(sendText, onError);
    }
  }, currText);

  function setCurr(index, text) {
    setCurrIndex(index);
    setCurrText(text);
  }

  return (
    <div id="popup" class="container p-3">
      {rows.map((Row, index) => {
        return (
          <Row
            key={index}
            isOn={index == currIndex}
            setCurr={(text) => setCurr(index, text)}
          />
        );
      })}
      <AddFilterButton rows={rows} setRows={setRows} />
    </div>
  );
};

const Filter = ({ isOn, setCurr }) => {
  const [isEdit, setIsEdit] = useState(true);
  const [innerText, setInnerText] = useState("");

  return isEdit ? (
    <FilterEdit
      innerText={innerText}
      setIsEdit={setIsEdit}
      setInnerText={setInnerText}
      setCurr={setCurr}
    />
  ) : (
    <FilterBase
      innerText={innerText}
      toogleEdit={setIsEdit}
      isOn={isOn}
      setCurr={setCurr}
    />
  );
};

const FilterEdit = ({ innerText, setIsEdit, setInnerText, setCurr }) => {
  function handleClick() {
    setIsEdit(false);
    setCurr(innerText);
  }

  return (
    <form class="row align-items-center">
      <div class="col-3">
        <button
          class="btn btn-primary btn-sm"
          type="button"
          onClick={() => {
            handleClick();
          }}
        >
          Submit
        </button>
      </div>
      <div class="col-6">
        <input
          class="form-control"
          type="text"
          value={innerText}
          onInput={(e) => setInnerText(e.target.value)}
        />
      </div>
    </form>
  );
};

const FilterBase = ({ innerText, toogleEdit, isOn, setCurr }) => {
  function handle(e) {
    if (e.target.checked) {
      setCurr(innerText);
    }
  }

  return (
    <form class="row align-items-center">
      <div class="col-3">
        <button
          class="btn btn-primary btn-sm"
          type="button"
          onClick={() => toogleEdit(true)}
        >
          Edit
        </button>
      </div>
      <div class="col-6">
        <input class="form-control" type="text" value={innerText} disabled />
      </div>
      <div class="col-3 form-switch d-flex justify-content-end">
        <input
          class="form-check-input"
          type="checkbox"
          checked={isOn}
          onChange={(e) => handle(e)}
        />
      </div>
    </form>
  );
};

const AddFilterButton = ({ rows, setRows }) => {
  function addRow() {
    console.log("clicked");
    const newRow = [...rows];
    newRow.push(Filter);
    setRows(newRow);
  }

  return (
    <div>
      <button
        type="button"
        class="btn btn-primary btn-sm"
        onClick={() => addRow()}
      >
        Add Filter
      </button>
    </div>
  );
};

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */

render(<Popup />, document.getElementById("app"));
