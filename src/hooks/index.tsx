import {
  useAutomationCaseCount,
  useAutomationFeatureList,
  useAutomationServiceList,
  useGetAutomationTestCase,
} from "./testcase";
import {
  useGetStressDataList,
  useGetStressData,
  useGetStressHistoryList,
} from "./stress";

import { useGetAutomationRunnerList } from "./automation";

import { useTestRunList, useTestRunDetail } from "./testrun";

import { useGetTestSuiteList } from "./testSuite";

import { useGetPassRate } from "./report";

export {
  // Automation
  useAutomationCaseCount,
  useAutomationFeatureList,
  useAutomationServiceList,
  useGetAutomationRunnerList,
  useGetAutomationTestCase,

  // Stress
  useGetStressDataList,
  useGetStressData,
  useGetStressHistoryList,

  //testrun
  useTestRunList,
  useTestRunDetail,

  //testsuite
  useGetTestSuiteList,

  //report
  useGetPassRate,
};
