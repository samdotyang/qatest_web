import { useState, useEffect } from "react";
import classNames from "classnames";
import { defaultNavItems, NavItem } from "./navItems";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import SidebarFooter from "./sidebarFooter";
import { ThemeSwitcher } from "../themeSwitcher";
import { NavLink } from "react-router-dom";

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

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !collapsed) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size
    
    return () => window.removeEventListener('resize', handleResize);
  }, [setCollapsed, collapsed]);

  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  return (
    <div
      className={classNames({
        "shrink-0 bg-sidebar text-primary-label  h-full": true,
        "fixed md:static md:translate-x-0 z-20": true,
        "transition-all duration-300 ease-in-out": true,
        "w-[310px]": !collapsed,
        "w-16": collapsed,
        "-translate-x-full": isMobile && collapsed,
        "translate-x-0": !isMobile || !collapsed,
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
            className="grid place-content-center hover:bg-sidebar-select w-10 h-10 rounded-full opacity-0 md:opacity-100"
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
                    "flex font-semibold text-sm text-primary-label ": true,
                    "hover:bg-sidebar-select": true, //colors
                    "transition-colors duration-300": true, //animation
                    "rounded-md p-2 mx-3 gap-4": !collapsed,
                    "rounded-full p-2 mx-3": collapsed,
                  })}
                >
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      classNames({
                        "flex gap-2 w-full h-full": true,
                        "bg-sidebar-select": isActive,
                        "rounded-md p-2 mx-3 gap-4": !collapsed,
                        "rounded-full": collapsed,
                      })
                    }
                  >
                    {item.icon}
                    {!collapsed && (
                      <span className="mt-auto">{item.label}</span>
                    )}
                  </NavLink>
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
            <ThemeSwitcher />
            {/* <label className="relative inline-flex items-center cursor-pointer mt-1">
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
            </label> */}
            {/* <span className="text-primary-label  my-0">Tom Cook</span> */}
          </SidebarFooter>
        </div>
      </div>
      {/* Overlay for mobile */}
      {!collapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setCollapsed(true)}
        />
      )}
    </div>
  );
};
export default Sidebar;
