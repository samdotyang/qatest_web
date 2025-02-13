
import { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { useGetTeamList } from "@/hooks";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

type TestCase = {
  id: number;
  case_id: string;
  feature: string;
  platform: string;
  priority: string;
};

type TestSuite = {
  uuid?: string;
  title: string;
  cases: string[];
  is_regression: boolean;
  team: string;
};

type TestSuitePageProps = {
  onSuccess?: () => void;
  testSuite?: TestSuite;
};

const AddTestSuitePage = ({ onSuccess, testSuite }: TestSuitePageProps) => {
  const [filterType, setFilterType] = useState("feature");
  const [filterValue, setFilterValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cases, setCases] = useState<TestCase[]>([]);
  const [selectedMainTeam, setSelectedMainTeam] = useState("");
  const [formData, setFormData] = useState<TestSuite>({
    title: "",
    cases: [],
    is_regression: false,
    team: "",
  });

  const { teamList, teamListIsFetching } = useGetTeamList();

  useEffect(() => {
    if (testSuite) {
      setFormData(testSuite);
    }
  }, [testSuite]);

  const fetchFilteredCases = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_BACKEND_API
        }/testcase?${filterType}=${encodeURIComponent(filterValue)}`
      );
      const data = await response.json();
      setCases(data.data);
    } catch (error) {
      console.error("Failed to fetch cases:", error);
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
        setFormData((prev) => ({ ...prev, title: e.target.value }));
        break;
      case "team":
        setFormData((prev) => ({ ...prev, team: e.target.value }));
        break;
      case "is_regression":
        setFormData((prev) => ({
          ...prev,
          is_regression: (e.target as HTMLInputElement).checked,
        }));
        break;
      default:
        if (e.target.name.startsWith("checkbox")) {
          const addCase = e.target.nextElementSibling!.innerHTML;
          setFormData((prev) => ({
            ...prev,
            cases: prev.cases.includes(addCase)
              ? prev.cases.filter((c) => c !== addCase)
              : [...prev.cases, addCase],
          }));
        }
    }
  };

  const handleTeamChange = (value: string) => {
    if (value.startsWith("mainTeam")) {
      const team = value.replace("mainTeam_", "");
      setSelectedMainTeam(team);
      // No sub team, set selected main team
      if (teamList.data[team][0] === null) {
        console.log("No sub team");
        setFormData((prev) => ({ ...prev, team: team }));
      }
    } else if (value.startsWith("subTeam")) {
      const team = value.replace("subTeam_", "");
      setFormData((prev) => ({ ...prev, team: team }));
    }
  };

  const handleSave = async () => {
    try {
      const endpoint = testSuite
        ? `${import.meta.env.VITE_APP_BACKEND_API}/testsuite/${
            testSuite.uuid
          }/update`
        : `${import.meta.env.VITE_APP_BACKEND_API}/testsuite/save`;

      const response = await axios.post(endpoint, formData);

      if (response.status === 200) {
        alert(response.data);
        onSuccess?.();
      } else {
        alert(`Failed to ${testSuite ? "update" : "create"} test suite`);
      }
    } catch (error) {
      alert(
        `Error ${testSuite ? "updating" : "creating"} test suite, ${error}`
      );
    }
  };

  // Reset form when modal closes
  const handleClose = () => {
    if (!testSuite) {
      setFormData({
        title: "",
        cases: [],
        is_regression: false,
        team: "",
      });
    }
  };

  return (
    <div>
      <h1>{testSuite ? "Edit" : "Create"} Test Suite</h1>

      <div className="space-y-4 text-primary-label ">
        <div className="space-y-2">
          <label className="text-sm font-medium">TITLE</label>
          <input
            className="w-full rounded-lg p-2 bg-card"
            placeholder="title"
            name="title"
            value={formData.title}
            onChange={handleFilterChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">FILTER</label>
          <div className="flex gap-2">
            <select
              className="rounded-lg p-2 bg-card appearance-none"
              name="filterType"
              onChange={handleFilterChange}
            >
              <option value="feature">Feature</option>
              <option value="caseid">Case Id</option>
            </select>
            <input
              className="w-full rounded-lg p-2 bg-card"
              placeholder="filter"
              name="filterValue"
              onChange={handleFilterChange}
              value={filterValue}
            />
            <button
              onClick={fetchFilteredCases}
              className="bg-blue rounded-lg shrink-0 p-2 text-white"
            >
              Apply Filter
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">TEAM</label>
          <div className="grid grid-cols-2 gap-2">
            <Select onValueChange={handleTeamChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Main Team" />
              </SelectTrigger>
              <SelectContent>
                {!teamListIsFetching &&
                  Object.keys(teamList.data).map((teamName) => (
                    <SelectItem value={`mainTeam_${teamName}`}>
                      {teamName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Select onValueChange={handleTeamChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Sub Team" />
              </SelectTrigger>
              <SelectContent>
                {!teamListIsFetching &&
                teamList.data[selectedMainTeam] &&
                teamList.data[selectedMainTeam][0] !== null ? (
                  teamList.data[selectedMainTeam].map((teamName: string) => (
                    <SelectItem value={`subTeam_${teamName}`}>
                      {teamName}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no_sub_team">No Sub Team</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-x-2">
          <label className="text-sm font-medium">REGRESSION</label>
          <input
            className="p-2"
            type="checkbox"
            name="is_regression"
            checked={formData.is_regression}
            onChange={handleFilterChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">CASES</label>
          <div className="border rounded-md min-h-[200px] max-h-[400px] overflow-y-auto p-2">
            {/* Show existing cases first */}
            {formData.cases.length > 0 && (
              <div className="mb-4">
                <div className="font-medium mb-2">Selected Cases:</div>
                {formData.cases.map((testCase: string) => (
                  <div
                    key={testCase}
                    className="flex items-center space-x-2 p-1"
                  >
                    <input
                      type="checkbox"
                      id={testCase}
                      className="h-4 w-4"
                      name={`checkbox_${testCase}`}
                      checked={true}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor={testCase}>{testCase}</label>
                  </div>
                ))}
              </div>
            )}

            {/* Show filtered cases */}
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Skeleton key={n} className="h-6 w-full" />
                ))}
              </div>
            ) : (
              cases
                .filter((c) => !formData.cases.includes(c.case_id))
                .map((testCase: TestCase) => (
                  <div
                    key={testCase.id}
                    className="flex items-center space-x-2 p-1"
                  >
                    <input
                      type="checkbox"
                      id={testCase.case_id}
                      className="h-4 w-4"
                      name={`checkbox_${testCase.id}`}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor={testCase.case_id}>{testCase.case_id}</label>
                  </div>
                ))
            )}
            {!isLoading && cases.length === 0 && !formData.cases.length && (
              <div className="text-center text-gray-500 py-4">
                No additional test cases found. Try adjusting your filter.
              </div>
            )}
            {!isLoading &&
              cases.length === 0 &&
              formData.cases.length > 0 &&
              filterValue && (
                <div className="text-center text-gray-500 py-4">
                  No additional test cases found for current filter.
                </div>
              )}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            className="rounded-lg px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="rounded-lg px-4 py-2 bg-blue text-white"
            onClick={handleSave}
          >
            {testSuite ? "Save Changes" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTestSuitePage;
