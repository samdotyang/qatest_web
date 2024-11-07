import { useNavigate } from "react-router-dom";

type TestSuite = {
  uuid: string;
  title: string;
  cases: string[];
  is_regression: boolean;
  team: string;
};

type TestSuiteListItemProps = {
  testSuite: TestSuite;
};

const TestSuiteListItem = ({ testSuite }: TestSuiteListItemProps) => {
    const navigate = useNavigate();
  return (
    <div
    className="flex flex-row space-x-2 dark:bg-mac-dark-card rounded-lg p-2 hover:cursor-pointer"
    onClick={() => {navigate(`/testsuite/${testSuite.uuid}`, {state: testSuite})}}
    >
      {/* <div>{testSuite.uuid}</div> */}
      <div className="flex-1">{testSuite.title}</div>
      <div className="flex-1">Cases: {testSuite.cases.length}</div>
    </div>
  );
};

export default TestSuiteListItem;
