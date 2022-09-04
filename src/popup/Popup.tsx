"use strict";

// external imports
import { Fragment, render } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";

// internal imports
import { Alert, Button, IconButton, InfoBox, TextInput } from "./Components";
import { Filter } from "./Filter";
import { getData, setData, datum, data } from "../dataHandler";
import "./Popup.scss";

import logo from "../assets/logo-dark.svg";
import gear from "../assets/icon-gear.svg";

const newDatum: datum = {
  text: "",
};

const Popup = () => {
  const [rows, setRows] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(null);

  const [hasLabels, setHasLabels] = useState(false);

  useEffect(() => {
    getData({ rows: [], currentSelected: null })
      .then((data: data) => {
        setRows(data.rows);
        setCurrentSelected(data.currentSelected);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setData({ rows: rows, currentSelected: currentSelected })
      .then(() => {
        console.log("Saved.");
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, [rows, currentSelected]);

  useEffect(() => {
    //@ts-ignore
    let querying = browser.tabs.query({ currentWindow: true, active: true });
    const createMessage = () => {
      if (typeof currentSelected == "number" && rows[currentSelected].text) {
        return { task: "mutate", filter: rows[currentSelected].text };
      } else {
        return { task: "reset" };
      }
    };

    querying
      .then((tabs: any) => {
        //@ts-ignore
        browser.tabs.sendMessage(tabs[0].id, createMessage());
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, [rows, currentSelected]);

  return (
    <div id="popup" className="flex-column p-3">
      <Header />
      <Title />
      {rows ? (
        <FilterDisplay
          rows={rows}
          setRows={setRows}
          currentSelected={currentSelected}
          setCurrentSelected={setCurrentSelected}
        />
      ) : (
        <NoFilterDisplay onClick={() => setHasLabels(true)} />
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

function NoFilterDisplay({ onClick }) {
  return (
    <div className="flex-column align-center no-filter-display">
      <h3 className="spoints-title-3 mb-2 mt-7">No filters yet</h3>
      <p className="spoints-p-1 mb-7">
        For more information about filters, visit our{" "}
        <a className="spoints-links" href="https://www.google.com">
          instructions guide
        </a>
        .
      </p>
      <Button onClick={() => onClick()}>Create filter</Button>
    </div>
  );
}

function FilterDisplay({ rows, setRows, currentSelected, setCurrentSelected }) {
  interface options {
    id?: number;
    datum?: datum;
  }

  type task = "post" | "get" | "patch" | "delete";

  function arrayApi(task: task, options?: options) {
    console.log(task, options);
    try {
      const newArray = [...rows];
      switch (task) {
        case "post":
          newArray.push(options.datum);
          setRows(newArray);
          break;
        case "get":
          return newArray[options.id];
        case "patch":
          newArray[options.id] = options.datum;
          setRows(newArray);
          break;
        case "delete":
          newArray.splice(options.id, 1);
          setRows(newArray);
          break;
        default:
          console.log(`No operation called ${task}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // note do not do flex grow 2; rather make the bottom input sticky
  return (
    <div className="flex-column align-center mt-3" style={{ flexGrow: 2 }}>
      <InfoBox>
        {rows && currentSelected !== null
          ? rows[currentSelected].text
          : "No Filters Selected"}
      </InfoBox>
      <div className="row fill mt-3">
        <span>SELECT A FILTER</span>
      </div>
      <div className="popup-labels fill my-2" style={{ flexGrow: 2 }}>
        {rows.map((datum: datum, index: number) => {
          console.log(index, currentSelected);
          return (
            <Filter
              key={index}
              text={datum.text}
              active={index == currentSelected}
              addClass="mb-2"
              arrayApi={(task: task, value?: string) => {
                arrayApi(task, { id: index, datum: { text: value } });
              }}
              onSelected={() => setCurrentSelected(index)}
            />
          );
        })}
      </div>
      <div className="row fill mt-1">
        <TextInput
          addClass="fill"
          onEnter={(value: string) => {
            console.log(value);
            arrayApi("post", { datum: { text: value } });
          }}
          placeholder="Add a filter"
          label="Enter a label with an assigned numerical value."
        />
      </div>
    </div>
  );
}

render(<Popup />, document.getElementById("app"));
