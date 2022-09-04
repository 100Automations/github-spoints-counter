// @ts-nocheck
"use strict";

// external imports
import { useEffect, useRef, useState } from "preact/hooks";

// internal imports
import { combineClasses } from "../utils";
import enter from "../assets/icon-enter.svg";
import plus from "../assets/icon-plus.svg";

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
  onEnter: (value: string) => any;
  placeholder?: string | number;
  value?: string | number;
}

const TextInput = ({
  addClass,
  disabled = false,
  onEnter,
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
        disabled={disabled}
        placeholder={placeholder}
        ref={inputRef}
      />
      {isFocused && (
        <img
          src={enter}
          className="col-1"
          width={16}
          height={16}
          onClick={(e) => {
            console.log("helloworld");
            onEnter(inputRef.current.value);
          }}
        />
      )}
    </div>
  );
};

export { Alert, Button, IconButton, InfoBox, TextInput };
