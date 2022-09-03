"use strict";

// external imports
import { useEffect, useState } from "preact/hooks";

// internal imports
import { combineClasses } from "../utils";
import { Button, TextInput, ToggleSwitch } from "./Components";
import radioInactive from "../assets/icon-radio.svg";
import radioActive from "../assets/icon-radio-active.svg";
import edit from "../assets/icon-edit.svg";
import trash from "../assets/icon-trash.svg";

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
        "flex-align-center",
        "fill",
        addClass
      )}
    >
      <FilterRadio />
      <input type="text" className="filter-text" style={{ flexGrow: 2 }}>
        {text}
      </input>
      <FilterIcon iconUrl={edit} addClass="filter-edit" />
      <FilterIcon iconUrl={trash} addClass="filter-trash" />
    </div>
  );
};

interface FilterRadioProps {
  active?: boolean;
  addClass?: string;
  color?: string;
  onChange?: (isActive: boolean) => any;
}

const FilterRadio = ({
  active = false,
  addClass,
  color,
  onChange,
}: FilterRadioProps) => {
  const [isActive, setIsActive] = useState(active);

  useEffect(() => {
    onChange(isActive);
  }, [isActive]);

  return (
    <div className="row ml-4 mr-10">
      <img
        src={isActive ? radioActive : radioInactive}
        onClick={() => setIsActive(!isActive)}
      />
    </div>
  );
};

interface FilterIconProps {
  addClass?: string;
  color?: string;
  iconUrl: string;
}

const FilterIcon = ({ addClass, iconUrl }: FilterIconProps) => {
  return (
    <button className={combineClasses("filter-icon", addClass)}>
      <img src={iconUrl} />
    </button>
  );
};

export { Filter };
