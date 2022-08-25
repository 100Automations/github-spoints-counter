// @ts-nocheck
"use strict";

import { useEffect, useState } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";

import { combineClasses, debounce } from "../utils";

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

interface ButtonProps {
  addClass?: string;
  children?: preact.ReactNode;
  color?: string;
  onClick: () => any;
}

const Button = ({
  color = "primary",
  onClick,
  addClass,
  ...props
}: ButtonProps) => {
  return (
    <button
      class={combineClasses(`spoints-btn`, addClass)}
      type="button"
      onClick={(e) => {
        onClick(e);
      }}
    >
      {props.children}
    </button>
  );
};

const TextInput = ({ onInput, value, icon = undefined, disabled = false }) => {
  return (
    <div className="filter-container">
      {icon && <div className="col-2">{icon}</div>}
      <input
        class="photon-form-input"
        type="text"
        value={value}
        onInput={(e) => onInput(e)}
        disabled={disabled}
      />
    </div>
  );
};

const ToggleSwitch = ({ onChange, disabled = false, isOn = false }) => {
  return (
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="radio"
        checked={isOn}
        onChange={(e) => onChange(e)}
        disabled={disabled}
      />
    </div>
  );
};

export { Alert, Button, TextInput, ToggleSwitch };
