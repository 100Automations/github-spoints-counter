"use strict";

// internal imports
import { combineClasses } from "../utils";

interface ButtonProps {
  addClass?: string;
  children?: preact.ComponentChildren;
  color?: "primary" | "secondary";
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
      class={combineClasses("spoints-btn", color, addClass)}
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
  addClass?: string;
  height?: string | number;
  src: string;
  width?: string | number;
}

const InlineImg = ({
  addClass,
  height = "100%",
  src,
  width = "100%",
}: InlineImgProps) => {
  return (
    <img
      src={src}
      className={combineClasses("vertical-sub", addClass)}
      width={width}
      height={height}
    />
  );
};

interface SettingsButtonProps {
  addClass?: string;
  children?: preact.ComponentChildren;
  href?: string;
  iconUrl: string;
  onClick?: () => any;
  text: string;
}

const SettingsButton = ({
  addClass,
  iconUrl,
  text,
  ...props
}: SettingsButtonProps) => {
  const Tag = "href" in props ? "a" : "button";

  return (
    <Tag
      class={combineClasses(
        "spoints-settings-btn",
        "flex-column",
        "align-center",
        "justify-center",
        "p-1",
        "text-center",
        addClass
      )}
      type="button"
      href={props.href}
      target={props.href ? "_blank" : null}
      onClick={props.onClick}
    >
      <div className="fill">
        <img className="mb-8" src={iconUrl}></img>
      </div>
      <span>{text}</span>
    </Tag>
  );
};

export { Button, IconButton, InlineImg, SettingsButton };
