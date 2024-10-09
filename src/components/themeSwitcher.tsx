import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

type ThemeSwitcherButtonProps = {
  className?: string;
  isDarkTheme: boolean;
  onClick: () => void;
};

export const ThemeSwitcherButton = ({
  isDarkTheme,
  onClick,
}: ThemeSwitcherButtonProps) => {
  return (
    <>
      {isDarkTheme ? (
        <MdOutlineLightMode size={24} onClick={onClick} />
      ) : (
        <MdOutlineDarkMode size={24} onClick={onClick} />
      )}
    </>
  );
};
