import { createContext } from "preact";
import { useState } from "preact/hooks";

const page = {
  main: "main",
  settings: "settings",
};

const mode = {
  light: "light",
  dark: "dark",
};

const defaultState = {
  settings: {
    page: page.main,
    mode: mode.dark,
  },
  setSettings: undefined,
};

const SettingsContext = createContext(defaultState);

function SettingsProvider({ ...props }) {
  const [settings, setSettings] = useState(defaultState.settings);
  return (
    <SettingsContext.Provider
      value={{
        settings: settings,
        setSettings: setSettings,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}
