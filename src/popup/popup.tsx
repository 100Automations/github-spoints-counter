"use strict";

import { render } from "preact";
import { useEffect, useState } from "preact/hooks";

import "./popup.css";
import { Button } from "./Components";
import { Filter } from "./Filter";

interface data {
  rows: datum[];
  currentOn: number;
}

interface datum {
  text: string;
}

function getData(keys: data) {
  //@ts-ignore
  return browser.storage.local.get(keys);
}

function setData(data: data) {
  //@ts-ignore
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
    //@ts-ignore
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
      //@ts-ignore
      browser.tabs.sendMessage(tabs[0].id, createMessage());
    }, onError);
  }, [currentOn]);

  interface options {
    id?: number;
    datum?: datum;
  }

  function datumAPI(
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
        console.log(options.id);
        console.log(newRows.splice(options.id, 1));
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
            datumAPI={datumAPI}
          />
        );
      })}
      <div>
        <Button onClick={() => datumAPI("post", { datum: newDatum })}>
          Add Filter
        </Button>
      </div>
    </div>
  );
};

render(<Popup />, document.getElementById("app"));
