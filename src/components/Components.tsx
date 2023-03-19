"use strict";

import { useRef, useState } from "preact/hooks";

// internal imports
import { combineClasses } from "../utils";
import iconArrow from "../assets/svgs/icon-arrow.svg";

interface AccordionProps {
  addClass?: string;
  children?: preact.ComponentChildren;
  title: string;
}

const Accordion = ({ addClass, title, ...props }: AccordionProps) => {
  const [isActive, setIsActive] = useState(false);
  const panelRef = useRef(null);

  function handleClick() {
    setIsActive(!isActive);
  }

  return (
    <div className={addClass}>
      <div
        className={combineClasses(
          "flex-align-center",
          "justify-between",
          "spoints-accordion",
          "spoints-title-4",
          "py-2",
          "px-4",
          "text-left",
          isActive && "open"
        )}
        onClick={handleClick}
      >
        {title}
        <img src={iconArrow} className={isActive && "rotate-180"} />
      </div>
      <div
        className={combineClasses(
          "spoints-accordion-panel",
          "fill",
          "px-4",
          "py-4",
          !isActive && "hidden",
          isActive && "open"
        )}
        ref={panelRef}
      >
        {props.children}
      </div>
    </div>
  );
};

interface ButtonProps {
  addClass?: string;
  children?: preact.ComponentChildren;
  color?: "primary" | "secondary";
  href?: string;
  onClick?: () => any;
}

const Button = ({
  color = "primary",
  href,
  onClick,
  addClass,
  ...props
}: ButtonProps) => {
  const Tag = href ? "a" : "button";

  return (
    <Tag
      class={combineClasses("spoints-btn", color, addClass)}
      type="button"
      onClick={onClick}
      href={href}
    >
      {props.children}
    </Tag>
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

export { Accordion, Button, IconButton, InlineImg, SettingsButton };
