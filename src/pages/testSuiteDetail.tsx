import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useGetTeamList, useGetTestSuite } from "@/hooks";
import { Button } from "@/components/ui/button";
import AddTestCaseModal from "@/components/modal/AddTestCaseModal";
import { usePageAlertContext } from "@/contexts/pageAlertContext";
import {
  CaseList,
  DailyCheckbox,
  RegressionCheckbox,
  TeamSelect,
  TestSuiteTitleField,
} from "@/components/testSuite/titleField";

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
    is_daily: false,
  });

  const { teamList, teamListIsFetching } = useGetTeamList();
  const { testSuite, isTestSuiteFetching, testSuiteError, refetch } =
    useGetTestSuite(testSuiteId!);

  useEffect(() => {
    if (!isTestSuiteFetching && testSuite) {
      console.info(testSuite);
      setFormData(testSuite);
      extractTeam(testSuite.team);
    }
  }, [testSuite, isTestSuiteFetching]);

  const extractTeam = (team: string) => {
    console.info(team);
    if (teamList) {
      Object.keys(teamList.data).map((mainTeam) => {
        console.log(mainTeam);
        console.log(teamList.data[mainTeam]);
        if (team === mainTeam.toLowerCase()) {
          setSelectedMainTeam(`mainTeam_${mainTeam}`);
        } else if (teamList.data[mainTeam].includes(team)) {
          console.info(mainTeam, team);
          setSelectedMainTeam(`mainTeam_${mainTeam}`);
          setPreSelectedSubTeam(`subTeam_${team}`);
        }
      });
    }
  };

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
        pageAlertContext.setAlert("Update success", "success");
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
        is_daily: false,
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
        <TestSuiteTitleField
          value={formData.title}
          onInputChange={handleFilterChange}
        />

        {/* Team */}
        <TeamSelect
        teamList={teamList}
          selectedMainTeam={selectedMainTeam}
          preSelectedSubTeam={preSelectedSubTeam}
          teamListIsFetching={teamListIsFetching}
          onTeamChange={handleTeamChange}/>

        <RegressionCheckbox
          checked={formData.is_regression}
          onChange={(check) => {
            setFormData((prev) => ({ ...prev, is_regression: check }));
          }}
        />

        <DailyCheckbox
          checked={formData.is_daily}
          onChange={(check) => {
            setFormData((prev) => ({ ...prev, is_regression: check }));
          }}
        />
        <CaseList
          cases={formData.cases}
          onManageCases={() => setIsModalOpen(true)}
          getFilterCases={(getFilterCases)}
        />

        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <AddTestCaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(selectedCases: string[]) => {
          setFormData((prev) => ({ ...prev, cases: selectedCases }));
        }}
        existingCases={formData.cases}
      />
    </div>
  );
};

export default TestSuiteDetailPage;
