// import { TestSuiteList } from "@/components/testSuite";

// const TestSuitePage = () => {
//   return (
//     <>
//       <div className="flex flex-col space-y-2">
//         <TestSuiteList />
//       </div>
//     </>
//   );
// };

// export default TestSuitePage;


import { Skeleton } from "@mui/material";
import TestSuiteListItem from "@/components/testSuite/testSuiteListItem";
import { useGetTestSuiteList } from "@/hooks";
import { useState } from "react";
import { TestSuiteModal } from "@/components/testSuite";

type TestSuite = {
  uuid: string;
  title: string;
  cases: string[];
  is_regression: boolean;
  team: string;
};

const TestSuiteList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isTestSuiteListFetching, testSuiteList, testSuiteListError, refetch } =
    useGetTestSuiteList();

  return (
    <>
      <div className="text-primary-label  space-y-2">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg uppercase font-bold">Test Suite</div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
          >
            Create Test Suite
          </button>
        </div>
        
        {testSuiteListError && (
          <div>
            Error fetching test suite list:{" "}
            {(testSuiteListError as Error).message}
          </div>
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
              <TestSuiteListItem key={index} testSuite={testSuite} />
            ))
          ) : (
            <div className="bg-card rounded-lg p-2">
              <span className="font-bold text-lg">Currently no test suite</span>
            </div>
          ))}
      </div>

      <TestSuiteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          refetch();
        }}
      />
    </>
  );
};

export default TestSuiteList;