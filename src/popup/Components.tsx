// @ts-nocheck
"use strict";

// external imports
import { useEffect, useRef, useState } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";

// internal imports
import { combineClasses, debounce } from "../utils";

// @ts-ignore
import * as enter from "../assets/icon-enter.svg";
// @ts-ignore
import * as plus from "../assets/icon-plus.svg";

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

interface IconButtonProps {
  addClass?: string;
  onClick: () => any;
  iconUrl: string;
}

const IconButton = ({ addClass, onClick, iconUrl }: IconButtonProps) => {
  return (
    <div className={combineClasses(addClass)} onClick={onClick}>
      <img src={iconUrl}></img>
    </div>
  );
};

interface SelectionLabelProps {
  addClass?: string;
  children?: preact.ReactNode;
}

const SelectionLabel = ({ addClass, children }: SelectionLabelProps) => {
  return (
    <div
      className={combineClasses(
        "spoints-select-label",
        "text-center",
        addClass
      )}
    >
      {children}
    </div>
  );
};

interface TextInputProps {
  addClass?: string;
  disabled?: boolean;
  onInput: (e: any) => any;
  placeholder?: string | number;
  value?: string | number;
}

const TextInput = ({
  addClass,
  disabled = false,
  onInput,
  placeholder,
  value,
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      className={combineClasses(
        "flex-container",
        "align-center",
        isFocused && "justify-right",
        addClass
      )}
    >
      {!isFocused && (
        <img src={plus} className="col-1" width={16} height={16} />
      )}
      <input
        class="spoints-form-input col-10 px-1 mx-2"
        type="text"
        value={value}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        onInput={(e) => onInput(e)}
        disabled={disabled}
        placeholder={placeholder}
        ref={inputRef}
      />
      {isFocused && (
        <img src={enter} className="col-1" width={16} height={16} />
      )}
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

export { Alert, Button, IconButton, SelectionLabel, TextInput, ToggleSwitch };
