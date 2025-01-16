// import { useNavigate } from "react-router-dom";

// type TestSuite = {
//   uuid: string;
//   title: string;
//   cases: string[];
//   is_regression: boolean;
//   team: string;
// };

// type TestSuiteListItemProps = {
//   testSuite: TestSuite;
// };

// const TestSuiteListItem = ({ testSuite }: TestSuiteListItemProps) => {
//     const navigate = useNavigate();
//   return (
//     <div
//     className="flex flex-row space-x-2 bg-card rounded-lg p-2 hover:cursor-pointer"
//     onClick={() => {navigate(`/testsuite/${testSuite.uuid}`, {state: testSuite})}}
//     >
//       {/* <div>{testSuite.uuid}</div> */}
//       <div className="flex-1">{testSuite.title}</div>
//       <div className="flex-1">Cases: {testSuite.cases.length}</div>
//     </div>
//   );
// };

// export default TestSuiteListItem;


import { useState } from "react";
import TestSuiteModal from "./testSuiteModal";
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

const TestSuiteListItem = ({ testSuite, onUpdate }: TestSuiteListItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="flex flex-row items-center bg-card rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hover:cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
      >
        <div className="flex-1">{testSuite.title}</div>
        <div className="flex-1">Cases: {testSuite.cases.length}</div>
        <div className="flex space-x-2">
          <ChevronRight />
        </div>
      </div>

      <TestSuiteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          onUpdate?.();
          setIsModalOpen(false);
        }}
        testSuite={testSuite}
      />
    </>
  );
};

export default TestSuiteListItem;