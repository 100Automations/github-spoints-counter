"use strict";

// external imports
import { Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";

// internal imports
import { SettingsButton } from "../components/Components";
import aboutSP from "../assets/svgs/icon-about-sp.svg";
import "./Popup.scss";
import { combineClasses } from "../utils";

const settingsFields = [
  {
    iconUrl: aboutSP,
    text: "Dark Theme",
    onClick: () => {
      console.log("theme");
    },
  },
  {
    iconUrl: aboutSP,
    text: "About Story",
    onClick: () => {
      console.log("about sp");
    },
  },
  {
    iconUrl: aboutSP,
    text: "About 100 Automations",
    onClick: () => {
      console.log("about 100");
    },
  },
  {
    iconUrl: aboutSP,
    text: "Submit Feedback",
    onClick: () => {
      console.log("feedback");
    },
  },
  {
    iconUrl: aboutSP,
    text: "Report Bugs",
    onClick: () => {
      console.log("bugs");
    },
  },
  {
    iconUrl: aboutSP,
    text: "Help",
    onClick: () => {
      console.log("help");
    },
  },
  {
    iconUrl: aboutSP,
    text: "Private Policy",
    onClick: () => {
      console.log("private policy");
    },
  },
];

function chunk(arr: any[], chunkSize: number) {
  if (chunkSize <= 0) throw "Invalid chunk size";
  var R = [];
  for (var i = 0, len = arr.length; i < len; i += chunkSize)
    R.push(arr.slice(i, i + chunkSize));
  return R;
}

const PopupSettings = () => {
  interface SettingsRowProps {
    addClass?: string;
    fields: any[];
  }

  const SettingsRow = ({ addClass, fields }: SettingsRowProps) => {
    return (
      <div className={combineClasses("popup-settings-row", "mb-3", addClass)}>
        {fields.map((field, index) => {
          return (
            <SettingsButton
              key={index}
              iconUrl={field.iconUrl}
              onClick={field.onClick}
            >
              <span>{field.text}</span>
            </SettingsButton>
          );
        })}
      </div>
    );
  };

  return (
    <Fragment>
      <div className="mt-3">
        <div className="spoints-p-1">SETTINGS</div>
        <div className="mt-3">
          {chunk(settingsFields, 4).map((fieldChunks, index, arr) => {
            if (index + 1 === arr.length) {
              return (
                <SettingsRow addClass="last" key={index} fields={fieldChunks} />
              );
            } else {
              return <SettingsRow key={index} fields={fieldChunks} />;
            }
          })}
        </div>
      </div>
    </Fragment>
  );
};

export { PopupSettings };
