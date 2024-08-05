import Stress from "./stress";
import Home from "./home";
import Automation from "./automation";
import TestCasePage from "./testcase";

const PageList = [
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
    }
]

export default PageList;