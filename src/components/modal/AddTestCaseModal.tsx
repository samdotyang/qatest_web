import { useState, useEffect } from "react";

import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

type AddTestCaseModal = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (selectedCases: string[]) => void;
  existingCases: string[];
};

type TestCase = {
  id: number;
  case_id: string;
  feature: string;
  platform: string;
  priority: string;
};

const AddTestCaseModal = ({ isOpen, onClose, onSuccess, existingCases }: AddTestCaseModal) => {
  const [filterType, setFilterType] = useState("feature");
  const [filterValue, setFilterValue] = useState("");
  const [filterCaseId, setFilterCaseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [cases, setCases] = useState<TestCase[]>([]);
  const [selectedCases, setSelectedCases] = useState<string[]>(existingCases);

  useEffect(() => {
    setSelectedCases(existingCases);
  }, [existingCases]);

  // Reset form when modal closes
  const handleClose = () => {
    setSelectedCases(existingCases);
    onClose();
  };

  const fetchFilteredCases = async () => {
    if (!filterValue.trim()) return;
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

  const handleCaseSelection = (caseId: string) => {
    setSelectedCases(prev => {
      if (prev.includes(caseId)) {
        return prev.filter(id => id !== caseId);
      }
      return [...prev, caseId];
    });
  };

  const handleSelectFilter = (value: string) => {
    setFilterType(value);
  };

  const getFilterCases = (cases: TestCase[]) => {
    if (cases.length === 0) {
      return [];
    }
    return cases.filter((c) =>
      c.case_id.toLowerCase().includes(filterCaseId.toLowerCase())
    );
  };

  const handleSave = async () => {
    try{
      onSuccess?.(selectedCases);
      handleClose();
    } catch (error) {
      console.error('Failed to save cases:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const _handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await fetchFilteredCases();
    }
  };

  const handleChecked = (caseId: string) => {
    console.log(caseId)
    if (selectedCases.includes(caseId)) {
      return true
    }
    return false
  }

  const getChangedCasesCount = () => {
    const added = selectedCases.filter(caseId => !existingCases.includes(caseId));
    const removed = existingCases.filter(caseId => !selectedCases.includes(caseId));
    return added.length + removed.length;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Cases</DialogTitle>
        </DialogHeader>
        {/* Add test case form here */}
        <div className="space-y-2 text-primary-label">
          <label className="text-sm font-medium p-2">FILTER</label>
          <div className="flex gap-2">
            <Select onValueChange={handleSelectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select Filter" />
              </SelectTrigger>
              <SelectContent>
                {["Service", "Feature"].map((item) => (
                  <SelectItem key={item} value={item.toLowerCase()}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              className="w-full rounded-lg p-2 bg-card"
              placeholder={`${filterType} name`}
              name="filterValue"
              onChange={(e) => {
                setFilterValue(e.target.value);
              }}
              onKeyDown={_handleKeyDown}
              value={filterValue}
            />
            <Button
              onClick={fetchFilteredCases}
              disabled={!filterValue.trim() || isLoading}
            >
              Apply
            </Button>
          </div>
        </div>

        {getFilterCases(cases).length > 0 &&
        <div className="space-x-2 text-primary-label">
          <Checkbox id="select_all" onCheckedChange={(check: CheckedState) => {
            if (check === 'indeterminate') return;
            const caseIds = getFilterCases(cases).map((tc) => tc.case_id);

            setSelectedCases((prev) => check? Array.from(new Set([...caseIds, ...selectedCases])) : prev.filter(id => !caseIds.includes(id)));
            // if (check as boolean) {
            //   const newList = [...caseIds, ...selectedCases]
            //     setSelectedCases(Array.from(new Set(newList)))
            // } 
          }} />
          <label htmlFor="select_all">Select All</label>
        </div>
        }

        <div className="border rounded-md min-h-[200px] max-h-[400px] overflow-y-auto p-2 text-primary-label">
          <Search
            placeholder="Search by Case ID"
            type="search"
            onChange={(e) => {
              setFilterCaseId(e.target.value);
            }}
            value={filterCaseId}
            className="mb-2"
          />
          {isLoading ? (
            <LoadingSpinner />
          ) : getFilterCases(cases).length > 0 ? (
            <div className="space-y-1">
            {getFilterCases(cases)!.map((testCase: TestCase) => (
              <div
                key={testCase.id}
                className="flex items-center space-x-2 p-1"
              >
                <input
                  type="checkbox"
                  id={testCase.case_id}
                  className="h-4 w-4"
                  checked={handleChecked(testCase.case_id)}
                  onChange={() => {handleCaseSelection(testCase.case_id)}}
                />
                <label htmlFor={testCase.case_id}>{testCase.case_id}</label>
              </div>
            ))}
            </div>
          ) : (
            <span className="m-auto">No cases found</span>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleClose} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? <LoadingSpinner className="mr-2" /> : null}
            {isSaving ? 'Saving...' : `Update Cases (${getChangedCasesCount()})`}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTestCaseModal;
