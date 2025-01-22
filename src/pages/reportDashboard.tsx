import TestRunList from "@/components/testrun/testRunList";

import { useParams } from "react-router-dom";

import { QALineChart } from "@/components/ui/chart";

import { generateRandomHexColor } from "@/lib/utils";



const ReportDashboardPage = () => {
  const params = useParams();
  const lineColor = [generateRandomHexColor(), generateRandomHexColor()]
  const data = [
    { date: "A", pass: 100, fail: 80},
    { date: "B", regression: 50, daily: 100 },
    { date: "C", regression: 95, daily: 40 },
    { date: "D", regression: 30, daily: 70 },
    { date: "E", regression: 60, daily: 20 },
    { date: "F", regression: 45, daily: 10 },
    { date: "G", regression: 0, daily: 0 },
  ];
  // const data: Array<Record<string, any>> = []

  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row space-x-2">
          <div className="w-1/2 h-1/3 max-w-screen-md rounded-lg overflow-hidden shadow-lg p-4 bg-card text-primary-label ">
            <QALineChart
              title="Operation"
              data={data}
              lineColor={lineColor}
              xLineDataKey="date"
              lineDataKey={["regression", "daily"]}
            />
          </div>
          <div className="w-1/2 h-1/3 max-w-screen-md rounded-lg overflow-hidden shadow-lg p-4 bg-card text-primary-label ">
            <QALineChart
              title="product"
              data={data}
              lineColor={lineColor}
              xLineDataKey="date"
              lineDataKey={["regression", "daily"]}
            />
          </div>
          <div className="w-1/2 h-1/3 max-w-screen-md rounded-lg overflow-hidden shadow-lg p-4 bg-card text-primary-label ">
            <QALineChart
              title="b2c"
              data={data}
              lineColor={lineColor}
              xLineDataKey="date"
              lineDataKey={["regression", "daily"]}
            />
          </div>
        </div>
        <TestRunList rows={8}/>
      </div>
    </>
  );
};

export default ReportDashboardPage;
