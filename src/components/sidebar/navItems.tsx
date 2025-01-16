import React from "react";
import {
  DocumentTextIcon,
  FolderIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { Bot, Gauge, FileChartColumnIncreasing } from "lucide-react";

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
    label: "Test Plan",
    href: "/testplan",
    icon: <DocumentTextIcon className="w-6 h-6" />,
  },
  {
    label: "Test Case",
    href: "/testcase",
    icon: <DocumentTextIcon className="w-6 h-6" />,
  },
  {
    label: "Test Suite",
    href: "/testsuite",
    icon: <DocumentTextIcon className="w-6 h-6" />,
  },
  {
    label: "Report",
    href: "/report",
    icon: <FileChartColumnIncreasing className="w-6 h-6" />,
  },
  {
    label: "Automation",
    href: "/automation",
    icon: <Bot className="w-6 h-6" />,
  },
  {
    label: "Stress Test",
    href: "/stress",
    icon: <Gauge className="w-6 h-6" />,
  },
];
