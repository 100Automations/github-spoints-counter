"use strict";

// external imports
import { Fragment, render } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";

// internal imports
import { IconButton } from "../components/Components";
import { Filter } from "./Filter";
import { getData, setData, datum, data } from "../dataHandler";
import { combineClasses } from "../utils";
import "./Popup.scss";

// assets
import logo from "../assets/svgs/logo-dark.svg";
import settings from "../assets/svgs/icon-settings.svg";

const Popup = () => {
  const [rows, setRows] = useState<datum[]>([]);
  const [currentSelected, setCurrentSelected] = useState(null);

  useEffect(() => {
    getData({ rows: [], currentSelected: null })
      .then((data: data) => {
        setRows(data.rows);
        setCurrentSelected(data.currentSelected);
        // TODO remove this once you are done

        setRows([
          { text: "size" },
          { text: "points" },
          { text: "points" },
          { text: "points" },
        ]);
      })
      .catch((error: Error) => console.log(error));
  }, []);

  useEffect(() => {
    setData({ rows: rows, currentSelected: currentSelected })
      .then(() => console.log("Saved."))
      .catch((error: Error) => console.log(error));
  }, [rows, currentSelected]);

  useEffect(() => {
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
        browser.tabs.sendMessage(tabs[0].id, createMessage());
      })
      .catch((error: Error) => console.log(error));
  }, [rows, currentSelected]);

  function arrayApi(task: task, options: options) {
    return api(rows, setRows, task, options);
  }

  return (
    <div id="popup" className="p-3">
      <div className="popup-header flex-container">
        <img src={logo} alt="100 Automations Logo" />
        <IconButton
          iconUrl={settings}
          onClick={() => console.log("gear clicked")}
        />
      </div>
      <h1 class="popup-title spoints-title-2 mt-3">
        GitHub Story Points Calculator
      </h1>
      {rows.length <= 0 ? (
        <div className="flex-column align-center mt-3 no-filter-display">
          <h3 className="spoints-title-2 mb-2 mt-4">No labels yet</h3>
          <p className="spoints-p-3 mb-7">
            For more information about labels, visit our{" "}
            <a className="spoints-links" href="https://www.google.com">
              instructions guide
            </a>
            .
          </p>
        </div>
      ) : (
        <Fragment>
          <div className="flex-column align-center mt-3">
            <div className="fill filter-display">
              <div className="spoints-p-1">
                <span>Select an existing label.</span>
              </div>
              <div className="spoints-p-2 mt-2">
                <div>
                  “Total” is the sum of that label's values within the kanban
                  column.
                </div>
                <div>
                  “Missing” is the number of issues that are missing that label.
                </div>
              </div>
              <div className="spoints-p-3 mt-2">
                <p>
                  For more information about labels, visit our{" "}
                  <a className="spoints-links" href="https://www.google.com">
                    instructions guide
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="popup-filters chrome fill my-2">
              {rows.map((datum: datum, index: number) => {
                return (
                  <Filter
                    key={index}
                    text={datum.text}
                    active={index == currentSelected}
                    addClass={index != rows.length - 1 ? "mb-2" : ""}
                    arrayApi={(task: task, value?: string) => {
                      arrayApi(task, { index: index, datum: { text: value } });
                    }}
                    onClick={() => setCurrentSelected(index)}
                    onRadioClick={() => {
                      index == currentSelected
                        ? setCurrentSelected(null)
                        : setCurrentSelected(index);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

// Helpers

interface options {
  index?: number;
  datum?: datum;
}

type task = "post" | "get" | "patch" | "delete";

function api(
  data: datum[],
  setData: StateUpdater<datum[]>,
  task: task,
  options?: options
) {
  try {
    const newDataArray = [...data];
    switch (task) {
      case "post":
        newDataArray.push(options.datum);
        setData(newDataArray);
        return newDataArray.length - 1;
      case "get":
        return newDataArray[options.index];
      case "patch":
        newDataArray[options.index] = options.datum;
        setData(newDataArray);
        break;
      case "delete":
        newDataArray.splice(options.index, 1);
        setData(newDataArray);
        return options.index;
      default:
        console.log(`No operation called ${task}`);
    }
  } catch (error) {
    console.log(error);
  }
}

render(<Popup />, document.getElementById("app"));
