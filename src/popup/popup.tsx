// @ts-nocheck
"use strict";

import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import "./popup.css";
import { Button, TextInput, ToggleSwitch } from "./components";

const Popup = () => {
  const [rows, setRows] = useState([true]);
  const [currentOn, setCurrentOn] = useState(null);
  const [currentText, setCurrentText] = useState(null);

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  useEffect(() => {
    let querying = browser.tabs.query({ currentWindow: true, active: true });
    console.log(currentText);
    if (currentText) {
      querying.then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
          task: "mutate",
          filter: currentText,
        });
      }, onError);
    } else {
      querying.then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
          task: "reset",
        });
      }, onError);
    }
  }, [currentText]);

  function addRow() {
    if (rows.length < 10) {
      const newRows = [...rows];
      newRows.push(true);
      setRows(newRows);
    }
  }

  return (
    <div id="popup" class="container p-3">
      {rows.map((row, index) => {
        return (
          <Filter
            id={index}
            isOn={index == currentOn}
            setCurrentOn={setCurrentOn}
            setCurrentText={setCurrentText}
          />
        );
      })}
      <div>
        <Button onClick={addRow}>Add Filter</Button>
      </div>
    </div>
  );
};

const Filter = ({ id, isOn, setCurrentOn, setCurrentText }) => {
  const [isEdit, setIsEdit] = useState(true);
  const [text, setText] = useState("");

  function buttonClick() {
    if (isEdit) {
      setCurrentOn(id);
      setCurrentText(text);
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  }

  function textInputEnter(e) {
    setText(e.target.value);
  }

  function toggleChange(e) {
    if (e.target.checked) {
      setCurrentOn(id);
      setCurrentText(text);
    } else {
      setCurrentOn(null);
      setCurrentText(null);
    }
  }

  return (
    <form class="row align-items-center">
      <div class="col-3">
        <Button onClick={buttonClick}>{isEdit ? "Submit" : "Edit"}</Button>
      </div>
      <div class="col-6">
        <TextInput
          value={text}
          onInput={textInputEnter}
          disabled={isEdit ? false : true}
        />
      </div>
      <div class="col-3 d-flex justify-content-end">
        {isEdit ? "" : <ToggleSwitch onChange={toggleChange} isOn={isOn} />}
      </div>
    </form>
  );
};

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */

render(<Popup />, document.getElementById("app"));
