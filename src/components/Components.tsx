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
      class={combineClasses(`spoints-btn`, addClass)}
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
  onClick: () => any;
  iconUrl: string;
}

const IconButton = ({ addClass, onClick, iconUrl }: IconButtonProps) => {
  return (
    <div
      className={combineClasses("spoints-icon-button", addClass)}
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

export { Button, IconButton, InlineImg };
