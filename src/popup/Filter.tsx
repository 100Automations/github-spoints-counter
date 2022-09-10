"use strict";
// external imports
import { useEffect, useRef, useState } from "preact/hooks";

// internal imports
import { combineClasses } from "../utils";
import radioInactive from "../assets/icon-radio.svg";
import radioActive from "../assets/icon-radio-active.svg";
import edit from "../assets/icon-edit.svg";
import save from "../assets/icon-save.svg";
import trash from "../assets/icon-trash.svg";

interface FilterProps {
  active: boolean;
  addClass?: string;
  arrayApi: Function;
  onClick: (e?: MouseEvent) => any;
  onDelete: () => any;
  onRadioClick: () => any;
  text?: string;
}

const Filter = ({
  active,
  addClass,
  arrayApi,
  onClick,
  onDelete,
  onRadioClick,
  text,
}: FilterProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef(null);

  function handleEdit(e: MouseEvent) {
    if (isEdit) {
      arrayApi("patch", inputRef.current.value);
    }
    setIsEdit(!isEdit);
  }

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  return (
    <div
      className={combineClasses(
        "filter",
        "flex-align-center",
        "fill",
        addClass
      )}
    >
      <FilterRadio
        active={active}
        addClass="ml-4 mr-10"
        onChange={() => {
          if (!isEdit) onRadioClick();
        }}
      />
      {isEdit ? (
        <input
          type="text"
          className="filter-input filter-text"
          style={{ flexGrow: 2 }}
          value={text}
          ref={inputRef}
        />
      ) : (
        <div
          className="flex-align-center filter-text"
          style={{ flexGrow: 2 }}
          onClick={onClick}
        >
          {text}
        </div>
      )}
      <FilterIcon
        iconUrl={isEdit ? save : edit}
        addClass="filter-edit"
        onClick={handleEdit}
      />
      <FilterIcon iconUrl={trash} addClass="filter-trash" onClick={onDelete} />
    </div>
  );
};

interface FilterRadioProps {
  active?: boolean;
  addClass?: string;
  color?: string;
  onChange?: (e: MouseEvent) => any;
}

const FilterRadio = ({
  active,
  addClass,
  color,
  onChange,
}: FilterRadioProps) => {
  return (
    <div className={combineClasses("row", addClass)}>
      <img src={active ? radioActive : radioInactive} onClick={onChange} />
    </div>
  );
};

interface FilterIconProps {
  addClass?: string;
  color?: string;
  iconUrl: string;
  onClick?: (e: MouseEvent) => any;
}

const FilterIcon = ({ addClass, iconUrl, onClick }: FilterIconProps) => {
  return (
    <button
      className={combineClasses("filter-icon", addClass)}
      onClick={onClick}
    >
      <img src={iconUrl} />
    </button>
  );
};

export { Filter };
