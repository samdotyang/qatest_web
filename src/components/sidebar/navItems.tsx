import React from "react";
import {
  DocumentTextIcon,
  FolderIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { IoSpeedometerOutline } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";

// define a NavItem prop
export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export const defaultNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Automation",
    href: "/automation",
    icon: <RiRobot2Line className="w-6 h-6" />,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: <FolderIcon className="w-6 h-6" />,
  },
  {
    label: "Stress Test",
    href: "/stress",
    icon: <IoSpeedometerOutline className="w-6 h-6" />,
  },
  {
    label: "Test Plan",
    href: "/testplan",
    icon: <DocumentTextIcon className="w-6 h-6" />,
  },
];
