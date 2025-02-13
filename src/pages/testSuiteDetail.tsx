import { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { useGetTeamList, useGetTestSuite } from "@/hooks";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AddTestCaseModal from "@/components/modal/AddTestCaseModal";
import { Search } from "@/components/searchField";
import { usePageAlertContext } from "@/contexts/pageAlertContext";

type TestSuite = {
  uuid?: string;
  title: string;
  cases: string[];
  is_regression: boolean;
  team: string;
  is_daily: boolean;
};

const TestSuiteDetailPage = () => {
  const { testSuiteId } = useParams();
  const pageAlertContext = usePageAlertContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCaseId, setFilterCaseId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedMainTeam, setSelectedMainTeam] = useState("");
  const [preSelectedSubTeam, setPreSelectedSubTeam] = useState("");
  const [formData, setFormData] = useState<TestSuite>({
    title: "",
    cases: [],
    is_regression: false,
    team: "",
    is_daily: false
  });

  const { teamList, teamListIsFetching } = useGetTeamList();
  const { testSuite, isTestSuiteFetching, testSuiteError, refetch } =
    useGetTestSuite(testSuiteId!);

  useEffect(() => {
    if (!isTestSuiteFetching && testSuite) {
      console.info(testSuite)
      setFormData(testSuite);
      extractTeam(testSuite.team)
    }
  }, [testSuite, isTestSuiteFetching]);

  const extractTeam = (team: string) => {
    console.info(team)
    if (teamList) {
      Object.keys(teamList.data).map(mainTeam => {
        console.log(mainTeam)
        console.log(teamList.data[mainTeam])
        if (team === mainTeam.toLowerCase()) {
          setSelectedMainTeam(`mainTeam_${mainTeam}`)
        }
        else if (teamList.data[mainTeam].includes(team)) {
          console.info(mainTeam, team)
          setSelectedMainTeam(`mainTeam_${mainTeam}`)
          setPreSelectedSubTeam(`subTeam_${team}`)
        }
      })
    }
  }


  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    switch (e.target.name) {
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
      case "is_daily":
        setFormData((prev) => ({
          ...prev,
          is_daily: (e.target as HTMLInputElement).checked,
        }));
        break;
    }
  };

  const handleTeamChange = (value: string) => {
    if (value.startsWith("mainTeam")) {
      setSelectedMainTeam(value);
      const team = value.replace("mainTeam_", "");
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
    setIsSaving(true);
    try {
      const endpoint = `${import.meta.env.VITE_APP_BACKEND_API}/testsuite/${
            testSuite.uuid
          }/update`;

      const response = await axios.put(endpoint, formData);

      if (response.status === 200) {
        pageAlertContext.setAlert('Update success', 'success');
        setTimeout(() => pageAlertContext.closeAlert(), 5000);
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
        is_daily: false
      });
    }
  };

  const getFilterCases = (cases: string[]) => {
    if (cases.length === 0) {
      return [];
    }
    return cases.filter((c) =>
      c.toLowerCase().includes(filterCaseId.toLowerCase())
    );
  };

  return (
    <div>
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
          <label className="text-sm font-medium">TEAM</label>
          <div className="grid grid-cols-2 gap-2">
            <Select onValueChange={handleTeamChange} value={selectedMainTeam}>
              <SelectTrigger>
                <SelectValue placeholder="Select Main Team" />
              </SelectTrigger>
              <SelectContent>
                {!teamListIsFetching && 
                teamList.data &&
                  Object.keys(teamList.data).map((teamName, index) => (
                    <SelectItem key={index} value={`mainTeam_${teamName}`}>
                      {teamName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Select onValueChange={handleTeamChange} value={preSelectedSubTeam}>
              <SelectTrigger>
                <SelectValue placeholder="Select Sub Team" />
              </SelectTrigger>
              <SelectContent>
                {!teamListIsFetching &&
                teamList.data[selectedMainTeam.replace("mainTeam_", "")] &&
                teamList.data[selectedMainTeam.replace("mainTeam_", "")][0] !== null ? (
                  teamList.data[selectedMainTeam.replace("mainTeam_", "")].map((teamName: string) => (
                    <SelectItem key={teamName} value={`subTeam_${teamName}`}>
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

        <div className="space-x-2">
          <label className="text-sm font-medium">DAILY</label>
          <input
            className="p-2"
            type="checkbox"
            name="is_daily"
            checked={formData.is_daily}
            onChange={handleFilterChange}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-medium">Total {formData.cases.length} CASES</div>
            <Button
              variant={"default"}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Manage Cases
            </Button>
          </div>

          <div className="border rounded-md min-h-[200px] max-h-[400px] overflow-y-auto p-2">
            <Search
              placeholder="Search by Case ID"
              type="search"
              onChange={(e) => {
                setFilterCaseId(e.target.value);
              }}
              value={filterCaseId}
              className="mb-2"
            />
            {/* Show existing cases first */}
            {formData.cases.length > 0 ? (
              <div className="mb-4">
                {getFilterCases(formData.cases).map((testCase: string) => (
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
            ) : (<div className="mb-4">No Test Cases</div>)}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
      {/* replace it with test case picker modal */}
      <AddTestCaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(selectedCases: string[]) => {
          setFormData(prev => ({...prev, cases: selectedCases}))
        }}
        testSuiteId={testSuiteId!}
        existingCases={formData.cases}
      />
    </div>
  );
};

export default TestSuiteDetailPage;
