import { useState } from "react";
import axios from "axios";

import AutomationTestStep from "@/components/testStep/automationTestStep";

const AutomationTestCase = () => {
  const [testcase, setTestCase] = useState<Record<string, any> | null>(null);
  const [caseId, setCaseId] = useState<string>("");

  const getTestCase = async (caseId: string) => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}/testcase/${caseId}`
    );
    setTestCase(res.data["data"]);
  };
  return (
    <div className="flex flex-col space-y-2 h-full max-h-screen w-6/12 m-auto">
      <div className="shrink-0 bg-mac-light-card dark:bg-mac-dark-card rounded-lg p-4 text-dark-primary-label">
        <div className="flex shrink-0">
          <input
            type="text"
            className="p-2 border border-gray-300 bg-transparent rounded-lg w-full mr-4"
            placeholder="Enter test case ID"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
          />
          <button
            className="p-2 bg-blue-500 rounded-lg ml-auto mr-0"
            onClick={() => getTestCase(caseId)}
          >
            Show
          </button>
        </div>
      </div>

      <div className="text-primary-label dark:text-dark-primary-label text-lg font-bold">
        Test Case Details:
      </div>
      {testcase && (
        <div className="my-auto shrink-0 bg-mac-light-card dark:bg-mac-dark-card rounded-lg p-4 text-primary-label dark:text-dark-primary-label">
          <div className="flex flex-col space-y-2 flex-wrap">
            {Object.entries(testcase)
              .slice(0, -1)
              .map(([key, value], index) => (
                <div className="grid grid-cols-2" key={`${key}_${index}`}>
                  <p key={key} className="mr-auto">
                    {key.replace(/([A-Z])/g, " $1").trim()}:
                  </p>
                  <p>{value}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="text-primary-label dark:text-dark-primary-label text-lg font-bold">
        Test Steps:
      </div>
      <div className="flex flex-col space-y-2 overflow-y-hidden hover:overflow-y-auto">
        {testcase &&
          testcase["steps"].map((step: string, index: number) => (
            <AutomationTestStep index={index} step={step} key={index} />
          ))}
      </div>
    </div>
  );
};

export default AutomationTestCase;
