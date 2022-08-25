"use strict";

import { Fragment, render } from "preact";
import { useEffect, useState } from "preact/hooks";

import { Alert, Button } from "./Components";
import { Filter } from "./Filter";
import { getData, setData, datum, data } from "../dataHandler";
import "./Popup.scss";

// @ts-ignore
import * as logo from "../assets/logo-dark.svg";
// @ts-ignore
import * as gear from "../assets/gear.svg";

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
    <div id="popup">
      <Header />
      <Title />
      <FilterDisplay />
      <div className="row justify-center"></div>
    </div>
  );
};

function Header() {
  return (
    <div id="popup-header" className="flex-container align-center my-6 mx-3">
      <img src={logo} alt="100 Automations Logo" />
      <img src={gear} alt="Settings" />
    </div>
  );
}

function Title() {
  return (
    <h1 id="popup-title" class="spoints-title-1 row justify-center mb-9">
      GitHub Story Points Calculator
    </h1>
  );
}

function FilterDisplay() {
  return (
    <div className="flex-column align-center">
      <h3 className="spoints-title-3 mb-3">No Labels Yet</h3>
      <p className="spoints-p-1 mb-5">
        For more information about labels, visit our instructions guide.
      </p>
      <Button onClick={() => console.log("post")}>Create Label</Button>
    </div>
  );
}

render(<Popup />, document.getElementById("app"));
