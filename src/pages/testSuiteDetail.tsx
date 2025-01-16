import { useState } from "react";
import { useLocation } from "react-router-dom";

type TestSuite = {
  title: string;
  cases: string[];
  is_regression: boolean;
  team: string;
};

const TestSuiteDetailPage = () => {
  const { state } = useLocation();
  const [testSuite, setTestSuite] = useState<TestSuite>(state);
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {};

  return (
    <>
      <div className="space-y-4 p-4 text-primary-label ">
        <div className="space-y-2">
          <label className="text-sm font-medium">TITLE</label>
          <input
            className="w-full rounded-lg p-2 bg-card bg-card"
            placeholder="title"
            name="title"
            value={testSuite.title}
            onChange={(e) => {
              handleFilterChange(e);
            }}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">FILTER</label>
          <div className="flex gap-2">
            <select
              className="rounded-lg p-2 bg-card bg-card appearance-none"
              name="filterType"
              onChange={(e) => handleFilterChange(e)}
            >
              {/* <option value="service">Service</option> */}
              <option value="feature">Feature</option>
              <option value="caseid">Case Id</option>
            </select>
            <input
              className="w-full rounded-lg p-2 bg-card bg-card"
              placeholder="filter"
              name="filterValue"
              onChange={(e) => handleFilterChange(e)}
              // value={filterValue}
            />
            <button
              // onClick={fetchFilteredCases}
              className="bg-blue-600 hover:bg-blue-700 rounded-lg shrink-0 p-2"
            >
              Apply Filter
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">TEAM</label>
          <input
            className="w-full rounded-lg p-2 bg-card bg-card"
            placeholder="TEAM"
            name="team"
            value={testSuite.team}
            onChange={(e) => handleFilterChange(e)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">REGRESSION</label>
          <input
            className="p-2"
            type="checkbox"
            defaultChecked={testSuite.is_regression}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">CASES</label>
          <div className="border rounded-md min-h-[200px] max-h-[400px] overflow-y-auto p-2">
            {testSuite.cases.map((testCase: string) => (
              <div key={testCase} className="flex items-center space-x-2 p-1">
                <label htmlFor={testCase}>{testCase}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="m-auto">
          <button
            className="rounded-lg px-4 py-2 bg-blue-600 text-primary-label "
            //   onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default TestSuiteDetailPage;
