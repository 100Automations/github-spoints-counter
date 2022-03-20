// @ts-nocheck
"use strict";

import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import "./popup.css";
import { Button, TextInput, ToggleSwitch } from "./components";

const Popup = () => {
  const [currentOn, setCurrentOn] = useState(null);
  const [data, setData] = useState([{ text: "", editState: true }]);

  function addData() {
    const newData = [...data];
    newData.push({ text: "", editState: true });
    setData(newData);
  }

  return (
    <div id="popup" class="container p-3">
      {data.map((datum, index) => {
        return (
          <Filter
            id={index}
            isOn={index == currentOn}
            setCurrentOn={setCurrentOn}
            datum={datum}
          />
        );
      })}
      <div>
        <Button onClick={addData}>Add Filter</Button>
      </div>
    </div>
  );
};

const Filter = ({ id, isOn, setCurrentOn, datum }) => {
  const [isEdit, setIsEdit] = useState(datum.editState);
  const [text, setText] = useState(datum.text);

  function buttonClick() {
    if (isEdit) {
      setCurrentOn(id);
      datum.text = text;
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
    } else {
      setCurrentOn(null);
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
