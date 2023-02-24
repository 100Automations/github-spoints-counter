"use strict";

// external imports
import { Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";

// internal imports
import { Filter } from "./Filter";
import {
  getLocalData,
  setLocalData,
  getPageData,
  label,
  localData,
} from "../dataHandler";
import "./Popup.scss";

const PopupMain = () => {
  const [rows, setRows] = useState<label[]>([]);
  const [currentSelected, setCurrentSelected] = useState(null);

  useEffect(() => {
    getPageData((data: label[]) => {
      setRows(data);
    });
    getLocalData({ currentSelected: null })
      .then((data: localData) => {
        setCurrentSelected(data.currentSelected);
      })
      .catch((error: Error) => console.log(error));
  }, []);

  useEffect(() => {
    setLocalData({ currentSelected: currentSelected })
      .then(() => console.log("Saved."))
      .catch((error: Error) => console.log(error));
  }, [currentSelected]);

  useEffect(() => {
    let querying = browser.tabs.query({ currentWindow: true, active: true });
    const createMessage = () => {
      if (
        typeof currentSelected == "string" &&
        rows.filter((e) => e.text === currentSelected).length > 0
      ) {
        return { task: "updateSelected", filter: currentSelected };
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

  return (
    <Fragment>
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
              {rows.map((label: label, index: number) => {
                return (
                  <Filter
                    key={index}
                    text={label.text}
                    active={label.text == currentSelected}
                    addClass={index != rows.length - 1 ? "mb-2" : ""}
                    onClick={() => setCurrentSelected(label.text)}
                    onRadioClick={() => {
                      label.text == currentSelected
                        ? setCurrentSelected(null)
                        : setCurrentSelected(label.text);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export { PopupMain };
