"use strict";
import { useEffect, useState } from "preact/hooks";

import { Button, TextInput, ToggleSwitch } from "./Components";

const Filter = ({ id, isOn, setCurrentOn, datum, datumOperation }) => {
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

  return (
    <form class="filter-container">
      <div className="col-11 mr-2">
        <TextInput
          onInput={textInputEnter}
          value={text}
          icon={
            <Button color="danger" onClick={xButtonClick}>
              X
            </Button>
          }
        />
      </div>
      <div className="col-1">
        <ToggleSwitch
          onChange={toggleChange}
          isOn={text && isOn}
          disabled={!isTogglable}
        />
      </div>
    </form>
  );
};

export { Filter };
