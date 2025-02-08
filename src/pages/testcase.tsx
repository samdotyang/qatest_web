import { useState } from "react";
import { Tabs, Tab, TabPanel } from "@components/tabs";

import { AutomationTestCase, JiraTestCase } from "@components/testCase";
import axios from "axios";

const TestCasePage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabTitles = ["Automation", "Jira"];

  const [automationTestCase, setAutomationTestCase] = useState<{
    caseId: string;
    results: Record<string, any> | null;
    loading: boolean;
    error: string | null;
  }>({
    caseId: "",
    results: null,
    loading: false,
    error: null,
  });

  const [jiraTestCase, setJiraTestCase] = useState<{
    caseId: string;
    results: any;
    loading: boolean;
    error: string | null;
  }>({
    caseId: "",
    results: null,
    loading: false,
    error: null,
  });

  const getAutomationTestCase = async (caseId: string) => {
    try {
      setAutomationTestCase((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_API}/testcase/automation/${caseId}`
      );
      if (!res.data.data) {
        alert("No cases found")
      }
      setAutomationTestCase((prev) => ({
        ...prev,
        results: res.data.data,
        loading: false,
      }));
    } catch (error) {
      setAutomationTestCase((prev) => ({
        ...prev,
        error: "Failed to fetch automation test case",
        loading: false,
      }));
    }
  };

  const getJiraTestCase = async (caseId: string) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_API}/testcase/jira/${caseId}`
      );
      let data = res.data?.data;
      if (!data) {
        return {
          key: "",
          name: "",
          priority: "",
          platform: "",
          folder: "",
          owner: "",
          status: "",
          precondition: "",
          testScript: [],
        };
      }
      if (data.precondition) {
        data.precondition = data.precondition.replaceAll("<br />", "\n");
      }

      setJiraTestCase((prev) => ({
        ...prev,
        results: data,
        loading: false,
      }));
    } catch (error) {
      setJiraTestCase((prev) => ({
        ...prev,
        error: "Failed to fetch Jira test case",
        loading: false,
      }));
    }
  };

  const handleAutomationTestCaseSearch = async (caseId: string) => {
    getAutomationTestCase(caseId);
  };

  const handleJiraTestCaseSearch = async (caseId: string) => {
    getJiraTestCase(caseId);
  };

  const onAutomationInputChange = (caseId: string) => {
    setAutomationTestCase((prev) => ({ ...prev, caseId }));
  };

  const onJiraInputChange = (caseId: string) => {
    setJiraTestCase((prev) => ({ ...prev, caseId }));
  };

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
        <AutomationTestCase
          caseId={automationTestCase.caseId}
          results={automationTestCase.results}
          loading={automationTestCase.loading}
          error={automationTestCase.error}
          onSearch={handleAutomationTestCaseSearch}
          onInputChange={onAutomationInputChange}
        />
      </TabPanel>
      <TabPanel key="2" index={1} value={tabIndex}>
        <JiraTestCase
          caseId={jiraTestCase.caseId}
          results={jiraTestCase.results}
          loading={jiraTestCase.loading}
          error={jiraTestCase.error}
          onSearch={handleJiraTestCaseSearch}
          onInputChange={onJiraInputChange}
        />
      </TabPanel>
    </>
  );
};

export default TestCasePage;
