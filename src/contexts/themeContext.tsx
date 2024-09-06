import {
  createContext,
  ReactElement,
  useEffect,
  useState,
  useContext,
} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";


type ThemeContextProviderProps = {
  children: React.ReactNode;
};

type DarkTheme = true | false;

type ThemeContextType = {
  isDarkTheme: DarkTheme;
  toggleThemeHandler: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeContextProvider(
  props: ThemeContextProviderProps
): ReactElement {
  const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  useEffect(() => initialThemeHandler());

  function isLocalStorageEmpty(): boolean {
    return !localStorage.getItem("isDarkTheme");
  }

  function initialThemeHandler(): void {
    if (isLocalStorageEmpty()) {
      console.log(preferDarkMode)
      localStorage.setItem("isDarkTheme", `${preferDarkMode}`);
      document.querySelector("body")!.classList.add("dark");
    } else {
      const isDarkTheme: boolean = JSON.parse(
        localStorage.getItem("isDarkTheme")!
      );
      isDarkTheme && document!.querySelector("body")!.classList.add("dark");
      setIsDarkTheme(() => {
        return isDarkTheme;
      });
    }
  }

  function toggleThemeHandler(): void {
    const isDarkTheme: boolean = JSON.parse(
      localStorage.getItem("isDarkTheme")!
    );
    setIsDarkTheme(!isDarkTheme);
    toggleDarkClassToBody();
    setValueToLocalStorage();
  }

  function toggleDarkClassToBody(): void {
    document!.querySelector("body")!.classList.toggle("dark");
  }

  function setValueToLocalStorage(): void {
    localStorage.setItem("isDarkTheme", `${!isDarkTheme}`);
    window.dispatchEvent(new Event("theme-changed"));
  }

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleThemeHandler }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
}
