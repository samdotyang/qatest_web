import Stress from "./stress";
import Home from "./home";
import Automation from "./automation";
import TestCasePage from "./testcase";
import TestPlanPage from "./testplan";
import Dashboard from "./dashboard";
import ReportDashboardPage from "./reportDashboard";
import ReportPage from "./report";
import TestRunPage from "./testrun";

const PageList = [
    {
        name: "Dashboard",
        path: "/",
        component: <Dashboard />
    },
    {
        name: "Home",
        path: "/home",
        component: <Home />
    },
    {   name: "Stress",
        path: "/stress",
        component: <Stress />
    },
    {
        name: "Automation",
        path: "/automation",
        component: <Automation />
    },
    {
        name: "Test Case",
        path: "/testcase",
        component: <TestCasePage />
    },
    {
        name: "Test Plan",
        path: "/testplan",
        component: <TestPlanPage />
    },
    {
        name: "Test Run",
        path: "/testrun",
        component: <TestRunPage />,
      },
      {
        name: "Report",
        path: "/report",
        component: <ReportDashboardPage />,
      },
      {
        name: "Report",
        path: "/report/:testrunid",
        component: <ReportPage />
      }
]

export default PageList;