// @ts-nocheck
"use strict";

// external imports
import { useEffect, useRef, useState } from "preact/hooks";

// internal imports
import { combineClasses, onKey } from "../utils";

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

interface InfoBoxProps {
  addClass?: string;
  children?: preact.ReactNode;
}

const InfoBox = ({ addClass, children }: InfoBoxProps) => {
  return (
    <div
      className={combineClasses("spoints-info-box", "text-center", addClass)}
    >
      {children}
    </div>
  );
};

interface TextInputProps {
  addClass?: string;
  disabled?: boolean;
  isFocused: boolean;
  label?: string;
  onBlur: (e?: FocusEvent) => any;
  onEnter: (e?: KeyboardEvent) => any;
  onFocus: (e?: FocusEvent) => any;
  placeholder?: string | number;
  value?: string | number;
}

const TextInput = ({
  addClass,
  disabled = false,
  isFocused,
  label,
  onBlur,
  onEnter,
  onFocus,
  placeholder,
  value,
}: TextInputProps) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div className={addClass}>
      <input
        class="spoints-form-input"
        type="text"
        value={value}
        onBlur={(e) => {
          onBlur(e);
        }}
        onFocus={(e) => {
          onFocus(e);
        }}
        onKeyDown={onKey((e) => {
          onEnter(e);
          inputRef.current.blur();
          inputRef.current.value = "";
        }, "Enter")}
        disabled={disabled}
        placeholder={placeholder}
        ref={inputRef}
      />
      <span className="spoints-form-label pl-1">{label}</span>
    </div>
  );
};

export { Alert, Button, IconButton, InfoBox, TextInput };
