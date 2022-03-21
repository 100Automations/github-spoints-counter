// @ts-nocheck
"use strict";

import { useEffect, useState } from "preact/hooks";

import { debounce } from "../utils";

const Alert = ({ color, hidden, ...props }) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsHidden(hidden);
  }, [hidden]);

  useEffect(() => {
    if (!isHidden) {
      const callback = debounce(() => {
        setIsHidden(true);
      }, 1500);
      callback();
    }
  }, [isHidden]);

  function onClick() {
    setIsHidden(true);
  }

  return (
    <div
      class={`alert alert-${color} alert-dismissible fade show fixed-top mx-4 ${
        isHidden ? "hidden" : ""
      }`}
      role="alert"
    >
      {props.children}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={(e) => onClick(e)}
      ></button>
    </div>
  );
};

const Button = ({ color = "primary", onClick, ...props }) => {
  return (
    <button
      class={`btn btn-${color} btn-sm`}
      type="button"
      onClick={(e) => {
        onClick(e);
      }}
    >
      {props.children}
    </button>
  );
};

const TextInput = ({ onInput, value, disabled = false }) => {
  return (
    <input
      class="form-control"
      type="text"
      value={value}
      onInput={(e) => onInput(e)}
      disabled={disabled}
    />
  );
};

const ToggleSwitch = ({ onChange, isOn = false }) => {
  return (
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        checked={isOn}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export { Alert, Button, TextInput, ToggleSwitch };
