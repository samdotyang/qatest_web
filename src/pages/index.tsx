import Stress from "./stress";
import Home from "./home";
import AutomationDashboard from "./automation";
import TestCasePage from "./testcase";
import TestPlanPage from "./testplan";
import Dashboard from "./dashboard";
import ReportDashboardPage from "./reportDashboard";
import ReportPage from "./report";
import TestSuitePage from "./testSuite";
import TestRunDetailPage from "./testrunDetail";
import CreateTestSuitePage from "./createTestSuite";
import TestSuiteDetailPage from "./testSuiteDetail";
import LogsPage from "./logs";

const PageList = [
  {
    name: "Dashboard",
    path: "/",
    component: <Dashboard />,
  },
  {
    name: "Home",
    path: "/home",
    component: <Home />,
  },
  { name: "Stress Test", path: "/stress", component: <Stress /> },
  {
    name: "Automation",
    path: "/automation",
    component: <AutomationDashboard />,
  },
  {
    name: "Test Case",
    path: "/testcase",
    component: <TestCasePage />,
  },
  {
    name: "Test Plan",
    path: "/testplan",
    component: <TestPlanPage />,
  },
  {
    name: "Test Suite",
    path: "/testsuite",
    component: <TestSuitePage />,
  },
  {
    name: "Test Run",
    path: "/testrun/:testRunId",
    component: <TestRunDetailPage />,
  },
  {
    name: "Report",
    path: "/report",
    component: <ReportDashboardPage />,
  },
  {
    name: "Report",
    path: "/report/:testrunid",
    component: <ReportPage />,
  },
  {
    name: "Create Test Suite",
    path: "/testsuite/create",
    component: <CreateTestSuitePage />,
  },
  {
    name: "Test Suite Detail",
    path: "/testsuite/:testSuiteId",
    component: <TestSuiteDetailPage />,
  },
  {
    name: "Log",
    path: "logs",
    component: <LogsPage />,
  },
];

export default PageList;
