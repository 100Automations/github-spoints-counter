import { createContext } from "preact";
import darktheme from "../assets/svgs/icon-theme-dark.svg";
import lighttheme from "../assets/svgs/icon-theme-light.svg";

const ThemeContext = createContext("dark");

const themeFlow = {
  dark: {
    iconUrl: darktheme,
    currText: "Dark Theme",
    next: "light",
  },
  light: {
    iconUrl: lighttheme,
    currText: "Light Theme",
    next: "dark",
  },
};

export { ThemeContext, themeFlow };
