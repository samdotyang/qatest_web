import { Palette } from "lucide-react";
import { useThemeContext } from "@/contexts/themeContext";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

type Theme = 'light' | 'dark' | 'orange' | 'green';

const THEME_OPTIONS: { label: string; value: Theme; }[] = [
  {label: 'Light', value: 'light'},
  {label: 'Dark', value: 'dark'},
  {label: 'Orange', value: 'orange'},
  {label: 'Green', value: 'green'},
]


export const ThemeSwitcher = () => {
  const { currentTheme, setTheme } = useThemeContext();
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="w-9 h-9">
            <Palette className="h-5 w-5"/>
            <span className="sr-only">Change theme</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-1">
          <div className="grid grid-cols-1 gap-1">
          {THEME_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={currentTheme === option.value ? "secondary" : "ghost"}
              onClick={() => setTheme(option.value)}
              className="w-full justify-start text-primary-label"
            >
              {option.label}
            </Button>
          ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
