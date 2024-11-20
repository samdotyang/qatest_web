import { Skeleton } from "@mui/material";
import TestSuiteListItem from "./testSuiteListItem";

import { useGetTestSuiteList } from "@/hooks";

type TestSuite = {
  uuid: string;
  title: string;
  cases: string[];
  is_regression: boolean;
  team: string;
};

const TestSuiteList = () => {
  const { isTestSuiteListFetching, testSuiteList, testSuiteListError } =
    useGetTestSuiteList();

  return (
    <>
      <div className="space-y-2 text-primary-label dark:text-dark-primary-label">
        <div className="text-lg uppercase font-bold">Test Suite</div>
        {testSuiteListError && (
          <>
            <div>
              Error fetching test suite list:{" "}
              {(testSuiteListError as Error).message}
            </div>
          </>
        )}
        {isTestSuiteListFetching && (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="dark:bg-mac-dark-card rounded-lg p-2">
                <Skeleton variant="rectangular" height={20} />
              </div>
            ))}
          </>
        )}
        {!isTestSuiteListFetching && testSuiteList?.data &&
          (testSuiteList?.data.length > 0 ? (
            testSuiteList.data.map((testSuite: TestSuite, index: number) => (
              <TestSuiteListItem key={index} testSuite={testSuite} />
            ))
          ) : (
            <div className="dark:bg-mac-dark-card rounded-lg p-2">
              <span className="font-bold text-lg">Currently no test suite</span>
            </div>
          ))}
      </div>
    </>
  );
};

export default TestSuiteList;
