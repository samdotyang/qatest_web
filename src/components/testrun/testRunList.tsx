import TestRunListItem from "./testRunListItem";
import { useTestRunList } from "@/hooks";

type TestRun = {
  build_version: number;
  start_time: string;
  end_time: string;
  pass: number;
  fail: number;
  title: string;
  test_run_uuid: string;
};

const TestRunListHeader = () => {
  const header = [
    "build version",
    "start time",
    "end time",
    "pass",
    "fail",
    "test_run_uuid",
  ];
  return (
    <div className="flex flex-row text-primary-label dark:text-dark-primary-label p-2">
      {header.map((title) => (
        <div className="basis-1/5" key={title}>
          {title.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

const TestRunList = ({ rows }: { rows: number }) => {
  const { isTestRunListLoading, testRunList, testRunListError } =
    useTestRunList(rows);

  if (testRunListError) {
    return <div className="text-primary-lable dark:text-dark-primary-label">Error fetching test runs: {testRunListError.message}</div>;
  }

  if (isTestRunListLoading) {
    return <div className="text-primary-lable dark:text-dark-primary-label">Loading...</div>;
  }

  return (
    <>
      <div>
        <TestRunListHeader />
        {testRunList.length !== 0 &&
          testRunList.map((testrun: TestRun, index: number) => (
            <TestRunListItem key={index} index={index} testrun={testrun} />
          ))}
      </div>
    </>
  );
};

export default TestRunList;
