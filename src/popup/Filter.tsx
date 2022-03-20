"use strict";
import { useEffect, useState } from "preact/hooks";

import { Button, TextInput, ToggleSwitch } from "./Components";

const Filter = ({ id, isOn, setCurrentOn, datumAPI }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    setText(datumAPI("get", { id: id }).text);
  }, []);

  function buttonClick() {
    if (isEdit) {
      setCurrentOn(id);
      setIsEdit(false);
      datumAPI("patch", {
        id: id,
        datum: {
          text: text,
        },
      });
    } else {
      setIsEdit(true);
    }
  }

  function textInputEnter(e) {
    setText(e.target.value);
  }

  function closeButtonClick() {
    datumAPI("delete", { id: id });
    if (isOn) {
      setCurrentOn(null);
    }
  }

  function toggleChange(e) {
    if (e.target.checked && text) {
      setCurrentOn(id);
    } else {
      e.target.checked = false;
      setCurrentOn(null);
    }
  }

  return (
    <form class="row align-items-center">
      <div class="col-3">
        <Button onClick={buttonClick}>{isEdit ? "Save" : "Edit"}</Button>
      </div>
      <div class="col-5">
        <TextInput
          value={text}
          onInput={textInputEnter}
          disabled={isEdit ? false : true}
        />
      </div>
      <div class="col-2 d-flex justify-content-end">
        {isEdit ? (
          ""
        ) : (
          <Button color="danger" onClick={closeButtonClick}>
            X
          </Button>
        )}
      </div>
      <div class="col-2 d-flex justify-content-end">
        {isEdit ? "" : <ToggleSwitch onChange={toggleChange} isOn={isOn} />}
      </div>
    </form>
  );
};

export { Filter };
