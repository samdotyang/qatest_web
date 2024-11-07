import { useState } from "react";
import axios from "axios";

import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

type TestRun = {
  name: string;
  cases: string[];
  is_regression: boolean;
  team: string;
};

type TestCase = {
  id: number;
  case_id: string;
  feature: string;
  platform: string;
  priority: string;
};

const CreateTestRunPage = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("feature");
  const [filterValue, setFilterValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cases, setCases] = useState([]);
  const [testRun, setTestRun] = useState<TestRun>({
    name: "",
    cases: [],
    is_regression: false,
    team: "",
  });

  const fetchFilteredCases = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_BACKEND_API
        }/testcase?${filterType}=${encodeURIComponent(filterValue)}`
      );
      const data = await response.json();
      setCases(data.data);
    } catch (error) {
      console.error("Failed to fetch cases:", error);
      // You might want to add error state handling here
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    switch (e.target.name) {
      case "filterType":
        setFilterType(e.target.value);
        break;
      case "filterValue":
        setFilterValue(e.target.value);
        break;
      case "title":
        setTestRun((prev) => ({ ...prev, name: e.target.value }));
        break;
      case "team":
        setTestRun((prev) => ({ ...prev, team: e.target.value }));
        break;
      case "is_regression":
        setTestRun((prev) => ({
          ...prev,
          is_regression: (e.target as HTMLInputElement).checked,
        }));
        break;
      default:
        if (e.target.name.startsWith("checkbox")) {
          const addCase = e.target.nextElementSibling!.innerHTML;
          setTestRun((prev) => ({
            ...prev,
            cases: [...prev.cases, addCase],
          }));
        }
    }
  };

  const handleSave = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}/testsuite/save`,
      testRun
    );
    const result = await response.data;
    if (response.status === 200) {
      alert(result);
      // alert("Test run created successfully");
      navigate(-1);
    } else {
      alert("Failed to create test run");
    }
  };

  return (
    <div className="space-y-4 p-4 text-primary-label dark:text-dark-primary-label">
      <div className="space-y-2">
        <label className="text-sm font-medium">TITLE</label>
        <input
          className="w-full rounded-lg p-2 dark:bg-mac-dark-card bg-mac-light-card"
          placeholder="title"
          name="title"
          value={testRun.name}
          onChange={(e) => {
            handleFilterChange(e);
          }}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">FILTER</label>
        <div className="flex gap-2">
          <select
            className="rounded-lg p-2 dark:bg-mac-dark-card bg-mac-light-card"
            name="filterType"
            onChange={(e) => handleFilterChange(e)}
          >
            {/* <option value="service">Service</option> */}
            <option value="feature">Feature</option>
            <option value="caseid">Case Id</option>
          </select>
          <input
            className="w-full rounded-lg p-2 dark:bg-mac-dark-card bg-mac-light-card"
            placeholder="filter"
            name="filterValue"
            onChange={(e) => handleFilterChange(e)}
            value={filterValue}
          />
          <button
            onClick={fetchFilteredCases}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg shrink-0 p-2"
          >
            Apply Filter
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">TEAM</label>
        <input
          className="w-full rounded-lg p-2 dark:bg-mac-dark-card bg-mac-light-card"
          placeholder="TEAM"
          name="team"
          value={testRun.team}
          onChange={(e) => handleFilterChange(e)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">REGRESSION</label>
        <input className="p-2" type="checkbox" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">CASES</label>
        <div className="border rounded-md min-h-[200px] max-h-[400px] overflow-y-auto p-2">
          {isLoading ? (
            // Loading skeleton
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <Skeleton key={n} className="h-6 w-full" />
              ))}
            </div>
          ) : (
            cases.map((testCase: TestCase) => (
              <div
                key={testCase.id}
                className="flex items-center space-x-2 p-1"
              >
                <input
                  type="checkbox"
                  id={testCase.case_id}
                  className="h-4 w-4"
                  name={`checkbox_${testCase.id}`}
                  onChange={(e) => handleFilterChange(e)}
                />
                <label htmlFor={testCase.case_id}>{testCase.case_id}</label>
              </div>
            ))
          )}
          {!isLoading && cases.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No test cases found. Try adjusting your filter.
            </div>
          )}
        </div>
      </div>
      
      <div className="m-auto">
        <button
          className="rounded-lg px-4 py-2 bg-blue-600 text-primary-label dark:text-dark-primary-label"
          onClick={handleSave}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateTestRunPage;
