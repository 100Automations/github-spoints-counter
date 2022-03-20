"use strict";

import { render } from "preact";
import { useEffect, useState } from "preact/hooks";

import "./popup.css";
import { Alert, Button } from "./Components";
import { Filter } from "./Filter";
import { getData, setData, datum, data } from "../dataHandler";

const newDatum: datum = {
  text: "",
};

const Popup = () => {
  const [rows, setRows] = useState([]);
  const [currentOn, setCurrentOn] = useState(null);

  useEffect(() => {
    getData({ rows: [], currentOn: null })
      .then((data: data) => {
        setRows(data.rows);
        setCurrentOn(data.currentOn);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setData({ rows: rows, currentOn: currentOn })
      .then(() => {
        console.log("success message in popup");
      })
      .catch((error) => {
        console.log(error);
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
        console.log(`Error: ${error}`);
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
      console.log(error);
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
