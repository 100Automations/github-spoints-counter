"use strict";

// internal imports
import { combineClasses } from "../utils";
import radioInactive from "../assets/svgs/icon-radio.svg";
import radioActive from "../assets/svgs/icon-radio-active.svg";

interface FilterProps {
  active: boolean;
  addClass?: string;
  onClick: (e?: MouseEvent) => any;
  onRadioClick: () => any;
  text?: string;
}

const Filter = ({
  active,
  addClass,
  onClick,
  onRadioClick,
  text,
}: FilterProps) => {
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
          onRadioClick();
        }}
      />
      <div
        className="flex-align-center filter-text"
        style={{ flexGrow: 2 }}
        onClick={onClick}
      >
        {text}
      </div>
    </div>
  );
};

interface FilterRadioProps {
  active?: boolean;
  addClass?: string;
  color?: string;
  onChange?: (e: MouseEvent) => any;
}

const FilterRadio = ({ active, addClass, onChange }: FilterRadioProps) => {
  return (
    <div className={combineClasses("filter-radio", "row", addClass)}>
      <img src={active ? radioActive : radioInactive} onClick={onChange} />
    </div>
  );
};

export { Filter };
