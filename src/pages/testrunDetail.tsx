import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronRight,
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

import { useTestRunDetail } from "@/hooks";

import { Search } from "@/components/ui/search";
import { QAPieChart } from "@/components/ui/chart";
import { FailCaseModal } from "@/components/modal";
import { calculateTime } from "@/lib/utils";
import StatusFilter from "@/components/statusFilter";

type CaseExecution = {
  description: string;
  exc_time: string;
  name: string;
  status: string;
};

type TestExecution = {
  start_time: string;
  end_time: string;
  pass: number;
  fail: number;
  team: string;
  is_regression: boolean;
  cases: Record<string, CaseExecution[]>;
};

const sort_object = (data: TestExecution, filterString: string) => {
  if (!data.cases) {
    return {
      start_time: data.start_time,
      end_time: data.end_time,
      pass: data.pass,
      fail: data.fail,
      team: data.team,
      cases: {},
      is_regression: data.is_regression,
    };
  }
  const sorted_data: Record<string, CaseExecution[]> = {};

  Object.entries(data.cases).forEach(([key, value]) => {
    const filter_value = value.filter((caseExecution) =>
      caseExecution.name.includes(filterString)
    );
    if (filter_value.length > 0) {
      sorted_data[key] = filter_value;
    }
  });
  return {
    ...data,
    cases: sorted_data,
  };
};

const TestRunDetailPage = () => {
  const { testRunId } = useParams();
  const { testRunDetail, isTestRunDetailLoading } =
    useTestRunDetail(testRunId!);

  // props
  const [filter, setFilter] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [itemClicked, setItemClicked] = useState<CaseExecution>();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [collapsedFeatures, setCollapsedFeatures] = useState(new Set<string>());
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = [
    { label: "All", value: "all" },
    { label: "Pass", value: "Pass" },
    { label: "Fail", value: "Fail" },
  ];


  // Filter tests based on status
  const getFilteredTests = (tests: CaseExecution[]) => {
    if (statusFilter === "all") return tests;
    return tests.filter((test) => test.status === statusFilter);
  };

  const handleItemClicked = (item: CaseExecution) => {
    setShowModal((prev) => !prev);
    setItemClicked(item);
  };

  const toggleFeature = (feature: string) => {
    const newCollapsed = new Set(collapsedFeatures);
    if (newCollapsed.has(feature)) {
      newCollapsed.delete(feature);
    } else {
      newCollapsed.add(feature);
    }
    setCollapsedFeatures(newCollapsed);
  };

  const calculatePassFailRate = (data: Record<string, CaseExecution[]>) => {
    if (!data) {
      return [
        { name: "Pass", value: 0, color: "green" },
        { name: "Fail", value: 0, color: "red" },
      ];
    }
    const chartData = Object.keys(data).reduce(
      (acc, feature) => {
        const passCount = data[feature].filter(
          (result) => result.status === "Pass"
        ).length;
        const failCount = data[feature].filter(
          (result) => result.status === "Fail"
        ).length;
        acc.pass += passCount;
        acc.fail += failCount;
        return acc;
      },
      { pass: 0, fail: 0 }
    );
    return [
      { name: "Pass", value: chartData.pass, color: "green" },
      { name: "Fail", value: chartData.fail, color: "red" },
    ];
  };

  const getFeatureStats = (tests: CaseExecution[]) => {
    return tests.reduce(
      (acc, test) => {
        if (test.status === "Pass") {
          acc.pass += 1;
        } else if (test.status.toLowerCase() === "fail") {
          acc.fail += 1;
        }
        return acc;
      },
      { pass: 0, fail: 0 }
    );
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const sortedData = !isTestRunDetailLoading
    ? sort_object(testRunDetail, filter)
    : null;

  return (
    <>
      {!isTestRunDetailLoading && sortedData && (
        <div className="flex flex-col h-screen space-y-2">
          <div className="m-auto w-1/3 h-1/3 bg-card rounded-lg">
            <QAPieChart data={calculatePassFailRate(testRunDetail.cases)} />
          </div>

          {/* Search bar */}
          <div className="mb-4">
            <Search
              type="search"
              placeholder="Search"
              onChange={handleSearch}
            />
            
          </div>
          <StatusFilter
              labels={statuses}
              selectedStatus={statusFilter}
              onChange={setStatusFilter}
            />
          {/* Master-detail view */}
          <div className="flex flex-1 border rounded-lg overflow-hidden">
            {/* Sidebar */}
            <div className="w-80 border-r bg-sidebar overflow-y-auto text-primary-label">
              {Object.entries(sortedData.cases).map(([feature, tests]) => {
                const stats = getFeatureStats(tests);
                const isCollapsed = !collapsedFeatures.has(feature);
                const filteredTests = getFilteredTests(tests);

                // Only show features that have tests matching the current filter
                if (statusFilter !== "all" && filteredTests.length === 0) {
                  return null;
                }

                return (
                  <div key={feature}>
                    <button
                      onClick={() => {toggleFeature(feature);setSelectedFeature(feature)}}
                      className={`w-full px-4 py-2 flex items-center justify-between hover:bg-card ${
                        selectedFeature === feature
                          ? "bg-blue-50 hover:bg-blue-100"
                          : ""
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {isCollapsed ? (
                          <ChevronRight className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                        <span>{feature}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-green">{stats.pass}</span>
                        <span className="text-red">{stats.fail}</span>
                      </div>
                    </button>

                    {!isCollapsed && (
                      <div className="pl-8 border-l ml-6">
                        {filteredTests.map((test) => (
                          <button
                            key={test.name}
                            onClick={() => {
                              setSelectedFeature(feature);
                              // handleItemClicked(test);
                            }}
                            className={`w-full px-4 py-2 text-sm flex items-center justify-between hover:bg-card`}
                          >
                            <span className="truncate">{test.name}</span>
                            {test.status === "Pass" ? (
                              <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Detail view */}
            <div className="flex-1 overflow-y-auto p-6 text-primary-label">
              {selectedFeature && sortedData.cases[selectedFeature] ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">{selectedFeature}</h2>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-green-600">
                        Pass:{" "}
                        {
                          getFeatureStats(sortedData.cases[selectedFeature])
                            .pass
                        }
                      </span>
                      <span className="text-red-600">
                        Fail:{" "}
                        {
                          getFeatureStats(sortedData.cases[selectedFeature])
                            .fail
                        }
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {getFilteredTests(sortedData.cases[selectedFeature]).map((test) => (
                      <div
                        key={test.name}
                        className="p-4 border rounded-lg hover:bg-card cursor-pointer"
                        onClick={() => handleItemClicked(test)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {test.status === "Pass" ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                            <h3 className="font-medium">{test.name}</h3>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{calculateTime(test.exc_time)}</span>
                            {/* <span>{Number(test.exc_time).toFixed(2)} sec</span> */}
                          </div>
                        </div>
                        <p className="text-secondary-label">
                          {test.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Select a feature to view test results
                </div>
              )}
            </div>
          </div>

          {showModal && (
            <FailCaseModal
              data={itemClicked}
              show={showModal}
              closeClicked={() => setShowModal(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default TestRunDetailPage;
