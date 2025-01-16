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
    <div className="flex flex-row p-2">
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
    return <div className="text-primary-lable ">Error fetching test runs: {testRunListError.message}</div>;
  }

  if (isTestRunListLoading) {
    return <div className="text-primary-lable ">Loading...</div>;
  }

  return (
    <>
      <div className="text-primary-label">
        <TestRunListHeader />
        {testRunList.length !== 0 ?
          testRunList.map((testrun: TestRun, index: number) => (
            <TestRunListItem key={index} index={index} testrun={testrun} />
          )) : <span className="p-2">No test runs to show</span>
        }
      </div>
    </>
  );
};

export default TestRunList;
