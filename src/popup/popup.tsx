// @ts-nocheck
"use strict";

import { render } from "preact";
import { useState } from "preact/hooks";
import "./popup.css";

const Popup = () => {
  const [rows, setRows] = useState([Filter]);

  return (
    <div id="popup" class="container p-3">
      {rows.map((Row) => {
        return <Row />;
      })}
      <AddFilterButton rows={rows} setRows={setRows} />
    </div>
  );
};

const Filter = () => {
  const [isEdit, setIsEdit] = useState(true);
  const [innerText, setInnerText] = useState("");

  return isEdit ? (
    <FilterEdit
      innerText={innerText}
      setIsEdit={setIsEdit}
      setInnerText={setInnerText}
    />
  ) : (
    <FilterRow innerText={innerText} toogleEdit={setIsEdit} />
  );
};

const FilterEdit = ({ innerText, setIsEdit, setInnerText }) => {
  return (
    <form class="row align-items-center">
      <div class="col-3">
        <button
          class="btn btn-primary btn-sm"
          type="button"
          onClick={() => {
            setIsEdit(false);
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

const FilterRow = ({ innerText, toogleEdit }) => {
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
        <input class="form-check-input" type="checkbox" />
      </div>
    </form>
  );
};

const AddFilterButton = ({ rows, setRows }) => {
  function addRow() {
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
