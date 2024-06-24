import Stress from "./stress";
import Home from "./home";
import Automation from "./automation";

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
    }
]

export default PageList;