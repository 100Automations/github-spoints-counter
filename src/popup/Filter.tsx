"use strict";
import { useEffect, useState } from "preact/hooks";

import { Button, TextInput, ToggleSwitch } from "./Components";

const Filter = ({ id, isOn, setCurrentOn, datum, datumOperation }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState("");
  const [isTogglable, setIsTogglable] = useState(false);

  useEffect(() => {
    setText(datum.text);
  }, [datum.text]);

  useEffect(() => {
    setIsTogglable(text ? true : false);
  }, [text]);

  function buttonClick() {
    if (isEdit) {
      setCurrentOn(text ? id : null);
      setIsEdit(false);
      datumOperation("patch", { id: id, datum: { text: text } });
    } else {
      setIsEdit(true);
    }
  }

  function textInputEnter(e) {
    setText(e.target.value);
  }

  function closeButtonClick() {
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
      <div class="col-3 mr-2">
        <Button onClick={buttonClick}>{isEdit ? "Save" : "Edit"}</Button>
      </div>
      <div class="col-6 mr-2">
        <TextInput
          value={text}
          onInput={textInputEnter}
          disabled={isEdit ? false : true}
        />
      </div>
      <div class="col-2 flex-end">
        {isEdit ? (
          ""
        ) : (
          <Button color="danger" onClick={closeButtonClick}>
            X
          </Button>
        )}
      </div>
      <div class="col-1 flex-end">
        {isEdit ? (
          ""
        ) : (
          <ToggleSwitch
            onChange={toggleChange}
            isOn={text && isOn}
            disabled={!isTogglable}
          />
        )}
      </div>
    </form>
  );
};

export { Filter };
