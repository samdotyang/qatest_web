// import { useGetTestSuiteList } from "@/hooks";
// import { useState } from "react";
import { Link } from "react-router-dom";

import { TestSuiteList } from "@/components/testSuite";

const TestSuitePage = () => {
  return (
    <>
      <div className="text-primary-label space-y-2">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg uppercase font-bold">Test Suite</div>
          <Link to="/testsuite/create">
          <div className="bg-blue hover:bg-blue-700 text-white rounded-lg px-4 py-2">
          Create Test Suite
          </div>
          </Link>
        </div>
        <TestSuiteList />
      </div>
    </>
  );
};

export default TestSuitePage;
