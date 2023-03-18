import { createContext } from "preact";

// dark assets
import darkThemeIcon from "../assets/themed/dark/icon-theme.svg";
import darkSettings from "../assets/themed/dark/icon-settings.svg";
import darkLogo from "../assets/themed/dark/logo.svg";

// light assets
import lightThemeIcon from "../assets/themed/light/icon-theme.svg";
import lightSettings from "../assets/themed/light/icon-settings.svg";
import lightLogo from "../assets/themed/light/logo.svg";

const ThemeContext = createContext("dark");

const themeFlow = {
  dark: {
    currText: "Dark Theme",
    iconUrl: darkThemeIcon,
    logo: darkLogo,
    next: "light",
    settings: darkSettings,
  },
  light: {
    currText: "Light Theme",
    iconUrl: lightThemeIcon,
    logo: lightLogo,
    next: "dark",
    settings: lightSettings,
  },
};

export { ThemeContext, themeFlow };
