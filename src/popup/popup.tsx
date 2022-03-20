// @ts-nocheck
"use strict";

import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import "./popup.css";
import { Button, TextInput, ToggleSwitch } from "./components";

interface data {
  rows: datum[];
  currentOn: number;
}

interface datum {
  text: string;
}

function getData(keys: data) {
  return browser.storage.local.get(keys);
}

function setData(data: data) {
  return browser.storage.local.set(data);
}

const newDatum: datum = {
  text: "",
};

const Popup = () => {
  const [rows, setRows] = useState([]);
  const [currentOn, setCurrentOn] = useState(null);

  useEffect(() => {
    getData({
      rows: [],
      currentOn: null,
    })
      .then((data: data) => {
        setRows(data.rows);
        setCurrentOn(data.currentOn);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setData({
      rows: rows,
      currentOn: currentOn,
    })
      .then(() => {
        console.log("success message in popup");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rows, currentOn]);

  useEffect(() => {
    let querying = browser.tabs.query({ currentWindow: true, active: true });

    function onError(error) {
      console.log(`Error: ${error}`);
    }

    const createMessage = () => {
      if (typeof currentOn == "number" && rows[currentOn].text) {
        return {
          task: "mutate",
          filter: rows[currentOn].text,
        };
      } else {
        return {
          task: "reset",
        };
      }
    };

    querying.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, createMessage());
    }, onError);
  }, [currentOn]);

  function addRow() {
    if (rows.length < 10) {
      const newRows = [...rows];
      newRows.push(newDatum);
      setRows(newRows);
    }
  }

  function datumAPI(task: "update" | "delete", id: number, datum: datum) {
    const newRows = [...rows];
    if (task == "update") {
      newRows[id] = datum;
      setRows(newRows);
    } else if (task == "delete") {
      console.log(newRows.splice(id, 1));
      setRows(newRows);
    }
  }

  return (
    <div id="popup" class="container p-3 overflow-auto">
      {rows.map((datum, index) => {
        return (
          <Filter
            id={index}
            isOn={index == currentOn}
            setCurrentOn={setCurrentOn}
            datum={datum}
            datumAPI={datumAPI}
          />
        );
      })}
      <div>
        <Button onClick={addRow}>Add Filter</Button>
      </div>
    </div>
  );
};

const Filter = ({ id, isOn, setCurrentOn, datum, datumAPI }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    setText(datum.text);
  }, [datum.text]);

  function buttonClick() {
    if (isEdit) {
      setCurrentOn(id);
      setIsEdit(false);
      datumAPI("update", id, {
        text: text,
      });
    } else {
      setIsEdit(true);
    }
  }

  function closeButtonClick() {
    datumAPI("delete", id);
    if (isOn) {
      setCurrentOn(null);
    }
  }

  function textInputEnter(e) {
    setText(e.target.value);
  }

  function toggleChange(e) {
    if (e.target.checked && text) {
      setCurrentOn(id);
    } else {
      e.target.checked = false;
      setCurrentOn(null);
    }
  }

  return (
    <form class="row align-items-center">
      <div class="col-3">
        <Button onClick={buttonClick}>{isEdit ? "Save" : "Edit"}</Button>
      </div>
      <div class="col-5">
        <TextInput
          value={text}
          onInput={textInputEnter}
          disabled={isEdit ? false : true}
        />
      </div>
      <div class="col-2 d-flex justify-content-end">
        {isEdit ? (
          ""
        ) : (
          <Button color="danger" onClick={closeButtonClick}>
            X
          </Button>
        )}
      </div>
      <div class="col-2 d-flex justify-content-end">
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
