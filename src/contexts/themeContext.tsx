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

type Theme = 'light' | 'dark' | 'orange' | 'green'; // Add more theme options as needed

type ThemeContextType = {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeContextProvider(
  props: ThemeContextProviderProps
): ReactElement {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');

  useEffect(() => {
    initialThemeHandler();
  });
  function isLocalStorageEmpty(): boolean {
    return !localStorage.getItem("currentTheme");
  }

  function initialThemeHandler(): void {
    if (isLocalStorageEmpty()) {
      const initialTheme: Theme = prefersDarkMode ? 'dark' : 'light';
      localStorage.setItem("currentTheme", initialTheme);
      setCurrentTheme(initialTheme);
    } else {
      const savedTheme = localStorage.getItem("currentTheme") as Theme;
      setCurrentTheme(savedTheme);
    }
    applyTheme(currentTheme);
  }

  function setTheme(newTheme: Theme): void {
    setCurrentTheme(newTheme);
    localStorage.setItem("currentTheme", newTheme);
    applyTheme(newTheme);
    window.dispatchEvent(new Event("theme-changed"));
  }

  function applyTheme(theme: Theme): void {
    document.documentElement.classList.remove('light', 'dark', 'orange', 'green');
    document.documentElement.classList.add(theme);
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
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
