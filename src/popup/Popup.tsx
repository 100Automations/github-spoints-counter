"use strict";

import { Fragment, render } from "preact";
import { useEffect, useState } from "preact/hooks";

import {
  Alert,
  Button,
  IconButton,
  SelectionLabel,
  TextInput,
} from "./Components";
import { Filter } from "./Filter";
import { getData, setData, datum, data } from "../dataHandler";
import "./Popup.scss";

// @ts-ignore
import * as logo from "../assets/logo-dark.svg";
// @ts-ignore
import * as gear from "../assets/icon-gear.svg";

const newDatum: datum = {
  text: "",
};

const Popup = () => {
  const [rows, setRows] = useState([]);
  const [currentOn, setCurrentOn] = useState(null);
  const [alert, setAlert] = useState({
    text: "",
    hidden: true,
    color: "primary",
  });

  const [hasLabels, setHasLabels] = useState(true);

  useEffect(() => {
    getData({ rows: [], currentOn: null })
      .then((data: data) => {
        setRows(data.rows);
        setCurrentOn(data.currentOn);
      })
      .catch((error) => {
        setAlert({ text: `Error: ${error}`, hidden: false, color: "danger" });
      });
  }, []);

  useEffect(() => {
    setData({ rows: rows, currentOn: currentOn })
      .then(() => {
        console.log("Saved.");
      })
      .catch((error) => {
        setAlert({ text: `Error: ${error}`, hidden: false, color: "danger" });
      });
  }, [rows, currentOn]);

  useEffect(() => {
    //@ts-ignore
    let querying = browser.tabs.query({ currentWindow: true, active: true });
    const createMessage = () => {
      if (typeof currentOn == "number" && rows[currentOn].text) {
        return { task: "mutate", filter: rows[currentOn].text };
      } else {
        return { task: "reset" };
      }
    };

    querying
      .then((tabs) => {
        //@ts-ignore
        browser.tabs.sendMessage(tabs[0].id, createMessage());
      })
      .catch((error) => {
        setAlert({
          text: `Error: ${error.message}`,
          hidden: false,
          color: "danger",
        });
      });
  }, [rows, currentOn]);

  interface options {
    id?: number;
    datum?: datum;
  }

  function datumOperation(
    task: "post" | "get" | "patch" | "delete",
    options: options
  ) {
    try {
      const newRows = [...rows];
      if (task == "post") {
        if (rows.length < 10) {
          const newRows = [...rows];
          newRows.push(options.datum);
          setRows(newRows);
        }
      } else if (task == "get") {
        return newRows[options.id];
      } else if (task == "patch") {
        newRows[options.id] = options.datum;
        setRows(newRows);
      } else if (task == "delete") {
        newRows.splice(options.id, 1);
        setRows(newRows);
      }
    } catch (error) {
      setAlert({ text: `Error: ${error}`, hidden: false, color: "danger" });
    }
  }

  function alertReset() {
    setAlert({ text: "", hidden: true, color: "primary" });
  }

  return (
    <div id="popup" className="flex-column p-3">
      <Header />
      <Title />
      {hasLabels ? (
        <div className="flex-column align-center mt-3" style={{ flexGrow: 2 }}>
          <SelectionLabel>No Labels Selected</SelectionLabel>
          <div className="row fill mt-3">
            <span>SELECT A LABEL</span>
          </div>
          <div
            className="popup-labels flex-column align-center fill my-2"
            style={{ flexGrow: 2 }}
          >
            <div>LABEL 1</div>
            <div>LABEL 2</div>
            <div>LABEL 3</div>
          </div>
          <div className="row fill mt-1">
            <TextInput
              addClass="fill"
              onInput={(e) => console.log(e)}
              placeholder={"Add a label"}
            />
          </div>
        </div>
      ) : (
        <FilterDisplay onClick={() => setHasLabels(true)} />
      )}
    </div>
  );
};

function Header() {
  return (
    <div className="popup-header flex-container">
      <img src={logo} alt="100 Automations Logo" />
      <IconButton iconUrl={gear} onClick={() => console.log("gear clicked")} />
    </div>
  );
}

function Title() {
  return (
    <h1 class="popup-title spoints-title-1 mt-3">
      GitHub Story Points Calculator
    </h1>
  );
}

function FilterDisplay({ onClick }) {
  return (
    <div className="flex-column align-center">
      <h3 className="spoints-title-3 mb-2 mt-8">No Labels Yet</h3>
      <p className="spoints-p-1 mb-4">
        For more information about labels, visit our{" "}
        <a className="spoints-links" href="www.google.com">
          instructions guide
        </a>
        .
      </p>
      <Button onClick={() => onClick()}>Create Label</Button>
    </div>
  );
}

render(<Popup />, document.getElementById("app"));
