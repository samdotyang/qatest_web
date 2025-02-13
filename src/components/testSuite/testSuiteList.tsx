import { Skeleton } from "@mui/material";
import TestSuiteListItem from "./testSuiteListItem";
import { Link } from "react-router-dom";

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
      <div className="text-primary-label space-y-2">
        <div className="flex justify-between items-center mb-4">
        <div className="text-lg uppercase font-bold">Test Suite</div>
        <button onClick={() => {}} className="bg-blue hover:bg-blue-700 text-white rounded-lg px-4 py-2">Create Test Suite</button>
        </div>
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
              <div key={index} className="bg-card rounded-lg p-2">
                <Skeleton variant="rectangular" height={20} />
              </div>
            ))}
          </>
        )}
        {!isTestSuiteListFetching && testSuiteList?.data &&
          (testSuiteList?.data.length > 0 ? (
            testSuiteList.data.map((testSuite: TestSuite, index: number) => (
              <div key={`list_${testSuite.uuid}`}>
              <Link to={`/testsuite/${testSuite.uuid}`} state={{ a: "testSuite" }}>
                <TestSuiteListItem key={index} testSuite={testSuite} />
               </Link>
               </div>
            ))
          ) : (
            <div className="bg-card rounded-lg p-2">
              <span className="font-bold text-lg">Currently no test suite</span>
            </div>
          ))}
      </div>
    </>
  );
};

export default TestSuiteList;
