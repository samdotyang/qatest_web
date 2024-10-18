import { useState } from "react";
import { useParams } from "react-router-dom";

import { useTestRunDetail } from "@/hooks";

import { Search } from "@/components/searchField";
import TestExecutionList from "@/components/testExecution";
import { QAPieChart } from "@/components/ui/chart";
import { FailCaseModal } from "@/components/modal";


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
  console.log(data, filterString);
  const sorted_data: Record<string, any> = {};

  Object.entries(data.cases).forEach(([key, value], index) => {
    const filter_value = value.filter((caseExecution) =>
      caseExecution.name.includes(filterString)
    );
    if (filter_value.length > 0) {
      sorted_data[key] = filter_value;
    }
  });
  return {
    start_time: data.start_time,
    end_time: data.end_time,
    pass: data.pass,
    fail: data.fail,
    team: data.team,
    cases: sorted_data,
    is_regression: data.is_regression,
  };
};

const TestRunDetailPage = () => {
  const { testRunId } = useParams();
  const { testRunDetail, isTestRunDetailLoading, testRunDetailError } =
    useTestRunDetail(testRunId!);

  // props
  const [filter, setFilter] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [itemClicked, setItemClicked] = useState<any>();

  const handleItemClicked = (item: any) => {
    console.log("CLICKed item: ", item)
    setShowModal((prev) => !prev)
    setItemClicked(item);
  }

  const calculatePassFailRate = (data: Record<string, CaseExecution[]>) => {
    console.log(data);
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  if (!testRunDetailError) {
    return (
      <>
        {!isTestRunDetailLoading && (
          <>
            <div className="m-auto w-1/3 h-1/3 dark:bg-mac-dark-card bg-mac-light-card rounded-lg">
              <QAPieChart data={calculatePassFailRate(testRunDetail.cases)} />
            </div>
            <div className="flex flex-col pt-8">
              <div>
                <Search
                  type="search"
                  placeholder="Search"
                  onChange={handleSearch}
                />
              </div>
              <TestExecutionList
                testExecution={sort_object(testRunDetail, filter)}
                itemClicked={handleItemClicked}
              />
            </div>
            {showModal ? (
              <FailCaseModal
                data={itemClicked}
                show={showModal}
                closeClicked={() => setShowModal(false)}
              />
            ) : (
              <div></div>
            )}
          </>
        )}
      </>
    );
  } else {
    console.log(testRunDetailError)
    return <div>Error fetching test run details {testRunDetailError.message}</div>;
  }
};

export default TestRunDetailPage;
