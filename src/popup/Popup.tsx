"use strict";

// external imports
import { render } from "preact";
import { useState } from "preact/hooks";

// internal imports
import { IconButton } from "../components/Components";
import { PopupMain } from "./PopupMain";
import "./Popup.scss";

// assets
import logo from "../assets/svgs/logo-dark.svg";
import settings from "../assets/svgs/icon-settings.svg";
import { PopupSettings } from "./PopupSettings";

const Popup = () => {
  const [popScreen, setPopScreen] = useState("main");

  const Screen = () => {
    switch (popScreen) {
      case "main":
        return <PopupMain />;
      case "settings":
        return <PopupSettings />;
      default:
        return <PopupMain />;
    }
  };

  return (
    <div id="popup" className="p-3">
      <div className="popup-header flex-container">
        <img src={logo} alt="100 Automations Logo" />
        <IconButton
          iconUrl={settings}
          onClick={(e) => {
            e.preventDefault();
            if (popScreen == "settings") {
              setPopScreen("main");
            } else {
              setPopScreen("settings");
            }
          }}
        />
      </div>
      <h1 class="popup-title spoints-title-2 mt-3">
        GitHub Story Points Calculator
      </h1>
      <Screen />
    </div>
  );
};

render(<Popup />, document.getElementById("app"));
