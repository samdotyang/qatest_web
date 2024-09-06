import Stress from "./stress";
import Home from "./home";
import Automation from "./automation";
import TestCasePage from "./testcase";
import TestPlanPage from "./testplan";
import Dashboard from "./dashboard";

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
    }
]

export default PageList;