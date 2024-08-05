import { useState } from "react";
import { Tabs, Tab, TabPanel } from "@components/tabs";

import { AutomationTestCase, JiraTestCase } from "@components/testCase";

const TestCasePage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabTitles = ["Automation", "Jira"];

  return (
    <>
      <Tabs>
        {tabTitles.map((item, index) => (
          <Tab
            key={item}
            title={item}
            index={tabIndex}
            onClick={() => setTabIndex(index)}
            tabIndex={index}
          />
        ))}
      </Tabs>
      <TabPanel key="1" index={0} value={tabIndex}>
        <AutomationTestCase />
      </TabPanel>
      <TabPanel key="2" index={1} value={tabIndex}>
        <JiraTestCase />
      </TabPanel>
    </>
  );
};

export default TestCasePage;
