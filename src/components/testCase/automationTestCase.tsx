import TestCaseSearchBar from "./searchBar";
import AutomationTestStep from "@/components/testStep/automationTestStep";

type AutomationTestCaseProps = {
  caseId: string;
  onInputChange: (value: string) => void;
  results: Record<string, any> | null;
  loading: boolean;
  error: string | null;
  onSearch: (caseIs: string) => Promise<void>;
};

const AutomationTestCase = ({
  caseId,
  onInputChange,
  results,
  loading,
  error,
  onSearch,
}: AutomationTestCaseProps) => {
  return (
    <div className="flex flex-col space-y-2 h-full max-h-screen w-6/12 m-auto">
      <TestCaseSearchBar
        caseId={caseId}
        onInputChange={onInputChange}
        onButtonClick={onSearch}
      />

      <div className="text-primary-label  text-lg font-bold">
        Test Case Details:
      </div>
      {results && (
        <div className="my-auto shrink-0 bg-card rounded-lg p-4 text-primary-label ">
          <div className="flex flex-col space-y-2 flex-wrap">
            {Object.entries(results)
              .filter(([key]) => key !== "test_steps")
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

      <div className="text-primary-label  text-lg font-bold">Test Steps:</div>
      {loading && <div className="text-primary-label">Loading...</div>}
      {error && <div className="text-red">{error}</div>}
      <div className="flex flex-col space-y-2 overflow-y-hidden hover:overflow-y-auto text-primary-label ">
        {results &&
          results.test_steps.map((step: string, index: number) => (
            <AutomationTestStep index={index} step={step} key={index} />
          ))}
      </div>
    </div>
  );
};

export default AutomationTestCase;
