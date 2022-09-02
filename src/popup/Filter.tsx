"use strict";
import { useEffect, useState } from "preact/hooks";
import { combineClasses } from "../utils";

import { Button, TextInput, ToggleSwitch } from "./Components";

interface FilterProps {
  addClass?: string;
  text?: string;
}

const Filter = ({ addClass, text }: FilterProps) => {
  /*
  const [text, setText] = useState("");
  const [isTogglable, setIsTogglable] = useState(false);

  useEffect(() => {
    setText(datum.text);
  }, [datum.text]);

  useEffect(() => {
    setIsTogglable(text ? true : false);
  }, [text]);

  function textInputEnter(e) {
    setText(e.target.value);
  }

  function xButtonClick() {
    datumOperation("delete", { id: id });
    if (isOn) {
      setCurrentOn(null);
    }
  }

  function toggleChange(e) {
    if (e.target.checked) {
      setCurrentOn(id);
    } else {
      e.target.checked = false;
      setCurrentOn(null);
    }
  }
  */

  return (
    <div
      className={combineClasses(
        "filter",
        "flex-container",
        "align-center",
        "fill",
        addClass
      )}
    >
      <div className="col-1">O</div>
      <span className="col-9">{text}</span>
      <div className="col-1">E</div>
      <div className="col-1">D</div>
    </div>
  );
};

export { Filter };
