import { Suspense } from "react";

type TestRun = {
  build_version: number;
  start_time: string;
  end_time: string;
  pass: number;
  fail: number;
  title: string;
};

type TestRunItemProps = {
  index: number;
  testrun: TestRun;
};

const TestRunListItem = ({ index, testrun }: TestRunItemProps) => {
  return (
    <>
      <div
        key={`row_${index}`}
        className={`flex flex-row text-primary-label dark:text-dark-primary-label ${
          index % 2 === 0
            ? "bg-mac-light-card dark:bg-mac-dark-card"
            : "bg-transparent"
        } p-2 rounded-lg`}
      >
        {Object.entries(testrun).map(([key, value]) => (
          <div className="basis-1/4" key={`${key}_${value}`}>
            {key === "build_version" ? (
              <a
                href={`/run/${testrun[key]}`}
                className="font-medium text-hyperlink-light dark:text-hyperlink-dark hover:underline"
              >
                {value}
              </a>
            ) : (
              <>
              {key === "start_time" || key === "end_time" ? (
              <time><Suspense fallback={null}>{`${new Date(value).toLocaleString('zh-TW', {hour12: false, timeZone: "UTC"})}`}</Suspense></time>) : value}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TestRunListItem;
