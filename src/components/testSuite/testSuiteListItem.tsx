import { ChevronRight } from "lucide-react";

type TestSuite = {
  uuid: string;
  title: string;
  cases: string[];
  is_regression: boolean;
  team: string;
};

type TestSuiteListItemProps = {
  testSuite: TestSuite;
  onUpdate?: () => void;
};

const TestSuiteListItem = ({ testSuite }: TestSuiteListItemProps) => {

  return (
    <>
      <div
        className="flex flex-row items-center bg-card rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hover:cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex-1">{testSuite.title}</div>
        <div className="flex-1">Cases: {testSuite.cases.length}</div>
        <div className="flex space-x-2">
          <ChevronRight />
        </div>
      </div>
    </>
  );
};

export default TestSuiteListItem;