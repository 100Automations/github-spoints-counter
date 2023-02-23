"use strict";

// internal imports
import { combineClasses } from "../utils";

interface ButtonProps {
  addClass?: string;
  children?: preact.ComponentChildren;
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
      class={combineClasses("spoints-btn", addClass)}
      type="button"
      onClick={(e) => {
        onClick();
      }}
    >
      {props.children}
    </button>
  );
};

interface IconButtonProps {
  addClass?: string;
  onClick: (e: Event) => any;
  iconUrl: string;
}

const IconButton = ({ addClass, onClick, iconUrl }: IconButtonProps) => {
  return (
    <div
      className={combineClasses("spoints-icon-btn", addClass)}
      onClick={onClick}
    >
      <img src={iconUrl}></img>
    </div>
  );
};

interface InlineImgProps {
  src: string;
}

const InlineImg = ({ src }: InlineImgProps) => {
  return <img src={src} className="vertical-sub" />;
};

interface SettingsButtonProps {
  addClass?: string;
  children?: preact.ComponentChildren;
  iconUrl: string;
  onClick: () => any;
}

const SettingsButton = ({
  addClass,
  iconUrl,
  onClick,
  ...props
}: SettingsButtonProps) => {
  return (
    <button
      class={combineClasses(
        "spoints-settings-btn",
        "flex-column",
        "align-center",
        "justify-center",
        "p-1",
        addClass
      )}
      type="button"
      onClick={(e) => {
        onClick();
      }}
    >
      <div className="fill">
        <img className="mb-8" src={iconUrl}></img>
      </div>
      {props.children}
    </button>
  );
};

export { Button, IconButton, InlineImg, SettingsButton };
