// @ts-nocheck
"use strict";

import { useEffect, useState } from "preact/hooks";

import { debounce } from "../utils";

const Alert = ({ color, hidden, onReset, ...props }) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsHidden(hidden);
  }, [hidden]);

  useEffect(() => {
    if (!isHidden) {
      const callback = debounce(() => {
        setIsHidden(true);
        onReset();
      }, 3000);
      callback();
    }
  }, [isHidden]);

  function onClick() {
    setIsHidden(true);
  }

  return (
    <div
      class={`photon-alert photon-alert-${color} ${isHidden ? "hidden" : ""}`}
      role="alert"
    >
      {props.children}
      <button
        type="button"
        class="photon-close-btn"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClick}
      >
        X
      </button>
    </div>
  );
};

const Button = ({ color = "primary", onClick, ...props }) => {
  return (
    <button
      class={`photon-btn photon-btn-${color}`}
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
      class="photon-form-input"
      type="text"
      value={value}
      onInput={(e) => onInput(e)}
      disabled={disabled}
    />
  );
};

const ToggleSwitch = ({ onChange, disabled = false, isOn = false }) => {
  return (
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        checked={isOn}
        onChange={(e) => onChange(e)}
        disabled={disabled}
      />
    </div>
  );
};

export { Alert, Button, TextInput, ToggleSwitch };
