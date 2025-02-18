import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Checkbox } from "../ui/checkbox";

import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search"; // Your search component
import { useState } from "react";


export const TestSuiteTitleField = ({
  value,
  onInputChange,
}: {
  value: string;
  onInputChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">TITLE</label>
      <input
        className="w-full rounded-lg p-2 bg-card"
        placeholder="title"
        name="title"
        value={value}
        onChange={onInputChange}
      />
    </div>
  );
};

interface TeamSelectProps {
  teamList: {
    data: { [key: string]: string[] };
  };
  selectedMainTeam: string;
  preSelectedSubTeam: string;
  teamListIsFetching: boolean;
  onTeamChange: (value: string) => void;
}

export const TeamSelect = ({
  teamList,
  selectedMainTeam,
  preSelectedSubTeam,
  teamListIsFetching,
  onTeamChange,
}: TeamSelectProps) => {
  // Helper to get clean team name without prefix
  const getCleanTeamName = (team: string) => team.replace("mainTeam_", "");

  // Get sub teams for selected main team
  const getSubTeams = () => {
    const mainTeam = getCleanTeamName(selectedMainTeam);
    return teamList.data[mainTeam] || [];
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">TEAM</label>
      <div className="grid grid-cols-2 gap-2">
        {/* Main Team Select */}
        <Select onValueChange={onTeamChange} value={selectedMainTeam}>
          <SelectTrigger>
            <SelectValue placeholder="Select Main Team" />
          </SelectTrigger>
          <SelectContent>
            {!teamListIsFetching &&
              teamList.data &&
              Object.keys(teamList.data).map((teamName) => (
                <SelectItem key={teamName} value={`mainTeam_${teamName}`}>
                  {teamName}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {/* Sub Team Select */}
        <Select onValueChange={onTeamChange} value={preSelectedSubTeam}>
          <SelectTrigger>
            <SelectValue placeholder="Select Sub Team" />
          </SelectTrigger>
          <SelectContent>
            {!teamListIsFetching && getSubTeams()[0] !== null ? (
              getSubTeams().map((teamName: string) => (
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
  );
};

import { CheckedState } from "@radix-ui/react-checkbox";

export const RegressionCheckbox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => {
  return (
    <div className="space-x-2">
      <Checkbox
        id="is_regression"
        name="is_regression"
        checked={checked}
        // defaultChecked={checked}
        onCheckedChange={(check: CheckedState) => onChange(check as boolean)}
      />
      <label htmlFor="is_regression"  className="text-sm font-medium uppercase">Regression</label>
    </div>
  );

};

export const DailyCheckbox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => {
  return (
    <div className="space-x-2">
      <Checkbox
        id="is_daily"
        name="is_daily"
        checked={checked}
        onCheckedChange={(check: CheckedState) => onChange(check as boolean)}
      />
      <label htmlFor="is_daily" className="text-sm font-medium uppercase">Daily</label>
    </div>
  );
};

interface CaseListProps {
  cases: string[];
  onManageCases: () => void;
  getFilterCases: (cases: string[]) => string[];
}

export const CaseList = ({
  cases,
  onManageCases,
  getFilterCases,
}: CaseListProps) => {
  const [filterCaseId, setFilterCaseId] = useState("");

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium">
          Total {cases.length} CASES
        </div>
        <Button 
          variant="default" 
          onClick={onManageCases}
        >
          Manage Cases
        </Button>
      </div>

      <div className="border rounded-md min-h-[200px] max-h-[400px] overflow-y-auto p-2">
        <Search
          placeholder="Search by Case ID"
          type="search"
          onChange={(e) => setFilterCaseId(e.target.value)}
          value={filterCaseId}
          className="mb-2"
        />
        
        {cases.length > 0 ? (
          <div className="mb-4">
            {getFilterCases(cases).map((testCase: string) => (
              <div key={testCase} className="flex items-center space-x-2 p-1">
                <input
                  type="checkbox"
                  id={testCase}
                  className="h-4 w-4"
                  name={`checkbox_${testCase}`}
                  checked={true}
                  disabled
                />
                <label htmlFor={testCase}>{testCase}</label>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-4">No Test Cases</div>
        )}
      </div>
    </div>
  );
};