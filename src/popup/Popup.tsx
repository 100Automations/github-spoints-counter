"use strict";

// external imports
import { render } from "preact";
import { useEffect, useState } from "preact/hooks";

// internal imports
import { ThemeContext, themeFlow } from "./Themes";
import { IconButton } from "../components/Components";
import { PopupMain } from "./PopupMain";
import { PopupSettings } from "./PopupSettings";
import { getLocalData, localData, setLocalData } from "../dataHandler";
import "./Popup.scss";

const Popup = () => {
  const [popScreen, setPopScreen] = useState("main");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    getLocalData({ theme: "dark" })
      .then((data: localData) => {
        setTheme(data.theme);
      })
      .catch((error: Error) => console.log(error));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("class", "");
    document.documentElement.classList.add(`theme-${theme}`);
    setLocalData({ theme: theme })
      .then(() => console.log("Saved."))
      .catch((error: Error) => console.log(error));
  }, [theme]);

  const Screen = () => {
    switch (popScreen) {
      case "main":
        return <PopupMain />;
      case "settings":
        return <PopupSettings setTheme={setTheme} />;
      default:
        return <PopupMain />;
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div id="popup" className="p-3">
        <div className="popup-header flex-container">
          <img src={themeFlow[theme].logo} alt="100 Automations Logo" />
          <IconButton
            iconUrl={themeFlow[theme].settings}
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
    </ThemeContext.Provider>
  );
};

render(<Popup />, document.getElementById("app"));
