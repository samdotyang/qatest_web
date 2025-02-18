import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useGetTeamList } from "@/hooks";

import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";

import AddTestCaseModal from "@/components/modal/AddTestCaseModal";
import {
  TeamSelect,
  DailyCheckbox,
  TestSuiteTitleField,
  RegressionCheckbox,
  CaseList,
} from "@/components/testSuite/titleField";

type TestSuite = {
  title: string;
  cases: string[];
  is_regression: boolean;
  team: string;
  is_daily: boolean;
};

type TestCase = {
  id: number;
  case_id: string;
  feature: string;
  platform: string;
  priority: string;
};

const CreateTestSuitePage = () => {
  const navigate = useNavigate();

  const [filterType, setFilterType] = useState("feature");
  const [filterValue, setFilterValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [cases, setCases] = useState([]);
  const [selectedMainTeam, setSelectedMainTeam] = useState("");
  const [preSelectedSubTeam, setPreSelectedSubTeam] = useState("");
  const [filterCaseId, setFilterCaseId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<TestSuite>({
    title: "",
    cases: [],
    is_regression: false,
    team: "",
    is_daily: false,
  });

  const { teamList, teamListIsFetching } = useGetTeamList();

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

  const handleSave = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_API}/testsuite/save`,
      formData
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

  const handleClose = () => {navigate(-1)};

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
      <div className="space-y-4 p-4 text-primary-label">
        <TestSuiteTitleField
          value={formData.title}
          onInputChange={handleFilterChange}
        />

        <TeamSelect
          teamList={teamList}
          selectedMainTeam={selectedMainTeam}
          preSelectedSubTeam={preSelectedSubTeam}
          teamListIsFetching={teamListIsFetching}
          onTeamChange={handleTeamChange}
        />

        <RegressionCheckbox
          checked={formData.is_regression}
          onChange={(check) => {
            setFormData((prev) => ({ ...prev, is_regression: check }));
          }}
        />

        <DailyCheckbox
          checked={formData.is_daily}
          onChange={(check) => {
            setFormData((prev) => ({ ...prev, is_daily: check }));
          }}
        />

        <CaseList
          cases={formData.cases}
          onManageCases={() => setIsModalOpen(true)}
          getFilterCases={getFilterCases}
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

export default CreateTestSuitePage;
