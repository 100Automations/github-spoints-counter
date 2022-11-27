"use strict";

// external imports
import { Fragment, render } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";

// internal imports
import {
  Button,
  IconButton,
  InfoBox,
  TextInput,
} from "../components/Components";
import { Filter } from "./Filter";
import { getData, setData, datum, data } from "../dataHandler";
import { combineClasses } from "../utils";
import "./Popup.scss";

// assets
import deselect from "../assets/svgs/icon-deselect.svg";
import logo from "../assets/svgs/logo-dark.svg";
import plus from "../assets/svgs/icon-plus.svg";
import settings from "../assets/svgs/icon-settings.svg";

const Popup = () => {
  const [rows, setRows] = useState<datum[]>([]);
  const [currentSelected, setCurrentSelected] = useState(null);
  const [isInputFocusing, setIsInputFocusing] = useState(false);

  useEffect(() => {
    getData({ rows: [], currentSelected: null })
      .then((data: data) => {
        setRows(data.rows);
        setCurrentSelected(data.currentSelected);
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
      <h1 class="popup-title spoints-title-1 mt-3">
        GitHub Story Points Calculator
      </h1>
      {rows.length <= 0 && !isInputFocusing ? (
        <div className="flex-column align-center mt-3 no-filter-display">
          <h3 className="spoints-title-3 mb-2 mt-4">No filters yet</h3>
          <p className="spoints-p-1 mb-7">
            For more information about filters, visit our{" "}
            <a className="spoints-links" href="https://www.google.com">
              instructions guide
            </a>
            .
          </p>
          <Button onClick={() => setIsInputFocusing(true)}>
            Create filter
          </Button>
        </div>
      ) : (
        <Fragment>
          <div className="flex-column align-center mt-3">
            <InfoBox addClass="flex-align-center">
              {rows.length > 0 && currentSelected !== null ? (
                <Fragment>
                  {rows[currentSelected].text}&nbsp;
                  <IconButton
                    addClass="popup-infobox-icon"
                    iconUrl={deselect}
                    onClick={() => setCurrentSelected(null)}
                  />
                </Fragment>
              ) : (
                "No Filters Selected"
              )}
            </InfoBox>
            <div className="row fill mt-3">
              <span>SELECT A FILTER</span>
            </div>
            <div className="popup-filters chrome fill my-2">
              {rows.map((datum: datum, index: number) => {
                return (
                  <Filter
                    key={index}
                    text={datum.text}
                    active={index == currentSelected}
                    addClass="mb-2"
                    arrayApi={(task: task, value?: string) => {
                      arrayApi(task, { index: index, datum: { text: value } });
                    }}
                    onClick={() => setCurrentSelected(index)}
                    onRadioClick={() => {
                      index == currentSelected
                        ? setCurrentSelected(null)
                        : setCurrentSelected(index);
                    }}
                    onDelete={() => {
                      const deleted = arrayApi("delete", { index: index });
                      if (deleted == currentSelected) {
                        setCurrentSelected(null);
                      } else if (deleted < currentSelected) {
                        setCurrentSelected(currentSelected - 1);
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div
            className={combineClasses(
              "flex-container align-center fill",
              isInputFocusing && "justify-center"
            )}
          >
            {!isInputFocusing && (
              <img src={plus} className="col-1" width={16} height={16} />
            )}
            <TextInput
              addClass="col-10 px-1 mx-2"
              isFocused={isInputFocusing}
              onBlur={() => setIsInputFocusing(false)}
              onFocus={() => setIsInputFocusing(true)}
              onEnter={(e: KeyboardEvent) => {
                const value = (e.target as HTMLInputElement).value;
                const index = arrayApi("post", { datum: { text: value } });
                setCurrentSelected(index);
              }}
              placeholder="Add a filter"
              label="Enter label with assigned numerical value"
            />
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
