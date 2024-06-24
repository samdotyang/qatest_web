import classNames from "classnames";
import { defaultNavItems, NavItem } from "./navItems";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import SidebarFooter from "./sidebarFooter";
import { useThemeContext } from "@contexts/themeContext";

// add NavItem prop to component prop
type Props = {
  title: string;
  collapsed: boolean;
  navItems?: NavItem[];
  setCollapsed(collapsed: boolean): void;
};

const Sidebar = ({
  title,
  collapsed,
  navItems = defaultNavItems,
  setCollapsed,
}: Props) => {
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  const { isDarkTheme, toggleThemeHandler } = useThemeContext();
  return (
    <div
      className={classNames({
        "bg-mac-sidebar-light dark:bg-mac-sidebar-dark text-primary-label dark:text-dark-primary-label":
          true,
        "fixed md:static md:translate-x-0 z-20": true,
        "transition-all duration-300 ease-in-out": true,
        "w-[310px]": !collapsed,
        "w-16": collapsed,
      })}
    >
      <div
        className={classNames({
          "flex flex-col justify-between h-screen sticky inset-0 w-full": true,
        })}
      >
        {/* logo and collapse button */}
        <div
          className={classNames({
            "flex items-center border-b border-mac-light-card dark:border-mac-dark-card transition-none":
              true,
            "p-4 justify-between": !collapsed,
            "py-4 justify-center": collapsed,
          })}
        >
          {!collapsed && <span className="whitespace-nowrap">{title}</span>}
          <button
            className="grid place-content-center hover:bg-mac-sidebar-light-select dark:hover:bg-mac-sidebar-dark-select w-10 h-10 rounded-full opacity-0 md:opacity-100"
            title="collapse"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-grow">
          <ul
            className={classNames({
              "my-2 flex flex-col gap-2 items-stretch": true,
            })}
          >
            {navItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className={classNames({
                    "flex font-mono text-sm text-primary-label dark:text-dark-primary-label": true,
                    "hover:bg-mac-sidebar-light-select dark:hover:bg-mac-sidebar-dark-select": true, //colors
                    "transition-colors duration-300": true, //animation
                    "rounded-md p-2 mx-3 gap-4 ": !collapsed,
                    "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                  })}
                >
                  <a href={item.href} className="flex gap-2 w-full h-full">
                    {item.icon} <span className="mt-auto">{!collapsed && item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div
          className={classNames({
            "grid place-content-stretch p-4 ": true,
          })}
        >
          {/* footer */}
          <SidebarFooter collapsed={collapsed}>
            <label className="relative inline-flex items-center cursor-pointer mt-1">
              <input
                className="sr-only peer"
                type="checkbox"
                checked={isDarkTheme}
                onChange={() => {
                  console.log("Change");
                  toggleThemeHandler();
                  console.log(isDarkTheme);
                }}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            {/* <span className="text-primary-label dark:text-dark-primary-label my-0">Tom Cook</span> */}
          </SidebarFooter>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
