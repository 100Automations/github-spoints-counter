"use strict";

import { render } from "preact";
import { useEffect, useState } from "preact/hooks";

import { Alert, Button } from "./Components";
import { Filter } from "./Filter";
import { getData, setData, datum, data } from "../dataHandler";
import "./popup.scss";

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
        setAlert({ text: `Error: ${error}`, hidden: false, color: "danger" });
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
      <Alert color={alert.color} hidden={alert.hidden} onReset={alertReset}>
        {alert.text}
      </Alert>
      <h1 id="popup-title" class="photon-display-20">
        Foxy-pangolins
      </h1>
      {rows.map((datum, index) => {
        return (
          <Filter
            id={index}
            isOn={index == currentOn}
            setCurrentOn={setCurrentOn}
            datum={datum}
            datumOperation={datumOperation}
          />
        );
      })}
      <div>
        <Button onClick={() => datumOperation("post", { datum: newDatum })}>
          Add Filter
        </Button>
      </div>
    </div>
  );
};

render(<Popup />, document.getElementById("app"));
